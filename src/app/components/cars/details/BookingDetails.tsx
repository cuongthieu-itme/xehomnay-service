"use client";
import { createBooking, createReview } from "@/actions/bookings";
import { ghCurrency, primaryGradient } from "@/const";
import { useAppContext } from "@/context/AppContext";
import Toast from "@/lib/Toast";
import {
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Group,
  Loader,
  Notification,
  NumberInput,
  Radio,
  Rating,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import SelectTime from "../../home/filterFrom/SelectTime";
import DatePicker from "../DatePicker";
import classes from "./styles.module.css";

export default function BookingDetails({ carDetails, user }: any) {
  const {
    state: { picupDate, returnDate, time },
    setPicupDate,
    setReturnDate,
    setTime,
  } = useAppContext();
  const { refresh } = useRouter();
  const [value, setValue] = useState("h");
  const [numOfDays, setNumOfDays] = useState<number | "">(
    carDetails.minimumRent
  );
  const [numOfHours, setNumOfHours] = useState<number | "">(
    carDetails.minimumRent
  );
  const [profileError, setProfileError] = useState<string | undefined>(
    undefined
  );
  const [triggered, setTriggered] = useState(false);

  const handleBookNow = async () => {
    setTriggered(true);
    if (!picupDate || !returnDate || !time) {
      toast.error("Please select pickup date, return date and time");
      setTriggered(false);
      return;
    }
    if (
      !user?.userProfile?.firstName ||
      !user?.userProfile?.lastName ||
      !user?.userProfile?.city ||
      !user?.userProfile?.region.name
    ) {
      setProfileError("Please Complete your profile to book");
      setTriggered(false);
      return;
    }

    const data = {
      carId: carDetails.id,
      userId: user.id,
      providerId: carDetails.providerId,
      pickupDate: picupDate,
      returnDate: returnDate,
      rentalTime: time,
      // hOrday: 1 hour or 1 day
      hOrday: value === "h" ? numOfHours + "h" : numOfDays + "d",
      totalPrice:
        value === "h"
          ? carDetails.pricePerHour * Number(numOfHours)
          : carDetails.pricePerDay * Number(numOfDays),
      status: "pending",
    };
    const res = await createBooking(data);
    if (res?.error) {
      toast.error(res.error);
      return;
    }
    toast.success("Booking Created Successfully");
    setTriggered(false);
    refresh();
  };

  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);

  const handleReview = async (e: any) => {
    e.preventDefault();
    setReviewLoading(true);
    const data = {
      carId: carDetails.id,
      userId: user.id,
      providerId: carDetails.providerId,
      rate,
      comment,
    };
    console.log(data);
    const res = await createReview(data);
    if (res?.status === "success") {
      toast.success(res.message);
      setReviewLoading(false);
      setRate(0);
      setComment("");
      refresh();
      return;
    } else {
      toast.error(res?.error || "Review Creation Failed");
      setReviewLoading(false);
      return;
    }
  };

  return (
    <Card
      w={{ base: "100%", md: "350px", lg: "400px" }}
      withBorder
      className={classes.bookingContainer}
    >
      <Toast />

      <Title order={4} mb="md" c="gray.6">
        Booking Details
      </Title>
      <Flex gap="sm" direction={{ base: "column", sm: "row" }}>
        <Box>
          <DatePicker />
          <Box mt="sm">
            <SelectTime
              value={time}
              onChange={(e) => setTime(e)}
              label="Time"
            />
          </Box>
        </Box>
      </Flex>

      <Box my="md">
        <Title order={5} my="xs" className="text-muted">
          Address/Location
        </Title>
        <Text size="sm" className="text-default">
          Country:
          <Text c="gray.6" component="span" mx="xs">
            {user?.userProfile?.country?.name || (
              <Link href="/my-account/profile">Add</Link>
            )}
          </Text>
        </Text>
        <Text my="sm" size="sm" className="text-default">
          Region:
          <Text c="gray.6" component="span" mx="xs">
            {user?.userProfile?.region?.name || (
              <Link href="/my-account/profile">Add</Link>
            )}
          </Text>
        </Text>
        <Text my="sm" size="sm" className="text-default">
          City:
          <Text c="gray.6" component="span" mx="xs">
            {user?.userProfile?.city || (
              <Link href="/my-account/profile">Add</Link>
            )}
          </Text>
        </Text>
        <Text size="sm" className="text-default">
          Street:
          <Text c="gray.6" component="span" mx="xs">
            {user?.userProfile?.state || (
              <Link href="/my-account/profile">Add</Link>
            )}
          </Text>
        </Text>
        {profileError && (
          <Notification
            icon={<IconX size="0.6rem" />}
            c="red"
            title="Required!"
          >
            {profileError}
          </Notification>
        )}
      </Box>

      <Title order={5} my="xs" className="text-muted">
        Rental Info
      </Title>
      <Box className={classes.rentalInfo} py="xs" px="md">
        <Flex justify="space-between">
          <Text className="text-default">Minimum Rental (Hours/Days)</Text>
          <Text className="text-default">{carDetails.minimumRent}</Text>
        </Flex>

        {carDetails.maximumRent && (
          <Flex justify="space-between" py="sm">
            <Text className="text-default">Maximum Rental (Hours/Days)</Text>
            <Text className="text-default">{carDetails.maximumRent}</Text>
          </Flex>
        )}

        <Flex justify="space-between">
          <Text className="text-default">Price Per Hours</Text>
          <Text className="text-default">
            {ghCurrency} {carDetails.pricePerHour}
          </Text>
        </Flex>
        <Flex justify="space-between">
          <Text className="text-default">Price Per Day</Text>
          <Text className="text-default">
            {ghCurrency} {carDetails.pricePerDay}
          </Text>
        </Flex>

        <Divider my="sm" />

        <Radio.Group value={value} onChange={setValue} withAsterisk>
          <Group pb="sm">
            <Radio value="h" label="Hours" />
            <Radio value="d" label="Days" />
          </Group>
        </Radio.Group>

        <Box>
          <Text className="text-default">
            Number of {value === "h" ? "Hours" : "Days"}
          </Text>
          {value === "h" ? (
            <>
              <NumberInput
                min={carDetails.minimumRent || undefined}
                max={carDetails.maximumRent || undefined}
                value={numOfHours}
                onChange={(value) => setNumOfHours(Number(value))}
              />
            </>
          ) : (
            <>
              <NumberInput
                min={carDetails.minimumRent || undefined}
                max={carDetails.maximumRent || undefined}
                value={numOfDays}
                onChange={(value) => setNumOfDays(Number(value))}
              />
            </>
          )}
        </Box>

        <Divider my="md" />

        <Flex justify="space-between">
          <Text className="text-default">Total Price</Text>
          {value === "h" ? (
            <>
              {numOfHours && (
                <Text fw="bold" className="text-default">
                  {ghCurrency} {numOfHours * carDetails.pricePerHour}
                </Text>
              )}
            </>
          ) : (
            <>
              {numOfDays && (
                <Text fw="bold" className="text-default">
                  {ghCurrency} {numOfDays * carDetails.pricePerDay}
                </Text>
              )}
            </>
          )}
        </Flex>
      </Box>

      <Button
        w="100%"
        my="sm"
        variant="gradient"
        gradient={primaryGradient}
        disabled={carDetails.status !== "available"}
        onClick={handleBookNow}
      >
        {triggered ? <Loader size={22} /> : "Book Now"}
      </Button>

      {/* review form  */}

      <Divider my="md" />
      {user ? (
        <>
          <form onSubmit={handleReview} className="w-full">
            <div>
              <Title order={5} my="xs">
                Rate this car
              </Title>
              <Text size="sm" c="gray.6">
                How was your experience with this car?
              </Text>
            </div>
            <Rating
              fractions={2}
              size="xl"
              value={rate}
              onChange={(value) => setRate(value)}
            />

            <div>
              <Title order={5} my="xs">
                Write a review
              </Title>
              <Text size="sm" c="gray.6">
                Share your experience with others
              </Text>
            </div>
            <Textarea
              resize="vertical"
              name="comment"
              placeholder="Your comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              type="submit"
              mt="sm"
              w="100%"
              variant="gradient"
              // disabled={carDetails.status !== "available"}
              gradient={primaryGradient}
            >
              {reviewLoading ? <Loader size={22} /> : "Submit Review"}
            </Button>
          </form>
        </>
      ) : (
        <>
          <Text c="red" size="sm">
            Please login to review this car
          </Text>
          <Link href="/login">
            <Button w="100%" variant="gradient" gradient={primaryGradient}>
              Login
            </Button>
          </Link>
        </>
      )}
    </Card>
  );
}

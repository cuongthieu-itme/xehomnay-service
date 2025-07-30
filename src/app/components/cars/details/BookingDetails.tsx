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
import { convertPrice } from "@/lib/price";

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
        Chi tiết đặt xe
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
          Địa chỉ/Địa điểm
        </Title>
        <Text size="sm" className="text-default">
          Quốc gia:
          <Text c="gray.6" component="span" mx="xs">
            {user?.userProfile?.country?.name || (
              <Link href="/my-account/profile">Thêm</Link>
            )}
          </Text>
        </Text>
        <Text my="sm" size="sm" className="text-default">
          Tỉnh/Thành phố:
          <Text c="gray.6" component="span" mx="xs">
            {user?.userProfile?.region?.name || (
              <Link href="/my-account/profile">Thêm</Link>
            )}
          </Text>
        </Text>
        <Text my="sm" size="sm" className="text-default">
          Thành phố:
          <Text c="gray.6" component="span" mx="xs">
            {user?.userProfile?.city || (
              <Link href="/my-account/profile">Thêm</Link>
            )}
          </Text>
        </Text>
        <Text size="sm" className="text-default">
          Đường phố:
          <Text c="gray.6" component="span" mx="xs">
            {user?.userProfile?.state || (
              <Link href="/my-account/profile">Thêm</Link>
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
        Thông tin thuê xe
      </Title>
      <Box className={classes.rentalInfo} py="xs" px="md">
        <Flex justify="space-between">
          <Text className="text-default">Thời gian thuê tối thiểu (Giờ/Ngày)</Text>
          <Text className="text-default">{carDetails.minimumRent}</Text>
        </Flex>

        {carDetails.maximumRent && (
          <Flex justify="space-between" py="sm">
            <Text className="text-default">Thời gian thuê tối đa (Giờ/Ngày)</Text>
            <Text className="text-default">{carDetails.maximumRent}</Text>
          </Flex>
        )}

        <Flex justify="space-between">
          <Text className="text-default">Giá mỗi giờ</Text>
          <Text className="text-default">
            {convertPrice(carDetails.pricePerHour)}
          </Text>
        </Flex>
        <Flex justify="space-between">
          <Text className="text-default">Giá mỗi ngày</Text>
          <Text className="text-default">
            {convertPrice(carDetails.pricePerDay)}
          </Text>
        </Flex>

        <Divider my="sm" />

        <Radio.Group value={value} onChange={setValue} withAsterisk>
          <Group pb="sm">
            <Radio value="h" label="Giờ" />
            <Radio value="d" label="Ngày" />
          </Group>
        </Radio.Group>

        <Box>
          <Text className="text-default">
            Số lượng {value === "h" ? "Giờ" : "Ngày"}
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
          <Text className="text-default">Tổng tiền</Text>
          {value === "h" ? (
            <>
              {numOfHours && (
                <Text fw="bold" className="text-default">
                  {convertPrice(numOfHours * carDetails.pricePerHour)}
                </Text>
              )}
            </>
          ) : (
            <>
              {numOfDays && (
                <Text fw="bold" className="text-default">
                  {convertPrice(numOfDays * carDetails.pricePerDay)}
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
                Đánh giá xe
              </Title>
              <Text size="sm" c="gray.6">
                Bạn có trải nghiệm với xe này không?
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
                Viết đánh giá
              </Title>
              <Text size="sm" c="gray.6">
                Chia sẻ trải nghiệm của bạn với người khác
              </Text>
            </div>
            <Textarea
              resize="vertical"
              name="comment"
              placeholder="Viết đánh giá"
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
            Vui lòng đăng nhập để đánh giá xe
          </Text>
          <Link href="/login">
            <Button w="100%" variant="gradient" gradient={primaryGradient}>
              Đăng nhập
            </Button>
          </Link>
        </>
      )}
    </Card>
  );
}

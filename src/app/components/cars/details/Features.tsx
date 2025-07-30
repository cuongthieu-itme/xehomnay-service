"use client";
import {
  Card,
  Divider,
  Flex,
  Grid,
  List,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconCheck, IconManualGearbox, IconUsers } from "@tabler/icons-react";
import { GiCarDoor } from "react-icons/gi";
import classes from "./styles.module.css";

export const convertTransmission = (transmission: string) => {
  if (transmission === "manual") {
    return "Số sàn";
  } else if (transmission === "automatic") {
    return "Số tự động";
  } else {
    return "Không";
  }
};

export const Features = ({
  seatsCapacity,
  transmission,
  fuelType,
  engineCapaciy,
  otherFeatures,
  acAvailable,
  acWorking,
}: any) => {
  return (
    <>
      <Title order={5} my="xs">
        Tính năng
      </Title>
      <Grid>
        <Grid.Col span={{ base: 12, xs: 6, sm: 3 }}>
          <Card className={classes.mainFeatures} withBorder>
            <IconUsers />
            <Text size="xs">Số chỗ ngồi</Text>
            <Text fw="bold" size="">
              {seatsCapacity}
            </Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, xs: 6, sm: 3 }}>
          <Card className={classes.mainFeatures} withBorder>
            <IconManualGearbox />
            <Text size="xs">Hộp số</Text>
            <Text fw="bold">{convertTransmission(transmission)}</Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, xs: 6, sm: 3 }}>
          <Card className={classes.mainFeatures} withBorder>
            <IconUsers />
            <Text size="xs">Nhiên liệu/EV</Text>
            <Text fw="bold">{fuelType}</Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, xs: 6, sm: 3 }}>
          <Card className={classes.mainFeatures} withBorder>
            <IconUsers />
            <Text size="xs">Dung tích động cơ</Text>
            <Text fw="bold">{engineCapaciy}</Text>
          </Card>
        </Grid.Col>
      </Grid>

      <Grid align="flex-start" my="md">
        {otherFeatures.length !== 0 && (
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Card withBorder>
              <List
                spacing="xs"
                size="sm"
                center
                icon={
                  <ThemeIcon color="blue" size={24} radius="xl">
                    <IconCheck size="1rem" />
                  </ThemeIcon>
                }
              >
                {otherFeatures?.map((feature: any) => (
                  <List.Item key={feature?.id}>{feature?.feature}</List.Item>
                ))}
              </List>
            </Card>
          </Grid.Col>
        )}
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Card withBorder>
            <Flex gap="md" align="center" my="md">
              <GiCarDoor />
              <Text>4 cửa</Text>
            </Flex>
            <Divider mb="md" />
            <Flex gap="md" justify="space-between" align="center" my="md">
              <Text>CÓ MÁY LẠNH</Text>
              <Text>{acAvailable ? "Có" : "Không"}</Text>
            </Flex>

            <Flex gap="md" justify="space-between" align="center" my="md">
              <Text>MÁY LẠNH HOẠT ĐỘNG</Text>
              <Text>{acWorking ? "Có" : "Không"}</Text>
            </Flex>
          </Card>
        </Grid.Col>
      </Grid>
    </>
  );
};

"use client";
import { Divider, Grid, Text, rem } from "@mantine/core";
import classes from "./CarStats.module.css";

export function CarStats({ dataCar }: any) {
  return (
    <>
      <Divider my={16} mx={16} />
      <Grid p="sm" m={rem(16)} style={{ flex: 1 }}>
        {dataCar?.map((stat: any) => (
          <Grid.Col
            span={3}
            className={classes.statCard}
            key={stat.label}
            style={{ flex: 1, border: "1px solid #dee2e6", borderRadius: 4 }}
          >
            <Text size="1.5rem" className={classes.title}>
              {stat.label}
            </Text>
            <div>
              <Text className={classes.label}>Total</Text>
              <Text fz="sm" className={classes.value}>
                {stat.value}
              </Text>
            </div>
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
}

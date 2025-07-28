"use client";
import { md, sm } from "@/const";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import { useMediaQuery } from "@mantine/hooks";
import classes from "./styles.module.css";

interface Props {
  images: string[];
}

export const CarsCarousel = ({ images }: Props) => {
  const smScreen = useMediaQuery(`(min-width: ${sm})`);
  const mdScreen = useMediaQuery(`(min-width: ${md})`);

  return (
    <Carousel className={classes.carousel} withIndicators loop>
      {images?.map((image: any) => (
        <Carousel.Slide key={image} mx="auto">
          <div
            style={{
              background: `center / cover no-repeat url(${image?.imageUrl})`,
              height: mdScreen ? "400px" : smScreen ? "300px" : "200px",
            }}
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

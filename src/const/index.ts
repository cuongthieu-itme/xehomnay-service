import { MantineGradient } from "@mantine/core";

export const xs = "30em";
export const sm = "48em";
export const md = "64em";
export const lg = "74em";
export const xl = "90em";

export const ghCurrency = "BDT৳";
export const ghCurrencySymbol = "₫";

export const primaryGradient: MantineGradient = { from: "pink", to: "yellow" };

export const bookedMessage = "This Car is currently booked by another client";
export const pendingMessage =
  "This Car is pending provider approval upon booking";

const now = new Date();
export const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
export const tomorrow = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate() + 1
);

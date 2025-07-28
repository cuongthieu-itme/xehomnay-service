import { bookedMessage, pendingMessage } from "@/const";
import { Badge, BadgeProps, BadgeVariant } from "@mantine/core";

interface Props {
  status: string;
  variant?: BadgeVariant;
}
export function StatusRenderer({ status, variant }: Props) {
  const defaultProps: BadgeProps = {
    variant,
    size: "xs",
  };

  if (status === "pending") {
    return (
      <Badge {...defaultProps} color="gray" title={pendingMessage}>
        Pending
      </Badge>
    );
  }

  if (status === "booked") {
    return (
      <Badge {...defaultProps} color="orange" title={bookedMessage}>
        Booked
      </Badge>
    );
  }

  if (status === "approved") {
    return (
      <Badge {...defaultProps} color="green" title="Booking Approved">
        Approved
      </Badge>
    );
  }

  if (status === "rejected") {
    return (
      <Badge {...defaultProps} color="red" title={"Booking Rejected"}>
        Rejected
      </Badge>
    );
  }

  if (status === "not available") {
    return (
      <Badge {...defaultProps} color="gray" title="Not Available">
        Not Available
      </Badge>
    );
  }

  return (
    <Badge {...defaultProps} color="green">
      Available
    </Badge>
  );
}

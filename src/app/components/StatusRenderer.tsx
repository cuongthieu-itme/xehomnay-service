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
        Đang chờ
      </Badge>
    );
  }

  if (status === "booked") {
    return (
      <Badge {...defaultProps} color="orange" title={bookedMessage}>
        Đang được thuê
      </Badge>
    );
  }

  if (status === "approved") {
    return (
      <Badge {...defaultProps} color="green" title="Booking Approved">
        Chấp nhận
      </Badge>
    );
  }

  if (status === "rejected") {
    return (
      <Badge {...defaultProps} color="red" title={"Booking Rejected"}>
        Từ chối
      </Badge>
    );
  }

  if (status === "not available") {
    return (
      <Badge {...defaultProps} color="gray" title="Not Available">
        Không có sẵn
      </Badge>
    );
  }

  return (
    <Badge {...defaultProps} color="green">
      Đang có sẵn
    </Badge>
  );
}

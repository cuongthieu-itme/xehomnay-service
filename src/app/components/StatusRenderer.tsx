import { bookedMessage, pendingMessage } from "@/const";
import { Badge, BadgeProps, BadgeVariant } from "@mantine/core";

interface Props {
  status: string;
  variant?: BadgeVariant;
}

export function getStatusDisplay(status: string): {
  label: string;
  color: string;
  title?: string;
} {
  const statusMap: Record<
    string,
    { label: string; color: string; title?: string }
  > = {
    // Car statuses
    pending: { label: "Đang chờ", color: "gray", title: pendingMessage },
    booked: { label: "Đang được thuê", color: "orange", title: bookedMessage },
    available: { label: "Đang có sẵn", color: "green" },
    "not available": { label: "Không có sẵn", color: "gray", title: "Not Available" },

    // Booking statuses
    approved: { label: "Chấp nhận", color: "green", title: "Booking Approved" },
    rejected: { label: "Từ chối", color: "red", title: "Booking Rejected" },

    // Country/Region statuses
    active: { label: "Hoạt động", color: "green", title: "Active" },
    inactive: { label: "Ngừng hoạt động", color: "red", title: "Inactive" },
  };

  return statusMap[status] || { label: status, color: "gray" };
}

export function StatusRenderer({ status, variant }: Props) {
  const defaultProps: BadgeProps = {
    variant,
    size: "xs",
  };

  const { label, color, title } = getStatusDisplay(status);

  return (
    <Badge {...defaultProps} color={color} title={title}>
      {label}
    </Badge>
  );
}

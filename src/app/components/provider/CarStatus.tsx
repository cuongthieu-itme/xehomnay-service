import { updateCarStatus } from "@/actions/carAction";
import Toast from "@/lib/Toast";
import { Loader, Menu, UnstyledButton } from "@mantine/core";
import {
  IconCalendarCheck,
  IconHourglassLow,
  IconProgressCheck,
  IconSquareRoundedXFilled,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import toast from "react-hot-toast";
import { CarStatus as CarStatusType } from "../../../../types";
import { StatusRenderer } from "../StatusRenderer";

const statuses: {
  display: string;
  value: CarStatusType;
  color: string;
  icon: ReactNode;
}[] = [
  {
    display: "Đang có sẵn",
    value: "available",
    color: "green",
    icon: <IconProgressCheck size={14} />,
  },
  {
    display: "Đang chờ",
    value: "pending",
    color: "gray.6",
    icon: <IconHourglassLow size={14} />,
  },
  {
    display: "Đang được thuê",
    value: "booked",
    color: "red",
    icon: <IconCalendarCheck size={14} />,
  },
  {
    display: "Không có sẵn",
    value: "not available",
    color: "gray.6",
    icon: <IconSquareRoundedXFilled size={14} />,
  },
];

interface TableActionsProps {
  id: number;
  status: CarStatusType;
}

export function CarStatus({ status, id }: TableActionsProps) {
  const { refresh } = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateStatus = async (selectedStatus: CarStatusType) => {
    if (status !== selectedStatus) {
      setIsUpdating(true);
      // server action
      const statusValue = await updateCarStatus(id, selectedStatus);
      refresh();
      setIsUpdating(false);

      if (statusValue?.data) {
        refresh();
        toast.success("Cập nhật trạng thái thành công");
      }

      if (statusValue?.error) {
        toast.error("Failed to update car status!. Try again later");
      }
    }
  };

  return (
    <Menu shadow="md" width={200}>
      <Toast />
      <Menu.Target>
        {isUpdating ? (
          <Loader size="xs" />
        ) : (
          <UnstyledButton>
            <StatusRenderer variant="light" status={status} />
          </UnstyledButton>
        )}
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Trạng thái xe</Menu.Label>

        {statuses.map((item) => (
          <Menu.Item
            key={item.value}
            onClick={() => handleUpdateStatus(item.value)}
            leftSection={item.icon}
            color={item.color}
          >
            {item.display}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}

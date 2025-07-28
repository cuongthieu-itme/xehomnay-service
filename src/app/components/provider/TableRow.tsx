import { deleteCar } from "@/actions/carAction";
import { useCarContext } from "@/context/CarContext";
import { ActionIcon, Avatar, Group, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AddOrEditCar } from "./AddOrEditCar";
import { CarStatus } from "./CarStatus";
import { ConfirmationModal } from "./ConfirmationModal";
interface TableRowProps {
  car: any;
  providerDetails: any;
}
export default function TableRow({ car, providerDetails }: TableRowProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const { addInitialState } = useCarContext();
  const { refresh } = useRouter();
  // console.log("car", car);

  const handleDeleteCar = async (carId: number) => {
    const { error }: any = await deleteCar(carId);

    if (error) {
      toast.error("Failed to delete car! Try again");
    } else {
      toast.success("Car deleted successfully");
      refresh();
    }
  };

  const handleRowClicked = (carId: number) => {
    router.push(`${pathname}?car_id=${carId}`);
  };
  return (
    <Table.Tr
      onClick={() => handleRowClicked(car.id)}
      style={{ cursor: "pointer" }}
    >
      <Table.Td>
        <Avatar src={car?.images[0]?.imageUrl} />
      </Table.Td>
      <Table.Td>{car.make}</Table.Td>
      <Table.Td>{car.model}</Table.Td>
      <Table.Td>{car.year}</Table.Td>
      <Table.Td>{car.bodyType}</Table.Td>
      <Table.Td width="100px">
        <CarStatus status={car.status} id={car.id} />
      </Table.Td>
      <Table.Td width="120px">
        <Group>
          <AddOrEditCar
            openButton={
              <ActionIcon
                onClick={() => {
                  addInitialState(car);
                  open();
                }}
              >
                <IconEdit size="1.2rem" />
              </ActionIcon>
            }
            mode="edit"
            open={open}
            close={close}
            opened={opened}
            providerDetails={providerDetails}
          />

          <ConfirmationModal
            name={` ${car.make} ${car.model}`}
            onConfirm={() => handleDeleteCar(car.id)}
            openButton={
              <ActionIcon color="red">
                <IconTrash size="1.2rem" />
              </ActionIcon>
            }
          />
        </Group>
      </Table.Td>
    </Table.Tr>
  );
}

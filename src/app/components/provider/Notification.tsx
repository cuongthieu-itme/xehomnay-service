import { Button, Dialog, Group, Text, TextInput, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

function Notification() {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <>
      <Tooltip label="Notification" position="left" withArrow>
        <span className="relative flex h-3 w-3 cursor-pointer" onClick={toggle}>
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
          <span
            className="relative inline-flex rounded-full h-3 w-3 bg-green-600"
            title="Online"
          ></span>
        </span>
      </Tooltip>

      <Dialog
        position={{ top: "10%", left: "40%" }}
        opened={opened}
        withCloseButton
        onClose={close}
        size="lg"
        radius="md"
      >
        <Text size="sm" mb="xs" fw={500}>
          Subscribe to email newsletter
        </Text>

        <Group align="flex-end">
          <TextInput placeholder="hello@gluesticker.com" style={{ flex: 1 }} />
          <Button onClick={close}>Subscribe</Button>
        </Group>
      </Dialog>
    </>
  );
}
export default Notification;

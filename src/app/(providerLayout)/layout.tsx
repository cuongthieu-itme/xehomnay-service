import "@mantine/core/styles.css";
import "../globals.css";

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import { AppShell } from "@/components/app-shell";

export const dynamic = "force-static";

export default function ProtectedAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}

import DrinkListLayout from "@/components/shared/drink-layout/drink-list-layout";

export default function TopListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DrinkListLayout>{children}</DrinkListLayout>;
}

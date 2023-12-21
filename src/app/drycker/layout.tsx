import DrinkListLayout from "@/components/Layout/DrinkList";

export default function TopListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DrinkListLayout>{children}</DrinkListLayout>
    </>
  );
}

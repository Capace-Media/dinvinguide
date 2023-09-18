import { getAuthors } from "@/lib/queries/getAuthors";

async function getData() {
  const res = await getAuthors();

  return res;
}

export default async function Home() {
  const data = await getData();

  return (
    <main className="flex min-h-screen flex-col font-main items-center p-24">
      <h2 className="">Hello world</h2>

      <div>
        {data?.skribenter?.map((auth: any) => {
          return (
            <>
              <p>{auth?.name}</p>
            </>
          );
        })}
      </div>
    </main>
  );
}

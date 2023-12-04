import Image from "next/image";

interface AsideProps {
  author?: any;
  related?: any;
}

const Aside = ({ author, related }: AsideProps) => {
  return (
    <aside className="md:col-span-2 pl-10">
      <div className=" w-full bg-brand-primary p-4">
        <div className="relative w-full min-h-[500px]">
          <Image
            src={author?.acf_user?.bild?.mediaItemUrl}
            alt={
              author?.acf_user?.bild?.altText
                ? author.acf_user.bild.altText
                : "Bild från dinvinguide"
            }
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </aside>
  );
};

export default Aside;

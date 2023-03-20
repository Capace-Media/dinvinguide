const ToplistCategories = ({ top }) => {
  console.log("top ===>", top?.acf_toplists?.forpackningar);
  return (
    <div className="">
      <h2 className="">{top?.acf_toplists?.slogan}</h2>
      {top?.acf_toplists?.forpackningar?.map((type, index) => {
        if (type?.name !== "Box") {
          return <div key={index}>På flaska</div>;
        } else {
          return <div key={index}>På box</div>;
        }
      })}
    </div>
  );
};

export default ToplistCategories;

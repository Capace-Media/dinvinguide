const ToplistCategories = ({ top }) => {
  console.log("top ===>", top?.acf_toplists?.forpackningar);
  let packs = top?.acf_toplists?.forpackningar;

  return (
    <div className="">
      <h2 className="">{top?.acf_toplists?.slogan}</h2>

      {packs?.find((pack) => pack?.name?.includes("Box")) &&
      !packs?.find((pack) => pack?.name?.includes("Flaska")) ? (
        <div>onlyBox</div>
      ) : packs?.find((pack) => pack?.name?.includes("Box")) &&
        packs?.find((pack) => pack?.name?.includes("Flaska")) ? (
        <div>flaska och box</div>
      ) : (
        <div>only flaska</div>
      )}
    </div>
  );
};

export default ToplistCategories;

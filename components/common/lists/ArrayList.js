import Ad from "../../ads/Ad";
import ArrayListItem from "./ArrayListItem";
const ArrayList = ({ array, loadMore, ads }) => {
  const chunkSize = 4 * 5;
  return (
    <ul className="grid grid-cols-4 gap-2 py-20 contain">
      {array.map((item, i) => {
        if ((i + 1) % chunkSize === 0) {
          return (
            <>
              <ArrayListItem
                key={item.id}
                data={item}
                loadMore={loadMore}
                last={i + 1 === array.length ? true : false}
              />
              {ads && (
                <li key={`ad${i}`} className="col-span-full row">
                  <Ad ads={ads} position="mid" />
                </li>
              )}
            </>
          );
        } else {
          return (
            <ArrayListItem
              key={item.id}
              data={item}
              loadMore={loadMore}
              last={i + 1 === array.length ? true : false}
            />
          );
        }
      })}
    </ul>
  );
};
export default ArrayList;

import { useEffect, useRef, useState } from "react";
import flattenObject from "../../../utils/flattenObject";
import ClientAd from "../../ads/ClientAd";
import TestItem from "./testItem";
const itemsPerPage = 16; // number of items per page
const Test = ({
  array,
  ads,
  columns = 4,
  subtitle = null,
  search = true,
  heading = "",
}) => {
  const [searchInput, setSearchInput] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const scrollToRef = useRef(null);

  const numberOfPages = Math.ceil(array.length / itemsPerPage); // total number of pages

  const currentItems = searchInput
    ? array.filter((item) => {
        // Convert object values to string and check if they include the search input
        const flattenedItem = flattenObject(item);
        return Object.values(flattenedItem)
          .map((val) => String(val))
          .some((val) => val.includes(searchInput));
      })
    : array.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  //   const currentItems = array.slice(
  //     (currentPage - 1) * itemsPerPage,
  //     currentPage * itemsPerPage
  //   );

  useEffect(() => {
    // scroll to the top of the items when the page changes
    window.scrollTo({
      top: scrollToRef.current.offsetTop,
      behavior: "smooth",
    });
  }, [currentPage]);
  const handlePrevClick = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // handle next button click
  const handleNextClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePageNumberClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // handle start ellipsis button click
  const handleStartEllipsisClick = () => {
    setCurrentPage(1);
  };

  // handle end ellipsis button click
  const handleEndEllipsisClick = () => {
    setCurrentPage(numberOfPages);
  };

  const pageNumbers = Array.from(
    { length: numberOfPages },
    (_, index) => index + 1
  );

  // determine which page numbers to display
  let startPage = 1;
  let endPage = 3;
  let showStartEllipsis = false;
  let showEndEllipsis = true;

  if (currentPage > 2 && currentPage < numberOfPages - 1) {
    startPage = currentPage - 1;
    endPage = currentPage + 1;
    showStartEllipsis = true;
    showEndEllipsis = true;
  } else if (currentPage === numberOfPages - 1) {
    startPage = currentPage - 2;
    endPage = currentPage;
    showStartEllipsis = true;
  } else if (currentPage === numberOfPages) {
    startPage = currentPage - 3;
    endPage = currentPage - 1;
    showStartEllipsis = true;
  }

  const printColumns = () => {
    switch (columns) {
      case 5:
        return "grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";
      case 4:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3";
      case 2:
        return "grid-cols-1 md:grid-cols-2";
    }
  };

  const filterItems = () => {
    const filteredItems = array.filter((item) => {
      // flatten the item object for easier searching
      const flatItem = flattenObject(item);

      // check if any value in the flatItem object contains the searchInput
      return Object.values(flatItem).some((value) =>
        value.toLowerCase().includes(searchInput.toLowerCase())
      );
    });

    return filteredItems;
  };

  return (
    <>
      {heading && (
        <div className="text-center contain">
          <h2 className="text-brand-red">{heading}</h2>
        </div>
      )}
      <div ref={scrollToRef} />
      {search && (
        <div className="text-center contain">
          <input
            type="text"
            value={searchInput}
            placeholder="Sök..."
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full max-w-lg px-5 py-3 rounded-sm"
          />
        </div>
      )}
      {/* render current items */}
      <ul className={`grid relative gap-2 row contain mb-14 ${printColumns()}`}>
        {ads && (
          <li key="ad" className="col-span-full row">
            <ClientAd position="mid" />
          </li>
        )}
        {currentItems.map((item, index) => {
          return (
            <TestItem
              key={item?.id + index}
              data={flattenObject(item)}
              subtitle={subtitle}
            />
          );
        })}
      </ul>

      {/* render pagination UI */}
      <div className="flex justify-center items-center mt-4 text-[12px]">
        <button
          className=" bg-brand-green hover:bg-brand-gray text-white font-bold py-2 px-4 rounded-l"
          disabled={currentPage === 1}
          onClick={handlePrevClick}
        >
          Previous
        </button>
        <div className="flex mx-4 gap-1">
          {showStartEllipsis && (
            <button
              key="start-ellipsis"
              className="rounded-full py-2 px-4 bg-white border border-gray-300 text-gray-700"
              onClick={handleStartEllipsisClick}
            >
              ...
            </button>
          )}
          {pageNumbers.slice(startPage - 1, endPage).map((pageNumber) => (
            <button
              key={pageNumber}
              className={`rounded-full py-2 px-4 ${
                pageNumber === currentPage
                  ? "bg-brand-green text-white font-bold"
                  : "bg-white border border-gray-300 text-gray-700"
              }`}
              onClick={() => handlePageNumberClick(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
          {showEndEllipsis && (
            <button
              key="end-ellipsis"
              className="rounded-full py-2 px-4 bg-white border border-gray-300 text-gray-700"
              onClick={handleEndEllipsisClick}
            >
              ...
            </button>
          )}
        </div>
        <button
          className="bg-brand-green hover:bg-brand-gray text-white font-bold py-2 px-4 rounded-r"
          disabled={currentPage === numberOfPages}
          onClick={handleNextClick}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Test;

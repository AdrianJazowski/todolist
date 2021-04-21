/** @format */
/** @jsxImportSource theme-ui */
import React, { useContext, useEffect, useRef, useState } from "react";
import AppContext from "../../state/context";

const SearchInput = () => {
  const value = useContext(AppContext);
  const { filterTasksByName } = value;
  const [searchInputValue, setSearchInputValue] = useState("");

  const handleSearchInputChange = (e) => {
    setSearchInputValue(e.target.value);
  };

  const mounted = useRef();

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      filterTasksByName(searchInputValue);
    }
  }, [searchInputValue]);

  return (
    <div
      sx={{
        display: "flex",
        input: {
          margin: "20px auto",
          width: "20vw",
          height: "4vh",
          border: "1px solid lightgray",
          borderRadius: "10px",
          padding: "5px",
        },
      }}
    >
      <input
        name="searchTask"
        placeholder="wyszukaj zadanie"
        type="text"
        value={searchInputValue}
        onChange={handleSearchInputChange}
      />
    </div>
  );
};

export default SearchInput;

import React, { useState } from "react";
import SearchIcon from "./SearchIcon";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <span style={{ borderBottom: "1px solid black" }}>
        <SearchIcon />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search For Salon"
          className="search-input"
          style={{ border: "none", marginLeft: "18px", outline: "none" }}
        />
      </span>
    </div>
  );
};

export default SearchBar;

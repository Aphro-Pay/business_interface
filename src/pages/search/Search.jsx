import React, { useState } from "react";
import BlackLogo from "../../components/BlackLogo";
import Menu from "../../components/Menu";
import Address from "./components/Address";
import SearchBar from "./components/SearchBar";
import Card from "./components/Card";

function Search() {
  const [searchResults, setSearchResults] = useState([""]);

  const handleSearch = (query) => {
    // Simulate search operation (e.g., fetch from API)
    if (query.trim() === "") {
      setSearchResults([""]);
      return;
    }

    // In a real scenario, you would fetch data based on the query
    // For demonstration, we're just updating the state with a dummy array
    setSearchResults([
      `Result 1 for "${query}"`,
      `Result 2 for "${query}"`,
      `Result 3 for "${query}"`,
      `Result 4 for "${query}"`,
      `Result 5 for "${query}"`,
      `Result 6 for "${query}"`,
      `Result 7 for "${query}"`,
      `Result 8 for "${query}"`,
    ]);
  };

  return (
    <div>
      <div className="header">
        <header className="menu-bar">
          <BlackLogo />
          <Menu />
        </header>
        <Address />
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="top-rounded-card">
        <h2 style={{ textAlign: "left" }}>Near You</h2>
        {searchResults.length > 0 ? (
          <div className="grid-container">
            {searchResults.map((result, index) => (
              <Card key={index} className="grid-item" />
            ))}
          </div>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}

export default Search;

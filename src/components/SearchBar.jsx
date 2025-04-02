import React, { useState } from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
  width: 100%;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px 20px;
  border: 1px solid #ddd;
  border-radius: 30px 0 0 30px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #6e8efb;
  }
`;

const SearchButton = styled.button`
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 0 30px 30px 0;
  cursor: pointer;
  font-size: 16px;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.9;
  }
`;

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Enter city name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchButton type="submit">Search</SearchButton>
      </SearchContainer>
    </form>
  );
};

export default SearchBar;

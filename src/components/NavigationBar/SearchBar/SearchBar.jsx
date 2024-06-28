import React, { useState } from 'react';
import { Form, InputGroup, FormControl } from 'react-bootstrap';
import { FiSearch } from 'react-icons/fi';
import './SearchBar.scss';

export const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
    // // e.preventDefault();
    // setSearchTerm(e.target.value, () => onSearch(searchTerm));
    // // onSearch(searchTerm);
  };

  return (
    <div className="search-bar">
      <Form>
        <InputGroup>
          <InputGroup.Text className="search-icon border-0 bg-transparent">
            <FiSearch className="search-icon" />
          </InputGroup.Text>
          <FormControl 
            type="text" 
            placeholder="Search Films" 
            className="search-form mr-sm-2 border-0 bg-transparent custom-form-control"
            onChange={handleSearch}
            value={searchTerm}
          />
        </InputGroup>
      </Form>
     </div>
  );
};

import React from "react";

const SearchBox = ({ value, onTextChange }) => {
  return (
    <div className="input-group">
      <input
        type="text"
        value={value}
        className="form-control"
        placeholder="Search"
        onChange={e => onTextChange(e.currentTarget.value)}
      />
    </div>
  );
};

export default SearchBox;

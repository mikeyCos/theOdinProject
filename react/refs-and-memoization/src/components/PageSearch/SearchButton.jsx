import PropTypes from "prop-types";

const SearchButton = ({ searchInputRef }) => {
  const onClickHandler = () => {
    searchInputRef.current.focus();
  };

  return <button onClick={onClickHandler}>Search</button>;
};

SearchButton.propTypes = {
  searchInputRef: PropTypes.object,
};

export default SearchButton;

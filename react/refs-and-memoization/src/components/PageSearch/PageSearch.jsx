import { useRef } from "react";
import SearchButton from "./SearchButton.jsx";
import SearchInput from "./SearchInput.jsx";

const PageSearch = () => {
  const searchInputRef = useRef(null);

  return (
    <>
      <nav>
        <SearchButton searchInputRef={searchInputRef} />
      </nav>
      <SearchInput ref={searchInputRef} />
    </>
  );
};

export default PageSearch;

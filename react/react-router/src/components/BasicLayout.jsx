import Header from "./Header";
import Main from "./Main";
import { Outlet } from "react-router-dom";

const BasicLayout = () => {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

export default BasicLayout;

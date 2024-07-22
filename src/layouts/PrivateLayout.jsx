import { Outlet  } from "react-router-dom";
import Header from "../components/header/header.jsx";
const PrivateLayout = () => {
  return (
    <div >
      <Header/>
      <Outlet />
    </div>
  );
};

export default PrivateLayout;

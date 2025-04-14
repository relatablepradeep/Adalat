import { Outlet } from "react-router";
import NavBar from "./components/Header/NavBar";

export default function Root() {
  return (
    <>
      <NavBar />
   
        <Outlet />
    
    </>
  );
}

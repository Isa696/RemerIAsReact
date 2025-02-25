import AuthWrapper from "../component/auth/AuthWrapper";
import Navbar from "../component/Navbar/Navbar";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <>
      <AuthWrapper>
        <Navbar />
        <Outlet />
      </AuthWrapper>
    </>
  );
}

export default RootLayout;

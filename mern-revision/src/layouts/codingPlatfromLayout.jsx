import { Outlet } from "react-router-dom";
import StudentAuthorise from "../Authorization/StudentAuthorise";
import CodingPlatformNavbar from "../Codingplatfrom/Navbar";

export default function CodingPlatformLayout() {
  return (
    <StudentAuthorise>
      <div className="h-auto flex flex-col bg-base-100 text-gray-200">
        <CodingPlatformNavbar />
        <Outlet />
      </div>
    </StudentAuthorise>
  );
}

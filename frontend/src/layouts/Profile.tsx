import { Outlet } from "react-router";


const ProfileLayout = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default ProfileLayout;

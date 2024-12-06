import { Link } from "react-router-dom";
import HamburgerMenu from "../../molecules/HamburgerMenu";
import DropdownMenu from "../../molecules/ProfileDropdown";
import { LogoutOutlined, SettingFilled, UserOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";

const Navbar = ({ handleIsOpen }: { handleIsOpen: () => void }) => {

  const HandleSingOut = () => {
    alert("test");
  };
  
  const PROFILE_DROPDOWN_MENU: MenuProps["items"] = [
    {
      key: "1",
      label: "username : username-user",
      disabled: true,
    },
    {
      key: "2",
      label: <Link to="/#">Profile</Link>,
      icon: <UserOutlined />,
    },
    {
      key: "3",
      label: <Link to="/#">Settings</Link>,
      icon: <SettingFilled />,
    },
    {
      key: "4",
      onClick: HandleSingOut,
      label: "Sign Out",
      icon: <LogoutOutlined />,
    },
  ];
  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <HamburgerMenu setIsOpen={handleIsOpen} />
            <Link to="/" className="flex ms-2 md:me-24">
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                Mern <span className="text-orange-400">Learning</span>
              </span>
            </Link>
          </div>
          <DropdownMenu items={PROFILE_DROPDOWN_MENU} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

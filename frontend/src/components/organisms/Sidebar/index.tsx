import {
  PhoneFilled,
  PieChartFilled,
  SwitcherFilled,
  UserOutlined,
} from "@ant-design/icons";
import { NavLinkProps } from "../../../types/NavLinkTypes";
import NavLink from "../../molecules/NavLink";

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const NAVIGATION_SIDEBAR: NavLinkProps[] = [
    {
      text: "Dashboard",
      link: "/",
      icon: (
        <PieChartFilled className="text-xl text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
      ),
    },
    {
      text: "Hobby",
      link: "/hobbies",
      icon: (
        <SwitcherFilled className="text-xl text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
      ),
    },
    {
      text: "Person",
      link: "/person",
      icon: (
        <UserOutlined className="text-xl text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
      ),
    },
    {
      text: "Phone Number",
      link: "/phone-number",
      icon: (
        <PhoneFilled className="text-xl text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
      ),
    },
  ];
  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform duration-300 ease-in-out ${
        isOpen ? "[transform:translateX(0%)]" : "[transform:translateX(-100%)]"
      } bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700`}
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          {NAVIGATION_SIDEBAR.map((item, index) => {
            return (
              <NavLink
                key={index}
                text={item.text}
                link={item.link}
                icon={item.icon}
              />
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

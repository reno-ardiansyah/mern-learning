import { Link } from "react-router-dom";
import { NavLinkProps } from "../../../types/NavLinkTypes";

const NavLink: React.FC<NavLinkProps> = ({ icon, link, text }) => {
  return (
    <li>
      <Link
        to={link}
        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
      >
        {/* <div className="text-xl text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"> */}
          {icon}
        {/* </div> */}
        <span className="ms-3">{text}</span>
      </Link>
    </li>
  );
};

export default NavLink;

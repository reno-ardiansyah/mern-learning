import { Link, useLocation } from "react-router-dom";
import { NavLinkProps } from "../../../types/NavLinkTypes";

const NavLink: React.FC<NavLinkProps> = ({ icon, link, text }) => {
  const location = useLocation();
  return (
    <li>
      <Link
        to={link}
        className={`${location.pathname == link ? 'dark:bg-gray-600 bg-gray-50' : ''} flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
      >
          {icon}
        <span className="ms-3">{text}</span>
      </Link>
    </li>
  );
};

export default NavLink;

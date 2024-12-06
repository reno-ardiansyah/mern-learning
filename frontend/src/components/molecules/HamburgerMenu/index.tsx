import Button from "../../atoms/Button/Button";
import HamburgerIcon from "../../atoms/Icons/Hamburger";

const HamburgerMenu = ({setIsOpen}: {setIsOpen: () => void}) => {
  return (
    <Button
      onClick={setIsOpen}
      type="link"
      size="middle"
      className="inline-flex items-center p-2"
      icon={<HamburgerIcon />}
    >
      <span className="sr-only">
        Mern <span className="text-orange-400">Learning</span>
      </span>
    </Button>
  );
};

export default HamburgerMenu;

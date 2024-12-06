const Footer = ({isOpen}: {isOpen: boolean}) => {
  return (
    <footer
      className={`footer fixed bottom-0 left-0 w-full bg-gray-200 p-4 transition-all duration-300 ease-in-out ${
        isOpen ? "sm:ml-64" : "ml-0"
      }`}
    >
      <p>&copy; 2023 Dashboard Template</p>
    </footer>
  );
};

export default Footer;

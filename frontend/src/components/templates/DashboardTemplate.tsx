import React from "react";
import Navbar from "../organisms/Navbar";
import Sidebar from "../organisms/Sidebar";
import Footer from "../organisms/Footer";

interface DashboardTemplateProps {
  children: React.ReactNode;
}

const DashboardTemplate: React.FC<DashboardTemplateProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(true);
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <Navbar handleIsOpen={() => setIsMenuOpen(!isMenuOpen)}/>
      <Sidebar isOpen={isMenuOpen} />
      <main className={`main-content flex-1 p-4 mt-3 transition-all duration-300 ease-in-out ${ isMenuOpen ? "sm:ml-64" : "ml-0" }`} >
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          {children}
        </div>
      </main>
      <Footer isOpen={isMenuOpen} />
    </div>
  );
};

export default DashboardTemplate;

import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from "../components/pages/dashboard";
import Hobbies from "../components/pages/hobbies";
import Persons from "../components/pages/persons";
import PhoneNumber from "../components/pages/phonenumber";

const Routers: React.FC = () => {
return (
  <Routes>
    <Route path="/" element={<Dashboard/>} />
    <Route path="/hobbies" element={<Hobbies />} />
    <Route path="/person" element={<Persons />} />
    <Route path="/phone-number" element={<PhoneNumber />} />
  </Routes>
);
}

export default Routers;
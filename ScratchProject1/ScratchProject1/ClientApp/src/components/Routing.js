import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactStudent from "./ContactStudent";
import Email from "./Email";

import Nav from "./Nav";
import StudentCurd from "./StudentCurd";

const Routing = () => {
    return (
        <Router>
            <div>
                <Nav />
                <Routes>
                    <Route path="/" element={<StudentCurd />} />
                    <Route path="/Contact" element={<ContactStudent />} />
                    <Route path="/Email" element={<Email />} />
                 

                </Routes>
            </div>
        </Router>
    );
};

export default Routing;
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";

function App() {
  const [pages, setPages] = useState(() => {
    const saved = localStorage.getItem("pages");
    return saved ? JSON.parse(saved) : ["Info", "Details", "Other", "Ending"];
  });

  const [activePage, setActivePage] = useState("Info");

  useEffect(() => {
    localStorage.setItem("pages", JSON.stringify(pages));
  }, [pages]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-800 text-black flex flex-col">
        <Navbar
          pages={pages}
          setPages={setPages}
          activePage={activePage}
          setActivePage={setActivePage}
        />

        <div className="text-white text-center mt-10 text-2xl">
          <h2>Current Page: {activePage}</h2>
        </div>

        <Routes>
          <Route path="/" element={<div className="text-white text-center">Home</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import { useState,useRef,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'
import {Plus} from 'lucide-react'


function App() {
  const [pages, setPages] = useState(() => {
    const saved = localStorage.getItem("pages");
    return saved ? JSON.parse(saved) : ["Info", "Details", "Other", "Ending"];
  });
  const [activePage, setActivePage] = useState("Info");
  const [contextIndex, setContextIndex] = useState(null);

  const handleInsertPage = (index) => {
  const newPage = `Page ${pages.length + 1}`;
  const updated = [...pages.slice(0, index + 1), newPage, ...pages.slice(index + 1)];
  setPages(updated);
  
};
const wrapperRefs = useRef([]);

  const handleDeletePage = (index) => {
  const updatedPages = pages.filter((_, i) => i !== index);
  setPages(updatedPages);

  // If the deleted page was active, reset to the first page
  if (pages[index] === activePage) {
    setActivePage(updatedPages[0] || "");
  }

  setContextIndex(null); // close menu
};

const handleRenamePage = (index) => {
  const newName = prompt("Enter new name for the page:", pages[index]);
  if (newName && newName.trim() !== "") {
    const updatedPages = [...pages];
    updatedPages[index] = newName.trim();
    setPages(updatedPages);

    // If renamed page was active, update activePage too
    if (index === pages.findIndex(p => p === activePage)) {
      setActivePage(newName.trim());
    }
  }

  setContextIndex(null); // close menu
};

  useEffect(() => {
    localStorage.setItem("pages", JSON.stringify(pages));
  }, [pages]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedInside = wrapperRefs.current.some(ref => ref?.contains(event.target));
      if (!clickedInside) {
        setContextIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
   <div className='min-h-screen bg-gray-800 text-black flex '>
  <div className='bg-white p-3 m-5 rounded shadow h-1/4  w-full overflow-x-hiddenS '>
    <div className='flex items-center'>
      {pages.map((page, index) => (
  <div key={index} className="relative flex items-center" ref={(el) => (wrapperRefs.current[index] = el)}> 
    {/* Page Bubble */}
    <div
      onClick={() => setActivePage(page)}
      
      className={`px-4 py-1 rounded-lg cursor-pointer text-sm border transition text-nowrap 
        ${page === activePage
          ? "bg-white border-orange-500 shadow"
          : "bg-gray-200 border-gray-300 hover:bg-gray-200"}`}
    >
      {page}
      {/* Show ⋯ only for active page */}
    {activePage === page && (
      <button
        onClick={(e) => {
          e.stopPropagation();
          setContextIndex(contextIndex === index ? null : index);
        }}
        className="text-gray-500 hover:text-black ml-1"
      >
        ⋯
      </button>
      
    )}
    
    </div>
    {contextIndex === index && (
  <div
    ref={el => (wrapperRefs.current[index] = el)}
    className="absolute top-full mt-2 left-0 z-10 bg-white border shadow rounded text-sm text-black w-36"
  >
    <div
      onClick={() => handleRenamePage(index)}
      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
    >
      Rename
    </div>
    <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Duplicate</div>
    <div
      onClick={() => handleDeletePage(index)}
      className="px-4 py-2 hover:bg-gray-100 text-red-500 cursor-pointer"
    >
      Delete
    </div>
  </div>
)}

    {/* Hoverable Connector (except after last page) */}
    {index < pages.length - 1 && (
      <div className="group relative mx-[1px] flex items-center pointer-events-none">
        {/* Dotted line */}
        <div className="h-0.5 w-6 border-t border-dotted border-gray-900 group-hover:w-12 transition-all duration-300 ease-in-out"></div>

        {/* Plus button appears on hover */}
        <button
          onClick={() => handleInsertPage(index)}
          className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center rounded-full border border-gray-400 text-gray-600 text-[10px] leading-none bg-white opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Plus className="w-2.5 h-2.5" />
        </button>
      </div>
    )}
    
  </div>
  
))}
{/* Dotted line + Add Page button after last item */}
<div className="flex items-center group transition-all duration-300 ease-in-out">
  {/* Dotted line */}
  <div className="h-0.5 w-6 border-t border-dotted border-gray-900 group-hover:w-12 transition-all"></div>

  {/* Add page button */}
  <button
    onClick={() => {
      const newPage = `Page ${pages.length + 1}`;
      setPages([...pages, newPage]);
    }}
    className="px-4 py-1 text-nowrap rounded-lg border bg-white border-gray-200 text-sm text-gray-600 hover:text-black transition"
  >
    + Add Page
  </button>
  
</div>

    </div>
  </div>
</div>

  );
}

export default App

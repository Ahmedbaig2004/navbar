import { useState,useRef,useEffect } from 'react'


import {Plus,MoreVertical} from 'lucide-react'


const Navbar =({ pages, setPages, activePage, setActivePage})=>{

 
  const [contextIndex, setContextIndex] = useState(null);
const wrapperRefs = useRef([]);

  const handleInsertPage = (index) => {
  const newPage = `Page ${pages.length + 1}`;
  const updated = [...pages.slice(0, index + 1), newPage, ...pages.slice(index + 1)];
  setPages(updated);
  
};

  const handleDeletePage = (index) => {
  const updatedPages = pages.filter((_, i) => i !== index);
  setPages(updatedPages);

  if (pages[index] === activePage) {
    setActivePage(updatedPages[0] || "");
  }

  setContextIndex(null); 
};

const handleRenamePage = (index) => {
  const newName = prompt("Enter new name for the page:", pages[index]);
  if (newName && newName.trim() !== "") {
    const updatedPages = [...pages];
    updatedPages[index] = newName.trim();
    setPages(updatedPages);

    if (index === pages.findIndex(p => p === activePage)) {
      setActivePage(newName.trim());
    }
  }

  setContextIndex(null);
};

 
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
    
    <div
      onClick={() => setActivePage(page)}
      
      className={`px-4 py-1 rounded-lg cursor-pointer text-sm border transition text-nowrap flex items-center
        ${page === activePage
          ? "bg-white border-orange-500 shadow"
          : "bg-gray-200 border-gray-300 hover:bg-gray-200"}`}
    >
      {page}
  
    {activePage === page && (
      <button
        onClick={(e) => {
          e.stopPropagation();
          setContextIndex(contextIndex === index ? null : index);
        }}
        className="text-gray-500 hover:text-black ml-1 "
      >
          <MoreVertical className="w-4 h-4" />

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

    {index < pages.length - 1 && (
      <div className="group relative mx-[1px] flex items-center pointer-events-auto">
  <div className="h-0.5 w-6 border-t border-dotted border-gray-900 group-hover:w-12 transition-all duration-300 ease-in-out"></div>
  <div className="absolute -inset-x-4 -inset-y-2"></div>
  <button
    onClick={() => handleInsertPage(index)}
    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center rounded-full border border-gray-400 text-gray-600 text-[10px] leading-none bg-white opacity-0 group-hover:opacity-100 transition-opacity"
  >
    <Plus className="w-2.5 h-2.5" />
  </button>
</div>
    )}
    
  </div>
  
))}
<div className="flex items-center group transition-all duration-300 ease-in-out">
  <div className="h-0.5 w-6 border-t border-dotted border-gray-900 group-hover:w-12 transition-all"></div>
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

export default Navbar

import React from "react";
import abcproduct from "../assets/abcproduct.png";
import highradiuslogo from "../assets/highradiuslogo.png";
function Header() {
  return (
    <header className="relative flex flex-col">
      <div  className="relative flex items-center bg-header flex-wrap h-22 pt-2">
        <div className="relative flex justify-center mr-[32rem]">
          <img
            src={abcproduct}
            alt="abcproduct"
            className="relative block h-[5rem]"
          />
        </div>
        <img
          src={highradiuslogo}
          alt="hrclogo"
          className="relative block h-[3.5rem]"
        />
      </div>
      <div className="relative flex pl-10 text-white text-3xl font-semibold">
        Invoice List
      </div>
    </header>
  );
}

export default React.memo(Header);

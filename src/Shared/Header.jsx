import React from "react";

const Header = () => {
  return (
    <>
      <button className="mb-6 w-full flex justify-center items-center mt-4 space-x-5  ">
        <img src="logo.png" className="w-16" />
        <h2 className="font-heading font-bold lg:text-6xl text-5xl">Yadoc</h2>
      </button>
    </>
  );
};

export default Header;
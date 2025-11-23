import { useState } from "react";
import { RiSearch2Fill, RiSearch2Line } from "react-icons/ri";
import Button from "../ui/Button";

function Navbar() {
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <>
      <div className="w-full flex items-center justify-between py-4 px-4 md:px-10 gap-2 bg-bodyBg">
        {/* Left */}
        <div className="flex items-center">
          <img src="./logo.svg" className="h-8 mr-5" />
          <div className="hidden md:flex items-center gap-0">
            <Button
              label="Apps"
              className="text-textColor hover:text-mainColor"
            />
            <Button
              label="Sites"
              className="text-textColor hover:text-mainColor"
            />
          </div>
        </div>

        {/* Middle: Search (Desktop only) */}
        <div className="hidden md:flex flex-1 justify-center">
          <label className="w-full max-w-[500px] flex items-center gap-3 bg-cardBg px-4 rounded-full text-textColor">
            <RiSearch2Line className="text-textColor text-xl" />
            <input
              type="text"
              placeholder="Search a project.."
              className="bg-transparent outline-none font-medium h-[48px] text-base w-full text-textColor placeholder-textColorWeak"
            />
          </label>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Mobile Search Icon */}
          <button
            onClick={() => setOpenSearch(true)}
            className="md:hidden text-textColor text-2xl p-2 rounded-full hover:bg-cardBg"
          >
            <RiSearch2Line />
          </button>

          <Button
            special={true}
            label="Submit Project"
            className="text-white hover:text-white px-5 hidden md:block"
          />

          <div className="size-10 md:size-11 rounded-full bg-cardBg border border-linesColor ml-2 overflow-hidden">
            <img
              src="https://pbs.twimg.com/media/GiJV3-jXcAAUXY9.jpg"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* SEARCH MODAL FOR MOBILE */}
      {openSearch && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-start justify-center p-4 max-sm:p-0 z-50">
          <div className="w-full max-w-[500px] max-sm:h-svh max-h-svh overflow-y-auto bg-bodyBg rounded-[30px] max-sm:rounded-none p-4 shadow-lg mt-10 max-sm:mt-0 max-sm:max-w-full flex flex-col">
            <div className="flex items-center gap-3 bg-cardBg px-4 py-3 rounded-full">
              <RiSearch2Line className="text-textColor text-xl" />
              <input
                type="text"
                placeholder="Search a project..."
                className="bg-transparent outline-none font-medium text-base w-full text-textColor placeholder-textColorWeak"
                autoFocus
              />
            </div>

            {/* result */}
            <div className="w-full flex-1 flex flex-col gap-2 py-16 items-center justify-center">
                <RiSearch2Line className="text-textColorWeak text-4xl opacity-25" />
                <p className="text-textColorWeak">Type Something...</p>
            </div>

            <Button
              label="close"
              special={true}
              onClick={() => setOpenSearch(false)}
              className="mt-3 w-full text-white hover:text-white "
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;

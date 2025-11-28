import { useState } from "react";
import { RiAddFill, RiMenu2Fill, RiSearch2Line } from "react-icons/ri";
import Button from "../ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useEffect } from "react";
import { MdArrowOutward } from "react-icons/md";
import { LuLaptopMinimal, LuMoon, LuSunMedium } from "react-icons/lu";
import { useRouter, Link } from "@tanstack/react-router";
import SearchModal from "../../features/Search/components/SearchModal";
import SubmitProjectModal from "../../features/Submit/components/SubmitProjectModal";
import { Logo } from "../../assets";
import ChangelogModal from "../../features/Changelog/components/ChangelogModal";

import SettingsModal from "../../features/Profile/components/SettingsModal";
import SignInModal from "../auth/SignInModal";
import { useAuth } from "../../contexts/AuthContext";

const themes = ["light", "dark", "system"] as const;
type Theme = (typeof themes)[number];

function Navbar() {
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [openSubmitModal, setOpenSubmitModal] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isChangelogOpen, setIsChangelogOpen] = useState(false);
  const [openSignInModal, setOpenSignInModal] = useState(false);

  const { user, logout } = useAuth();

  const router = useRouter();
  const currentPath = router.state.location.pathname; // current URL

  const menuItems = [
    { label: "Apps", to: "/" },
    { label: "Creators", to: "/creators" },
    { label: "Awards", to: "/awards" },
  ];

  const [theme, setTheme] = useState<Theme>("system");

  // Initialize theme from localStorage or system
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme("system");
    }
  }, []);

  const applyTheme = (selectedTheme: Theme) => {
    const root = document.documentElement;
    root.classList.remove("dark");

    if (selectedTheme === "light") {
      root.dataset.theme = "light";
    } else if (selectedTheme === "dark") {
      root.classList.add("dark");
      root.dataset.theme = "dark";
    } else {
      // system preference
      root.dataset.theme = "system";

      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      // Apply system mode immediately
      if (mediaQuery.matches) {
        root.classList.add("dark");
      }

      // Listen for system changes
      const systemChangeListener = (e: MediaQueryListEvent) => {
        if (theme === "system") {
          if (e.matches) root.classList.add("dark");
          else root.classList.remove("dark");
        }
      };

      mediaQuery.addEventListener("change", systemChangeListener);

      // Cleanup function when theme changes or component unmounts
      return () => {
        mediaQuery.removeEventListener("change", systemChangeListener);
      };
    }
  };

  // Apply a specific theme
  const handleThemeChange = (selectedTheme: Theme) => {
    setTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
    applyTheme(selectedTheme);
  };

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setOpenProfile(false);
      }
    }

    if (openProfile) {
      document.addEventListener("mousedown", handleClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [openProfile]);

  return (
    <>
      <SubmitProjectModal
        isOpen={openSubmitModal}
        onClose={() => setOpenSubmitModal(false)}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <ChangelogModal
        isOpen={isChangelogOpen}
        onClose={() => setIsChangelogOpen(false)}
      />

      <SignInModal
        isOpen={openSignInModal}
        onClose={() => setOpenSignInModal(false)}
      />

      <div className="w-full flex items-center justify-between sticky top-0 z-40 py-4 px-4 md:px-10 gap-2 bg-bodyBgWeak backdrop-blur-xl">
        {/* Left */}
        <div className="flex items-center">
          <div className="w-fit flex items-center gap-2.5">
            <button
              className="md:hidden text-textColor text-2xl p-2 rounded-full bg-cardBg"
              onClick={() => setOpenMenu(true)}
            >
              <RiMenu2Fill />
            </button>
            <img src={Logo} className="h-8 mr-5" />
          </div>

          <div id="menu" className="hidden md:flex items-center gap-0">
            {menuItems.map((item) => (
              <Button
                key={item.label}
                label={item.label}
                active={currentPath === item.to}
                to={item.to}
                className="text-textColor hover:text-mainColor"
              />
            ))}
          </div>
        </div>

        {/* Middle search */}
        <div className="hidden md:flex flex-1 justify-center">
          <label
            className="w-full max-w-[500px] flex items-center gap-3 bg-cardBg px-4 rounded-full text-textColor cursor-pointer hover:bg-cardItemBg hover:transition-colors"
            onClick={() => setOpenSearchModal(true)}
          >
            <RiSearch2Line className="text-textColor text-xl" />
            <div className="bg-transparent font-medium h-[48px] flex items-center text-base w-full text-textColorWeak select-none">
              Search...
            </div>
          </label>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpenSearchModal(true)}
            className="md:hidden text-textColor text-2xl p-2 rounded-full bg-cardBg"
          >
            <RiSearch2Line />
          </button>

          <button className="md:hidden text-white bg-mainColor text-2xl p-2 rounded-full ml-2">
            <RiAddFill />
          </button>

          <Button
            special
            label="Submit Project"
            className="text-white hover:text-white px-5 hidden md:block"
            onClick={() => setOpenSubmitModal(true)}
          />

          {/* Conditional Auth/Profile Section */}
          {user ? (
            <div className="relative" ref={profileRef}>
              <div
                className="size-10 md:size-11 rounded-full bg-cardBg shadow-md ml-2 overflow-hidden cursor-pointer"
                onClick={() => setOpenProfile((prev) => !prev)}
              >
                <img
                  src={user.avatar}
                  className="w-full h-full object-cover bg-cardBg"
                />
              </div>

              <AnimatePresence>
                {openProfile && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.17 }}
                    className="absolute right-0 mt-3 max-md:max-h-[70vh] overflow-y-auto w-64 bg-modalBg border border-cardItemBg rounded-2xl shadow-xl z-50"
                  >
                    <div className="flex flex-col p-4">
                      <p className="font-semibold text-textColor">
                        {user.name}
                      </p>
                      <p className="text-sm text-textColorWeak mb-4 mt-0.5 font-medium">
                        {user.email}
                      </p>

                      <Link
                        to="/profile"
                        className="w-full block text-center px-4 py-2 bg-cardItemBg font-semibold rounded-full text-textColor hover:bg-mainColor hover:text-white hover:transition"
                        onClick={() => setOpenProfile(false)}
                      >
                        View profile
                      </Link>
                    </div>
                    <div className="flex flex-col gap- border-t border-b border-cardItemBg px-2 py-2">
                      <div className="text-left py-0.5 text-textColor pl-3 pr-2 font-medium flex items-center justify-between">
                        Theme
                        <div className="w-fit flex items-center justify-center gap-1 bg-cardItemBg p-1 rounded-full">
                          <LuSunMedium
                            onClick={() => handleThemeChange("light")}
                            className={`text-3xl rounded-2xl p-1 cursor-pointer ${theme === "light" ? "bg-mainColor text-white" : "text-textColorWeak"}`}
                          />
                          <LuMoon
                            onClick={() => handleThemeChange("dark")}
                            className={`text-3xl rounded-2xl p-1 cursor-pointer ${theme === "dark" ? "bg-mainColor text-white" : "text-textColorWeak"}`}
                          />
                          <LuLaptopMinimal
                            onClick={() => handleThemeChange("system")}
                            className={`text-3xl rounded-2xl p-1 cursor-pointer ${theme === "system" ? "bg-mainColor text-white" : "text-textColorWeak"}`}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap- border-t border-b border-cardItemBg px-2 py-2">
                      <button
                        onClick={() => {
                          setIsSettingsOpen(true)
                          setOpenProfile(false);
                        }}
                        className="text-left py-1.5 text-textColor hover:bg-cardItemBg px-3 rounded-xl font-medium flex items-center justify-between"
                      >
                        Settings
                      </button>
                      <button
                        onClick={() => {
                          setIsChangelogOpen(true);
                          setOpenProfile(false);
                        }}
                        className="text-left py-1.5 text-textColor hover:bg-cardItemBg px-3 rounded-xl font-medium flex items-center justify-between"
                      >
                        Changelog
                      </button>
                      <Link
                        to="/support"
                        className="text-left py-1.5 text-textColor hover:bg-cardItemBg px-3 rounded-xl font-medium flex items-center justify-between"
                        onClick={() => setOpenProfile(false)}
                      >
                        Support
                        <MdArrowOutward className="text-xl text-textColorWeak" />
                      </Link>
                    </div>
                    <div className="flex flex-col border-cardItemBg px-2 py-2">
                      <button
                        onClick={() => logout()}
                        className="text-left py-1.5 text-red-400 hover:bg-cardItemBg px-3 rounded-xl font-medium flex items-center justify-between"
                      >
                        Log Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Button
              label="Sign In"
              onClick={() => setOpenSignInModal(true)}
              className="text-textColor hover:text-white hover:bg-mainColor ml-2 px-5"
            />
          )}
        </div>
      </div>

      {/* Left Sidebar / Mobile Menu */}
      <AnimatePresence>
        {openMenu && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setOpenMenu(false)}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 left-0 h-full w-full max-w-[260px] z-50 p-0"
            >
              <div className="bg-bodyBg w-full h-full pb-4 pt-2 px-3 flex flex-col shadow-xl">
                <div className="flex items-center justify-between mb-3 pl-1 pb-3 border-b border-linesColor">
                  <img src="./logo.svg" className="h-8" />
                  <button
                    className="text-textColor text-2xl p-2 rounded-full"
                    onClick={() => setOpenMenu(false)}
                  >
                    ✕
                  </button>
                </div>

                <div className="flex flex-col gap-1">
                  {menuItems.map((item) => (
                    <Button
                      key={item.label}
                      label={item.label}
                      active={currentPath === item.to}
                      to={item.to}
                      onClick={() => setOpenMenu(false)}
                      className="text-textColor hover:text-mainColor"
                    />
                  ))}
                  <Button
                    label="Submit Project"
                    special
                    onClick={() => setOpenMenu(false)}
                    className="text-white hover:text-white mt-3"
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <SearchModal
        isOpen={openSearchModal}
        onClose={() => setOpenSearchModal(false)}
      />
    </>
  );
}

export default Navbar;

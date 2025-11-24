import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiCloseLine,
  RiSettings4Line,
  RiBankCardLine,
  RiDatabase2Line,
  RiAppsLine,
  RiNotification3Line,
  RiEqualizerLine,
  RiLogoutBoxRLine,
} from "react-icons/ri";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("general");

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const menuItems = [
    { id: "general", label: "General", icon: RiSettings4Line },
    { id: "billing", label: "Billing", icon: RiBankCardLine },
    { id: "backups", label: "Backups", icon: RiDatabase2Line },
    { id: "integrations", label: "Integrations", icon: RiAppsLine },
    { id: "notifications", label: "Notifications", icon: RiNotification3Line },
    { id: "advanced", label: "Advanced", icon: RiEqualizerLine },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.17 }}
            className="absolute w-full top-0 left-0 inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.17 }}
            className="relative w-full max-w-5xl h-[80vh] bg-modalBg rounded-2xl shadow-2xl overflow-hidden flex border border-linesColor"
          >
            {/* Sidebar */}
            <div className="w-64 bg-cardBg border-r border-linesColor flex flex-col">
              <div className="p-6 flex items-center gap-3 border-b border-linesColor">
                <div className="w-8 h-8 rounded-full bg-cardItemBg overflow-hidden">
                  <img
                    src="https://i.pinimg.com/736x/a9/70/8f/a9708f9840565fc2aae91b5847fcceab.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-semibold text-textColor">
                  Thierry Gusenga
                </span>
              </div>

              <div className="flex-1 p-3 overflow-y-auto">
                <div className="flex flex-col gap-1">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === item.id
                          ? "bg-cardItemBg text-white"
                          : "text-textColorWeak hover:text-textColor hover:bg-bodyBg"
                      }`}
                    >
                      <item.icon className="text-lg" />
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 border-t border-linesColor">
                <button className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors w-full">
                  <RiLogoutBoxRLine className="text-lg" />
                  Sign Out
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col bg-bodyBg">
              {/* Header */}
              <div className="h-16 border-b border-linesColor flex items-center justify-between px-8">
                <h2 className="text-lg font-semibold text-textColor capitalize">
                  {activeTab}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-cardBg rounded-full text-textColorWeak hover:text-textColor transition-colors"
                >
                  <RiCloseLine className="text-xl" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-8">
                {activeTab === "general" && (
                  <div className="max-w-2xl space-y-8">
                    {/* Profile Section */}
                    <div>
                      <h3 className="text-textColor font-medium mb-4">
                        Profile
                      </h3>
                      <div className="flex items-center gap-6 mb-6">
                        <div className="w-20 h-20 rounded-full bg-cardBg border-2 border-linesColor overflow-hidden">
                          <img
                            src="https://i.pinimg.com/736x/a9/70/8f/a9708f9840565fc2aae91b5847fcceab.jpg"
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      <div className="grid gap-6">
                        <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                          <label className="text-textColorWeak text-sm font-medium">
                            Your Name
                          </label>
                          <input
                            type="text"
                            defaultValue="Thierry Gusenga"
                            className="bg-cardBg border border-linesColor rounded-lg px-4 py-2.5 text-textColor outline-none focus:border-mainColor transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="h-px bg-linesColor" />

                    {/* Account Section */}
                    <div>
                      <h3 className="text-textColor font-medium mb-4">
                        Account
                      </h3>
                      <div className="grid gap-4">
                        <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                          <label className="text-textColorWeak text-sm font-medium">
                            Your Email
                          </label>
                          <input
                            type="email"
                            defaultValue="tgusenga2003@gmail.com"
                            className="bg-cardBg border border-linesColor rounded-lg px-4 py-2.5 text-textColor outline-none focus:border-mainColor transition-colors"
                          />
                        </div>

                        <button className="flex items-center justify-between py-2 text-textColor hover:text-mainColor transition-colors group">
                          <span className="text-sm font-medium">
                            Change Password
                          </span>
                          <span className="text-xl">›</span>
                        </button>
                      </div>
                    </div>

                    <div className="h-px bg-linesColor" />

                    {/* Security Section */}
                    <div>
                      <h3 className="text-textColor font-medium mb-4">
                        Security
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-textColorWeak text-sm font-medium">
                            2 Step Verification
                          </span>
                          <div className="w-11 h-6 bg-cardItemBg rounded-full relative cursor-pointer">
                            <div className="w-4 h-4 bg-textColorWeak rounded-full absolute top-1 left-1" />
                          </div>
                        </div>

                        <button className="flex items-center justify-between w-full py-2 text-textColor hover:text-mainColor transition-colors">
                          <span className="text-sm font-medium">
                            Log out of all devices
                          </span>
                          <span className="text-xl">›</span>
                        </button>

                        <button className="flex items-center justify-between w-full py-2 text-red-400 hover:text-red-300 transition-colors">
                          <span className="text-sm font-medium">
                            Delete Account
                          </span>
                          <span className="text-xl">›</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab !== "general" && (
                  <div className="flex items-center justify-center h-full text-textColorWeak">
                    Content for {activeTab}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SettingsModal;

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiCloseLine } from "react-icons/ri";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { Link } from "@tanstack/react-router";

interface SignInModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose }) => {
    const handleGoogleSignIn = () => {
        // TODO: Implement Google OAuth flow
        console.log("Google sign-in clicked");
    };

    const handleGithubSignIn = () => {
        // TODO: Implement GitHub OAuth flow
        console.log("GitHub sign-in clicked");
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md bg-bodyBg rounded-3xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-linesColor">
                            <h2 className="text-2xl font-bold text-textColor">
                                Sign In
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-cardItemBg text-textColor transition-colors"
                            >
                                <RiCloseLine className="text-2xl" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <p className="text-textColorWeak text-center mb-6">
                                Choose your preferred sign-in method
                            </p>

                            {/* Sign-in Buttons */}
                            <div className="flex flex-col gap-3">
                                {/* Google Sign-in */}
                                <button
                                    onClick={handleGoogleSignIn}
                                    className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white hover:bg-gray-50 text-gray-800 rounded-full font-semibold transition-all shadow-md hover:shadow-lg border border-gray-200"
                                >
                                    <FaGoogle className="text-xl text-[#4285F4]" />
                                    <span>Continue with Google</span>
                                </button>

                                {/* GitHub Sign-in */}
                                <button
                                    onClick={handleGithubSignIn}
                                    className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-[#24292e] hover:bg-[#1b1f23] text-white rounded-full font-semibold transition-all shadow-md hover:shadow-lg"
                                >
                                    <FaGithub className="text-xl" />
                                    <span>Continue with GitHub</span>
                                </button>
                            </div>

                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-linesColor"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-bodyBg text-textColorWeak">
                                        By signing in, you agree to our
                                    </span>
                                </div>
                            </div>

                            {/* Legal Links */}
                            <div className="flex items-center justify-center gap-2 text-sm">
                                <Link
                                    to="/user-agreement"
                                    onClick={onClose}
                                    className="text-mainColor hover:text-mainColorHover font-medium transition-colors"
                                >
                                    User Agreement
                                </Link>
                                <span className="text-textColorWeak">and</span>
                                <Link
                                    to="/privacy-policy"
                                    onClick={onClose}
                                    className="text-mainColor hover:text-mainColorHover font-medium transition-colors"
                                >
                                    Privacy Policy
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default SignInModal;

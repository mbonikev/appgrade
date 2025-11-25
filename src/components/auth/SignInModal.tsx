import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiCloseLine, RiArrowLeftLine } from "react-icons/ri";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

interface SignInModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type ViewState = "signin" | "user-agreement" | "privacy-policy";

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose }) => {
    const [currentView, setCurrentView] = useState<ViewState>("signin");

    const handleGoogleSignIn = () => {
        // TODO: Implement Google OAuth flow
        console.log("Google sign-in clicked");
    };

    const handleGithubSignIn = () => {
        // TODO: Implement GitHub OAuth flow
        console.log("GitHub sign-in clicked");
    };

    const handleClose = () => {
        onClose();
        // Reset to signin view after modal closes
        setTimeout(() => setCurrentView("signin"), 300);
    };

    const handleBack = () => {
        setCurrentView("signin");
    };

    const renderSignInView = () => (
        <>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-linesColor">
                <h2 className="text-2xl font-bold text-textColor">Sign In</h2>
                <button
                    onClick={handleClose}
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
                        <FcGoogle className="text-2xl text-[#4285F4]" />
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
                    <button
                        onClick={() => setCurrentView("user-agreement")}
                        className="text-mainColor hover:text-mainColorHover font-medium transition-colors"
                    >
                        User Agreement
                    </button>
                    <span className="text-textColorWeak">and</span>
                    <button
                        onClick={() => setCurrentView("privacy-policy")}
                        className="text-mainColor hover:text-mainColorHover font-medium transition-colors"
                    >
                        Privacy Policy
                    </button>
                </div>
            </div>
        </>
    );

    const renderUserAgreement = () => (
        <>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-linesColor">
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleBack}
                        className="p-1 rounded-full hover:bg-cardItemBg text-textColor transition-colors"
                    >
                        <RiArrowLeftLine className="text-xl" />
                    </button>
                    <h2 className="text-xl font-bold text-textColor">User Agreement</h2>
                </div>
                <button
                    onClick={handleClose}
                    className="p-2 rounded-full hover:bg-cardItemBg text-textColor transition-colors"
                >
                    <RiCloseLine className="text-2xl" />
                </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
                <p className="text-textColorWeak text-sm mb-6">
                    Last updated: {new Date().toLocaleDateString()}
                </p>

                <section className="mb-6">
                    <h3 className="text-lg font-semibold text-textColor mb-3">
                        1. Acceptance of Terms
                    </h3>
                    <p className="text-textColorWeak text-sm leading-relaxed">
                        By accessing and using Appgrade, you accept and agree to be bound by the terms
                        and provision of this agreement. If you do not agree to abide by the above,
                        please do not use this service.
                    </p>
                </section>

                <section className="mb-6">
                    <h3 className="text-lg font-semibold text-textColor mb-3">
                        2. Use License
                    </h3>
                    <p className="text-textColorWeak text-sm leading-relaxed mb-3">
                        Permission is granted to temporarily access the materials (information or software)
                        on Appgrade for personal, non-commercial transitory viewing only.
                    </p>
                    <p className="text-textColorWeak text-sm leading-relaxed mb-2">
                        This is the grant of a license, not a transfer of title, and under this license
                        you may not:
                    </p>
                    <ul className="list-disc list-inside text-textColorWeak text-sm ml-4 space-y-1">
                        <li>Modify or copy the materials</li>
                        <li>Use the materials for any commercial purpose</li>
                        <li>Attempt to decompile or reverse engineer any software</li>
                        <li>Remove any copyright or other proprietary notations</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h3 className="text-lg font-semibold text-textColor mb-3">
                        3. User Accounts
                    </h3>
                    <p className="text-textColorWeak text-sm leading-relaxed">
                        When you create an account with us, you must provide accurate, complete, and
                        current information. Failure to do so constitutes a breach of the Terms, which
                        may result in immediate termination of your account.
                    </p>
                </section>

                <section className="mb-6">
                    <h3 className="text-lg font-semibold text-textColor mb-3">
                        4. Content Submission
                    </h3>
                    <p className="text-textColorWeak text-sm leading-relaxed">
                        By submitting content to Appgrade, you grant us a worldwide, non-exclusive,
                        royalty-free license to use, reproduce, modify, and display such content in
                        connection with the service.
                    </p>
                </section>

                <section className="mb-6">
                    <h3 className="text-lg font-semibold text-textColor mb-3">
                        5. Disclaimer
                    </h3>
                    <p className="text-textColorWeak text-sm leading-relaxed">
                        The materials on Appgrade are provided on an 'as is' basis. Appgrade makes no
                        warranties, expressed or implied, and hereby disclaims and negates all other
                        warranties including, without limitation, implied warranties or conditions of
                        merchantability, fitness for a particular purpose, or non-infringement of
                        intellectual property or other violation of rights.
                    </p>
                </section>

                <section className="mb-6">
                    <h3 className="text-lg font-semibold text-textColor mb-3">
                        6. Contact Information
                    </h3>
                    <p className="text-textColorWeak text-sm leading-relaxed">
                        If you have any questions about this User Agreement, please contact us at{" "}
                        <a href="mailto:support@appgrade.com" className="text-mainColor hover:text-mainColorHover">
                            support@appgrade.com
                        </a>
                    </p>
                </section>
            </div>
        </>
    );

    const renderPrivacyPolicy = () => (
        <>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-linesColor">
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleBack}
                        className="p-1 rounded-full hover:bg-cardItemBg text-textColor transition-colors"
                    >
                        <RiArrowLeftLine className="text-xl" />
                    </button>
                    <h2 className="text-xl font-bold text-textColor">Privacy Policy</h2>
                </div>
                <button
                    onClick={handleClose}
                    className="p-2 rounded-full hover:bg-cardItemBg text-textColor transition-colors"
                >
                    <RiCloseLine className="text-2xl" />
                </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
                <p className="text-textColorWeak text-sm mb-6">
                    Last updated: {new Date().toLocaleDateString()}
                </p>

                <section className="mb-6">
                    <h3 className="text-lg font-semibold text-textColor mb-3">
                        1. Information We Collect
                    </h3>
                    <p className="text-textColorWeak text-sm leading-relaxed mb-2">
                        We collect information that you provide directly to us, including:
                    </p>
                    <ul className="list-disc list-inside text-textColorWeak text-sm ml-4 space-y-1">
                        <li>Account information (name, email address, profile picture)</li>
                        <li>Content you submit (projects, comments, reviews)</li>
                        <li>Communication preferences</li>
                        <li>Any other information you choose to provide</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h3 className="text-lg font-semibold text-textColor mb-3">
                        2. How We Use Your Information
                    </h3>
                    <p className="text-textColorWeak text-sm leading-relaxed mb-2">
                        We use the information we collect to:
                    </p>
                    <ul className="list-disc list-inside text-textColorWeak text-sm ml-4 space-y-1">
                        <li>Provide, maintain, and improve our services</li>
                        <li>Process and complete transactions</li>
                        <li>Send you technical notices and support messages</li>
                        <li>Respond to your comments and questions</li>
                        <li>Monitor and analyze trends, usage, and activities</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h3 className="text-lg font-semibold text-textColor mb-3">
                        3. Third-Party Authentication
                    </h3>
                    <p className="text-textColorWeak text-sm leading-relaxed">
                        When you sign in using third-party services (Google, GitHub), we receive basic
                        profile information from these services. This information is used solely for
                        authentication purposes and to create your account.
                    </p>
                </section>

                <section className="mb-6">
                    <h3 className="text-lg font-semibold text-textColor mb-3">
                        4. Data Security
                    </h3>
                    <p className="text-textColorWeak text-sm leading-relaxed">
                        We take reasonable measures to help protect your personal information from loss,
                        theft, misuse, unauthorized access, disclosure, alteration, and destruction.
                        However, no internet or email transmission is ever fully secure or error-free.
                    </p>
                </section>

                <section className="mb-6">
                    <h3 className="text-lg font-semibold text-textColor mb-3">
                        5. Your Rights
                    </h3>
                    <p className="text-textColorWeak text-sm leading-relaxed mb-2">
                        You have the right to:
                    </p>
                    <ul className="list-disc list-inside text-textColorWeak text-sm ml-4 space-y-1">
                        <li>Access and receive a copy of your personal data</li>
                        <li>Rectify inaccurate personal data</li>
                        <li>Request deletion of your personal data</li>
                        <li>Object to processing of your personal data</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h3 className="text-lg font-semibold text-textColor mb-3">
                        6. Contact Us
                    </h3>
                    <p className="text-textColorWeak text-sm leading-relaxed">
                        If you have any questions about this Privacy Policy, please contact us at{" "}
                        <a href="mailto:privacy@appgrade.com" className="text-mainColor hover:text-mainColorHover">
                            privacy@appgrade.com
                        </a>
                    </p>
                </section>
            </div>
        </>
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        // onClick={handleClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md bg-bodyBg rounded-3xl shadow-2xl overflow-hidden"
                    >
                        {currentView === "signin" && renderSignInView()}
                        {currentView === "user-agreement" && renderUserAgreement()}
                        {currentView === "privacy-policy" && renderPrivacyPolicy()}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default SignInModal;

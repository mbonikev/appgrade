import React from 'react';
import { Link } from '@tanstack/react-router';
import { RiHome4Line, RiArrowLeftLine } from 'react-icons/ri';
import { motion } from 'framer-motion';
import Navbar from '../../../components/layout/Navbar';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-primaryBg">
            <Navbar />
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
                <div className="max-w-2xl w-full text-center">
                    {/* Animated 404 */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="relative mb-8"
                    >
                        <motion.div
                            animate={{
                                y: [0, -20, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="text-[180px] md:text-[240px] font-bold leading-none"
                        >
                            <span className="bg-gradient-to-br from-blue-500 via-blue-500 to-blue-500 bg-clip-text text-transparent">
                                404
                            </span>
                        </motion.div>

                        {/* Floating particles */}
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-500 rounded-full"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                }}
                                animate={{
                                    y: [0, -30, 0],
                                    opacity: [0.2, 1, 0.2],
                                    scale: [1, 1.5, 1],
                                }}
                                transition={{
                                    duration: 2 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 2,
                                }}
                            />
                        ))}
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <h1 className="text-3xl md:text-4xl font-bold text-textColor mb-4">
                            Page Not Found
                        </h1>
                        <p className="text-textColor/60 text-lg mb-12 max-w-md mx-auto">
                            Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => window.history.back()}
                                className="flex items-center gap-2 px-8 py-3 rounded-full border border-linesColor text-textColor hover:bg-cardBg transition-colors font-medium w-full sm:w-auto"
                            >
                                <RiArrowLeftLine className="text-xl" />
                                Go Back
                            </motion.button>

                            <Link to="/">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-shadow w-full sm:w-auto"
                                >
                                    <RiHome4Line className="text-xl" />
                                    Back to Home
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
import { Link } from '@tanstack/react-router';
import { RiHome4Line, RiArrowLeftLine } from 'react-icons/ri';
import { motion } from 'framer-motion';
import Navbar from '../../../components/layout/Navbar';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-primaryBg relative overflow-hidden">
            {/* Background GIF */}
            <div
                className="absolute inset-0 z-0 opacity-30 blur-sm"
                style={{
                    backgroundImage: 'url(/lost.gif)',
                    backgroundSize: '30%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            />

            {/* Overlay gradient to ensure text readability */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-primaryBg/80 via-primaryBg/90 to-primaryBg" />

            <div className="relative z-10">
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
                                className="text-[180px] md:text-[240px] font-bold leading-none drop-shadow-2xl"
                            >
                                <span className="bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600 bg-clip-text text-transparent">
                                    404
                                </span>
                            </motion.div>

                            {/* Floating particles */}
                            {[...Array(8)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
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
                            className="p-8 rounded-3xl "
                        >
                            <h1 className="text-3xl md:text-4xl font-bold text-textColor mb-4">
                                Page Not Found
                            </h1>
                            <p className="text-textColor/80 text-lg mb-12 max-w-md mx-auto font-medium">
                                Oops! Looks like you're as lost as John here. The page you are looking for might have been removed or is temporarily unavailable.
                            </p>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => window.history.back()}
                                    className="flex items-center gap-2 px-8 py-3 rounded-full border border-linesColor bg-cardBg/50 backdrop-blur-md text-textColor hover:bg-cardBg transition-all font-medium w-full sm:w-auto shadow-lg"
                                >
                                    <RiArrowLeftLine className="text-xl" />
                                    Go Back
                                </motion.button>

                                <Link to="/">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all w-full sm:w-auto shadow-lg"
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
        </div>
    );
};

export default NotFoundPage;
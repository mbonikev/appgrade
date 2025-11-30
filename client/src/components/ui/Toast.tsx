import React from 'react';
import { motion } from 'framer-motion';
import { HiCheckCircle, HiExclamationCircle, HiInformationCircle, HiX } from 'react-icons/hi';
import type { ToastType } from '../../contexts/ToastContext';

interface ToastProps {
    message: string;
    type: ToastType;
    action?: {
        label: string;
        onClick: () => void;
    };
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, action, onClose }) => {
    const icons = {
        success: <HiCheckCircle className="text-green-500 text-xl" />,
        error: <HiExclamationCircle className="text-red-500 text-xl" />,
        info: <HiInformationCircle className="text-blue-500 text-xl" />,
    };

    const bgColors = {
        success: 'bg-cardBg border-green-500/20',
        error: 'bg-cardBg border-red-500/20',
        info: 'bg-cardBg border-blue-500/20',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            layout
            className={`pointer-events-auto min-w-[300px] max-w-md p-4 rounded-xl shadow-xl border ${bgColors[type]} flex items-start gap-3 backdrop-blur-md`}
        >
            <div className="mt-0.5">{icons[type]}</div>
            <div className="flex-1">
                <p className="text-textColor font-medium text-sm">{message}</p>
                {action && (
                    <button
                        onClick={action.onClick}
                        className="mt-2 text-xs font-bold text-mainColor hover:underline"
                    >
                        {action.label}
                    </button>
                )}
            </div>
            <button
                onClick={onClose}
                className="text-textColorWeak hover:text-textColor transition-colors"
            >
                <HiX className="text-lg" />
            </button>
        </motion.div>
    );
};

export default Toast;

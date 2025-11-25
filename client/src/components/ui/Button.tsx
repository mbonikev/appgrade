import { Link } from "@tanstack/react-router";
import React from "react";

interface ButtonProps {
  to?: string;
  label: string;
  special?: boolean;
  large?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
  active?: boolean;
}

function Button({
  to,
  label,
  special = false,
  large = false,
  onClick,
  active,
  icon,
  className = "",
}: ButtonProps) {
  const content = (
    <button
      onClick={onClick}
      className={`w-fit group min-w-[46px] font-semibold rounded-full relative ${
        large ? "h-[60px] px-8 text-xl" : "h-[44px] px-4"
      } ${
        special
          ? "text-bodyBg hover:text-bodyBg"
          : "text-textColorWeak hover:text-textColor"
      }
      ${active && "persist_link"}
      ${className}`}
    >
      {/* hidden text for spacing */}
      <div className="z-20 opacity-0 pointer-events-none select-none">
        {label}
      </div>

      {/* visible text */}
      <div className="w-full h-full absolute top-0 whitespace-nowrap left-0 bg-transparent z-20 flex items-center justify-center gap-2">
        {icon}
        {label}
      </div>

      {/* animated background using your palette */}
      <div
        className={`w-full h-full absolute top-0 left-0 z-10 rounded-full transition-all
          ${
            special
              ? "bg-mainColor "
              : "bg-cardBg scale-0 group-hover:scale-100"
          }
        `}
      />
    </button>
  );

  return to ? <Link to={to}>{content}</Link> : content;
}

export default Button;

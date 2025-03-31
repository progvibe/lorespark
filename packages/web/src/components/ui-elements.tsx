import type React from "react";

export const OrnateFrame: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Top left corner */}
      <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#3a5a82] opacity-80"></div>

      {/* Top right corner */}
      <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#3a5a82] opacity-80"></div>

      {/* Bottom left corner */}
      <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#3a5a82] opacity-80"></div>

      {/* Bottom right corner */}
      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#3a5a82] opacity-80"></div>

      {/* Main border */}
      <div className="border-2 border-[#1a3853] bg-[#030a13] p-4 relative">
        {/* Inner glow */}
        <div className="absolute inset-0 box-border border-2 border-[#0a1c2e] opacity-50"></div>

        {/* Inner shadow */}
        <div
          className="absolute inset-0"
          style={{ boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.8)" }}
        ></div>

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
};

export const OrnateButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}> = ({ children, onClick, className = "", disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative group ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${className}`}
    >
      {/* Button background with border */}
      <div className="relative border-2 border-[#3a5a82] bg-[#030a13] px-6 py-2 transition-all duration-200 group-hover:bg-[#0a1c2e]">
        {/* Corner decorations */}
        <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-[#ffc866]"></div>
        <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-[#ffc866]"></div>
        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-[#ffc866]"></div>
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-[#ffc866]"></div>

        {/* Inner glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-200"
          style={{ boxShadow: "inset 0 0 15px rgba(255, 200, 102, 0.5)" }}
        ></div>

        {/* Button text */}
        <div
          className="relative z-10 text-[#ffc866] font-bold text-center"
          style={{ textShadow: "0 0 5px rgba(255, 200, 102, 0.5)" }}
        >
          {children}
        </div>
      </div>
    </button>
  );
};

export const OrnateCard: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}> = ({ children, onClick, className = "" }) => {
  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer group ${className}`}
    >
      {/* Card background with border */}
      <div className="relative border-2 border-[#1a3853] bg-[#030a13] transition-all duration-200 group-hover:bg-[#0a1c2e]">
        {/* Corner decorations */}
        <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-[#3a5a82]"></div>
        <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-[#3a5a82]"></div>
        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-[#3a5a82]"></div>
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-[#3a5a82]"></div>

        {/* Inner shadow */}
        <div
          className="absolute inset-0"
          style={{ boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.8)" }}
        ></div>

        {/* Content */}
        <div className="relative z-10 p-4">{children}</div>
      </div>
    </div>
  );
};

export const OrnateInput: React.FC<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
}> = ({ value, onChange, placeholder, className = "" }) => {
  return (
    <div className="relative">
      {/* Border with corner decorations */}
      <div className="relative border-2 border-[#1a3853] bg-[#030a13]">
        {/* Corner decorations */}
        <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-[#3a5a82]"></div>
        <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-[#3a5a82]"></div>
        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-[#3a5a82]"></div>
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-[#3a5a82]"></div>

        {/* Inner shadow */}
        <div
          className="absolute inset-0"
          style={{ boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.8)" }}
        ></div>

        {/* Textarea */}
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full bg-transparent border-none text-[#4cc1e6] placeholder:text-[#4cc1e6]/50 p-4 resize-none focus:outline-none focus:ring-0 ${className}`}
          style={{ minHeight: "120px" }}
        />
      </div>
    </div>
  );
};

import React, { CSSProperties } from "react";
import "@/app/styles/theme.css";

type ButtonProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  style?: CSSProperties;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
};

export default function Button({ onClick, disabled, style, children, type = "button" }: ButtonProps) {
  return (
<button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        marginTop: 12,
        padding: "10px 14px",
        borderRadius: 10,

        /* theme-aligned */
        border: "1px solid var(--border)",
        background: disabled ? "var(--panel)" : "var(--primary)",
        color: disabled ? "var(--muted)" : "var(--primaryText)",

        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.7 : 1,
        transition: "background 0.15s ease",

        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.background = "var(--primaryHover)";
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.background = "var(--primary)";
        }
      }}
    >
      {children}
    </button>
  );
}



// import React, { CSSProperties } from 'react'
// import { useAnalyzer } from '@/app/hooks/analyzer';

// type Props = {
//     analyzeStyles: CSSProperties;
//     typeAnalyze?: boolean;
// }

// export default function Button(props: Props){
//     const { message, analyze, loading } = useAnalyzer();

//     function handleClick() {
//         if (props.typeAnalyze && props.analyzeStyles) {
//             analyze();
//         }
//     }

//     function useStyles() {
//         if(props.typeAnalyze && props.analyzeStyles){
//             return {
//                 ...props.analyzeStyles,
//             }
//         }
//         return {};
//     }

//   return (
//     <div>
//     <button
//         onClick={handleClick}
//         disabled={loading || message.trim().length === 0}
//         style={useStyles()}
//       >
//         {loading ? "Analyzing..." : "Analyze"}
//       </button>

//     </div>
//   )
// }
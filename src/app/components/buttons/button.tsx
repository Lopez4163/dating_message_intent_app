import React, { CSSProperties } from "react";

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
        border: "1px solid #333",
        cursor: disabled ? "not-allowed" : "pointer",
        ...style,
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
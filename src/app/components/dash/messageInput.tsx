import React from 'react'
import "@/app/styles/theme.css";


type Props = {
    message: string;
    setMessage: (message: string) => void;
}

export default function messageInput(props: Props){
    
  return (
    <div>
    <h1 style={{ fontSize: 28, fontWeight: 700 }}>Message Intent Analyzer</h1>
    <p style={{ opacity: 0.8 }}>
      Paste a message → Gemini classifies intent with confidence + evidence.
    </p>

    <textarea
      value={props.message}
      onChange={(e) => props.setMessage(e.target.value)}
      placeholder="Paste a message here..."
      rows={6}
      style={{
        width: "100%",
        marginTop: 12,
        padding: 12,
        borderRadius: 10,
        border: "1px solid #333",
        background: "var(--bg)",
        color: "black",
      }}
    />

    </div>
  )
}


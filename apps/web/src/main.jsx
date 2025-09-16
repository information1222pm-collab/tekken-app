import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// show runtime errors on screen so we never see a blank page
window.onerror = (msg, src, line, col, err) => {
  const pre = document.createElement('pre');
  pre.style.cssText = 'white-space:pre-wrap;padding:12px;background:#100;color:#f66;font-family:monospace;margin:0';
  pre.textContent = `Runtime error:\n${msg}\n${src}:${line}:${col}\n${err?.stack||''}`;
  document.body.prepend(pre);
};

createRoot(document.getElementById("root")).render(
  <React.StrictMode><App /></React.StrictMode>
);

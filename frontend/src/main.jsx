import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import InterLatin from "./assets/fonts/inter-latin-variable-wghtOnly-normal.40c45725.woff2"

const style = document.createElement("style");
style.innerHTML = `
@font-face {
  font-family: "Inter";
  src: url(${InterLatin}) format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
`;
document.head.appendChild(style);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

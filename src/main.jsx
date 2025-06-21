import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import database from "../Database/Firebase.config.js"
import { ThemeProvider } from './Context/ThemeContext.jsx'
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      
        <App />
      
    </ThemeProvider>
  </StrictMode>
);

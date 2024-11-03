import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Bro} from "react-router-dom";

import App from "./App.jsx";
import { StrictMode } from "react";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Bro>
      <App />
    </Bro>
  </StrictMode>
);

import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "@/contexts/auth-context";
import { ThemeProvider } from "next-themes";
import { TabProvider } from "./contexts/tab-context";
import { CartProvider } from "./contexts/cart-context";
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <Router> {/* Wrap here */}
      <AuthProvider>
        <CartProvider>
          <TabProvider>
            <App />
          </TabProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  </ThemeProvider>
);

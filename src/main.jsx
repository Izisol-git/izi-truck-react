import { StrictMode, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./App/store.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./i18n";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

function Root() {
    const [mode, setMode] = useState(
        localStorage.getItem("dark") === "true" ? "dark" : "light"
    );


    // ⬇️ Tailwind dark mode o‘zgarsa, MUI ham yangilanishi uchun kuzatamiz
    useEffect(() => {
        if(!localStorage.getItem("refreshValue")) {
            localStorage.setItem("refreshValue", 300000);
        }

        const observer = new MutationObserver(() => {
            const isDark = document.documentElement.classList.contains("dark");
            setMode(isDark ? "dark" : "light");
            localStorage.setItem("dark", isDark ? "true" : "false");
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);

    // MUI theme yaratamiz
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    primary: { main: "#1976d2" },
                    secondary: { main: "#9c27b0" },
                    ...(mode === "dark" && {
                        background: {
                            default: "#212121",
                            paper: "#303030",
                        },
                    }),
                },
                components: {
                    MuiButton: {
                        styleOverrides: {
                            root: { fontWeight: 500 },
                        },
                    },
                },
            }),
        [mode]
    );

    return (
        <StrictMode>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <App />
                </ThemeProvider>
            </Provider>
        </StrictMode>
    );
}

createRoot(document.getElementById("root")).render(<Root />);

import {StrictMode, useEffect, useState} from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./App/store.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./i18n";

// MUI importlari
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

function Root() {
    const [mode, setMode] = useState(
        localStorage.getItem("dark") === 'true' ? "dark" : "light"
    );

    useEffect(() => {
        setMode(localStorage.getItem("dark") === 'true' ? "dark" : "light");
    }, [localStorage.getItem("dark")]);

    const theme = createTheme({
        palette: {
            mode,
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
                    root: {
                        fontWeight: 500,
                    },
                },
            },
        },
    });

    return (
        <StrictMode>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <App mode={mode} setMode={setMode} />
                </ThemeProvider>
            </Provider>
        </StrictMode>
    );
}

createRoot(document.getElementById("root")).render(<Root />);

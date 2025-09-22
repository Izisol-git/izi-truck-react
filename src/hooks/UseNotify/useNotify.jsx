import { useSnackbar } from "notistack";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function useNotify() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const showMessage = (message, variant = "success") => {
        enqueueSnackbar(message, {
            variant,
            action: (snackbarId) => (
                <IconButton
                    size="small"
                    color="inherit"
                    onClick={() => closeSnackbar(snackbarId)}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            ),
        });
    };

    return { showMessage };
}

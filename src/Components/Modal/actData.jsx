import * as React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Slide,
} from "@mui/material";
import { MyCalendar } from "../index.js";
import {useDispatch, useSelector} from "react-redux";
import {actDataAdd} from "../../features/orders/ordersThunks.js";
import {useEffect} from "react";

// Tepadan chiqadigan animatsiya
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const ActData = ({ setOpen, open, form, setForm , id }) => {
    const handleChange = (date) => {
        setForm({act_date: date} );
    };

    const dispatch = useDispatch();
    const {actLoading} = useSelector((state) => state.orders);


    useEffect(() => {
        setForm({act_date : ''})
    } , [open])


    const ActDataSend = async () => {

        try {
           const res =  await dispatch(actDataAdd({ id: id, act_date: form })).unwrap();

            setOpen(false);   // ✅ faqat success bo‘lganda
        } catch (err) {
            console.log("Xatolik:", err);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            TransitionComponent={Transition}
            keepMounted
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: {
                    position: "absolute",
                    top: 20,
                    m: 0,
                    borderRadius: 2,
                    boxShadow: 6,
                    bgcolor: "#fff",
                },
            }}
        >
            <DialogTitle
                sx={{
                    bgcolor: "#fff",
                    color: "#1D2D5B",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                }}
            >
                Yangi ma’lumot kiriting
            </DialogTitle>

            <DialogContent
                dividers
                sx={{
                    bgcolor: "#f9f9f9",
                    p: 3,
                }}
            >
                <MyCalendar value={form?.act_date || ""} onChange={handleChange}  />
            </DialogContent>

            <DialogActions
                sx={{
                    bgcolor: "#f1f1f1",
                    p: 2,
                }}
            >
                <Button onClick={() => setOpen(false)} variant="outlined" sx={{ borderColor: "#1D2D5B", color: "#1D2D5B" }}>
                    Bekor qilish
                </Button>
                <Button
                    onClick={()=>{
                        ActDataSend()
                    }}
                    variant="contained"
                    sx={{
                        bgcolor: "#1D2D5B",
                        "&:hover": { bgcolor: "#162347" },
                    }}
                >
                    {
                        actLoading ? "Saqlanmoqda..." : "Saqlash"
                    }
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ActData;

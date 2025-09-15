import React, { useState, useEffect } from "react";
import {
    Box,

    Dialog,
    DialogTitle,
    DialogContent,
    TextField
} from "@mui/material";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {Button} from "../index.js";
import {useTranslation} from "react-i18next";

// Default marker icon fix for Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png"
});

// 📍 Xarita ustiga bosganda markerni qo‘yadigan komponent
function LocationPicker({ position, setPosition }) {
    useMapEvents({
        click(e) {
            if (e?.latlng ) {
                setPosition([e.latlng?.lat || "", e.latlng?.lng || ""]);
            }
        }
    });
    return position ? <Marker position={position} /> : null;
}

const LocationInput = ({ label, value, onChange }) => {
    const [open, setOpen] = useState(false);
    const {t} = useTranslation();

    // 📍 Boshlang‘ich qiymat: Toshkent
    const [position, setPosition] = useState([41.3111, 69.2797]);

    // Agar tashqi `value` o‘zgarsa, ichki state ham yangilansin
    useEffect(() => {
        if (typeof value === 'string') {
            setPosition(value.split(",").map(num => parseFloat(num.trim())));
        }
    }, [value]);

    const handlePositionChange = (pos) => {
        setPosition(pos);
        if (onChange) onChange(pos);
    };

    return (
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <TextField
                label={label}
                value={position ? `${position[0]}, ${position[1]}` : ""}
                fullWidth
                size="small"
                InputProps={{
                    readOnly: true,
                    sx: { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
                }}
                sx={{
                    ".dark &": {
                        "& .MuiInputBase-root": {
                            backgroundColor: "#444444",
                            color: "white",
                        },
                        "& label": {
                            color: "#9CA3AF",
                        },
                        "& label.Mui-focused": {
                            color: "white",
                        },
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                borderColor: "#666666",
                            },
                            "&:hover fieldset": {
                                borderColor: "#888888",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "white",
                            },
                        },
                    },
                }}
            />

            <Button
                width={'w-max'}
                variant="contained"
                rounded={'rounded-r'}
                onClick={() => setOpen(true)}
                value={t('ordersTranslation.map')}
                color={'dark:bg-btnBgDark'}
            />



            <Dialog  open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle sx={{
                    '.dark &':{
                        backgroundColor: '#444444',
                        color: 'white'
                    }
                }} >Lokatsiyani tanlang</DialogTitle>
                <DialogContent sx={{
                    '.dark &':{
                        backgroundColor: '#444444'
                    }
                }}>
                    <MapContainer
                        center={position}
                        zoom={12}
                        style={{ height: "400px", width: "100%" }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={position} /> {/* 🔹 Default marker */}
                        <LocationPicker position={position} setPosition={handlePositionChange} />
                    </MapContainer>

                    <Box textAlign="right" mt={2}>
                        <Button
                            color={'dark:bg-btnBgDark'}
                            width={'w-max'}
                            variant="contained"
                            onClick={() => setOpen(false)}
                            value={t('ordersTranslation.close')}
                        />

                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default LocationInput;

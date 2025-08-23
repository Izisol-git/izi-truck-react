import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField
} from "@mui/material";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

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

function LocationPicker({ position, setPosition }) {
    useMapEvents({
        click(e) {
            setPosition([e.latlng.lat, e.latlng.lng]);
        }
    });
    return position ? <Marker position={position} /> : null;
}

const LocationInput = ({ label, value, onChange }) => {
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState(null);

    // Agar tashqi `value` o‘zgarsa, ichki state ham yangilansin
    useEffect(() => {
        console.log(typeof value)
        if (value && Array.isArray(value)) {
            setPosition(value);
            console.log(value)
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
                    sx: { borderTopRightRadius: 0, borderBottomRightRadius: 0 }
                }}
            />
            <Button
                variant="contained"
                sx={{
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    height: "40px",
                    background: "#1D2D5B"
                }}
                onClick={() => setOpen(true)}
            >
                Xarita
            </Button>

            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>Lokatsiyani tanlang</DialogTitle>
                <DialogContent>
                    <MapContainer
                        key={position ? position.join(",") : "default"} // Har safar position o‘zgarsa map qayta render bo‘ladi
                        center={position && Array.isArray(position) ? position : [41.3111, 69.2797]}
                        zoom={12}
                        style={{ height: "400px", width: "100%" }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {position && <Marker position={position} />} {/* 🔹 Marker faqat position bo‘lsa */}
                        <LocationPicker position={position} setPosition={handlePositionChange} />
                    </MapContainer>

                    <Box textAlign="right" mt={2}>
                        <Button
                            onClick={() => setOpen(false)}
                            variant="contained"
                            sx={{ background: "#1D2D5B" }}
                        >
                            Yopish
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default LocationInput;

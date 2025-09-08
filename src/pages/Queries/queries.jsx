import React from "react";
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Box,
    Chip,
    Divider,
} from "@mui/material";
import {
    AccessTime,
    Warning,
    CheckCircle,
    Cancel,
    LocalShipping,
} from "@mui/icons-material";
import {PaginationFooter, QueriesCard} from "../../Components/index.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


function Queries() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const defaultTransaction = {
        id: 1,
        route1: "Москва",
        route2: "Санкт-Петербург",
        notifications: 3,
        cargo: "Строительные материалы",
        paymentType: "Безналичный расчет",
        clientPrice: "120 000 ₽",
        carrierPrice: "100 000 ₽",
        validUntil: "10.09.2025",
        sales: "Иван Петров",
        operation: "ООО Логистика",
        status: "proposed", // "proposed" | "cancelled" | "pending"
        timeAgo: "2 часа назад",
        cancelReason: "", // Agar status "cancelled" bo‘lsa, masalan: "Клиент передумал"
    }

    return (
        <div className="bg-bacWhite dark:bg-darkBg min-h-[calc(100dvh-70px)]">
            <div className="w-[90%] mx-auto py-5">
                <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4'}>
                    <QueriesCard transaction={defaultTransaction}/>
                    <QueriesCard transaction={defaultTransaction}/>
                    <QueriesCard transaction={defaultTransaction}/>
                    <QueriesCard transaction={defaultTransaction}/>
                </div>
            </div>

            <div className="flex items-center justify-end w-[90%] mx-auto pb-5">
                <PaginationFooter />
            </div>
        </div>
    );
}

export default Queries;

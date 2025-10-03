import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    Chip,
    Box,
    Stack,
    Divider,
    Avatar,
    alpha, Button, Grid,
} from "@mui/material";
import {
    Person,
    LocalShipping,
    Payment,
    Scale,
    AccessTime,
    PriceChangeOutlined,
    RouteOutlined,
} from "@mui/icons-material";
import dayjs from "../../utils/dayjs.js";
import {useNavigate} from "react-router-dom";
import {
    AddQueriesId,
    openQueriesShow
} from "../../features/EmployeSModalToggle/employesModalToggle.js";
import {useDispatch} from "react-redux";
import React from "react";
import {useTranslation} from "react-i18next";
import {AddQueries} from "../../features/Queries/queriesSlice.js";
import PauseIcon from "@mui/icons-material/Pause";

export default function QueriesCard({transaction}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {t} = useTranslation();

    const {i18n} = useTranslation();


    dayjs.locale(i18n.language)


    const getPaymentMethodLabel = (method) => {
        const methods = {cash: "Перечисления", enumeration: "Нақд", combined: "Ярим перечисления",};
        return methods[method] || "-";
    };
    // const getPaymentMethodLabel = (method) => {
    //     const methods = {
    //         cash: t("queriesTranslation.queriesCard.payment_cash"),
    //         enumeration: t("queriesTranslation.queriesCard.payment_enumeration"),
    //         combined: t("queriesTranslation.queriesCard.payment_combined"),
    //     };
    //     return methods[method] || "-";
    // };

    const getStatusStyle = (statusId) => {
        if (statusId === 2) {
            return {label: t("queriesTranslation.queriesCard.status_pending"), color: "error"};
        }
        return {label: t("queriesTranslation.queriesCard.status_delivered"), color: "success"};
    };

    const status = getStatusStyle(transaction?.status_id);

    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
                "&:hover": {
                    boxShadow: 2,
                },
            }}
        >
            {/* Header with Route */}
            <CardHeader
                avatar={
                    <Avatar
                        sx={{
                            width: 40,
                            height: 40,
                            bgcolor: "primary.main",
                        }}
                    >
                        <LocalShipping fontSize="small"/>
                    </Avatar>
                }
                title={
                    <Box display={'flex'} container gap={1} alignItems="center">
                        {/* Icon */}
                        <RouteOutlined color="secondary" fontSize="small"/>

                        {/* Text */}
                        <Grid container direction="column" spacing={0.5}>
                            <Grid item>
                                <Typography
                                    fontSize={14}
                                    color="text.secondary"
                                    variant="subtitle1"
                                    fontWeight={600}
                                >
                                    {transaction?.from_address[0]?.city?.title}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    fontSize={14}
                                    color="text.secondary"
                                    variant="subtitle1"
                                    fontWeight={600}
                                >
                                    {transaction?.to_address[0]?.city?.title}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                }
                action={
                    <Chip
                        icon={<AccessTime/>}
                        fontSize='10'
                        label={dayjs(transaction?.created_at).fromNow()}
                        size="small"
                        color="warning"
                        variant="soft"
                        sx={{
                            fontSize: 11,
                            fontWeight: 500,
                            display: "flex",
                            alignItems: "center",
                            "& .MuiChip-label": {display: "flex", alignItems: "center"},
                        }}
                    />
                }
                sx={{
                    "& .MuiCardHeader-action": {
                        alignSelf: "center",
                        marginTop: 0,
                    },
                }}
            />

            <CardContent sx={{pt: 0}}>
                <Stack spacing={1} paddingX={1}>
                    {/* Main Info */}
                    <Box display="grid" gridTemplateColumns="1fr" gap={1}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                display="flex"
                                alignItems="center"
                                gap={0.5}
                                fontSize={14}
                                fontWeight={600}
                            >
                                <LocalShipping color="success" fontSize="small"/>
                                {t("queriesTranslation.queriesCard.cargo")}
                            </Typography>
                            <Typography fontSize={16} variant="body1" fontWeight={600} color="text.secondary">
                                {transaction?.title}
                            </Typography>
                        </Box>

                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                display="flex"
                                alignItems="center"
                                gap={0.5}
                                fontSize={14}
                                fontWeight={600}
                            >
                                <Payment color="success" fontSize="small"/>
                                {t("queriesTranslation.queriesCard.payment_type")}
                            </Typography>
                            <Typography fontSize={16} variant="body1" fontWeight={600} color="text.secondary">
                                {getPaymentMethodLabel(transaction?.payment_method)}
                            </Typography>
                        </Box>

                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                display="flex"
                                alignItems="center"
                                fontSize={14}
                                gap={0.5}
                                fontWeight={600}
                            >
                                <Person color="success" fontSize="small"/>
                                {t("queriesTranslation.queriesCard.client")}
                            </Typography>
                            <Typography fontSize={16} variant="body1" fontWeight={600} color="text.secondary">
                                {transaction?.client?.fio}
                            </Typography>
                        </Box>

                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                display="flex"
                                alignItems="center"
                                fontSize={14}
                                fontWeight={600}
                                gap={0.5}
                            >
                                <PriceChangeOutlined color="success" fontSize="small"/>
                                {t("queriesTranslation.queriesCard.client_price")}
                            </Typography>
                            <Typography fontSize={16} variant="body1" fontWeight={600} color="text.secondary">
                                {transaction?.client_enumeration_price}{" "}
                                {transaction?.client_enumeration_currency?.toUpperCase()}
                            </Typography>
                        </Box>

                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                display="flex"
                                alignItems="center"
                                gap={0.5}
                                fontSize={14}
                                fontWeight={600}
                            >
                                <Scale color="success" fontSize="small"/>
                                {t("queriesTranslation.queriesCard.weight")}
                            </Typography>
                            <Typography fontSize={16} variant="body1" fontWeight={600} color="text.secondary">
                                {transaction?.weight}
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                display="flex"
                                alignItems="center"
                                gap={0.5}
                                fontSize={14}
                                fontWeight={600}
                            >
                                <PauseIcon color="success" fontSize="small"/>
                                {t("queriesTranslation.queriesCard.status")}
                            </Typography>
                            <Typography fontSize={16} variant="body1" fontWeight={600} color="text.secondary">
                                <Chip
                                    label={status.label}
                                    color={status.color}
                                    variant="soft"
                                    size='small'
                                    sx={{
                                        fontWeight: 600,
                                        textTransform: "uppercase",
                                        letterSpacing: 0.5,
                                        fontSize: 12
                                    }}
                                />
                            </Typography>
                        </Box>
                    </Box>

                    <Divider/>

                    {/* Status */}


                    {/* Cancel Reason */}
                    {transaction.cancelReason && (
                        <Box
                            sx={(theme) => ({
                                bgcolor: alpha(theme.palette.error.light, 0.08),
                                border: `1px solid ${alpha(theme.palette.error.main, 0.3)}`,
                                borderRadius: 2,
                                p: 1.5,
                            })}
                        >
                            <Typography variant="caption" color="error.main" fontWeight={600}>
                                {t("queriesTranslation.queriesCard.cancel_reason")}
                            </Typography>
                            <Typography variant="body2" color="error.dark">
                                {transaction.cancelReason}
                            </Typography>
                        </Box>
                    )}
                </Stack>

                <Box width={'100%'} display="flex" marginTop={2} alignItems={"center"} gap={1} justifyContent="end">
                    <Button
                        onClick={() => {
                            dispatch(AddQueriesId(transaction?.id));
                            dispatch(AddQueries(transaction))
                            dispatch(openQueriesShow());

                        }}
                        variant="contained"
                        color="info"
                        sx={{
                            fontSize: '12px',
                            fontWeight: 600,
                        }}
                    >
                        <i className="fa-solid fa-eye mr-2"></i>
                        {t("queriesTranslation.queriesCard.show")}
                    </Button>
                    <Button
                        onClick={() => {
                            navigate(`/queries/edit/${transaction?.id}`);
                            dispatch(AddQueries(transaction))
                        }}
                        variant="contained"
                        color="warning"
                        sx={{
                            fontSize: '12px',
                            fontWeight: 600,
                        }}
                    >
                        <i className="fa-solid fa-pen-to-square mr-2"></i>
                        {t("queriesTranslation.queriesCard.edit")}
                    </Button>


                    {transaction.status === 0 && transaction.cancelReason && (
                        <Chip
                            label={t("queriesTranslation.queriesCard.cancel")}
                            color="error"
                            size="small"
                            variant="soft"
                        />
                    )}
                </Box>
            </CardContent>
        </Card>
    );
}

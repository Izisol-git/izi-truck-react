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
    alpha, Button,
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
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import dayjs from "../../utils/dayjs.js";
import {useNavigate} from "react-router-dom";
import {
    AddOffersId,
    AddQueriesId, EditToggleOffers, openOffersModal,
    openQueriesShow
} from "../../features/EmployeSModalToggle/employesModalToggle.js";
import {useDispatch, useSelector} from "react-redux";
import React from "react";
import {useTranslation} from "react-i18next";
import {
    deleteSuggestions,
    getSuggestionsAdmin,
    getSuggestionsId
} from "../../features/suggestions/suggestionsThunks.js";
import {AddSuggestionsId} from "../../features/suggestions/suggestionsSlice.js";
import PauseIcon from '@mui/icons-material/Pause';
import useNotify from "../../hooks/UseNotify/useNotify.jsx";

export default function OffersCard({data, role}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {i18n} = useTranslation();
    const {user} = useSelector((state) => state.auth);
    dayjs.locale(i18n.language)
    const {showMessage} = useNotify()

    const getSuggestionId = async (offersId) => {
        try {
            const res = await dispatch(getSuggestionsId(offersId)).unwrap()
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
    const  deleteSuggestion = async (id) => {
        try {
            const res = await dispatch(deleteSuggestions(id)).unwrap()
            console.log(res);
            showMessage(t('OffersSnackbar.success.delete'));
            try {
                const res2 = await dispatch(getSuggestionsAdmin({pageqq:1})).unwrap()
                console.log(res2)
            } catch (err) {
                console.log(err);
            }
        } catch (error) {
            console.log(error);
            showMessage(t('OffersSnackbar.error.delete'), "error");
        }
    }


    const getStatusStyle = (statusId) => {
        if (statusId === '1') {
            return {label: t('queriesTranslation.queriesCard.active'), color: "success"};

        }
        return {label: t('queriesTranslation.queriesCard.inactive'), color: "error"};
    };

    const status = getStatusStyle(data?.status);

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
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography color="text.secondary" variant="subtitle1" fontWeight={600}>
                            {data?.route}
                        </Typography>

                    </Box>
                }
                action={
                    <Chip
                        icon={<AccessTime sx={{fontSize: 16}}/>}
                        label={dayjs(data?.created_at).fromNow()}
                        size="small"
                        color="warning"
                        variant="soft"
                        sx={{
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

            <CardContent sx={{pt: 1.5}}>
                <Stack spacing={2} paddingX={2}>


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
                            <Typography variant="body1" fontWeight={600} color="text.secondary">
                                {data?.cargo_name}
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
                                {t("queriesTranslation.queriesCard.date")}
                            </Typography>
                            <Typography variant="body1" fontWeight={600} color="text.secondary">
                                {new Date(data?.created_at).ddmmyyyy()}
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
                                <InfoOutlineIcon color="success" fontSize="small"/>
                                {t("queriesTranslation.queriesCard.info")}
                            </Typography>
                            <Typography variant="body1" fontWeight={600} color="text.secondary">
                                {data?.trailer_info}
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
                            <Typography variant="body1" fontWeight={600} color="text.secondary">
                                {data?.price}
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
                            <Typography variant="body1" fontWeight={600} color="text.secondary">
                                {data?.cargo_weight}
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
                            <Chip
                                label={status.label}
                                color={status.color}
                                size={'small'}
                                variant="soft"
                                sx={{
                                    fontWeight: 600,
                                    textTransform: "uppercase",
                                    letterSpacing: 0.5,
                                }}
                            />
                        </Box>
                    </Box>

                    <Divider/>

                    {/* Status */}


                </Stack>

                <Box display="flex" marginTop={2} justifyContent="space-between" alignItems="center">
                    {
                        user?.user?.roles[0]?.name === "super-admin"
                        ?
                            <Button
                                color={'error'}
                                variant="contained"
                                onClick={()=>{
                                    deleteSuggestion(data?.id)
                                }}
                                sx={{
                                    fontSize: '12px',
                                    fontWeight: 600,
                                }}
                            >
                                <i className="fa-solid fa-trash mr-2"></i>
                                {t("queriesTranslation.queriesCard.delete")}
                            </Button>
                            :
                            null
                    }

                    <Box width={'100%'}  gap={1} display="flex" justifyContent="end" alignItems="center">

                        <Button
                            onClick={() => {
                                // if(user?.user?.roles[0]?.name === "super-admin") {
                                navigate(`/orders/replies/${data?.id}`)
                                dispatch(AddSuggestionsId(data))
                                // }
                                // dispatch(AddQueriesId(data?.id));
                                // dispatch(openQueriesShow());
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
                                // navigate(`/queries/edit/${data?.id}`);
                                dispatch(EditToggleOffers())
                                dispatch(openOffersModal())
                                dispatch(AddOffersId(data?.id))
                                dispatch(AddSuggestionsId(data))
                                // getSuggestionId(data?.id)
                            }}
                            variant="contained"
                            color="warning"
                            sx={{
                                fontSize: '12px',
                                fontWeight: 600,
                            }}
                        >
                            <i className="fa-solid fa-pen-to-square mr-2"></i>
                            {role === 'super-admin' ? t("queriesTranslation.queriesCard.edit") : t("offersOrdersCarrier.reply")}
                        </Button>
                    </Box>

                    {/*{transaction.status === 0 && transaction.cancelReason && (*/}
                    {/*    <Chip*/}
                    {/*        label={t("queriesTranslation.queriesCard.cancel")}*/}
                    {/*        color="error"*/}
                    {/*        size="small"*/}
                    {/*        variant="soft"*/}
                    {/*    />*/}
                    {/*)}*/}
                </Box>
            </CardContent>
        </Card>
    );
}

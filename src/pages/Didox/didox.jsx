import React, {useEffect} from 'react';
import {AlertMessage, Button, InputMUI, SelectMUI} from "../../Components/index.js";
import {useNavigate, useParams} from "react-router-dom";
import {Checkbox, FormControlLabel} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {addDidoxId} from "../../features/orders/ordersThunks.js";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import {useTranslation} from "react-i18next";

// import { Label } from "@/components/ui/label"


function Didox() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id} = useParams();
    const {t} = useTranslation();
    const dbOrders = localStorage.getItem("dbOrders");
    const {addDidox} = useSelector((state) => state.orders);
    const [message, setMessage] = React.useState("");


    const [error, setError] = React.useState(null);

    const [didoxData, setDidoxData] = React.useState({
        factura_types: null,
        ikpus: null,
        single_sided_type: null,
        lgota_id: '',
        has_lgota: false,
        has_vat: false,
        nds12: false,
    });

    const factura_type = [
        {id: 0, value: "Стандартный"},
        {id: 4, value: "Исправленный"},
    ]
    const single_sided_type = [
        {id: 1, value: "На физ. лицо"},
        {id: 2, value: "Экспорт услуг (за территорию Республики Узбекистан)"},
        {id: 3, value: "На импорт"},
        {id: 4, value: "Экспорт услуг (на территории Республики Узбекистан)"},
    ]


    const IKPUS = [
        {
            id: "10107002001000002",
            value:
                "10107002001000002 - Услуги по перевозке грузов автомобильным транспортом в пункте за пределами территории государства",
        },
        {
            id: "10112008001000001",
            value:
                "10112008001000001 - Транспортно-логистические услуги Оказание международных транспортных перевозок",
        },
        {
            id: "10112008001000002",
            value:
                "10112008001000002 - Транспортно-логистические услуги Оказание внутренних транспортных перевозок",
        },
        {
            id: "10107002001000001",
            value:
                "10107002001000001 - Автомобиль транспортида юкларни ташиш хизматлари маҳаллий йўналишлар бўйича",
        },
    ];

    useEffect(() => {
        setTimeout(() => setMessage(''), 3000);
    }, [message]);


    const didox = async () => {
        console.log(didoxData);
        const newObj = {
            type: 'reimbursement_carrier',
            ikpu: didoxData?.ikpus?.id,
            factura_type: didoxData?.factura_types?.id,
            source: dbOrders,
            has_lgota: didoxData?.has_lgota,
            has_vat: didoxData?.has_vat,
            nds12: didoxData?.nds12,
            lgota_id: didoxData?.lgota_id,
        }
        console.log(newObj);
        try {
            const res = await dispatch(addDidoxId({id, obj: newObj})).unwrap()
            setMessage("Ma'lumot muvaffaqiyatli saqlandi ✅");
            setDidoxData({
                factura_types: null,
                ikpus: null,
                single_sided_type: null,
                lgota_id: '',
                has_lgota: false,
                has_vat: false,
                nds12: false,
            })
        } catch (err) {
            console.log(err);
            setError(err.errors);

        }
    }
    console.log(error);


    console.log(didoxData);


    return (
        <div className={'relative'}>
            <div className={'bg-bacWhite w-full min-h-[calc(100dvh-70px)] py-5 dark:bg-darkBg'}>
                <div className={'w-[90%] bg-white px-4 mx-auto py-5 rounded-md shadow dark:bg-darkBgTwo'}>
                    <div className="flex items-center justify-between relative h-[40px] w-full px-2">
                        {/* Chap tomonda back tugma */}
                        <div onClick={() => navigate(-1)}>
                            <Button
                                icon={<i className="fa-solid fa-arrow-left"></i>}
                                value= {t("ordersTranslation.order_details")}
                                color={'dark:bg-btnBgDark'}
                            />
                        </div>

                        {/* Markazda sarlavha */}
                        <p className="text-blue font-bold text-xl text-center flex-1 dark:text-darkText">
                            {t("didoxTranslation.title")}
                        </p>
                    </div>

                    <div className={'mt-5'}>
                        <div className="flex items-center space-x-2">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={didoxData.has_lgota}
                                        onChange={(e) => setDidoxData({...didoxData, has_lgota: e.target.checked})}
                                        sx={{
                                            "&.Mui-checked": {color: "#1D2D5B"},
                                            color: '#1D2D5B',
                                            '.dark &': {color: '#fff'},
                                            ".dark &.Mui-checked": {color: "#fff"}
                                        }}
                                    />
                                }
                                label={t("didoxTranslation.has_lgota")}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={didoxData.has_vat}
                                        onChange={(e) => setDidoxData({...didoxData, has_vat: e.target.checked})}
                                        sx={{
                                            "&.Mui-checked": {color: "#1D2D5B"},
                                            color: '#1D2D5B',
                                            '.dark &': {color: '#fff'},
                                            ".dark &.Mui-checked": {color: "#fff"}
                                        }}
                                    />
                                }
                                label={t("didoxTranslation.has_vat")}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={didoxData.nds12}
                                        onChange={(e) => setDidoxData({...didoxData, nds12: e.target.checked})}
                                        sx={{
                                            "&.Mui-checked": {color: "#1D2D5B"},
                                            color: '#1D2D5B',
                                            '.dark &': {color: '#fff'},
                                            ".dark &.Mui-checked": {color: "#fff"}
                                        }}
                                    />
                                }
                                label={t("didoxTranslation.nds12")}
                            />
                        </div>
                    </div>

                    <div className={'grid grid-cols-1 gap-y-5 mt-5'}>
                        <div className={'grid grid-cols-2 gap-4 w-full'}>
                            <div className="flex items-center ">
                                <SelectMUI
                                    errorMassage={error?.factura_type}
                                    value={didoxData.factura_types || null}
                                    onChange={(val) => setDidoxData({...didoxData, factura_types: val})}
                                    options={factura_type || []}
                                    variant={'outlined'}
                                    label={t("didoxTranslation.factura_type")}
                                    placeholder={t("didoxTranslation.factura_type")}
                                />
                            </div>
                            <div className="flex items-center ">
                                <SelectMUI
                                    errorMassage={error?.ikpu}
                                    value={didoxData.ikpus || null}
                                    onChange={(val) => setDidoxData({...didoxData, ikpus: val})}
                                    options={IKPUS || []}
                                    variant={'outlined'}
                                    label={t("didoxTranslation.ikpu")}
                                    placeholder={t("didoxTranslation.ikpu")}
                                />
                            </div>
                        </div>

                        <div className={'grid grid-cols-2 gap-4 w-full'}>
                            <div className="flex items-center ">
                                <SelectMUI
                                    errorMassage={error?.single_sided_type}
                                    value={didoxData.single_sided_type || null}
                                    onChange={(val) => setDidoxData({...didoxData, single_sided_type: val})}
                                    options={single_sided_type || []}
                                    variant={'outlined'}
                                    label={t("didoxTranslation.single_sided_type")}
                                    placeholder={t("didoxTranslation.single_sided_type")}
                                />
                            </div>
                            <div className="flex items-center ">
                                <InputMUI
                                    errorMassage={error?.lgota_id}
                                    disabled={!didoxData.has_lgota}
                                    value={didoxData.lgota_id ?? ''}
                                    onChange={(e) => setDidoxData({...didoxData, lgota_id: e.target.value})}
                                    variant={'outlined'}
                                    label={t("didoxTranslation.lgota_id")}
                                />
                            </div>
                        </div>

                        <div className={'w-full flex items-center justify-end'}>
                            <div className={'min-w-[15%]'}>
                                <Button
                                    onClick={() => didox()}
                                    icon={<i className="fa-solid fa-share mr-2"></i>}
                                    value={addDidox ? t("didoxTranslation.sending") : t("didoxTranslation.send")}
                                    color={'dark:bg-btnBgDark'}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={'w-[90%] bg-white px-4 mt-5 mx-auto py-5 rounded-md shadow dark:bg-darkBgTwo'}>
                    <p>{t("didoxTranslation.sent_documents")}</p>
                </div>
            </div>

            <div className={'w-1/3 absolute top-0 right-6'}>
                {message && <AlertMessage/>}
            </div>
        </div>
    );
}

export default Didox;
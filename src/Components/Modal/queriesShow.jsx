import {Truck, Package, Scale, CheckCircle, Clock} from "lucide-react"
import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {deleteQueries, getQueriesAll, GetQueriesId} from "../../features/Queries/queriesThunks.js";
import {useNavigate} from "react-router-dom";
import {openQueriesShow} from "../../features/EmployeSModalToggle/employesModalToggle.js";
import {useTranslation} from "react-i18next";

const StatusId = ({id}) => {
    const {t} = useTranslation();

    if (id === 2) {
        return (
            <div
                className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg border border-red-200 dark:bg-red-100 dark:border-0">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center dark:bg-red-400">
                    <Clock className="w-5 h-5 text-white"/>
                </div>
                <div>
                    <div className="text-xs text-red-800 uppercase dark:text-red-400">
                        {t("queriesTranslation.logisticsInterface.status.label")}
                    </div>
                    <div className="font-medium text-red-800 dark:text-red-400">
                        {t("queriesTranslation.logisticsInterface.status.pending")}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white"/>
            </div>
            <div>
                <div className="text-xs text-gray-600 uppercase">
                    {t("queriesTranslation.logisticsInterface.status.label")}
                </div>
                <div className="font-medium text-green-800">
                    {t("queriesTranslation.logisticsInterface.status.delivered")}
                </div>
            </div>
        </div>
    );
}

export default function LogisticsInterface() {
    const {t} = useTranslation();
    const {user} = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {queriesId} = useSelector((state) => state.queries);
    const [allselect, setAllselect] = useState([]);
    const [data, setData] = useState();

    const isOpen = useSelector((state) => state.employesModal.isOpenQueriesShow);
    const id = useSelector((state) => state.employesModal.queriesId);

    const getQueriesId = async () => {
        try {
            const res = await dispatch(GetQueriesId(id)).unwrap()
            setData(res.query);
            setAllselect(res)
        } catch (error) {
            console.log(error);
        }
    }


    const deleteQueriesId = async () => {
        try {
            const res = await dispatch(deleteQueries(id)).unwrap()
            dispatch(openQueriesShow())
            try {
                const res2 = await dispatch(getQueriesAll({
                    pageqq: 1, search: {
                        search: "",
                        from: '',
                        to: ''
                    }
                })).unwrap()

            } catch (error) {
                console.error(error)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (isOpen && queriesId?.length === 0) getQueriesId()
    }, [id])

    const typePayment = [
        {value: 'cash', title: "Перечисления"},
        {value: 'enumeration', title: "Нақд"},
        {value: 'combined', title: "Ярим перечисления"},
    ];

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
    }, [isOpen]);

    return (
        <div
            onClick={() => dispatch(openQueriesShow())}
            className={` fixed inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-sm transition-opacity duration-300 z-[1099] ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className=" w-[90%] mt-10 mx-auto bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden dark:bg-darkBgTwo dark:border-0"
            >
                <div className="p-6 space-y-6">
                    {/* Shipment details grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                        {/* Origin */}
                        <div className="space-y-2">
                            <div>
                                <span
                                    className="text-gray-600 dark:text-darkTextTwo">{t("queriesTranslation.logisticsInterface.origin.country")}: </span>
                                <span
                                    className="text-brandBlue-600 font-medium dark:text-darkText">{queriesId?.from_address?.[0].country?.title || "-"}</span>
                            </div>
                            <div>
                                <span
                                    className="text-gray-600 dark:text-darkTextTwo">{t("queriesTranslation.logisticsInterface.origin.region")}: </span>
                                <span
                                    className="text-brandBlue-600 font-medium dark:text-darkText">{queriesId?.from_address?.[0].region?.title || "-"}</span>
                            </div>
                            <div>
                                <span
                                    className="text-gray-600 dark:text-darkTextTwo">{t("queriesTranslation.logisticsInterface.origin.city")}: </span>
                                <span
                                    className="text-brandBlue-600 font-medium dark:text-darkText">{queriesId?.from_address?.[0].city?.title || "-"}</span>
                            </div>
                        </div>

                        {/* Destination */}
                        <div className="space-y-2">
                            <div>
                                <span
                                    className="text-gray-600 dark:text-darkTextTwo">{t("queriesTranslation.logisticsInterface.destination.country")}: </span>
                                <span
                                    className="text-brandBlue-600 font-medium dark:text-darkText">{queriesId?.to_address?.[0].country?.title || "-"}</span>
                            </div>
                            <div>
                                <span
                                    className="text-gray-600 dark:text-darkTextTwo">{t("queriesTranslation.logisticsInterface.destination.region")}: </span>
                                <span
                                    className="text-brandBlue-600 font-medium dark:text-darkText">{queriesId?.to_address?.[0].region?.title || "-"}</span>
                            </div>
                            <div>
                                <span
                                    className="text-gray-600 dark:text-darkTextTwo">{t("queriesTranslation.logisticsInterface.destination.city")}: </span>
                                <span
                                    className="text-brandBlue-600 font-medium dark:text-darkText">{queriesId?.to_address?.[0].city?.title || "-"}</span>
                            </div>
                        </div>

                        {/* Client info */}
                        <div className="space-y-2">
                            <div>
                                <span
                                    className="text-gray-600 dark:text-darkTextTwo">{t("queriesTranslation.logisticsInterface.client.name")}: </span>
                                <span
                                    className="text-brandBlue-600 font-medium dark:text-darkText">{queriesId?.client?.fio}</span>
                            </div>
                            <div>
                                <span
                                    className="text-gray-600 dark:text-darkTextTwo">{t("queriesTranslation.logisticsInterface.client.inn")}: </span>
                                <span className="text-brandBlue-600 font-medium dark:text-darkText">{queriesId?.inn}</span>
                            </div>
                            <div>
                                <span
                                    className="text-gray-600 dark:text-darkTextTwo">{t("queriesTranslation.logisticsInterface.client.carrier")}: </span>
                                <span
                                    className="text-brandBlue-600 font-medium dark:text-darkText">{user?.employee?.user?.name}</span>
                            </div>
                            <div>
                                <span
                                    className="text-gray-600 dark:text-darkTextTwo">{t("queriesTranslation.logisticsInterface.client.carrierInn")}: </span>
                                <span
                                    className="text-brandBlue-600 font-medium dark:text-darkText">{user?.employee?.tin}</span>
                            </div>
                        </div>
                    </div>

                    {/* Transport details with icons */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {/* Transport type */}
                        <div
                            className="flex items-center space-x-3 p-4 bg-brandBlue-50 rounded-lg   dark:bg-navBgHover">
                            <div
                                className="w-10 h-10 bg-brandBlue-600 rounded-full flex items-center justify-center dark:bg-btnBgDark">
                                <Truck className="w-5 h-5 text-white"/>
                            </div>
                            <div>
                                <div
                                    className="text-xs text-gray-600 uppercase dark:text-darkText">{t("queriesTranslation.logisticsInterface.transport.type")}</div>
                                <div className="font-medium text-gray-900 dark:text-darkText">
                                    {allselect?.transport_types?.find((opt) => opt.id === queriesId?.transport_type_id)?.name}
                                </div>
                            </div>
                        </div>

                        {/* Volume */}
                        <div className="flex items-center space-x-3 p-4 bg-brandBlue-50 rounded-lg dark:bg-navBgHover">
                            <div
                                className="w-10 h-10 bg-brandBlue-600 dark:text-darkText rounded-full flex items-center justify-center dark:bg-btnBgDark">
                                <Package className="w-5 h-5 text-white"/>
                            </div>
                            <div>
                                <div
                                    className="text-xs text-gray-600 uppercase dark:text-darkText">{t("queriesTranslation.logisticsInterface.transport.volume")}</div>
                                <div className="font-medium text-gray-900 dark:text-darkText">
                                    {allselect?.transport_volumes?.find((opt) => opt.id === queriesId?.transport_volume_id)?.value} М3
                                </div>
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="flex items-center space-x-3 p-4 bg-brandBlue-50 rounded-lg dark:bg-navBgHover">
                            <div
                                className="w-10 h-10 bg-brandBlue-600  dark:text-darkText rounded-full flex items-center justify-center dark:bg-btnBgDark">
                                <div className="text-white font-bold text-sm dark:text-darkText">1</div>
                            </div>
                            <div>
                                <div
                                    className="text-xs text-gray-600 uppercase dark:text-darkText">{t("queriesTranslation.logisticsInterface.transport.quantity")}</div>
                                <div className="font-medium text-gray-900 dark:text-darkText">1 ШТ</div>
                            </div>
                        </div>

                        {/* Weight */}
                        <div className="flex items-center space-x-3 p-4 bg-brandBlue-50 rounded-lg dark:bg-navBgHover">
                            <div
                                className="w-10 h-10 bg-brandBlue-600 rounded-full flex items-center justify-center dark:bg-btnBgDark">
                                <Scale className="w-5 h-5 text-white dark:text-darkText"/>
                            </div>
                            <div>
                                <div
                                    className="text-xs text-gray-600 uppercase dark:text-darkText">{t("queriesTranslation.logisticsInterface.transport.weight")}</div>
                                <div className="font-medium text-gray-900 dark:text-darkText ">{queriesId?.weight} КГ</div>
                            </div>
                        </div>
                    </div>

                    {/* Status */}
                    <StatusId id={queriesId?.status_id}/>

                    {/* Additional details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                        <div className="space-y-2">
                            <div>
                                <span
                                    className="text-gray-600 dark:text-darkTextTwo">{t("queriesTranslation.logisticsInterface.additional.id")}: </span>
                                <span className="font-medium">{queriesId?.id}</span>
                            </div>
                            <div>
                                <span
                                    className="text-gray-600 dark:text-darkTextTwo">{t("queriesTranslation.logisticsInterface.additional.dangerLevel")}: </span>
                                {queriesId?.status_of_cargo === 0 ?
                                    <span
                                        className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium ">
                                        {t("queriesTranslation.logisticsInterface.status.undefined")}
                                    </span> :
                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                                        {queriesId?.degree_of_danger}
                                    </span>}
                            </div>
                            <div>
                                <span
                                    className="text-gray-600 dark:text-darkTextTwo">{t("queriesTranslation.logisticsInterface.additional.mode")}: </span>
                                {queriesId?.transport_type_id !== 3 ?
                                    <span
                                        className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">
                                        {t("queriesTranslation.logisticsInterface.status.undefined")}
                                    </span> :
                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                                        {queriesId?.mode}
                                    </span>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div>
                                <span
                                    className="text-gray-600 dark:text-darkTextTwo">{t("queriesTranslation.logisticsInterface.additional.loadingDate")}: </span>
                                <span
                                    className="font-medium text-brandBlue-600 dark:text-darkText">{new Date(queriesId?.load_time_from).ddmmyyyy()}</span>
                            </div>
                            <div className="space-y-1">
                                <div>
                                    <span
                                        className="text-gray-600 dark:text-darkTextTwo">{t("queriesTranslation.logisticsInterface.additional.created")}: </span>
                                    <span
                                        className="font-medium text-brandBlue-600 dark:text-darkText">{new Date(queriesId?.created_at).ddmmyyyy()}</span>
                                </div>
                                <div>
                                    <span
                                        className="text-gray-600 dark:text-darkTextTwo">{t("queriesTranslation.logisticsInterface.additional.updated")}: </span>
                                    <span
                                        className="font-medium text-brandBlue-600 dark:text-darkText">{new Date(queriesId?.updated_at).ddmmyyyy()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div>
                                <span
                                    className="text-gray-600 dark:text-darkTextTwo">{t("queriesTranslation.logisticsInterface.additional.paymentType")}: </span>
                                <span className="font-medium text-brandBlue-600 dark:text-darkText">
                                    {typePayment?.find((opt) => opt.value === queriesId?.payment_method)?.title}
                                </span>
                            </div>
                            <div>
                                <span
                                    className="text-gray-600 dark:text-darkTextTwo">{t("queriesTranslation.logisticsInterface.additional.cargo")}: </span>
                                <span className="font-medium text-brandBlue-600 dark:text-darkText">{queriesId?.title}</span>
                            </div>
                            <div>
                                <span
                                    className="text-gray-600 dark:text-darkTextTwo">{t("queriesTranslation.logisticsInterface.additional.clientPrice")}: </span>
                                <span
                                    className="font-medium text-brandBlue-600 dark:text-darkText">{queriesId?.client_enumeration_price}</span>
                            </div>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                        <Button
                            onClick={() => {
                                deleteQueriesId(id)
                            }}
                            variant="contained" size="sm" color={'error'}>
                            <i className="fa-solid fa-trash mr-2"></i>
                            {t("queriesTranslation.logisticsInterface.buttons.delete")}
                        </Button>
                        <Button
                            onClick={() => navigate(`/queries/edit/${id}`)}
                            variant="contained" size="sm" color={'warning'}
                        >
                            <i className={'fa-solid fa-pen-to-square mr-2'}></i>
                            {t("queriesTranslation.logisticsInterface.buttons.edit")}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

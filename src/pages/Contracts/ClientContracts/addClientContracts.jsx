import React, {useEffect, useState} from 'react';
import {Button, InputMUI, MyCalendar, SelectMUI} from "../../../Components/index.js";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {editContracts, getContractsId , addContractsData} from "../../../features/Contracts/contractThunks.js";

function AddClientContracts({mode = 'add'}) {
    const dispatch = useDispatch();
    const {loadingAddEdit} = useSelector((state) => state.contracts)
    const [contractsData, setContractsData] = useState({
        contract_no: "",
        director_position: "",
        director: "",
        director_add: "",
        customer: "",
        cust_bank_code: "",
        customer_bank: "",
        customer_bank_acc: "",
        customer_tin: "",
        customer_address: "",
        customer_vat: "",
        acc_tel: "",
        treaty_code: "",
        customer_oked: "",
        created_at: "",
    })
    const navigate = useNavigate();
    const {id} = useParams();

    const [contractsData1, setContractsData1] = useState({
        contract_no: new Date(),
        director_position: new Date(),
        director:new Date(),
        director_add:new Date(),
        customer: new Date(),
        cust_bank_code: "98496565465",
        customer_bank: new Date(),
        customer_bank_acc:new Date(),
        customer_tin: new Date(),
        customer_address:new Date(),
        customer_vat:new Date(),
        acc_tel: new Date(),
        treaty_code: new Date(),
        customer_oked: new Date(),
        created_at: new Date(),
    })


    const getContractId = async () => {
        try {
            const res = await dispatch(getContractsId(id)).unwrap();
            console.log(res.contract);
            setContractsData(res.contract);
        } catch (error) {
            console.log(error);
        }
    }

    const editContract = async () => {
        try {

            const res = await dispatch(editContracts({id:id , data: contractsData}));
            navigate(-1)
            console.log(res);

        } catch (error) {
            console.log(error);
        }
    }


    function formatDateYMD(date) {
        if (!date) return "";
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    console.log(contractsData)

    useEffect(() => {
        if (mode === "edit") {
            getContractId()
        }
    }, [])

    const senDContracts = async () => {
        try {
            const res = await dispatch(addContractsData(contractsData)).unwrap()
            navigate(-1)
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <div className="bg-bacWhite w-full min-h-[calc(100dvh-70px)] py-5 dark:bg-darkBg">
                <div className="w-[90%] bg-white px-4 mx-auto py-5 rounded-md shadow dark:bg-darkBgTwo">
                    {/* Header */}
                    <div className="h-[40px] gap-4 relative text-center center w-full  ">
                        <div
                            className="w-max absolute top-0 left-0"
                            onClick={() => navigate(-1)}
                        >
                            <Button
                                color={'dark:bg-btnBgDark'}
                                icon={<i className="fa-solid fa-arrow-left"></i>}
                                value={"Kantrakt"}
                            />
                        </div>
                        <p className="text-blue font-bold text-xl dark:text-darkText">Kantraktlar Qo'shish</p>
                    </div>

                    {/* FIO + telefon */}
                    <div className="flex items-center gap-4">
                        <div className="w-full">

                        </div>
                        <div className="w-full">

                        </div>
                    </div>

                </div>

                {/* Car info */}
                <div className="w-[90%] bg-white px-4 mx-auto py-5 rounded-md shadow mt-5 dark:bg-darkBgTwo">
                    <div className="grid grid-cols-3 gap-4">
                        {/* Inputs */}
                        <InputMUI
                            value={contractsData?.contract_no || ""}
                            onChange={(value) =>
                                setContractsData({...contractsData, contract_no: value.target.value})
                            }
                            variant="outlined"
                            label="Номер договора"
                        />

                        <InputMUI
                            value={contractsData?.director_position || ""}
                            onChange={(value) =>
                                setContractsData({...contractsData, director_position: value.target.value})
                            }
                            variant="outlined"
                            label="Должность руководителя"
                        />

                        <InputMUI
                            value={contractsData?.director || ""}
                            onChange={(value) =>
                                setContractsData({...contractsData, director: value.target.value})
                            }
                            variant="outlined"
                            label="ФИО директора"
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-5">
                        <InputMUI
                            value={contractsData?.director_add || ""}
                            onChange={(value) =>
                                setContractsData({...contractsData, director_add: value.target.value})
                            }
                            variant="outlined"
                            label="Склонения ФИО"
                        />

                        <InputMUI
                            value={contractsData?.customer || ""}
                            onChange={(value) =>
                                setContractsData({...contractsData, customer: value.target.value})
                            }
                            variant="outlined"
                            label="ЮР. название"
                        />

                        <InputMUI
                            value={contractsData?.cust_bank_code || ""}
                            onChange={(value) =>
                                setContractsData({...contractsData, cust_bank_code: value.target.value})
                            }
                            variant="outlined"
                            label="МФО/БИК/SWIFT"
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-5">
                        <InputMUI
                            value={contractsData?.customer_bank || ""}
                            onChange={(value) =>
                                setContractsData({...contractsData, customer_bank: value.target.value})
                            }
                            variant="outlined"
                            label="Банк"
                        />

                        <InputMUI
                            value={contractsData?.customer_bank_acc || ""}
                            onChange={(value) =>
                                setContractsData({...contractsData, customer_bank_acc: value.target.value})
                            }
                            variant="outlined"
                            label="Расчетный счет"
                        />

                        <InputMUI
                            value={contractsData?.customer_tin || ""}
                            onChange={(value) =>
                                setContractsData({...contractsData, customer_tin: value.target.value})
                            }
                            variant="outlined"
                            label="ИНН клиента"
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-5">
                        <InputMUI
                            value={contractsData?.customer_address || ""}
                            onChange={(value) =>
                                setContractsData({...contractsData, customer_address: value.target.value})
                            }
                            variant="outlined"
                            label="ЮР адрес"
                        />

                        <InputMUI
                            value={contractsData?.customer_vat || ""}
                            onChange={(value) =>
                                setContractsData({...contractsData, customer_vat: value.target.value})
                            }
                            variant="outlined"
                            label="НДС код"
                        />

                        <InputMUI
                            value={contractsData?.acc_tel || ""}
                            onChange={(value) =>
                                setContractsData({...contractsData, acc_tel: value.target.value})
                            }
                            variant="outlined"
                            label="Номер бухгалтера"
                        />
                    </div>

                    {/* Fayllar */}
                    <div className="grid grid-cols-3 gap-4 mt-5">
                        <InputMUI
                            value={contractsData?.treaty_code || ""}
                            onChange={(value) =>
                                setContractsData({...contractsData, treaty_code: value.target.value})
                            }
                            variant="outlined"
                            label="Код договора в 1С"
                        />

                        <InputMUI
                            value={contractsData?.customer_oked || ""}
                            onChange={(value) =>
                                setContractsData({...contractsData, customer_oked: value.target.value})
                            }
                            variant="outlined"
                            label="ОКЭД"
                        />

                        <MyCalendar
                            value={formatDateYMD(contractsData?.created_at)}
                            onChange={(val) =>
                                setContractsData({...contractsData, created_at: formatDateYMD(val)})
                            }
                        />


                    </div>

                    {/* Action buttons */}
                    <div className="py-5 w-full flex items-center justify-end gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="w-36 relative overflow-hidden rounded font-semibold bg-transparent border-2 text-blue border-blue transition-all duration-300 ease-in-out hover:text-white hover:bg-blue py-2 px-3 dark:hover:bg-navBgHover dark:border-darkText dark:text-darkText"
                        >
                            Close
                        </button>
                        <button
                            onClick={() => {
                                if (mode === "add") {
                                    senDContracts()
                                }
                                else {
                                    editContract()
                                }

                            }}

                            className="w-36 relative overflow-hidden rounded font-semibold bg-transparent border-2 text-blue border-blue transition-all duration-300 ease-in-out hover:text-white hover:bg-blue py-2 px-3 dark:hover:bg-navBgHover dark:border-darkText dark:text-darkText"
                        >
                            {/*{*/}
                            {/*    mode === 'edit' ? 'edit' : 'add'*/}
                            {/*}*/}

                            {
                                loadingAddEdit ? `${(mode.charAt(0).toUpperCase() + mode.slice(1))}...` : `${(mode.charAt(0).toUpperCase() + mode.slice(1))}`
                            }
                        </button>
                    </div>
                </div>
            </div>

        </>
    );
}

export default AddClientContracts;
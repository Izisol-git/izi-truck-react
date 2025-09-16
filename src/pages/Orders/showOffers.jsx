import React, {useEffect, useState} from 'react';
import {
    OffersCard,
    OffersOrders, OffersOrdersCarrier,
    PaginationFooter,
    ShowOffersTable
} from "../../Components/index.js";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Button} from "@mui/material";
import {getSuggestionsAdmin, getSuggestionsUser} from "../../features/suggestions/suggestionsThunks.js";
import {useDispatch, useSelector} from "react-redux";
import {AddToggleOffers, openOffersModal} from "../../features/EmployeSModalToggle/employesModalToggle.js";

function ShowOffers() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const [suggestions, setSuggestions] = useState();
    const {user} = useSelector((state) => state.auth);
    const {suggestions} = useSelector((state) => state.suggestions);
    const [searchParams] = useSearchParams();
    const pageqq = searchParams.get("page") || 1;
    const [data, setData] = useState();


    const getSuggestion = async () => {
        if (user?.user?.roles[0]?.name === "super-admin") {
            try {
                const res = await dispatch(getSuggestionsAdmin(pageqq)).unwrap()
                console.log(res)
                setData(res)
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                const res = await dispatch(getSuggestionsUser(pageqq)).unwrap()
                console.log(res)
            } catch (err) {
                console.log(err);
            }
        }

    }


    useEffect(() => {
        getSuggestion()
    }, [pageqq ])


    return (
        <div className={'bg-bacWhite w-full min-h-[calc(100dvh-70px)] py-5'}>
            <div className={'w-[90%] bg-white px-4 mx-auto py-5 rounded-md shadow'}>
                <div className={'h-[40px] gap-4 relative    text-center  center w-full  '}>
                    <div className={'w-max absolute top-0  left-0'} onClick={() => navigate(`/orders`)}>
                        <Button
                            sx={{
                                backgroundColor: "#1D2D5B",
                            }}
                            variant={'contained'}
                        >
                            <i className="fa-solid fa-right-from-bracket mr-2"></i>
                            {t("ordersTranslation.back_to_orders")}
                        </Button>
                    </div>
                    <p className={'text-blue font-bold text-xl '}>
                        {t("ordersTranslation.allOffers")}
                    </p>
                    {
                        user?.user?.roles[0]?.name === 'super-admin' ?
                            <div className={'w-max absolute top-0  right-0'}
                                 onClick={() => {
                                     dispatch(AddToggleOffers())
                                     dispatch(openOffersModal())
                                 }}>
                                <div className={''}>
                                    <Button variant={'contained'} sx={{
                                        backgroundColor: "#1D2D5B",
                                    }}>
                                        yangi taklif qo'shish
                                    </Button>
                                </div>
                            </div>
                            :
                            ""
                    }
                </div>



            </div>
            <div className={'w-[90%] mx-auto  mt-5'}>
                <div className={'grid grid-cols-3 gap-3'}>
                    {
                        suggestions?.data?.map((suggestion) => (
                            <OffersCard data={suggestion} suggestionId={suggestion?.id} />
                        ))
                    }
                </div>
                <div className={'mt-5 w-full flex items-center justify-end'}>
                    <PaginationFooter total={suggestions}/>
                </div>
            </div>
            {
                user?.user?.roles[0]?.name === 'super-admin' ? <OffersOrders  /> :
                    <OffersOrdersCarrier  />
            }

        </div>
    );
}

export default ShowOffers;

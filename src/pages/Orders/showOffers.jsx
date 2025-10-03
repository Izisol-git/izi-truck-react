import React, {useEffect, useState} from 'react';
import {
    Loading,
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
    const {suggestions , addLoadingSuggestions , addSuggestionsDate} = useSelector((state) => state.suggestions);
    const [searchParams] = useSearchParams();
    const pageqq = searchParams.get("page") || 1;
    const [data, setData] = useState();


    const getSuggestion = async () => {

        if (user?.user?.roles[0]?.name && user?.user?.roles[0]?.name === "super-admin") {
            try {
                const res = await dispatch(getSuggestionsAdmin(pageqq)).unwrap()
                 setData(res)
            } catch (err) {
                console.log(err);
            }
        }
        if (user?.user?.roles[0]?.name && user?.user?.roles[0]?.name !== "super-admin") {
            try {
                const res = await dispatch(getSuggestionsUser(pageqq)).unwrap()
             } catch (err) {
                console.log(err);
            }
        }

    }

    useEffect(() => {
        const now = Date.now()
        const lastFetch = addSuggestionsDate ? new Date(addSuggestionsDate).getTime() : Number(localStorage.getItem("refreshValue"));
        const diff = now - lastFetch;
        if(user?.user?.roles[0]?.name && suggestions?.length === 0 || diff >= Number(localStorage.getItem("refreshValue"))) {
            getSuggestion()
        }
    }, [pageqq , user ])


    return (
        <div className={'bg-bacWhite w-full min-h-[calc(100dvh-70px)] py-5 dark:bg-darkBg'}>
            <div className={'w-[90%] bg-white px-4 mx-auto py-5 rounded-md shadow dark:bg-darkBgTwo'}>
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
                    <p className={'text-blue font-bold text-xl dark:text-darkText '}>
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
                                        {t('ordersTranslation.create_new_suggestion')}
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
                        addLoadingSuggestions ? <Loading/> :  suggestions?.data?.map((suggestion) => (
                            <OffersCard role={user?.user?.roles[0]?.name} data={suggestion} suggestionId={suggestion?.id} />

                        ))
                    }
                </div>
                <div className={'mt-5 w-full flex items-center justify-end'}>
                    <PaginationFooter onClick={getSuggestion} total={suggestions} search={''}/>
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

import React, {useEffect} from 'react';
import {
    PaginationFooter,
    ShowOffersTable
} from "../../Components/index.js";
import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {getSuggestionsId} from "../../features/suggestions/suggestionsThunks.js";

function ShowOffersId() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {id} = useParams();
    const {suggestionsId} = useSelector((state) => state.suggestions);

    const getSuggestionId = async (offersId) => {
        try {
            const res = await dispatch(getSuggestionsId(offersId)).unwrap()
         }catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(suggestionsId?.length === 0){
            getSuggestionId(id)
        }
    } , [])



    return (

        <div className={'bg-bacWhite w-full min-h-[calc(100dvh-70px)] py-5 dark:bg-darkBg'}>
            <div className={'w-[90%] bg-white px-4 mx-auto py-5 rounded-md shadow dark:bg-darkBgTwo'}>
                <div className={'h-[40px] gap-4 relative    text-center  center w-full  '}>
                    <div className={'w-max absolute top-0  left-0'} onClick={() => navigate(-1)}>
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
                        {t('offersOrdersCarrier.answered_suggestions')}
                    </p>
                </div>

            </div>
            <div className={'w-[90%] mx-auto bg-white   mt-5 rounded-md shadow dark:bg-darkBg'}>
                {/*<div>*/}
                    <ShowOffersTable data={suggestionsId}/>
                {/*</div>*/}
            </div>
            <div className={'w-[90%] mx-auto  mt-5'}>

                <div className={'mt-5 w-full flex items-center justify-end'}>
                    <PaginationFooter/>
                </div>
            </div>



        </div>

    )
        ;
}

export default ShowOffersId;
import React from 'react';
import {
    Button,
    CurrencyInput,
    InputMUI,
    LocationInput,
    MyCalendar,
    SelectMUI,
    ShowOffersTable, SwitchMUI
} from "../../Components/index.js";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

function ShowOffers() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div className={'bg-bacWhite w-full min-h-[calc(100dvh-70px)] py-5'}>
            <div className={'w-[90%] bg-white px-4  mx-auto py-5 rounded-md shadow'}>
                <div className={'h-[40px] gap-4 relative text-center center  w-full     mb-5'}>
                    <div className={'w-max  absolute top-0 left-0'} onClick={() => navigate(`/orders`)}>
                        <Button icon={<i className="fa-solid fa-arrow-left"></i>} value={'Orders'}/>
                    </div>
                    <p className={'text-blue font-bold text-xl'}>Takliflarga javoblar</p>
                </div>
                <ShowOffersTable/>
            </div>



        </div>
    );
}

export default ShowOffers;
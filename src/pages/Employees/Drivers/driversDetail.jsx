import React from 'react';
import {Details} from "../../../Components/index.js";

import {inputModalArray} from "../../../Data/driversData.js";

function DriversDetail() {

    const Contracts = [
        {contractNumber: '7/1' , contractDate : '2022-01-07' , company:'EGS' , status: false}
    ]

    return (        <Details Contracts={Contracts} inputModalArray={inputModalArray} btnValue={'Drivers'} />

    );
}

export default DriversDetail;
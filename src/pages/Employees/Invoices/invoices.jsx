
import React , {useState}  from 'react';
import ImzoComponent from "../../../Components/IMZOComponent/ImzoComponent.jsx";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import {EmployeesPagination, InvoicesPagination} from '../../../Components/index.js'
import InvoicesRadioGroup from "../../../Components/RadioGroup/invoicesRadioGroup.jsx";
import {useDispatch} from "react-redux";
import {openInvoicesModal} from "../../../features/EmployeSModalToggle/employesModalToggle.js";
// import InvoicesPagination from "../../../Components/Pagination/InvoicesPagination.jsx";



const Invoices = () => {
    // const [selected, setSelected] = useState("");
    const [showModal, setShowModal] = useState(false);

    function handleSignSuccess({ pkcs7, hex, tin }) {
        console.log("✅ Imzo muvaffaqiyatli", { pkcs7, hex, tin });
    }
    const dispatch = useDispatch();



    const statusList = [
        { label: "Черновик", count: 0 },
        { label: "Ожидают подписи партнера", count: 0 },
        { label: "Ожидает вашей подписи", count: 0 },
        { label: "Подписан", count: 0 },
        { label: "Отказ от подписи", count: 0 },
        { label: "Удален", count: 0 },
        { label: "Ожидают подписи агента", count: 0 },
        { label: "НЕ ДЕЙСТВИТЕЛЬНЫЙ", count: 0 },
        { label: "Аннулирован ГНК", count: 0 }
    ];
    const [columnsArry, setColumnsArry] = useState([
        {title: "Full name", active: true},
        {title: "Status", active: true},
        {title: "Phone number", active: true},
        {title: "Personal phone", active: true},
        {title: "Start date", active: true},
        {title: "End date", active: true},
        {title: "Action", active: true},

    ])

    return (
        <div className={'bg-bacWhite min-h-[calc(100dvh-70px)]'}>
            <div className={"w-[90%] mx-auto flex items-center    py-5 justify-between"}>
                <p className={'text-2xl text-blue font-semibold'}>Invoices</p>
                <button onClick={()=> dispatch(openInvoicesModal())}
                    className={'py-2 px-3 bg-blue text-white rounded hover:ring-2 ring-blue outline-none'}>
                    E-IMZO’ni qayta yuklash
                </button>
            </div>
            <div className={'w-[90%] mx-auto flex flex-col gap-5 bg-white h-full p-5 '}>

                <div className=''>
                    <InvoicesRadioGroup statusList={statusList}/>

                </div>
                <div className={''}>
                    {/*<InvoicesPagination />*/}
                    <EmployeesPagination arry={columnsArry}/>
                </div>





            </div>
            <ImzoComponent


                onSignSuccess={handleSignSuccess}
            />
        </div>
    );
};

export default Invoices;

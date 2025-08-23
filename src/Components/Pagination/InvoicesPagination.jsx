import  React , {useState} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {
    EditToggle,
    openModal,
    openModalComments,
    openModalHistory
} from "../../features/EmployeSModalToggle/employesModalToggle.js";
import {ProfileInfoCard} from "../index.js";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import axios from "axios";



const InvoicesPagination = ({row , index , data , setEmployeesId , arry , navigateURL})=> {




    // const dispatch = useDispatch();
    // const isOpenMOdal = useSelector((state) => state.employesModal.isOpen);

    const [isOpen, setIsOpen] = useState(-1);
    // const navigate = useNavigate();
    // const findId = (id) => {
    //     const newData = data.find((employee) => employee.id === id);
    //     setEmployeesId(newData)
    //     console.log(newData)
    // }
// console.log(row)

    const DOC_TYPES = {
        "000": "-",
        "001": "Счет-фактура",
        "002": "Счет-фактура без акта",
        "005": "Акт",
        "006": "Доверенность",
        "007": "Договор",
        "008": "Счет-фактура (ФАРМ)",
        "021": "Счет-фактура Возврат",
        "061": "Доверенность (только в Didox)",
        "081": "Счет-фактура (ФАРМ) Возврат"
    };
    const INVOICE_STATUSES = {
        0: "Черновик",
        1: "Ожидают подписи партнера",
        2: "Ожидает вашей подписи",
        3: "Подписан",
        4: "Отказ от подписи",
        5: "Удален",
        6: "Ожидают подписи агента",
        40: "НЕ ДЕЙСТВИТЕЛЬНЫЙ",
        50: "Аннулирован ГНК",
    };


    return (
         <>
             <TableRow
                 onClick={() => {
                     isOpen !== row.id - 1 ? setIsOpen(row.id - 1) : setIsOpen(-1);
                 }}
                 sx={{
                     transition: "all 300ms ease-in-out",
                     "&:hover": {
                         backgroundColor: "#F2F6F9",
                     },
                     cursor: "pointer",
                     boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                 }}
                 key={index}
             >
                 {/* # */}
                 <TableCell>{index + 1}</TableCell>

                 {/* Тип документа */}
                 {arry[0].active && (
                     <TableCell>{DOC_TYPES[row.doctype] ?? row.type ?? "–"}</TableCell>
                 )}

                 {/* Дата обновления */}
                 {arry[1].active && (
                     <TableCell>
                         {row.created
                             ? new Date(row.created).toLocaleDateString("ru-RU")
                             : row.doc_date
                                 ? new Date(row.doc_date).toLocaleDateString("ru-RU")
                                 : "–"}
                     </TableCell>
                 )}

                 {/* Контрагент */}
                 {arry[2].active && (
                     <TableCell>{row.partnerCompany ?? row.owner_name ?? "–"}</TableCell>
                 )}

                 {/* ИНН */}
                 {arry[3].active && (
                     <TableCell>{row.partnerTin ?? row.document_json?.buyer?.tin ?? "–"}</TableCell>
                 )}

                 {/* Номер документа */}
                 {arry[4].active && (
                     <TableCell>{row.name ?? row.contract_number ?? "–"}</TableCell>
                 )}

                 {/* Номер и дата договора */}
                 {arry[5].active && (
                     <TableCell>
                         {row.contract_number && row.contract_date ? (
                             <>
                                 <div>{row.contract_number}</div>
                                 <div>{new Date(row.contract_date).toLocaleDateString("ru-RU")}</div>
                             </>
                         ) : (
                             row.contract_info ?? "–"
                         )}
                     </TableCell>
                 )}

                 {/* Стоимость поставки с НДС */}
                 {arry[6].active && (
                     <TableCell sx={{ fontWeight: "600" }}>
                         {Number(row.total_delivery_sum_with_vat ?? 0).toLocaleString("ru-RU", {
                             minimumFractionDigits: 2,
                             maximumFractionDigits: 2,
                         })}{" "}
                         so'm
                     </TableCell>
                 )}

                 {/* PDF yuklab olish */}
                 {arry[7].active && (
                     <TableCell>
                         <p
                             className="cursor-pointer  text-center px-3 py-1 bg-blue text-white rounded hover:bg-blue-700 text-sm"
                             onClick={() => {
                                 const token = localStorage.getItem("token");

                                 axios
                                     .get(
                                         `http://192.168.10.77:9090/api/invoices/download/${row?.doc_id}`,
                                         {
                                             responseType: "blob", // ⚡️ PDF faylni blob qilib olish
                                             headers: {Authorization: `Bearer ${token}`},
                                         }
                                     )
                                     .then((res) => {
                                         // Faylni brauzerda yaratish
                                         const url = window.URL.createObjectURL(new Blob([res.data], {type: "application/pdf"}));
                                         const link = document.createElement("a");
                                         link.href = url;
                                         link.setAttribute("download", "invoice.pdf"); // Yuklab olinadigan fayl nomi
                                         document.body.appendChild(link);
                                         link.click();
                                         link.remove();
                                     })
                                     .catch((err) => {
                                         console.error("Download error:", err);
                                     });
                             }}
                         >
                             PDF
                         </p>

                         {/*<a*/}
                         {/*    href={`/api/download/${row.doc_id}`}*/}
                         {/*    target="_blank"*/}
                         {/*    rel="noopener noreferrer"*/}
                         {/*    className="inline-block px-3 py-1 bg-blue text-white rounded hover:bg-blue-700 text-sm"*/}
                         {/*>*/}
                         {/*    PDF*/}
                         {/*</a>*/}
                     </TableCell>
                 )}
             </TableRow>

             <TableRow>
                 <TableCell sx={{padding: 0, overflow: "hidden", background: "#F9FBFD"}} colSpan={8}>
                     <div
                         // onMouseLeave={()=> setIsOpen(-1)}
                         className={isOpen === row.id - 1 ? "    max-h-96 center transition-all duration-300 ease-in-out" : " max-h-0  center  transition-all duration-300 ease-in-out"}>
                         {/*<ProfileInfoCard data={row} />*/}
                     </div>
                 </TableCell>
             </TableRow>
         </>
    );
}

export default InvoicesPagination;

import { createSlice } from '@reduxjs/toolkit';

const employesModalSlice = createSlice({
    name: 'modal',
    initialState: {
        isOpen: false,
        isClose: false,
        isOpenQueriesShow : false,
        isOpenHistory: false,
        isCloseHistory: false,
        isOpenComments: false,
        isCloseComments: false,
        isOpenInvoicesModal: false,
        isCloseInvoicesModal: false,
        isOpenOffersModal: false,
        isCloseOffersModal: false,
        isOpenExcelModal: false,
        isCloseExcelModal: false,
        employeesPaginationPage : localStorage.getItem('EmployeesPge'),
        addEditToggle: true,
        addEditToggleDrivers: true,
        clientsUpdetId:null,
        employeesId:null,
        customersId:null,
        queriesId:null,
        editDriversArry: {},
        driversId : null,
        dbOrders:'',
        addContractsModal: false,
    },
    reducers: {
        openModal: (state) => {
            state.isOpen = true;
            state.isClose = false;
        },
        closeModal: (state) => {
            state.isClose = true;
            state.isOpen = false;
        },
        openQueriesShow : (state) => {
            state.isOpenQueriesShow = !state.isOpenQueriesShow;
        }
        ,
        openModalHistory: (state) => {
            state.isOpenHistory = true;
            state.isCloseHistory = false;
        },
        closeModalHistory: (state) => {
            state.isCloseHistory = true;
            state.isOpenHistory = false;
        },
        openModalComments: (state) => {
            state.isOpenComments = true;
            state.isCloseComments = false;
        },
        closeModalComments: (state) => {
            state.isCloseComments = true;
            state.isOpenComments = false;
        },
        openInvoicesModal: (state) => {
            state.isOpenInvoicesModal = true;
            state.isCloseInvoicesModal = false;
        },
        closeInvoicesModal: (state) => {
            state.isCloseInvoicesModal = true;
            state.isOpenInvoicesModal = false;
        },
        openOffersModal: (state) => {
            state.isOpenOffersModal = true;
            state.isCloseOffersModal = false;
        },
        closeOffersModal: (state) => {
            state.isCloseOffersModal = true;
            state.isOpenOffersModal = false;
        },
        openExcelModal: (state) => {
            state.isOpenExcelModal = true;
            state.isCloseExcelModal = false;
        },
        closeContractsModal: (state) => {
            state.addContractsModal = false;
        },
        openContractsModal: (state) => {
            state.addContractsModal = true;
        },
        closeExcelModal: (state) => {
            state.isCloseExcelModal = true;
            state.isOpenExcelModal = false;
        },
        changeEmployeesPge: (state , action) => {
            state.employeesPaginationPage = action.payload;
            localStorage.setItem('EmployeesPage' , action.payload);
            console.log(action);
            console.log(state.employeesPaginationPage);
        },
        EditToggle: (state) => {
            state.addEditToggle = false;
        },
        AddToggle: (state) => {
            state.addEditToggle = true;
        },
        EditToggleDrivers: (state) => {
            state.addEditToggleDrivers = false;
        },
        AddToggleDrivers: (state) => {
            state.addEditToggleDrivers = true;
        },
        DriversId: (state , action) => {
            state.driversId= action.payload;
        },
        ClientsUpdetId: (state , action) => {
            state.clientsUpdetId = action.payload;
        },
        AddEmployeesId: (state , action) => {
            state.employeesId= action.payload;
        },
        AddCustomersId: (state , action) => {
            state.customersId= action.payload;
        },
        AddQueriesId: (state , action) => {
            state.queriesId= action.payload;
        },
        changeDbOrders: (state , action) => {
            state.dbOrders= action.payload;
        }
    },
});

export const {openQueriesShow , AddQueriesId,  openModal ,AddEmployeesId,changeDbOrders ,  AddCustomersId,closeContractsModal , openContractsModal , openExcelModal , closeExcelModal ,  closeModal,DriversId, ClientsUpdetId,EditToggleDrivers , AddToggleDrivers, changeEmployeesPge, AddToggle , EditToggle, closeOffersModal , openOffersModal, closeInvoicesModal , openInvoicesModal, closeModalHistory , openModalHistory , closeModalComments , openModalComments } = employesModalSlice.actions;
export default employesModalSlice.reducer;

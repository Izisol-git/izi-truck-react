import { createSlice } from '@reduxjs/toolkit';

const employesModalSlice = createSlice({
    name: 'modal',
    initialState: {
        isOpen: false,
        isClose: false,
        isOpenQueriesShow : false,
        isOpenHistory: false,
        isOpenNavbarY: JSON.parse(localStorage.getItem("navbarY")) ?? false,
        isCloseHistory: false,
        isOpenComments: false,
        isCloseComments: false,
        isOpenInvoicesModal: false,
        isCloseInvoicesModal: false,
        isOpenOffersModal: false,
        isCloseOffersModal: false,
        isOpenExcelModal: false,
        isCloseExcelModal: false,
        addEditToggle: true,
        addEditToggleDrivers: true,
        clientsUpdetId:null,
        employeesId:null,
        offersId:null,
        addEditToggleOffers:true,
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
        openCloseNavbarY: (state) => {
            localStorage.setItem('navbarY' , !state.isOpenNavbarY);
            state.isOpenNavbarY = !state.isOpenNavbarY;
         },
        CloseNavbarY: (state) => {
            localStorage.setItem('navbarY' , false);
            state.isOpenNavbarY = false;
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

        closeExcelModal: (state) => {
            state.isCloseExcelModal = true;
            state.isOpenExcelModal = false;
        },

        EditToggle: (state) => {
            state.addEditToggle = false;
        },
        AddToggle: (state) => {
            state.addEditToggle = true;
        },

        AddToggleDrivers: (state) => {
            state.addEditToggleDrivers = true;
        },
        EditToggleOffers: (state) => {
            state.addEditToggleOffers = false;
        },
        AddToggleOffers: (state) => {
            state.addEditToggleOffers = true;
        },
        DriversId: (state , action) => {
            state.driversId= action.payload;
        },
        ClientsUpdetId: (state , action) => {
            state.clientsUpdetId = action.payload;
        },

        AddOffersId: (state , action) => {
            state.offersId= action.payload;
        },

        AddQueriesId: (state , action) => {
            state.queriesId= action.payload;
        },
        changeDbOrders: (state , action) => {
            state.dbOrders= action.payload;
        }
    },
});

export const {openQueriesShow , openCloseNavbarY , CloseNavbarY, AddOffersId, AddToggleOffers ,EditToggleOffers,   AddQueriesId,  openModal ,changeDbOrders  , openExcelModal , closeExcelModal ,  closeModal,DriversId, ClientsUpdetId , AddToggleDrivers, AddToggle , EditToggle, closeOffersModal , openOffersModal, closeInvoicesModal , openInvoicesModal, closeModalHistory , openModalHistory , closeModalComments , openModalComments } = employesModalSlice.actions;
export default employesModalSlice.reducer;

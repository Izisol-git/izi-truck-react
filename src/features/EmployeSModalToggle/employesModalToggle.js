import { createSlice } from '@reduxjs/toolkit';

const employesModalSlice = createSlice({
    name: 'modal',
    initialState: {
        isOpen: false,
        isClose: false,
        isOpenHistory: false,
        isCloseHistory: false,
        isOpenComments: false,
        isCloseComments: false,
        isOpenInvoicesModal: false,
        isCloseInvoicesModal: false,
        isOpenOffersModal: false,
        isCloseOffersModal: false,
        employeesPaginationPage : localStorage.getItem('EmployeesPge'),
        addEditToggle: true,
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
        }
    },
});

export const { openModal , closeModal, changeEmployeesPge, AddToggle , EditToggle, closeOffersModal , openOffersModal, closeInvoicesModal , openInvoicesModal, closeModalHistory , openModalHistory , closeModalComments , openModalComments } = employesModalSlice.actions;
export default employesModalSlice.reducer;

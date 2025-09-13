import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import uz from "./uz.json";
import ru from "./ru.json";
import uzCyrl from "./uzCyrl.json";


const defaultLanguage = () => {
    switch (localStorage.getItem('language')) {
        case '0' : return 'uz';
        case '1' : return 'uzCyrl';
        case '2' : return 'ru';
    }

}

i18n.use(initReactI18next).init({
    resources: {
        uz: { translation: uz },
        ru: { translation: ru },
        uzCyrl: { translation: uzCyrl },
    },
    lng: defaultLanguage(), // default til
    fallbackLng: "uzCyrl", // agar mavjud bo'lmasa inglizchaga tushadi
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;

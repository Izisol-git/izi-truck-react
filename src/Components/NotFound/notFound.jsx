import React from 'react';
import {useTranslation} from "react-i18next";

function NotFound() {
    const {t} = useTranslation();
    return (
        <div className={'w-full text-center col-span-3 bg-white py-5 rounded-lg '}>{t('notFound')}</div>
    );
}

export default NotFound;
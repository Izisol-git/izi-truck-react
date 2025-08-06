import React, {useEffect, useState} from 'react';

const languages = [
    { code: 'en', label: 'English', flag: 'united-states.png' },
    { code: 'uz', label: 'O‘zbekcha', flag: '../../../public/uzbekistan.png' },
    { code: 'ru', label: 'Русский', flag: '../../../public/russia.png' },
];




const LanguageDropdown = () => {
    const [selectedLang, setSelectedLang] = useState('../../../public/uzbekistan.png');
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen)

    };
    const selectLanguage = (lang) => {
        setSelectedLang(lang);
        setIsOpen(false);
    };


    return (
        <div className="relative inline-block   text-left">
            <div
                onClick={toggleDropdown}
                className="flex items-center justify-center  cursor-pointer  rounded  "
            >
                <img className={'w-[25px] h-[25px]'} src={selectedLang} alt={"uzbekistan"}/>

            </div>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded shadow z-10">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => selectLanguage(lang.flag)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                        >
                            <img className={'w-[25px] h-[25px]'} src={lang.flag}
                                 alt={"uzbekistan"}/>
                            <p>
                                {lang.label}
                            </p>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageDropdown;

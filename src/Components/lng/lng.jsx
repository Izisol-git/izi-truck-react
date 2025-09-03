import React, {useEffect, useRef, useState} from 'react';

const languages = [

    {code: 'uz', label: 'O‘zbekcha', flag: '../../../public/uzbekistan.png'},
    {code: 'Ўз', label: 'Ўзбекча', flag: '../../../public/uzbekistan.png'},
    {code: 'ru', label: 'Русский', flag: '../../../public/russia.png'},
];


const LanguageDropdown = () => {
    const [selectedLang, setSelectedLang] = useState(
        languages[Number(localStorage.getItem('language'))] || languages[0]
    );
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen)

    };
    const selectLanguage = (lang) => {
        setSelectedLang(lang);
        setIsOpen(false);
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <div ref={dropdownRef} className="relative inline-block   text-left">
            <button
                onClick={toggleDropdown}
                className="flex items-center justify-center  cursor-pointer  rounded-lg   border bg-[#D2D8E2] font-medium dark:bg-darkBgTwo text-blue dark:text-white    gap-2 p-2 dark:border-darkBgTwo min-w-[130px] "
            >
                <img className={'w-[25px] h-[25px]'} src={selectedLang.flag} alt={selectedLang.label}/>
                <p>{selectedLang.label}</p>
                <i className={`fa-solid fa-angle-right transition-all duration-300 ease-in-out ${isOpen ? 'transition-transform rotate-90' : ''}`}></i>


            </button>


            <div
                className={`absolute right-0 mt-2    bg-white  border-gray-200 rounded shadow z-10 dark:bg-darkBgTwo dark:border-darkBgTwo text-blue dark:text-white  w-full  ${isOpen ? 'max-h-96 border' : 'max-h-0 border-0'} overflow-hidden transition-all duration-300    ease-in-out`}>
                {languages.map((lang, index) => (
                    <button
                        key={lang.code}
                        onClick={() => {
                            selectLanguage(lang)
                            localStorage.setItem('language', index)
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 dark:hover:bg-btnBgDark"
                    >
                        <img className={'w-[25px] h-[25px]'} src={lang.flag}
                             alt={"uzbekistan"}/>
                        <p>
                            {lang.label}
                        </p>
                    </button>
                ))}
            </div>

        </div>
    );
};

export default LanguageDropdown;

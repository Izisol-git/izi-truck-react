import React from 'react';

function AddEmployesModal({addEmployesModalOpen , addEmployesModalClose}) {

    const EmployesArr = [
        {type : 'text' , placeholder : 'Add Employees'  },
        {type : 'text' , placeholder : 'Add Employees2'  },
        {type : 'text' , placeholder : 'Add Employees3'  },
        {type : 'text' , placeholder : 'Add Employees4'  },
        {type : 'text' , placeholder : 'Add Employees5'  },
        {type : 'text' , placeholder : 'Add Employees6'  },
        {type : 'text' , placeholder : 'Add Employees7'  },
    ]

    return (
        <div className={`${addEmployesModalOpen ? "w-1/3 opacity-1": "w-0 opacity-0"} px-6 py-3 bg-white z-10 absolute top-0 right-0 border-4 transition-all duration-300 ease-in-out overflow-hidden  `}>
           <div className="flex items-center justify-between border-b border-blue pb-2">
               <p className={'text-blue font-bold text-lg'}>Adation</p>
               <div className={'w-[30px] h-[30px] cursor-pointer hover:bg-gray-100 rounded center'}>
                   <i onClick={() => addEmployesModalClose()} className={'fas fa-times text-blue '}></i>
               </div>
           </div>
        </div>
    );
}

export default AddEmployesModal;
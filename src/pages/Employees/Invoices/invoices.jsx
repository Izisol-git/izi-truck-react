
import React , {useState}  from 'react';
import ImzoComponent from "../../../Components/IMZOComponent/ImzoComponent.jsx";


const Invoices = () => {
    const [showModal, setShowModal] = useState(false);

    function handleSignSuccess({ pkcs7, hex, tin }) {
        console.log("✅ Imzo muvaffaqiyatli", { pkcs7, hex, tin });

        // bu yerda backendga so‘rov yuborish mumkin
        // yoki context/storega saqlash
    }
    return (
        <div className="p-8">
            <button onClick={() => setShowModal(true)} className="bg-blue text-white px-4 py-2 rounded">
                Imzolashni boshlash
            </button>

            <ImzoComponent
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSignSuccess={handleSignSuccess}
            />
        </div>
    );
};

export default Invoices;

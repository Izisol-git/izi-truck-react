import { useEffect, useState } from "react";

const EImzoSelector = ({ onSelect }) => {
    const [keys, setKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const loadKeys = () => {
            setLoading(true);

            window.EIMZOClient.install()
                .then(() => window.EIMZOClient.listAllUserKeys())
                .then((result) => {
                    const certs = [];
                    const promises = result.map((item, index) =>
                        window.EIMZOClient.getCertificate(item)
                            .then((cert) => {
                                cert.index = index;
                                certs.push(cert);
                            })
                    );

                    Promise.all(promises)
                        .then(() => {
                            setKeys(certs);
                            setLoading(false);
                        })
                        .catch((error) => {
                            console.error("Xatolik:", error);
                            setLoading(false);
                        });
                })
                .catch((err) => {
                    console.error("E-IMZO o‘rnatilmagan yoki xato:", err);
                    setLoading(false);
                });
        };

        // kutubxona yuklanganda chaqirish
        if (window.EIMZOClient) {
            loadKeys();
        } else {
            const interval = setInterval(() => {
                if (window.EIMZOClient) {
                    clearInterval(interval);
                    loadKeys();
                }
            }, 300);
        }
    }, []);

    const handleSelect = (cert) => {
        onSelect(cert);
        setShowModal(false);
    };

    return (
        <div>
            <button
                onClick={() => setShowModal(true)}
                className="bg-blue  text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Imzo bilan kirish
            </button>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-md w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-semibold mb-4">Kalitni tanlang</h2>

                        {loading ? (
                            <p>Yuklanmoqda...</p>
                        ) : (
                            <ul className="space-y-2">
                                {keys.length === 0 && <p>Sertifikat topilmadi</p>}
                                {keys.map((cert) => {
                                    const fullName = cert.CN || cert.subjectName || "Noma'lum";
                                    const tin = cert.TIN || cert.PINFL || "–";
                                    const validTo = new Date(cert.validTo).toLocaleDateString();

                                    return (
                                        <li
                                            key={cert.serialNumber}
                                            className="border p-3 rounded hover:bg-gray-100 cursor-pointer"
                                            onClick={() => handleSelect(cert)}
                                        >
                                            <p className="font-medium">{fullName}</p>
                                            <p className="text-xs text-gray-600">STIR/JSHSHIR: {tin}</p>
                                            <p className="text-xs text-gray-500">Amal muddati: {validTo}</p>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}

                        <button
                            onClick={() => setShowModal(false)}
                            className="mt-4 bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded"
                        >
                            Bekor qilish
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EImzoSelector;

import { useEffect, useState } from "react";

export default function ImzoComponent({ isOpen, onClose, onSignSuccess }) {
    const [certs, setCerts] = useState([]);
    const [selectedKey, setSelectedKey] = useState(null);
    const [loading, setLoading] = useState(true);

    const EIMZO_MAJOR = 3;
    const EIMZO_MINOR = 27;

    useEffect(() => {
        if (isOpen) {
            if (window.EIMZOClient) {
                AppLoad();
            } else {
                console.warn("EIMZOClient hali yuklanmadi");
            }
        }
    }, [isOpen]);

    function AppLoad() {
        window.EIMZOClient.API_KEYS = [
            'localhost', '96D0C1491615C82B9A54D9989779DF825B690748224C2B04F500F370D51827CE2644D8D4A82C18184D73AB8530BB8ED537269603F61DB0D03D2104ABF789970B',
            '127.0.0.1', 'A7BCFA5D490B351BE0754130DF03A068F855DB4333D43921125B9CF2670EF6A40370C646B90401955E1F7BC9CDBF59CE0B2C5467D820BE189C845D0B79CFC96F',
            'null', 'E0A205EC4E7B78BBB56AFF83A733A1BB9FD39D562E67978CC5E7D73B0951DB1954595A20672A63332535E13CC6EC1E1FC8857BB09E0855D7E76E411B6FA16E9D',
            'izitruck.uz', '18B9B80F384B799487E2095BFDF34D3D1CD28B93A6F567F0005EF19B0DBE1D561D0BC473F98B8A4EA89ED6F52DCAF3FEB0267A21A58708650AF39263DBC0F496'
        ];

        setLoading(true);

        window.EIMZOClient.checkVersion((major, minor) => {
            if ((parseInt(major) * 100 + parseInt(minor)) < (EIMZO_MAJOR * 100 + EIMZO_MINOR)) {
                alert("Iltimos, E-IMZO dasturining yangilangan versiyasini o‘rnating");
                setLoading(false);
            } else {
                window.EIMZOClient.installApiKeys(() => {
                    loadKeys();
                }, wsError);
            }
        }, wsError);
    }

    function loadKeys() {
        const items = [];

        window.EIMZOClient.listAllUserKeys(
            (o, i) => "itm-" + o.serialNumber + "-" + i,
            (itemId, vo) => {
                const expired = new Date(vo.validTo) < new Date();
                const pinfl = vo.PINFL || vo.TIN || '';
                const org = vo.O || '-';
                const cn = vo.CN || '';
                const validTo = formatDate(vo.validTo);

                return {
                    id: itemId,
                    label: cn,
                    vo,
                    html: (
                        <div key={itemId} className="form-check border p-3 rounded mb-2">
                            <input
                                type="radio"
                                name="ckey"
                                className="form-check-input me-2"
                                value={itemId}
                                onChange={() => setSelectedKey(vo)}
                            />
                            <label className="form-check-label">
                                <p><strong>СТИР/ЖШШИР:</strong> {pinfl}</p>
                                <p><strong>ОРГАНИЗАЦИЯ:</strong> {org.toUpperCase()}</p>
                                <p><strong>Ф.И.О:</strong> {cn.toUpperCase()}</p>
                                <p><strong>СРОК ДЕЙСТВИЯ:</strong> {validTo}</p>
                                {expired && <p className="text-red-600 mt-1">⚠️ Sertifikat muddati tugagan</p>}
                            </label>
                        </div>
                    )
                };
            },
            (itemsArr) => {
                setCerts(itemsArr);
                setLoading(false);
            },
            wsError
        );
    }

    function sign() {
        if (!selectedKey) {
            alert("Iltimos, sertifikat tanlang!");
            return;
        }

        window.EIMZOClient.loadKey(selectedKey, function (keyId) {
            window.EIMZOClient.createPkcs7(keyId, selectedKey.TIN, null, function (pkcs7, hex) {
                if (onSignSuccess) {
                    onSignSuccess({ pkcs7, hex, tin: selectedKey.TIN });
                }
                onClose();
            }, wsError);
        }, wsError);
    }

    function wsError(e, r) {
        alert(r || "E-IMZO bilan bog‘lanishda xatolik.");
        setLoading(false);
    }

    function formatDate(dateStr) {
        const date = new Date(dateStr);
        if (isNaN(date)) return '';
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yyyy = date.getFullYear();
        return `${dd}.${mm}.${yyyy}`;
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white text-black dark:bg-gray-800 dark:text-white p-6 rounded-xl w-full max-w-xl shadow-lg relative">
                <h2 className="text-xl font-bold mb-4">Elektron imzo tanlash</h2>

                {loading ? (
                    <p>⏳ Sertifikatlar yuklanmoqda...</p>
                ) : (
                    <div>{certs.map(cert => cert.html)}</div>
                )}

                <div className="mt-4 flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-400 rounded">Bekor qilish</button>
                    <button onClick={sign} className="px-4 py-2 bg-blue text-white rounded">Imzolash</button>
                </div>
            </div>
        </div>
    );
}

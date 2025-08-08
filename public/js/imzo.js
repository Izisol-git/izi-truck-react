// var EIMZO_MAJOR = 3;
// var EIMZO_MINOR = 27;
//
// var errorCAPIWS = 'Ошибка соединения с E-IMZO. Возможно у вас не установлен модуль E-IMZO или Браузер E-IMZO.';
// var errorBrowserWS = 'Браузер не поддерживает технологию WebSocket. Установите последнюю версию браузера.';
// var errorUpdateApp = 'ВНИМАНИЕ !!! Установите новую версию приложения E-IMZO или Браузера E-IMZO.<br /><a href="https://e-imzo.uz/main/downloads/" role="button">Скачать ПО E-IMZO</a>';
//
// window.onload = function () {
//     AppLoad();
// };
//
// function AppLoad() {
//     EIMZOClient.API_KEYS = [
//         'localhost', '96D0C1491615C82B9A54D9989779DF825B690748224C2B04F500F370D51827CE2644D8D4A82C18184D73AB8530BB8ED537269603F61DB0D03D2104ABF789970B',
//         '127.0.0.1', 'A7BCFA5D490B351BE0754130DF03A068F855DB4333D43921125B9CF2670EF6A40370C646B90401955E1F7BC9CDBF59CE0B2C5467D820BE189C845D0B79CFC96F',
//         'null', 'E0A205EC4E7B78BBB56AFF83A733A1BB9FD39D562E67978CC5E7D73B0951DB1954595A20672A63332535E13CC6EC1E1FC8857BB09E0855D7E76E411B6FA16E9D',
//         // 'izitruck.uz', '18B9B80F384B799487E2095BFDF34D3D1CD28B93A6F567F0005EF19B0DBE1D561D0BC473F98B8A4EA89ED6F52DCAF3FEB0267A21A58708650AF39263DBC0F496'
//     ];
//     uiLoading();
//     EIMZOClient.checkVersion(function (major, minor) {
//         if ((parseInt(major) * 100 + parseInt(minor)) < (EIMZO_MAJOR * 100 + EIMZO_MINOR)) {
//             uiUpdateApp();
//         } else {
//             EIMZOClient.installApiKeys(function () {
//                 uiLoadKeys();
//             }, wsError);
//         }
//     }, wsError);
// }
//
// function uiLoading() {
//     document.getElementById('message').innerHTML = 'Загрузка ...';
// }
//
// function uiUpdateApp() {
//     document.getElementById('message').innerHTML = errorUpdateApp;
// }
//
// function uiShowMessage(msg) {
//     alert(msg);
// }
//
// function wsError(e, r) {
//     uiShowMessage(r || errorCAPIWS);
// }
//
// function uiLoadKeys() {
//     uiClearCombo();
//     EIMZOClient.listAllUserKeys(
//         function (o, i) {
//             return "itm-" + o.serialNumber + "-" + i;
//         },
//         function (itemId, vo) {
//             return uiCreateItem(itemId, vo);
//         },
//         function (items, firstId) {
//             uiFillCombo(items);
//             $('#eimzoModal').modal('show'); // 👈 Modalni avtomatik ochish
//             uiComboSelect(firstId);
//         },
//         wsError
//     );
// }
//
// function uiClearCombo() {
//     $("#citizenship-filter-2").empty();
// }
//
// function uiFillCombo(items) {
//     var container = $("#citizenship-filter-2");
//     for (var itm in items) {
//         container.append(items[itm]);
//     }
// }
//
// function uiComboSelect(itm) {
//     if (itm) {
//         var s = $("#" + itm).attr('vo');
//         $("#dropdownMenuButton").html(JSON.parse(s).CN);
//     }
// }
//
// // function sign() {
// //     var selectedRadio = $('input[name="ckey"]:checked');
// //     const token = $('meta[name="csrf-token"]').attr('content');
//
// //     console.log('CSRF token:', token);
// //     if (selectedRadio.length === 0) {
// //         alert("Iltimos, sertifikat tanlang!");
// //         return;
// //     }
//
// //     var voStr = decodeURIComponent(selectedRadio.attr('vo'));
// //     var vo = JSON.parse(voStr);
//
// //     EIMZOClient.loadKey(vo, function (keyId) {
// //         EIMZOClient.createPkcs7(keyId, vo.TIN, null, function (pkcs7, hex) {
// //             $.ajax({
// //                 headers: {
// //                     'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
// //                 },
// //                 url: '/eimzo-check',
// //                 type: 'POST',
// //                 data: {
// //                     pkcs7: pkcs7,
// //                     hex: hex
// //                 },
// //                 success: function (res) {
// //                     if (res.success) {
// //                         $('#eimzoModal').modal('hide');
// //                         alert("Imzo muvaffaqiyatli tekshirildi!");
// //                         // window.location.href = '/objects';
// //                     } else {
// //                         alert(res.message || "Xatolik.");
// //                     }
// //                 },
// //                 error: function () {
// //                     alert("Server bilan bog‘lanishda xatolik.");
// //                 }
// //             });
// //         }, wsError);
// //     }, wsError);
// // }
// //livwire uchun sign uzgartirildi
// function sign() {
//     var selectedRadio = $('input[name="ckey"]:checked');
//
//     if (selectedRadio.length === 0) {
//         alert("Iltimos, sertifikat tanlang!");
//         return;
//     }
//
//     var voStr = decodeURIComponent(selectedRadio.attr('vo'));
//     var vo = JSON.parse(voStr);
//
//     EIMZOClient.loadKey(vo, function (keyId) {
//         EIMZOClient.createPkcs7(keyId, vo.TIN, null, function (pkcs7, hex) {
//             // Livewire metodni chaqirish
//             Livewire.dispatch('checkLogin', {
//                 pkcs7: pkcs7,
//                 hex: hex,
//                 tin: vo.TIN,
//
//             } );
//
//
//         }, wsError);
//
//     }, wsError);
// }
// function uiCreateItem(itmkey, vo) {
//     var expired = new Date(vo.validTo) < new Date();
//     var pinfl = vo.PINFL || vo.TIN || '';
//     var org = vo.O || '-';
//     var cn = vo.CN || '';
//     var validTo = formatDate(vo.validTo);
//
//     return `<div class="form-check cert_item mb-2">
//         <input type="hidden" id="inn${itmkey}" value="${vo.TIN}">
//         <input class="form-check-input" type="radio" name="ckey" id="${itmkey}" vo="${encodeURIComponent(JSON.stringify(vo))}" value="${itmkey}">
//         <label class="form-check-label d-flex flex-column ms-2" for="${itmkey}">
//             <p class="mb-1"><strong>СТИР/ЖШШИР:</strong> ${pinfl}</p>
//             <p class="mb-1"><strong>ОРГАНИЗАЦИЯ:</strong> ${org.toUpperCase()}</p>
//             <p class="mb-1"><strong>Ф.И.О:</strong> ${cn.toUpperCase()}</p>
//             <p class="mb-0"><strong>СРОК ДЕЙСТВИЯ:</strong> ${validTo}</p>
//             ${expired ? `<p class="text-danger mt-1"><b>⚠️ Срок действия истек</b></p>` : ''}
//         </label>
//     </div>`;
// }
//
// function formatDate(dateStr) {
//     var date = new Date(dateStr);
//     if (isNaN(date)) return '';
//     var dd = String(date.getDate()).padStart(2, '0');
//     var mm = String(date.getMonth() + 1).padStart(2, '0');
//     var yyyy = date.getFullYear();
//     return dd + '.' + mm + '.' + yyyy;
// }
// // window.initEimzo = function () {
// //     console.log("✅ E-IMZO initialized!");
// //     AppLoad();
// //     // Bu yerga e-imzo kutubxonasini ishga tushirish kodlari yoziladi
// // };
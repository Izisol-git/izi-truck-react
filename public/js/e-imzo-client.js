
/* global CAPIWS */

Date.prototype.yyyymmdd = function () {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
    var dd = this.getDate().toString();
    return yyyy + (mm[1] ? mm : "0" + mm[0]) + (dd[1] ? dd : "0" + dd[0]); // padding
};
Date.prototype.ddmmyyyy = function () {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
    var dd = this.getDate().toString();
    return (dd[1] ? dd : "0" + dd[0]) + "." + (mm[1] ? mm : "0" + mm[0]) + "." + yyyy; // padding
};



String.prototype.splitKeep = function (splitter, ahead) {
    let self = this;
    let result = [];

    if (!splitter) return [self];

    function getSubst(value) {
        let substChar = value[0] === '0' ? '1' : '0';
        return substChar.repeat(value.length);
    }

    let matches = [];
    let replaceName = splitter instanceof RegExp ? "replace" : "replace";
    self[replaceName](splitter, function (m, i) {
        matches.push({ value: m, index: i });
        return getSubst(m);
    });

    let lastIndex = 0;
    for (let m of matches) {
        let nextIndex = ahead ? m.index : m.index + m.value.length;
        if (nextIndex !== lastIndex) {
            result.push(self.substring(lastIndex, nextIndex));
            lastIndex = nextIndex;
        }
    }

    if (lastIndex < self.length) {
        result.push(self.substring(lastIndex));
    }

    return result;
};


const EIMZOClient = {
    NEW_API: false,
    NEW_API2: false,
    API_KEYS: [
        'localhost', '96D0C1491615C82B9A54D9989779DF825B690748224C2B04F500F370D51827CE2644D8D4A82C18184D73AB8530BB8ED537269603F61DB0D03D2104ABF789970B',
        '127.0.0.1', 'A7BCFA5D490B351BE0754130DF03A068F855DB4333D43921125B9CF2670EF6A40370C646B90401955E1F7BC9CDBF59CE0B2C5467D820BE189C845D0B79CFC96F',
        'izitruck.uz', '18B9B80F384B799487E2095BFDF34D3D1CD28B93A6F567F0005EF19B0DBE1D561D0BC473F98B8A4EA89ED6F52DCAF3FEB0267A21A58708650AF39263DBC0F496'
    ],
    checkVersion: function(success, fail){
        CAPIWS.version(function (event, data) {
            if(data.success === true){      
                if(data.major && data.minor){
                    var installedVersion = parseInt(data.major) * 100 + parseInt(data.minor);
                    EIMZOClient.NEW_API = installedVersion >= 336;  
                    EIMZOClient.NEW_API2 = installedVersion >= 412;  
                    success(data.major, data.minor);  
                } else {
                    fail(null, 'E-IMZO Version is undefined');
                }
            } else {
                fail(null, data.reason);
            }
        }, function (e) {
            fail(e, null);
        });
    },
    installApiKeys: function(success, fail){
        CAPIWS.apikey(EIMZOClient.API_KEYS, function (event, data) {
            if (data.success) {
                success();
            } else {
                fail(null,data.reason);
            }
        }, function (e) {
            fail(e, null);
        });
    },
    listAllUserKeys: function(itemIdGen, itemUiGen, success, fail){        
        var items = [];
        var errors = [];
        if(!EIMZOClient.NEW_API){
            fail(null, 'Please install new version of E-IMZO');
        } else {
            if(EIMZOClient.NEW_API2){
                EIMZOClient._findPfxs2(itemIdGen, itemUiGen, items, errors, function (firstItmId2) {                
                    if(items.length === 0 && errors.length > 0){
                        fail(errors[0].e, errors[0].r);
                    } else {  
                        var firstId = null;
                        if (items.length === 1) {
                            if (firstItmId2) {
                                firstId = firstItmId2;
                            }
                        }
                        success(items, firstId);
                    }                
                });
            } else {
                EIMZOClient._findPfxs2(itemIdGen, itemUiGen, items, errors, function (firstItmId2) {
                    EIMZOClient._findTokens2(itemIdGen, itemUiGen, items, errors, function (firstItmId3) {
                        if(items.length === 0 && errors.length > 0){
                            fail(errors[0].e, errors[0].r);
                        } else {  
                            var firstId = null;
                            if (items.length === 1) {
                                if (firstItmId2) {
                                    firstId = firstItmId2;
                                } else if (firstItmId3) {
                                    firstId = firstItmId3;
                                }
                            }
                            success(items, firstId);
                        }
                    });
                });
            }
        }
    },
    idCardIsPLuggedIn: function(success, fail){
        var items = [];
        var errors = [];
        if(!EIMZOClient.NEW_API2){
            console.log("E-IMZO version should be 4.12 or newer")
        } else {
            CAPIWS.callFunction({plugin: "idcard", name: "list_readers"}, function (event, data) {
                if (data.success) {
                    success(data.readers.length>0);
                } else {
                    fail(null, data.reason);
                }
            }, function (e) {
                fail(e, null);
            });
        }
    },
    loadKey: function(itemObject, success, fail, verifyPassword){
        if (itemObject) {
            var vo = itemObject;
            if (vo.type === "pfx") {
                CAPIWS.callFunction({plugin: "pfx", name: "load_key", arguments: [vo.disk, vo.path, vo.name, vo.alias]}, function (event, data) {
                    if (data.success) {
                        var id = data.keyId;
                        if(verifyPassword){
                            CAPIWS.callFunction({name: "verify_password", plugin: "pfx", arguments: [id]}, function (event, data) {
                                if (data.success) {
                                    success(id);
                                } else {
                                    fail(null, data.reason);
                                }
                            }, function (e) {
                                fail(e, null);
                            });
                        } else {
                            success(id);
                        }
                    } else {
                        fail(null, data.reason);
                    }
                }, function (e) {
                    fail(e, null);
                });
            } else if (vo.type === "ftjc") {
                CAPIWS.callFunction({plugin: "ftjc", name: "load_key", arguments: [vo.cardUID]}, function (event, data) {
                    if (data.success) {
                        var id = data.keyId;
                        if(verifyPassword){
                            CAPIWS.callFunction({plugin: "ftjc", name: "verify_pin", arguments: [id,'1']}, function (event, data) {
                                if (data.success) {
                                    success(id);
                                } else {
                                    fail(null, data.reason);
                                }
                            }, function (e) {
                                fail(e, null);
                            });
                        } else {
                            success(id);
                        }
                    } else {
                        fail(null, data.reason);
                    }
                }, function (e) {
                    fail(e, null);
                });
            }
        }
    },
    changeKeyPassword: function(itemObject, success, fail){
        if (itemObject) {
            var vo = itemObject;
            if (vo.type === "pfx") {
                CAPIWS.callFunction({plugin: "pfx", name: "load_key", arguments: [vo.disk, vo.path, vo.name, vo.alias]}, function (event, data) {
                    if (data.success) {
                        var id = data.keyId;
                        CAPIWS.callFunction({name: "change_password", plugin: "pfx", arguments: [id]}, function (event, data) {
                            if (data.success) {
                                success();
                            } else {
                                fail(null, data.reason);
                            }
                        }, function (e) {
                            fail(e, null);
                        });
                    } else {
                        fail(null, data.reason);
                    }
                }, function (e) {
                    fail(e, null);
                });
            } else if (vo.type === "ftjc") {
                CAPIWS.callFunction({plugin: "ftjc", name: "load_key", arguments: [vo.cardUID]}, function (event, data) {
                    if (data.success) {
                        var id = data.keyId;
                        CAPIWS.callFunction({name: "change_pin", plugin: "ftjc", arguments: [id, '1']}, function (event, data) {
                            if (data.success) {
                                success();
                            } else {
                                fail(null, data.reason);
                            }
                        }, function (e) {
                            fail(e, null);
                        });
                    } else {
                        fail(null, data.reason);
                    }
                }, function (e) {
                    fail(e, null);
                });
            }
        }
    },
    createPkcs7: function(id, data, timestamper, success, fail, detached, isDataBase64Encoded){
        var data64;
        if(isDataBase64Encoded === true){
            data64 = data
        }else {
            data64 = Base64.encode(data);
        }
        if(detached === true){
            detached = 'yes';
        } else {
            detached = 'no';
        }
        CAPIWS.callFunction({plugin: "pkcs7", name: "create_pkcs7", arguments: [data64, id, detached]}, function (event, data) {
            if (data.success) {
                var pkcs7 = data.pkcs7_64;
                if(timestamper){
                    var sn = data.signer_serial_number;
                    timestamper(data.signature_hex, function(tst){
                        CAPIWS.callFunction({plugin:"pkcs7", name:"attach_timestamp_token_pkcs7", arguments:[pkcs7, sn, tst]},function(event, data){
                            if(data.success){
                                var pkcs7tst = data.pkcs7_64;
                                success(pkcs7tst, data.signature_hex);
                            } else {
                                fail(null, data.reason);
                            }
                        }, function (e) {
                            fail(e, null);
                        });
                    }, fail);
                } else {
                    success(pkcs7, data.signature_hex);
                }                
            } else {
                console.log(data)
                fail(null, data.reason);
            }
        }, function (e) {
            fail(e, null);
        });
    },
    _getX500Val: function (s, f) {
        var res = s.splitKeep(/,[A-Z]+=/g, true);
        for (var i in res) {
            var n = res[i].search((i > 0 ? "," : "") + f + "=");
            if (n !== -1) {
                return res[i].slice(n + f.length + 1 + (i > 0 ? 1 : 0));
            }
        }
        return "";
    },
    _findPfxs2: function (itemIdGen, itemUiGen, items, errors, callback) {
        var itmkey0;
        CAPIWS.callFunction({plugin: "pfx", name: "list_all_certificates"}, function (event, data) {
            if (data.success) {
                for (var rec in data.certificates) {
                    var el = data.certificates[rec];
                    var x500name_ex = el.alias.toUpperCase();
                    x500name_ex = x500name_ex.replace("1.2.860.3.16.1.1=", "INN=");
                    x500name_ex = x500name_ex.replace("1.2.860.3.16.1.2=", "PINFL=");
                    var vo = {
                        disk: el.disk,
                        path: el.path,
                        name: el.name,
                        alias: el.alias,
                        serialNumber: EIMZOClient._getX500Val(x500name_ex, "SERIALNUMBER"),
                        validFrom: new Date(EIMZOClient._getX500Val(x500name_ex, "VALIDFROM")
                            .replace(/\./g, "-").replace(/ /g, "T")),
                        validTo: new Date(EIMZOClient._getX500Val(x500name_ex, "VALIDTO")
                            .replace(/\./g, "-").replace(/ /g, "T")),

                        CN: EIMZOClient._getX500Val(x500name_ex, "CN"),
                        TIN: (EIMZOClient._getX500Val(x500name_ex, "INN") ? EIMZOClient._getX500Val(x500name_ex, "INN") : EIMZOClient._getX500Val(x500name_ex, "UID")),
                        UID: EIMZOClient._getX500Val(x500name_ex, "UID"),
                        PINFL: EIMZOClient._getX500Val(x500name_ex, "PINFL"),
                        O: EIMZOClient._getX500Val(x500name_ex, "O"),
                        T: EIMZOClient._getX500Val(x500name_ex, "T"),
                        type: 'pfx'
                    };
                    if (!vo.TIN && !vo.PINFL)
                        continue;
                    var itmkey = itemIdGen(vo,rec);
                    if (!itmkey0) {
                        itmkey0 = itmkey;
                    }
                    var itm = itemUiGen(itmkey, vo);
                    items.push(itm);
                }
            } else {            
                errors.push({r: data.reason});
            }
            callback(itmkey0);
        }, function (e) {
            errors.push({e: e});
            callback(itmkey0);
        });
    },
    _findTokens2: function (itemIdGen, itemUiGen, items, errors, callback) {
        var itmkey0;
        CAPIWS.callFunction({plugin: "ftjc", name: "list_all_keys", arguments:['']}, function (event, data) {
            if (data.success) {
                for (var rec in data.tokens) {
                    var el = data.tokens[rec];
                    var x500name_ex = el.info.toUpperCase();
                    x500name_ex = x500name_ex.replace("1.2.860.3.16.1.1=", "INN=");
                    x500name_ex = x500name_ex.replace("1.2.860.3.16.1.2=", "PINFL=");
                    var vo = {
                        cardUID: el.cardUID,
                        statusInfo: el.statusInfo,
                        ownerName: el.ownerName,
                        info: el.info,
                        serialNumber: EIMZOClient._getX500Val(x500name_ex, "SERIALNUMBER"),
                        validFrom: new Date(EIMZOClient._getX500Val(x500name_ex, "VALIDFROM")),
                        validTo: new Date(EIMZOClient._getX500Val(x500name_ex, "VALIDTO")),
                        CN: EIMZOClient._getX500Val(x500name_ex, "CN"),
                        TIN: (EIMZOClient._getX500Val(x500name_ex, "INN") ? EIMZOClient._getX500Val(x500name_ex, "INN") : EIMZOClient._getX500Val(x500name_ex, "UID")),
                        UID: EIMZOClient._getX500Val(x500name_ex, "UID"),
                        PINFL: EIMZOClient._getX500Val(x500name_ex, "PINFL"),
                        O: EIMZOClient._getX500Val(x500name_ex, "O"),
                        T: EIMZOClient._getX500Val(x500name_ex, "T"),
                        type: 'ftjc'
                    };
                    if (!vo.TIN && !vo.PINFL)
                        continue;
                    var itmkey = itemIdGen(vo,rec);
                    if (!itmkey0) {
                        itmkey0 = itmkey;
                    }
                    var itm = itemUiGen(itmkey, vo);
                    items.push(itm);
                }
            } else {            
                errors.push({r: data.reason});
            }
            callback(itmkey0);
        }, function (e) {
            errors.push({e: e});
            callback(itmkey0);
        });
    }
};

window.EIMZOClient = EIMZOClient;
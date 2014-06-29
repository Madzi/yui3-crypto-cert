/**
@module X509
@submodule X509.Store
*/
YUI.add('x509-store', function (Y) {

    /**
    @class Store
    @namespace X509
    @constructor
    */
    Y.namespace('X509').Store = Y.Base.create('x509-store', Y.Base, [], {
        _store: null,

        _opened: null,

        initializer: function (config) {
            var idx,
                store,
                certList;

            if (config && config.store) {
                this._opened = false;
                this._store = config.store;
                store = this._store;

                store.Open();
                this.set('name', store.Name);
                this.set('location', store.Location);
                certList = this.getCertificates();
                for (idx = 1; idx <= store.Certificates.Count; idx++) {
                    certList.add(new Y.X509.Certificate({ certificate: store.Certificates.Item(idx) }));
                }
                store.Close();
            }
        },

        destructor: function () {
            if (this._opened) {
                this._store.Close();
            }
        },

        /**
        Retrieves the status of the sertificate store that this object represents.

        @method isOpened
        @return {Boolean} the status
        */
        isOpened: function () {
            return this._opened || false;
        },

        /**
        Adds a certificate object to the open certificate store.

        @method add
        @param certificate {X509.Certificate} a certificate
        **/
        "add": function (certificate) {
            if (this._store && this._opened) {
                if (Y.X509.isCertificate(certificate)) {
                    this._store.Add(certificate._certificate);
                } else {
                    this._store.Add(certificate);
                }
            }
        },

        /**
        Closes an open certificate store.
        The close method is not supported by CAPICOM 2.0.0.3 and earlier.

        @method close
        */
        "close": function () {
            if (this._store && this._opened) {
                this._opened = false;
                this._store.Close();
            }
        },

        /**
        Deletes the certificate store represented by the current store object.
        The delete method is not supported by CAPICOM 2.0.0.3 and earlier.

        @method delete
        */
        "delete": function () {
            if (this._store) {
                this._store.Delete();
            }
        },

        /**
        Exports the store of an encoded BLOB.

        @method export
        @param saveAs {Number} the format for the export operation
        @param encodingType {Number} the encoding type of the exported store
        return {String} a string that contains the certificates in the store in the specified encoding form
        */
        "export": function (saveAs, encodingType) {
            var _saveAs         = saveAs || Y.X509.CAPICOM.CAPICOM_STORE_SAVE_AS_SERIALIZED,
                _encodingType   = encodingType || Y.X509.CAPICOM.CAPICOM_ENCODE_BASE64;

            if (this._store) {
                return this._store.Export(_saveAs, _encodingType);
            }
        },

        /**
        Imports a previously exported store.

        @method import
        @param encodedStore {String} the string that contains the encoded certificates to be imported
        */
        "import": function (encodedStore) {
            if (this._store) {
                this._store.Import(encodedStore);
            }
        },

        /**
        Imports certificate objects from a file into the store.

        @method load
        @param fileName {String} the string that contains the path to a .cer, .sst, .spc, .p7s or .pfx file, or any Authenticode signed file
        @param password {String} the string that contains the plaintext password to the file
        @param keyStorageFlag {Number} the parameter defines key storage flags
        */
        "load": function (fileName, password, keyStorageFlag) {
            if (this._store) {
                if (password) {
                    this._store.Load(fileName, password, keyStorageFlag);
                } else {
                    this._store.Load(fileName);
                }
            }
        },

        /**
        Opens a certificate store.

        @method open
        @param location {Number} the location of the store to be opened
        @param name {String} the name of the systen certificate store to be opened
        @param mode {Number} the open mode of the store
        */
        "open": function (location, name, mode) {
            var _location   = location || Y.X509.CAPICOM.CAPICOM_CURRENT_USER_STORE,
                _name       = name || Y.X509.CAPICOM.CAPICOM_MY_STORE,
                _mode       = mode || Y.X509.CAPICOM.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED;

            if (this._store) {
                this._store.Open(_location, _name, _mode);
                this.set('location', _location);
                this.set('name', _name);
            }
        },

        /**
        Removes a certificate object from an open store.

        @method remove
        @param certificate {X509.Certificate} a certificate
        */
        "remove": function (certificate) {
            if (this._store && this._opened) {
                if (Y.X509.isCertificate(certificate)) {
                    this._store.Remove(certificate._certificate);
                } else {
                    this._store.Remove(certificate);
                }
            }
        },

        /**
        Retrieves the Certificates collection of the store.

        @method getCertificates
        @return {X509.CertificateList}
        */
        getCertificates: function () {
            return this.get('certificates');
        },

        /**
        Retrieves the location of the certificate store that this object represents.

        @method getLocation
        @return {String} the location of the certificate store
        */
        getLocation: function () {
            return this.get('location');
        },

        /**
        Retrieves the name of the certificate store that this object represents.

        @method getName
        @return {String} the name of the certificate store
        */
        getName: function () {
            return this.get('name');
        }
    }, {
        ATTRS: {
            /**
            The certificates collection of the store.
            @atribute certificates

            @type X509.CertificateList
            */
            certificates: {
                valueFn  : function () {
                    return new Y.X509.CertificateList();
                },
                validator: function (val) {
                    return val instanceof Y.X509.CertificateList;
                }
            },

            /**
            The location of the certificate store that this object represents.
            The location property is not supported by CAPICOM 2.0.0.3 and earlier.

            @attribute location
            @type String
            */
            location: {
                value    : null,
                validator: Y.Lang.isString
            },

            /**
            The name of certificate store that this object represents.
            The name property is not supported by CAPICOM 2.0.0.3 and earlier.

            @attribute name
            @type String
            */
            name: {
                value    : null,
                validator: Y.Lang.isString
            }
        }
    });

    Y.namespace('X509').isStore = function (val) {
        return val instanceof Y.X509.Store;
    };

}, '1.0', {
    requires: ['base', 'x509-certifiacte', 'x509-capicom']
});
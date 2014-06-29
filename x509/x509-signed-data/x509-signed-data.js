YUI.add('x509-signed-data', function (Y) {

    Y.namespace('X509').SignedData = Y.Base.create('x509-signed-data', Y.Base, [], {
        _signedData: null,

        initializer: function (config) {
            var idx,
                signedData,
                certList,
                signList;

            if (config && config.signedData) {
                this._signedData = config.signedData;
                signedData = this._signedData;
                certList = this.get('certificates');
                for (idx = 1; idx <= signedData.Certificates.Count; idx++) {
                    certList.add(new Y.X509.Certificate({ certificate: signedData.Certificates.Item(idx) }));
                }
                this.set('content', signedData.Content);
                signList = this.get('signers');
                for (idx = 1; idx <= signedData.Signers.Count; idx++) {
                    signList.add(new Y.X509.Signer({ signer: signedData.Signers.Item(idx) }));
                }
            }
        },

        /**
        @method coSign
        @param signer {X509.Signer} the signer of the data
        @param encodingType {Number} how the signed data to be encoded
        @return
        */
        "coSign": function (signer, encodingType) {
            var _signer = Y.X509.isSigner(signer) ? singer._signer : signer;

            if (this._signedData) {
                if (Y.Lang.isValue(signer)) {
                    if (Y.Lang.isValue(encodingType)) {
                        return this._signedData.CoSign(_signer, encodingType);
                    }
                    return this._signedData.CoSign(_signer);
                }
                return this._signedData.CoSign();
            }
            return null;
        },

        /**
        @method sign
        @param signer {X509.Signer} the signer of the data
        @param detached {Boolean} the data to be signed is detached?
        @param encodingType {Number} how the signed data to be encoded
        @return {String} the encoded< signed data
        */
        "sign": function (signer, detached, encodingType) {
            var _singer = Y.X509.isSigner(signer) ? signer._signer : signer;

            if (this._signedData) {
                if (Y.Lang.isValue(signer)) {
                    if (Y.Lang.isValue(detached)) {
                        if (Y.Lang.isValue(encodingType)) {
                            return this._signedData.Sign(_signer, detached, encodingType);
                        }
                        return this._signedData.Sing(_signer, detached);
                    }
                    return this._signedData.Sign(_signer);
                }
                return this._signedData.Sign();
            }
            return null;
        },

        /**
        @method verify
        @param signedMessage {String} a string that contains the signed message to be verified
        @param detached {Boolean} the data to be signed is detached
        @param verifyFlag {Number} the verification policy
        @return {String} the encoded, signed data
        */
        "verify": function (signedMessage, detached, verifyFlag) {
            if (this._signedData) {
                if (Y.Lang.isValue(detached)) {
                    if (Y.Lang.isValue(verifyFlag)) {
                        return this._signedData.Verify(signedMessage, detached, verifyFlag);
                    }
                    return this._signedData.Verify(signedMessage, detached);
                }
                return this._signedData.Verify(signedMessage);
            }
            return null;
        },

        /**
        @method getCertificates
        @return {X509.CertificateList}
        */
        getCertificates: function () {
            return this.get('certificates');
        },

        /**
        @method getContent
        @return {String}
        */
        getContent: function () {
            return this.get('content');
        },

        /**
        @method setContent
        @param content {String}
        */
        setContent: function (content) {
            if (_signedData) {
                this._signedData.Content = content;
            }
            this.set('content', content);
        },

        /**
        @method getSigners
        @return {X509.SignerList}
        */
        getSigners: function () {
            return this.get('signers');
        }
    }, {
        ATTRS: {
            /**
            The certificates collection of the signed data.

            @attribute certificates
            @type X509.CertificateList
            */
            certificates: {
                valueFn: function () {
                    return new Y.X509.CertificateList();
                },
                validator: function (val) {
                    return val instanceof Y.X509.CertificateList;
                }
            },

            /**
            Data to be signed.

            @attribute content
            @type String
            */
            content: {
                value: null
            },

            /**
            The signers collection that represents the signature creators of the data.

            @attribute signers
            @type X509.SignerList
            */
            signers: {
                valueFn: function () {
                    return new Y.X509.SignerList();
                },
                validator: function (val) {
                    return val instanceof Y.X509.SignerList;
                }
            }
        }
    });

}, '1.0', {
    requires: ['x509-certificate', 'x509-signer']
});
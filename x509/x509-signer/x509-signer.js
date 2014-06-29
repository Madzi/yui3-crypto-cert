YUI.add('x509-signer', function (Y) {

    Y.namespace('X509').Signer = Y.Base.create('x509-model-signer', Y.Model, [], {
        _signer: null,

        initializer: function (config) {
            var signer;

            if (config && config.signer) {
                this._signer = config.signer;
                signer = this._signer;
                this.set('authenticatedAttributes', signer.AuthenticatedAttributes)
                this.set('certificate', signer.Certificate);
                this.set('chain', signer.Chain);
                this.set('options', signer.Options);
            }
        },

        /**
        @method load
        */
        "load": function (fileName, password) {
            if (this._signer) {
                if (password) {
                    return this._signer.Load(fileName, password);                    
                } else {
                    return this._signer.Load(fileName);
                }
            }
        },

        /**
        @method getAuthenticatedAttributes
        */
        getAuthenticatedAttributes: function () {
            return this.get('authenticatedAttributes');
        },

        /**
        @method getCertificate
        */
        getCertificate: function () {
            return this.get('certificate');
        },

        /**
        @method setCertificate
        */
        setCertificate: function (certificate) {
            var _certificate;

            if (Y.X509.isCertificate(certificate)) {
                _certificate = certificate;
            } else {
                _certificate = new Y.X509.Certificate({ certificate: certificate });
            }
            this.set('certificate', _certificate);
            this._signer.Certificate = _certificate._certificate;
        },

        /**
        @method getChain
        */
        getChain: function () {
            return this.get('chain');
        },

        /**
        @method getOptions
        */
        getOptions: function () {
            return this.get('options');
        },

        /**
        @method setOptions
        */
        setOptions: function (options) {
            this.set('options', options);
        }
    }, {
        ATTRS: {
            /**
            The collection of authenticated attributes.

            @attribute authenticatedAttributes
            */
            authenticatedAttributes: {
                value: null
            },

            /**
            The certificate object that represents the certificate of a signer of the data.
            */
            certificate: {
                value: null,
                validator: Y.X509.isCertificate
            },

            /**
            The chain of the signer.

            @attribute chain
            */
            chain: {
                value: null
            },

            /**
            Sets or retrieves the signer`s certificate options.

            @attribute options
            */
            options: {
                value: null
            }
        }
    });

    Y.namespace('X509').isSigner = function (val) {};

    Y.namespace('X509').SignerList = Y.Base.create('x509-model-list-signer', Y.ModelList, [], {
        model: Y.X509.Signer
    });

}, '1.0', {
    requires: ['model', 'model-list', 'x509-certificate']
});
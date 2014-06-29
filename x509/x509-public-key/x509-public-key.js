YUI.add('x509-public-key', function (Y) {

    Y.namespace('X509').PublicKey = Y.Base.create('x509-public-key', Y.Base, [], {
        _publicKey: null,

        initializer: function (config) {
            var pk;

            if (config && config.publicKey) {
                this._publicKey = config.publicKey;
                pk = this._publicKey;
                this.set('algorithm', new Y.X509.OID({ oid: pk.Algorithm }));
                this.set('encodedKey', new Y.X509.EncodedData({ encodedData: pk.EncodedKey }));
                this.set('encodedParameters', new Y.X509.EncodedData({ encodedData: pk.EncodedParameters }));
                this.set('value', pk.Value);
            }
        },

        /**
        @method getAlgorithm
        @return {X509.OID}
        */
        getAlgorithm: function () {
            return this.get('algorithm');
        },

        /**
        @method encodedKey
        @return {X509.EncodedData}
        */
        getEncodedKey: function () {
            return this.get('encodedKey');
        },

        /**
        @method getEncodedParameters
        @return {X509.EncodedData}
        */
        getEncodedParameters: function () {
            return this.get('encodedParameters');
        },

        /**
        @method getLength
        @return {Number}
        */
        getLength: function () {
            return this.get('length');
        }
    }, {
        ATTRS: {
            /**
            The identifies the algorithm used by the public key.

            @attribute algorithm
            @type X509.OID
            */
            algorithm: {
                value: null,
                validator: Y.X509.isOID
            },

            /**
            Object to provides access to the value of the public key.

            @attribute encodedKey
            @type X509.EncodedData
            */
            encodedKey: {
                value: null,
                valodator: Y.X509.isEncodedData
            },

            /**
            Object to provides access to the parameters of the public key algorithm.

            @attribute encodedParameters
            @type X509.EncodedData
            */
            encodedParameters: {
                value: null,
                validator: Y.X509.isEncodedData
            },

            /**
            Length of the public key in bits.

            @attribute length
            @type Number
            */
            length: {
                value: null,
                validator: Y.Lang.isNumber
            }
        }
    });

}, '1.0', {
    requires: ['x509-oid', 'x509-encoded-data']
});
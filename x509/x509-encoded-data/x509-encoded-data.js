YUI.add('x509-encoded-data', function (Y) {

    Y.namespace('X509').EncodedData = Y.Base.create('x509-encoded-data', Y.Base, [], {
        _encodedData: null,

        initializer: function (config) {
            var ed;

            if (config && config.encodedData) {
                this._encodedData = config.encodedData;
                ed = this._encodedData;
                this.set('value', ed.Value);
            }
        },

        /**
        @method decoder
        @return {Object}
        */
        "decoder": function () {
            if (this._encodedData) {
                return this._encodedData.Decoder();
            }
            return null;
        },

        /**
        @method format
        @param multiLines {Boolean} an indicator whether the returned string contains multiple lines
        @return {String} a human-readable string that represents the encoded data
        */
        "format": function (multiLines) {
            if (this._encodedData) {
                if (Y.Lang.isValue(multiLines)) {
                    return this._encodedData.Format(multiLines);
                }
                return this._encodedData.Format();
            }
            return null;
        },

        /**
        @method getValue
        @return {String}
        */
        getValue: function () {
            return this.get('value');
        }
    }, {
        ATTRS: {
            /**
            @attribute value
            @type String
            */
            value: {
                value: null,
                validator: Y.Lang.isString
            }
        }
    });

    Y.namespace('X509').isEncodedData = function(val) {
        return val instanceof Y.X509.EncodedData;
    };

}, '1.0', {});
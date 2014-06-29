YUI.add('x509-oid', function (Y) {

    Y.namespace('X509').OID = Y.Base.create('x509-oid', Y.Base, [], {
        _oid: null,

        initialized: function (config) {
            var oid;

            if (config && config.oid) {
                this._oid = config.oid;
                oid = this._oid;
                this.set('friendlyName', oid.FriendlyName);
                this.set('name', oid.Name);
                this.set('value', oid.Value);
            }
        },

        getFriendlyName: function () {
            return this.get('friendlyName');
        },

        setFriendlyName: function (friendlyName) {
            if (this._oid) {
                this._oid.FriendlyName = friendlyName;
                this.set('friendlyName', friendlyName);
            }
        },

        getName: function () {
            return this.get('name');
        },

        setName: function (name) {
            if (this._oid) {
                this._oid.Name = name;
                this.set('name', name);
            }
        },

        getValue: function () {
            return this.get('value');
        },

        setValue: function (value) {
            if (this._oid) {
                this._oid.Value = value;
                this.set('value', value);
            }
        }
    }, {
        ATTRS: {
            friendlyName: {
                value: null
            },
            name: {
                value: null
            },
            value: {
                value: null
            }
        }
    });

    Y.namespace('X509').isOID = function(val) {
        return val instanceof Y.X509.OID;
    };

}, '1.0', {
    requires: ['base']
});
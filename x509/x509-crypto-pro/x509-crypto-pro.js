YUI.add('x509-crypto-pro', function (Y) {

    Y.namespace('X509').CryptoPro = Y.Base.create('x509-crypto-pro', Y.Base, [], {
        _plugin: null,

        _objCreate: function (name) {
            if (this._plugin) {
                if (Y.UA.ie > 0) {
                    return new ActiveXObject(name);
                } else {
                    return this._plugin.CreateObject(name);
                }
            }
            return null;
        },

        initializer: function () {
            var about,
                node = Y.one('#cadesplugin');

            if (node) {
                this._plugin = node.getDOMNode();
                this._plugin.setAttribute('value', 0);
                try {
                    about = this._objCreate('CAdESCOM.About');
                    this.set('loaded', true);
                    this.set('enabled', true);
                    this.set('worked', true);
                    this.set('version', about.Version);
                    this._plugin.setAttribute('value', 1);
                } catch (err) {
                    about = navigator.mimeTypes['application/x-cades'];
                    if (about) {
                        this.set('loaded', true);
                        this._plugin = about.enabledPlugin;
                        if (this._plugin) {
                            this.set('enabled', true);
                        }
                    }
                }
            }
        },

        create: function (objName) {
            var obj;

            try {
                obj = this._objCreate(objName);
            } catch (err) {
                Y.error(err);
                return null;
            }

            return obj;
        },

        getStore: function () {
            var store = this.create('CAPICOM.store');

            return store && new Y.X509.Store({ store: store }) || null;
        },

        getSigner: function () {
            return this.create('CAdESCOM.CPSigner');
        },

        getCadesSignedData: function () {
            return this.create('CAdESCOM.CadesSignedData');
        },

        isLoaded: function () {
            return this.get('loaded');
        },

        getLoaded: function () {
            return this.get('loaded');
        },

        isEnabled: function () {
            return this.get('enabled');
        },

        getEnabled: function () {
            return this.get('enabled');
        },

        isWorked: function () {
            return this.get('worked');
        },

        getWorked: function () {
            return this.get('worked');
        },

        isActual: function () {
            return "1.5.1500" <= this.get('version');
        },

        getVersion: function () {
            return this.get('version');
        },

        getTsaAddress: function () {
            return this.get('tsaAddress');
        }
    }, {
        ATTRS: {
            loaded: {
                value    : null,
                validator: Y.Lang.isBoolean
            },
            enabled: {
                value    : null,
                validator: Y.Lang.isBoolean
            },
            worked: {
                value    : null,
                validator: Y.Lang.isBoolean
            },
            version: {
                value    : null,
                validator: Y.Lang.isString
            },
            tsaAddress: {
                value    : 'http://cryptopro.ru/tsp',
                validator: Y.Lang.isString
            }
        }
    });

}, '1.0', {
    requires: ['node', 'x509-store']
});
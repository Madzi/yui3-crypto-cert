/**
@module X509
@submodule X509.Certificate
*/
YUI.add('x509-certificate', function (Y) {

    /**
    @class Certificate
    @namespace X509
    @uses Model
    @constructor
    */
    Y.namespace('X509').Certificate = Y.Base.create('x509-model-certificate', Y.Model, [], {
        /**
        Original certificate.

        @property _certificate
        @private
        */
        _certificate: null,

        initializer: function (config) {
            var certificate;

            if (config && config.certificate) {
                this._certificate = config.certificate;
                certificate = this._certificate;
                this.set('id', parseInt(certificate.serialNumber, 16));
                this.set('archived', certificate.Archived);
                this.set('issuerName', certificate.issuerName);
                this.set('privateKey', certificate.PrivateKey);
                this.set('serialNumber', certificate.SerialNumber);
                this.set('subjectName', certificate.SubjectName);
                this.set('tumbprint', certificate.Tumbprint);
                this.set('validFromDate', Y.Date.parse(certificate.ValidFromDate));
                this.set('validToDate', Y.Date.parse(certificate.ValidToDate));
                this.set('version', certificate.Version);
            },

            /**
            @method basicConstraints
            */
            "basicConstraints": function () {
                return this._certificate && this._certificate.BasicConstraints() || null;
            },

            "display": function () {
                return this._certificate && this._certificate.Display() || null;
            },

            "export": function () {
                return this._certificate && this._certificate.Export() || null;
            },

            "extendedKeyUsage": function () {
                return this._certificate && this.certificate.ExtendedKeyUsage() || null;
            },

            "extendedProperties": function () {
                return this._certificate && this._certificate.ExtendedProperties() || null;
            },

            "extensions": function () {
                return this._certificate && this._certificate.Extensions() || null;
            },

            "getInfo": function () {
                return this._certificate && this._certificate.GetInfo() || null;
            },

            "hasPrivateKey": function () {
                return this._certificate && this._certificate.HasPrivateKey() || null;
            },

            "import": function () {
                return this._certificate && this._certificate.Import() || null;
            },

            "isValid": function () {
                return this._certificate && this._certificate.IsValid() || null;
            },

            "keyUsage": function () {
                return this._certificate && this._certificate.KeyUsage() || null;
            },

            "load": function () {
                return this._certificate && this._certificate.Load() || null;
            },

            "publicKey": function () {
                return this._certificate && this._certificate.PublicKey() || null;
            },

            "save": function () {
                return this._certificate && this._certificate.Save() || null;
            },

            "template": function () {
                return this._certificate && this._certificate.Template() || null;
            },

            getId: function () {
                return this.get('id');
            },

            isArchived: function () {
                return this.get('archived');
            },

            getArchived: function () {
                return this.get('archived');
            },

            getIssuerName: function () {
                return this.get('issuerName');
            },

            getPrivateKey: function () {
                return this.get('privateKey');
            },

            getSerialNumber: function () {
                return this.get('serialNumber');
            },

            getSubjectName: function () {
                return this.get('subjectName');
            },

            getTumbprint: function () {
                return this.get('tumbprint');
            },

            /**
            @method getValidFromDate
            @return {Date}
            */
            getValidFromDate: function () {
                return this.get('validFromDate');
            },

            /**
            @method getValidToDate
            @return {Date}
            */
            getValidToDate: function () {
                return this.get('validToDate');
            },

            /**
            @method getVersion
            @return {Number}
            */
            getVersion: function () {
                return this.get('version');
            }
        },
    }, {
        ATTRS: {
            /**
            @attribute archived
            @type Boolean
            */
            archived: {
                value    : null,
                validator: Y.Lang.isBoolean
            }.
            /**
            @attribute issuerName
            @type String
            */
            issuerName: {
                value    : null,
                validator: Y.Lang.isString
            },
            /**
            @attribute privateKey
            */
            privateKey: {
                value    : null
            },
            /**
            @attribute serialNumber
            @type String
            */
            serialNumber: {
                value    : null,
                validator: Y.Lang.isString
            },
            /**
            @attribute subjectName
            @type String
            */
            subjectName: {
                value    : null,
                validator: Y.Lang.isString
            },
            /**
            @attribute tumbprint
            @type String
            */
            tumbprint: {
                value    : null,
                validator: Y.Lang.isString
            },
            /**
            @attribute validFromDate
            @type Date
            */
            validFromDate: {
                value    : null,
                validator: Y.Lang.isDate
            },
            /**
            @attribute validToDate
            @type Date
            */
            validToDate: {
                value    : null,
                validator: Y.Lang.isDate
            },
            /**
            @attribute version
            @type Number
            */
            version: {
                value    : null,
                validator: Y.Lang.isNumber
            }
        }
    });

    /**
    @class CertificateList
    @namespace X509
    @uses ModelList
    @constructor
    */
    Y.namespace('X509').CertificateList = Y.Base.create('x509-model-list-certificate', Y.ModelList, [], {
        model: Y.X509.Certificate
    });

    /**
    @class X509

    @method isCertificate
    @static
    */
    Y.namespace('X509').isCertificate = function (val) {
        return val instanceof Y.X509.Certificate;
    };

}, '1.0', {
    requires: ['model', 'model-list', 'datatype-date']
});
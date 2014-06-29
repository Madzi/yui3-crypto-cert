YUI.add('x509-capicom', function (Y) {

    Y.namespace('X509').CAPICOM = (function () {
        return {
            /**
            The store is a memory store. Any changes in the contents of the store are not persisted.
            */
            CAPICOM_MEMORY_STORE                : 0,

            /**
            The store is a local machine store. Local machine stores can be read/write stores only if the user has read/write permissions.
            If the user has read/write permissions and if the store is opened read/write, then changes in the contents of the store are persisted.
            */
            CAPICOM_LOCAL_MACHINE_STORE         : 1,

            /**
            The store is a current user store. A current user store may be read/write store.
            If it is, changes in the contents of the store are persisted.
            */
            CAPICOM_CURRENT_USER_STORE          : 2,

            /**
            The store is an Active Directory store.
            Active Directory stores can be opened only in read-only mode.
            Certificates cannot be added to or removed from Active Directory stores.
            */
            CAPICOM_ACTIVE_DIRECTORY_USER_STORE : 3,

            /**
            Stores support smart card-based certificate stores. The store is the group of present smart cards.
            Introduced in CAPICOM 2.0
            */
            CAPICOM_SMART_CARD_USER_STORE       : 4,

            /**
            CA store. This store is used to store intermediate CA certificates.
            */
            CAPICOM_CA_STORE    : 'CA',

            /**
            My store. This store is used for a user's personal certificates.
            */
            CAPICOM_MY_STORE    : 'My',

            /**
            AddressBook store. This store is used to keep the certificates of others.
            */
            CAPICOM_OTHER_STORE : 'Other',

            /**
            Root store. This store is used to store the root CA and self-signed, trusted certificates.
            */
            CAPICOM_ROOT_STORE  : 'Root',

            /**
            Open the store in read-only mode.
            */
            CAPICOM_STORE_OPEN_READ_ONLY        : 0,

            /**
            Open the store in read/write mode.
            */
            CAPICOM_STORE_OPEN_READ_WRITE       : 1,

            /**
            Open the store in read/write mode if the user has read/write permissions.
            If the user does note have read/write permissions, open the store in read-only mode.
            */
            CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED  : 2,

            /**
            Open existing stores only; do not create a new store.
            Introduced by CAPICOM 2.0
            */
            CAPICOM_STORE_OPEN_EXISTING_ONLY    : 128,

            /**
            Include archived certificates when using the store.
            Introduced by CAPICOM 2.0
            */
            CAPICOM_STORE_OPEN_INCLUDE_ARCHIVED : 256,

            /**
            The store is saved in serialized format.
            */
            CAPICOM_STORE_SAVE_AS_SERIALIZED: 0,

            /**
            The store is saved in PKCS #7 format.
            */
            CAPICOM_STORE_SAVE_AS_PKCS7     : 1,

            /**
            Data is saved as a base64-encoded string or a pure binary sequence.
            This encoding type is used only for input data that has an unknown encoding type.
            Introduced in CAPICOM 2.0
            */
            CAPICOM_ENCODE_ANY      : 0xffffffff,

            /**
            Data is saved as based64-encoding string.
            */
            CAPICOM_ENCODE_BASE64   : 0,

            /**
            Data is saved as a pure binary sequence.
            */
            CAPICOM_ENCODE_BINARY   : 1,

            /**
            Default key storage.
            */
            CAPICOM_KEY_STORAGE_DEFAULT         : 0,

            /**
            The key is exportable.
            */
            CAPICOM_KEY_STORAGE_EXPORTABLE      : 1,

            /**
            The key is user protected.
            */
            CAPICOM_KEY_STORAGE_USER_PROTECTED  : 2,

            /**
            Only the signature is checked.
            */
            CAPICOM_VERIFY_SIGNATURE_ONLY             : 0,

            /**
            Both the signature and the validaity of the certificate used to create the signature are checked.
            */
            CAPICOM_VERIFY_SIGNATURE_AND_CERTIFICATE  : 1
        };
    })();

}, '1.0');
const CryptoJS = require('crypto-js');

export class CustomJsFunctions {
    public decrypt = (str) => {
        const bytes = CryptoJS.AES.decrypt(str, process.env.REACT_APP_PK);
        return bytes.toString(CryptoJS.enc.Utf8);
    }
}
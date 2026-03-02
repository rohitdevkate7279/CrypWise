// import CryptoJS from 'crypto-js';

const INITIALIZATION_VECTOR = '61ZeMnnn9s9MsgvWNguI30yMrtOkDSGt' 

// function getIV(key: string): CryptoJS.lib.WordArray {
//   return CryptoJS.enc.Utf8.parse(key.slice(0,16));
// }

// function getKey(key:string): CryptoJS.lib.WordArray {
//   return CryptoJS.enc.Utf8.parse(key.slice(0,32));
// }

export function EncryptionInterceptor(
  data: any,
  key: string,
  isEncrypt: boolean
): Promise<any> {
  const promise = new Promise<any>((resolve, reject) => {
    // if (isEncrypt) {
    //   try {
    //     var encrypted = CryptoJS.AES.encrypt(
    //       CryptoJS.enc.Utf8.parse(JSON.stringify(data)),getKey(INITIALIZATION_VECTOR),{
    //       iv: getIV(key)
    //     });
    //     resolve(CryptoJS.enc.Base64.stringify(encrypted.ciphertext));
    //   } catch (e) {
    //     reject(e);
    //   }
    // } else {
      return resolve(data);
    // }
  });
  return promise;
}

export function DecryptionInterceptor(
  cipherData: any,
  isEncrypted: boolean,
  key: string,
): Promise<any> {
  const promise = new Promise<any>((resolve, reject) => {
    // if (isEncrypted) {
    //   const base64DecodedData = CryptoJS.enc.Base64.parse(cipherData)
    //   try {
    //     const decipher = CryptoJS.AES.decrypt(base64DecodedData.toString(CryptoJS.enc.Base64), getKey(INITIALIZATION_VECTOR), {
    //       iv: getIV(key),
    //       mode: CryptoJS.mode.CBC,
    //       padding: CryptoJS.pad.Pkcs7,
    //     });
    //     const parsedData = CryptoJS.enc.Utf8.stringify(decipher)
    //     resolve(JSON.parse(parsedData));
    //   } catch (e) {
        // reject(e);
    //   }
    // } else {
      return resolve(cipherData);
    // }
  });
  return promise;
}
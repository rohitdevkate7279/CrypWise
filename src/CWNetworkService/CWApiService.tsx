import axios, { AxiosResponse } from "axios";
import { ToastTypeData } from "../CWUtilities/CWScreenSlot.Types";
import { APIHttpMethod, ApiRequest, APIRequestModel } from "./CWAPIModel";
import { EncryptionInterceptor, DecryptionInterceptor } from "./CWAPIHelper";
import { ApiResponse } from "./CWAPIModel";
// import AsyncStorage from "@react-native-async-storage/async-storage";

export enum APIRESPONSE {
    SUCCESS = "200"
}
/**
 * =========================
 * CONFIG
 * =========================
 */

const BASE_URL = "https://crypwise-backend.onrender.com/";
const SECRET_KEY = "1234567890";

/**
 * =========================
 * AXIOS INTERCEPTORS
 * =========================
 */

// BEFORE request is sent
axios.interceptors.request.use(
    async config => {
        // const token = await AsyncStorage.getItem("ACCESS_TOKEN");

        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    error => Promise.reject(error)
);

// AFTER response is received
axios.interceptors.response.use(
    response => {
        console.log("✅ API SUCCESS from interceptors:", response.config.url);
        return response;
    },
    async error => {
        console.log("❌ API ERROR from interceptors:", error?.response?.status);

        if (error?.response?.status === 401) {
            console.log("⚠️ Token expired / Unauthorized");

            // optional:
            // await AsyncStorage.removeItem("ACCESS_TOKEN");
            // navigate to login
        }

        return Promise.reject(error);
    }
);

/**
 * =========================
 * AXIOS CALL (kept here)
 * =========================
 */

async function axiosPostCall<T, R>(
    data: ApiRequest | undefined,
    requestModel: APIRequestModel<T>,
): Promise<ApiResponse<R> | undefined> {
    try {
        const finalURl = getFinalURL(requestModel.busiCode);
        const header = await getHeaderValue();
        const httpMethod = getHttpMethod(requestModel);

        const response: AxiosResponse<ApiResponse<R>> = await axios({
            method: httpMethod,
            url: finalURl,
            data: httpMethod === APIHttpMethod.GET ? undefined : data,
            headers: header,
            timeout: 150000,
        });

        return response.data;
    } catch (error: any) {
        console.log("Api Error", error, requestModel.busiCode);
        throw error;
    }
}

/**
 * =========================
 * HELPERS
 * =========================
 */

function getFinalURL(busiCode: string) {
    return BASE_URL + busiCode;
}

async function getHeaderValue() {
    return {
        "Content-Type": "application/json",
        "X-CLIENT-APP-VERSION": "1.0.0",
        // Authorization: `Bearer ${token}`
    };
}

function getHttpMethod(request: APIRequestModel<any>) {
    return request.method ?? APIHttpMethod.POST;
}

function isRequestEncrypted<T>(request: APIRequestModel<T>): boolean {
    return request.isEncrypt !== false;
}

/**
 * =========================
 * MAIN SERVICE
 * =========================
 */

export function ApiService<T, R>(
    request: APIRequestModel<T>,
    onFailure?: () => void,
  ): Promise<R> {
    console.log("API Request:",request);

    return new Promise<R>((resolve, reject) => {  
      // 🚫 Encryption disabled
      const payload = request.busiParams;
  
      axiosPostCall<T, R>(
        payload,
        request,
      )
        .then(response => {
  
          if (!response) {
            reject("Empty response");
            return;
          }
  
          // 🚫 Decryption disabled
          resolve(response as any);
        })
        .catch(err => {
            onFailure?.()
            console.log("FAILURE RESPONSE DATA:", err?.response?.data?.error);
            reject(err?.response?.data?.error);
          });    });
  }
export interface ApiRequest {
    data: string;
  }

  export interface APIRequestModel<T> {
    method?: APIHttpMethod;
    busiCode: string;
    busiParams?: T | any;
    isEncrypt?: boolean | true;
  }


  export interface ApiResponse<R> {
    message?: string;
    status_code?: number;
    data?: R;
  }
  
  export interface ErrorType {
    code: string;
    message: string;
  }
  
  export type ResponseType<R> = R | ErrorType;

  export enum APIHttpMethod {
    GET = "GET",
    POST = "POST",
    PATCH = "PATCH",
    DELETE = "DELETE",
    }
  
  
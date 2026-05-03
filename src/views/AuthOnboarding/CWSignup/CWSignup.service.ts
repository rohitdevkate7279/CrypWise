import { APIHttpMethod } from "../../../CWNetworkService/CWAPIModel";
import { ApiService } from "../../../CWNetworkService/CWApiService";
import { SendSignupResponse, SendSignupRequest } from "./CWSignup.models";

export const signupApi = async (email: string, mpin: string,name:string, phone:string): Promise<SendSignupResponse> => {
  const busiParams: SendSignupRequest = {
    email,
    m_pin: Number.parseInt(mpin, 10),
    name: name,
    phone: phone
  };

  return ApiService<SendSignupRequest, SendSignupResponse>({
    busiCode: "auth/signup",
    method: APIHttpMethod.POST,
    busiParams,
  });
};

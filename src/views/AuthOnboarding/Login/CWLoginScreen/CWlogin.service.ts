import { APIHttpMethod } from "../../../../CWNetworkService/CWAPIModel";
import { ApiService } from "../../../../CWNetworkService/CWApiService";
import type { SendOtpRequest, SendOtpResponse } from "./CWlogin.models";

export const loginApi = async (email: string, mpin: string): Promise<SendOtpResponse> => {
  const busiParams: SendOtpRequest = {
    email,
    m_pin: Number.parseInt(mpin, 10),
  };

  return ApiService<SendOtpRequest, SendOtpResponse>({
    busiCode: "auth/send-otp",
    method: APIHttpMethod.POST,
    busiParams,
  });
};

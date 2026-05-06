import { ApiService } from "../../../../CWNetworkService/CWApiService";
import { SendOtpResponse } from "../CWLoginScreen/CWlogin.models";

export function verifyOtpApi(email: string, otp: string) {
    return ApiService<
      { email: string; otp: number },
      SendOtpResponse
    >({
      busiCode: "auth/verify-otp",
      busiParams: {
        email,
        otp: Number.parseInt(otp, 10),
      },
    });
  };
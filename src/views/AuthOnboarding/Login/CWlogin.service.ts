import { SchematicState } from "../../../CWComponents/CWToast/CWToast.Types";
import { APIHttpMethod } from "../../../CWNetworkService/CWAPIModel";
import { ApiService } from "../../../CWNetworkService/CWApiService";
import { useGlobalState } from "../../../CWUtilities/CWGlobalStateProvider";

export const loginApi = async (email: string, password: string) => {
    const { setToastTypeData } = useGlobalState()

        const payload = {
          email: "test@gmail.com",
          m_pin: 1234,
        };
    
        try {
          const response = await ApiService({
            busiCode: "auth/send-otp",
            method: APIHttpMethod.POST,
            busiParams: payload,
          });
          return response
    
        } catch (error: any) {
          setToastTypeData({
            isVisible: true,
            message: error?.message ?? "",
            semanticState: SchematicState.ERROR,
            viewStyle: { marginBottom: 105 }
          });
          return error?.message ?? ""
        }
      }

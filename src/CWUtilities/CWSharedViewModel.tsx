import { AuthState } from "./CWAuthTypes";

export class CWSharedViewModel {

    private static _instance: CWSharedViewModel;


    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public deeplinkUrl = ""
    public userAuthenticationStatus = AuthState.FRESH_LOGIN

    public loggedInStatus = true

    public appVersion = ""






    public setDeeplinkUrlData(deeplinkUrl: string) {
        this.deeplinkUrl = deeplinkUrl
    }

    public setUserAuthenticationStatus(authStatus: AuthState) {
        this.userAuthenticationStatus = authStatus
    }

    public setLoggedInStatus(status: boolean) {
        this.loggedInStatus = status
    }


}
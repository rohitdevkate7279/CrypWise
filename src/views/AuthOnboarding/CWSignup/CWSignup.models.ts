export interface SendSignupRequest {
    email: string;
    m_pin: number;
    name: string;
    phone: string;
  }
  
  export interface SendSignupResponse {
    status?: string;
    message?: string;
  }
  
  export interface SendSignupHttpError {
    statusCode?: number;
    name?: string;
    message?: string;
    code?: string;
    details?: unknown;
  }
  
export interface SendOtpRequest {
  email: string;
  m_pin: number;
}

export interface SendOtpResponse {
  status_code?: number;
  message?: string;
}

export interface SendOtpHttpError {
  statusCode?: number;
  name?: string;
  message?: string;
  code?: string;
  details?: unknown;
}

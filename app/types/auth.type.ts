export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  userType: string;
  mobileNumber: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenPayload {
  id: number,
  iat: number,
  exp: number
}

export interface ResetPasswordRequest {
  email: string;
}

export interface SetNewPasswordRequest {
  password: string;
}

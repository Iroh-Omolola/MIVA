export interface UserProps {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
}

export type RegisterResponse = Omit<LoginResponse, "token">;

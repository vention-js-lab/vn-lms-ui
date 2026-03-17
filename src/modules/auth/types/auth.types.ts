export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  csrf_token_key: string;
  user: { id: string; email: string };
};

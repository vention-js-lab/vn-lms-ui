export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
};

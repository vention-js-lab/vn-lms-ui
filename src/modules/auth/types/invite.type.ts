export type InviteResponse = {
  created_at: Date;
  email: string;
  expires_at: Date;
  first_name: string;
  id: string;
  jti: string;
  last_name: string;
  revoked_at: Date | null;
  role: string;
  used_at: Date | null;
};

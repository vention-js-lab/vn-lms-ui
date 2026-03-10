export type InviteResponse = {
  created_at: string;
  email: string;
  expires_at: string;
  first_name: string;
  id: string;
  jti: string;
  last_name: string;
  revoked_at: string | null;
  role: string;
  used_at: string | null;
};

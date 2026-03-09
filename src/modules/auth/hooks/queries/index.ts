import { useQuery } from '@tanstack/react-query';
import { authApi } from '../../api';

export function useInviteByToken(token: string) {
  return useQuery({
    queryKey: ['invite', token],
    queryFn: () => authApi.inviteByToken(token),
    enabled: !!token,
  });
}

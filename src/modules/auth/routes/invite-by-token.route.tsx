import { useInviteByToken } from '../hooks/queries';

export function InviteByTokenRoute() {
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get('token');

  const { data } = useInviteByToken(token ?? '');
  console.log('data', data);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <h1 className="text-2xl font-bold"> Invite by Token Route </h1>
    </div>
  );
}

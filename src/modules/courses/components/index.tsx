import { Outlet } from 'react-router';

export default function Courses() {
  return (
    <main className="bg-background min-h-screen w-full px-4 py-10 sm:px-6">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <Outlet />
      </div>
    </main>
  );
}

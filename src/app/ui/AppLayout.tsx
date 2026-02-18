import { NavLink, Outlet } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const navLinkBase =
  'text-sm font-medium text-muted-foreground transition-colors hover:text-foreground';

export function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-semibold tracking-tight">vn-lms-ui</span>
            <Separator orientation="vertical" className="h-5" />
            <nav className="flex items-center gap-4">
              <NavLink
                to="/login"
                className={({ isActive }) => `${navLinkBase} ${isActive ? 'text-foreground' : ''}`}
              >
                Login
              </NavLink>

              <NavLink
                to="/admin/invites"
                className={({ isActive }) => `${navLinkBase} ${isActive ? 'text-foreground' : ''}`}
              >
                Invites
              </NavLink>

              <NavLink
                to="/accept-invite"
                className={({ isActive }) => `${navLinkBase} ${isActive ? 'text-foreground' : ''}`}
              >
                Accept invite
              </NavLink>
            </nav>
          </div>

          <span className="text-xs text-muted-foreground">Sprint 1 shell</span>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

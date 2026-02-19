import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export function AdminInvitesComponent() {
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Invite management</CardTitle>
          <CardDescription>
            Create, resend, revoke, and manage user invitations.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            Placeholder page. Invite management UI will be implemented in a future task.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

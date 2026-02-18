import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export function LoginComponent() {
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to access the LMS platform.</CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            Placeholder page. Login form will be implemented in a future task.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

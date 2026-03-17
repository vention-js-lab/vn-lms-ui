import { Alert, AlertDescription, AlertTitle } from '#/shared/components/ui/alert';
import { Button } from '#/shared/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router';

type Props = {
  status?: string;
  message?: string;
  navigateTo?: string;
  goBackText?: string;
};

export default function ErrorPage({
  status = '404',
  message = "The page you were looking for doesn't exist.",
  navigateTo = '',
  goBackText = 'Go back home',
}: Props) {
  const navigate = useNavigate();
  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6 text-center">
        <p className="text-muted-foreground text-8xl font-bold">{status}</p>

        <Alert variant="destructive" className="flex flex-col items-center text-center">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>

        <Button onClick={() => navigate(navigateTo ?? -1)} className="w-full">
          {goBackText}
        </Button>
      </div>
    </div>
  );
}

import { Alert, AlertDescription, AlertTitle } from '#/shared/components/ui/alert';
import { Button } from '#/shared/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router';

type Props = {
  status?: number;
  message?: string;
  navigateTo?: string;
  goBackText?: string;
};

export default function ErrorPage({
  status = 404,
  message = "The page you were looking for doesn't exist.",
  navigateTo = '',
  goBackText = 'Go back home',
}: Props) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-6 text-center">
        <p className="text-8xl font-bold text-muted-foreground">{status}</p>

        <Alert variant="destructive" className="flex flex-col items-center text-center">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>

        <Button onClick={() => navigate(navigateTo)} className="w-full">
          {goBackText}
        </Button>
      </div>
    </div>
  );
}

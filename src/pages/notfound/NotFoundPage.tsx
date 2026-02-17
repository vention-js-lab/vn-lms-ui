import { Card } from "@/components/ui/card";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/alert";

import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <Card className="p-6 max-w-md w-full space-y-4">
        <Alert variant="destructive">
          <AlertTitle>404</AlertTitle>
          <AlertDescription>
            Page not found. The page you are looking for does not exist.
          </AlertDescription>
        </Alert>

        <Link
          to="/login"
          className="text-sm font-medium text-primary underline underline-offset-4"
        >
          Go to login
        </Link>
      </Card>
    </div>
  );
}

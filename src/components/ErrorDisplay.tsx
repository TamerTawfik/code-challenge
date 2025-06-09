import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Props interface for the ErrorDisplay component
 */
interface ErrorDisplayProps {
  error: string;
  onRetry: () => void;
  isRetrying?: boolean;
}

/**
 * Error Display Component
 *
 * Provides a user-friendly error interface with retry functionality.
 * Features:
 * - Clear error messaging
 * - Retry button with loading state
 * - Accessible design with proper ARIA attributes
 * - Professional styling with consistent spacing
 *
 * @param {ErrorDisplayProps} props - Component props
 * @returns {JSX.Element} Error display component
 */
export function ErrorDisplay({
  error,
  onRetry,
  isRetrying = false,
}: ErrorDisplayProps) {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 text-center space-y-4">
          {/* Error Icon */}
          <div className="flex justify-center">
            <AlertCircle
              className="h-12 w-12 text-destructive"
              aria-hidden="true"
            />
          </div>

          {/* Error Message */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Unable to Load Skips</h3>
            <p className="text-sm text-muted-foreground mb-4" role="alert">
              {error}
            </p>
          </div>

          {/* Retry Button */}
          <Button
            onClick={onRetry}
            disabled={isRetrying}
            className="w-full"
            variant="outline"
            aria-label={
              isRetrying ? "Retrying to load skips" : "Retry loading skips"
            }
          >
            {isRetrying ? (
              <>
                <RefreshCw
                  className="h-4 w-4 mr-2 animate-spin"
                  aria-hidden="true"
                />
                Retrying...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" aria-hidden="true" />
                Try Again
              </>
            )}
          </Button>

          {/* Help Text */}
          <p className="text-xs text-muted-foreground">
            Please check your internet connection and try again.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

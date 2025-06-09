import { useState } from "react";
import { SkipCard } from "./SkipCard";
import { SkipGridLoader } from "./SkipLoader";
import { ErrorDisplay } from "./ErrorDisplay";
import { useSkips } from "@/hooks/useSkips";

// Configuration constants - these could be moved to a config file
const DEFAULT_POSTCODE = "NR32";
const DEFAULT_AREA = "Lowestoft";

/**
 * Props interface for the SkipSelection component
 */
interface SkipSelectionProps {
  onSkipSelect: (skipId: number) => void;
}

/**
 * Skip Selection Component
 *
 * Main component for displaying and selecting skips. Handles all UI states:
 * - Loading state with skeleton loaders
 * - Error state with retry functionality
 * - Success state with skip cards grid
 * - Empty state when no skips are available
 *
 * Features:
 * - Responsive grid layout
 * - State management for selected skip
 * - API integration with error handling
 * - User guidance section
 *
 * @param {SkipSelectionProps} props - Component props
 * @returns {JSX.Element} Skip selection interface
 */
export function SkipSelection({ onSkipSelect }: SkipSelectionProps) {
  // Local state for tracking selected skip
  const [selectedSkip, setSelectedSkip] = useState<number | null>(null);

  // API integration with loading and error handling
  const { skips, loading, error, refetch } = useSkips({
    postcode: DEFAULT_POSTCODE,
    area: DEFAULT_AREA,
  });

  /**
   * Handles skip selection and propagates the selection to parent component
   * @param skipId - ID of the selected skip
   */
  const handleSkipSelect = (skipId: number) => {
    setSelectedSkip(skipId);
    onSkipSelect(skipId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Choose Your Skip Size</h2>
        <p className="text-muted-foreground">
          Select the skip size that best suits your needs
        </p>
      </div>

      {/* Loading State - Show skeleton grid while fetching data */}
      {loading && <SkipGridLoader />}

      {/* Error State - Show error message with retry option */}
      {error && !loading && (
        <ErrorDisplay error={error} onRetry={refetch} isRetrying={loading} />
      )}

      {/* Success State - Show skip cards when data is available */}
      {!loading && !error && skips.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skips.map((skip) => (
            <SkipCard
              key={skip.id}
              skip={skip}
              isSelected={selectedSkip === skip.id}
              onSelect={handleSkipSelect}
            />
          ))}
        </div>
      )}

      {/* Empty State - Show when no skips are available */}
      {!loading && !error && skips.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No skips available for this location.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Please try a different postcode or contact support.
          </p>
        </div>
      )}

      {/* Help Section - Only show when skips are successfully loaded */}
      {!loading && !error && skips.length > 0 && (
        <div className="mt-12 text-center">
          <div className="max-w-2xl mx-auto bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-2">
              Need Help Choosing?
            </h3>
            <p className="text-sm text-blue-800">
              Our team can help you select the right skip size for your project.
              Consider the type and volume of waste you'll be disposing of.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Calendar, CheckCircle2, Truck } from "lucide-react";
import type { Skip } from "@/hooks/useSkips";
import SkipPlaceholder from "@/assets/skip-placeholder.jpg";

/**
 * Props interface for the SkipCard component
 */
interface SkipCardProps {
  skip: Skip;
  isSelected: boolean;
  onSelect: (skipId: number) => void;
}

/**
 * Utility function to calculate the total price including VAT
 * @param price - Price before VAT
 * @param vat - VAT percentage
 * @returns Formatted price string with 2 decimal places
 */
const calculateTotalPrice = (price: number, vat: number): string => {
  return ((price * (100 + vat)) / 100).toFixed(2);
};

/**
 * Utility function to format hire period
 * @param hirePeriodDays - Number of days for hire period
 * @returns Formatted hire period string
 */
const formatHirePeriod = (hirePeriodDays: number): string => {
  return `${hirePeriodDays} days`;
};

/**
 * Reusable Skip Card Component
 *
 * Features:
 * - Interactive selection with visual feedback
 * - Hover animations and transitions
 * - Price display with VAT calculation
 * - Feature badges (road legal, heavy waste)
 * - Warning messages for non-road legal skips
 * - Hire period information
 * - Accessible design with proper alt text
 *
 * @param {SkipCardProps} props - Component props
 * @returns {JSX.Element} Rendered skip card component
 */
export function SkipCard({ skip, isSelected, onSelect }: SkipCardProps) {
  /**
   * Handles skip selection
   */
  const handleSelect = () => {
    onSelect(skip.id);
  };

  /**
   * Dynamic CSS classes for card styling based on selection state
   */
  const cardClasses = `
    cursor-pointer transition-all duration-300 overflow-hidden group
    ${
      isSelected
        ? "border-primary shadow-xl scale-[1.02] ring-2 ring-primary/20"
        : "hover:shadow-lg hover:scale-[1.01] border-border"
    }
  `.trim();

  /**
   * Dynamic CSS classes for button styling
   */
  const buttonClasses = `
    w-full font-medium transition-all duration-200
    ${
      isSelected
        ? "bg-primary hover:bg-primary/90"
        : "hover:bg-primary hover:text-primary-foreground"
    }
  `.trim();

  return (
    <Card className={cardClasses} onClick={handleSelect}>
      {/* Image Header with Overlays */}
      <div className="relative h-32 overflow-hidden">
        <img
          src={SkipPlaceholder}
          alt={`${skip.size} yard skip container`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Size Badge - Top Left */}
        <div className="absolute top-2 left-2">
          <Badge
            variant="secondary"
            className="bg-white/95 text-gray-800 font-bold text-sm"
            aria-label={`Skip size: ${skip.size} yards`}
          >
            {skip.size} YD
          </Badge>
        </div>

        {/* Selection Overlay - Center */}
        {isSelected && (
          <div className="absolute inset-0 bg-primary/15 flex items-center justify-center">
            <div className="bg-white rounded-full p-1">
              <CheckCircle2
                className="h-8 w-8 text-primary"
                aria-label="Selected"
              />
            </div>
          </div>
        )}

        {/* Price Badge - Top Right */}
        <div className="absolute top-2 right-2">
          <Badge
            variant="default"
            className="bg-primary text-primary-foreground font-bold"
            aria-label={`Total price: £${calculateTotalPrice(
              skip.price_before_vat,
              skip.vat
            )}`}
          >
            £{calculateTotalPrice(skip.price_before_vat, skip.vat)}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Title and Feature Badges */}
        <div>
          <h3 className="font-semibold text-lg mb-2">{skip.size} Yard Skip</h3>

          {/* Feature Badges */}
          <div className="flex flex-wrap gap-1">
            {skip.allows_heavy_waste && (
              <Badge variant="outline" className="text-xs px-2 py-0.5">
                <Truck className="h-3 w-3 mr-1" aria-hidden="true" />
                Heavy OK
              </Badge>
            )}
            {skip.allowed_on_road && (
              <Badge
                variant="outline"
                className="text-xs px-2 py-0.5 text-green-700 border-green-300"
              >
                <CheckCircle2 className="h-3 w-3 mr-1" aria-hidden="true" />
                Road Legal
              </Badge>
            )}
          </div>
        </div>

        {/* Warning for Non-Road Legal Skips */}
        {!skip.allowed_on_road && (
          <div
            className="flex items-center space-x-2 p-2 bg-amber-50 border border-amber-200 rounded-md"
            role="alert"
            aria-label="Warning: Permit required"
          >
            <AlertTriangle
              className="h-4 w-4 text-amber-600 flex-shrink-0"
              aria-hidden="true"
            />
            <p className="text-xs text-amber-700">Not Allowed On The Road</p>
          </div>
        )}

        {/* Hire Period Information */}
        <div className="flex items-center px-2 space-x-2 text-sm text-muted-foreground">
          <Calendar className="h-3 w-3" aria-hidden="true" />
          <span>Hire period: {formatHirePeriod(skip.hire_period_days)}</span>
        </div>
      </CardContent>

      {/* Action Button */}
      <CardFooter className="p-4 pt-0">
        <Button
          variant={isSelected ? "default" : "outline"}
          size="sm"
          className={buttonClasses}
          aria-label={
            isSelected
              ? `${skip.size} yard skip selected`
              : `Select ${skip.size} yard skip`
          }
        >
          {isSelected ? (
            <>
              <CheckCircle2 className="h-4 w-4 mr-2" aria-hidden="true" />
              Selected
            </>
          ) : (
            "Select Skip"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

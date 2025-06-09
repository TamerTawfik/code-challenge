import { Card, CardContent, CardFooter } from "@/components/ui/card";

/**
 * Skeleton loader component for individual skip cards
 *
 * Provides a consistent loading experience that matches the actual SkipCard layout.
 * Uses pulse animation to indicate loading state.
 *
 * @returns {JSX.Element} Skeleton card component
 */
export function SkipLoader() {
  return (
    <Card className="overflow-hidden animate-pulse">
      {/* Image skeleton - matches the h-32 height of actual skip image */}
      <div className="h-32 bg-gray-200" />

      <CardContent className="p-4 space-y-3">
        {/* Title skeleton - 3/4 width to simulate variable title lengths */}
        <div className="h-6 bg-gray-200 rounded w-3/4" />

        {/* Feature badges skeleton - simulates the badge layout */}
        <div className="flex gap-2">
          <div className="h-5 bg-gray-200 rounded w-16" />
          <div className="h-5 bg-gray-200 rounded w-20" />
        </div>

        {/* Hire period skeleton - half width for typical hire period text */}
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </CardContent>

      <CardFooter className="p-4 pt-0">
        {/* Button skeleton - full width to match actual button */}
        <div className="h-8 bg-gray-200 rounded w-full" />
      </CardFooter>
    </Card>
  );
}

/**
 * Grid of skeleton loaders for the skip selection page
 *
 * Creates a grid layout that matches the actual skip cards grid.
 * Shows 8 skeleton cards to simulate a typical loading state.
 *
 * @returns {JSX.Element} Grid of skeleton cards
 */
export function SkipGridLoader() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <SkipLoader key={index} />
      ))}
    </div>
  );
}

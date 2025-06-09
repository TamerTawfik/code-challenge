import { useState, useEffect } from 'react';

/**
 * Skip data interface matching the API response structure
 * @interface Skip
 */
export interface Skip {
  id: number;
  size: number;
  hire_period_days: number;
  transport_cost: number | null;
  per_tonne_cost: number | null;
  price_before_vat: number;
  vat: number;
  postcode: string;
  area: string;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
}

/**
 * Return type for the useSkips hook
 * @interface UseSkipsResult
 */
interface UseSkipsResult {
  skips: Skip[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Parameters for fetching skips data
 * @interface FetchSkipsParams
 */
interface FetchSkipsParams {
  postcode: string;
  area?: string;
}

/**
 * Custom hook for fetching skip data from the API
 * 
 * Features:
 * - Automatic data fetching on mount
 * - Loading states management
 * - Error handling with user-friendly messages
 * - Data filtering (removes forbidden skips)
 * - Data sorting (by skip size)
 * - Refetch capability for retry functionality
 * 
 * @param {FetchSkipsParams} params - The postcode and optional area for filtering
 * @returns {UseSkipsResult} Object containing skips data, loading state, error state, and refetch function
 * 
 * @example
 * ```tsx
 * const { skips, loading, error, refetch } = useSkips({
 *   postcode: "NR32",
 *   area: "Lowestoft"
 * });
 * ```
 */
export function useSkips({ postcode, area }: FetchSkipsParams): UseSkipsResult {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches skip data from the API and processes it
   * - Filters out forbidden skips
   * - Sorts skips by size (ascending)
   * - Handles errors gracefully
   */
  const fetchSkips = async () => {
    try {
      setLoading(true);
      setError(null);

      // Construct API URL with query parameters
      const url = new URL('https://app.wewantwaste.co.uk/api/skips/by-location');
      url.searchParams.append('postcode', postcode);
      if (area) {
        url.searchParams.append('area', area);
      }

      // Fetch data with proper headers
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      // Handle HTTP errors
      if (!response.ok) {
        throw new Error(`Failed to fetch skips: ${response.status} ${response.statusText}`);
      }

      const data: Skip[] = await response.json();
      
      // Process data: filter forbidden skips and sort by size
      const filteredSkips = data
        .filter(skip => !skip.forbidden)
        .sort((a, b) => a.size - b.size);

      setSkips(filteredSkips);
    } catch (err) {
      // Provide user-friendly error messages
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('Error fetching skips:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Refetch function for retry functionality
   * Useful for error recovery scenarios
   */
  const refetch = () => {
    fetchSkips();
  };

  // Fetch data when postcode or area changes
  useEffect(() => {
    if (postcode) {
      fetchSkips();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postcode, area]);

  return {
    skips,
    loading,
    error,
    refetch,
  };
} 
import { useMemo } from 'react';
import type { CommentsType } from '../App';

export const usePagination = (
  currentPage: number,
  filtered: CommentsType[],
) => {
  const totalPages = Math.ceil(filtered.length / 20);

  const paginated = useMemo(() => {
    const MAX_RESULTS = 20;
    const startIndex = (currentPage - 1) * MAX_RESULTS;
    const endIndex = startIndex + MAX_RESULTS;

    return filtered.slice(startIndex, endIndex);
  }, [filtered, currentPage]);

  return {
    paginated,
    totalPages,
  };
};

import { QueryClient } from '@tanstack/react-query';
import type { FormEvent } from 'react';
import { useMemo, useState } from 'react';

interface SearchBoxProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  handleSubmit: (e: FormEvent) => void;
  suggestions: string[];
  isSearching: boolean;
  setSubmittedTerm: (value: string) => void;
}

export const SearchBox = ({
  searchTerm,
  setSearchTerm,
  handleSubmit,
  suggestions,
  isSearching,
  setSubmittedTerm,
}: SearchBoxProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const queryClient = new QueryClient();

  const filteredSuggestions = useMemo(() => {
    setShowSuggestions(true);
    if (!searchTerm) return [];

    const lower = searchTerm.toLowerCase();
    return suggestions
      .filter(
        (suggestion) => suggestion.includes(lower) && suggestion !== lower,
      )
      .slice(0, 5);
  }, [searchTerm, suggestions]);

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  const handleOnChange = (typed: string) => {
    if (+typed.length < 1) {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      isSearching = false;
      setSubmittedTerm('');
    }
    setSearchTerm(typed);
  };

  const shouldShowSuggestions =
    showSuggestions && !isSearching && filteredSuggestions.length > 0;

  return (
    <div className="rounded-lg shadow p-6 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <div className="flex gap-2">
            <input
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              value={searchTerm}
              onChange={(e) => handleOnChange(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 50)}
              placeholder="Search comments..."
            />

            <button
              type="submit"
              disabled={searchTerm.trim().length < 3}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
              Search
            </button>
          </div>

          {shouldShowSuggestions && (
            <div className="absolute z-10 w-full mt-1 bg-zinc-700 border border-zinc-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              <ul>
                {filteredSuggestions.map((suggestion) => (
                  <li
                    key={`${suggestion}-${Math.random()}`}
                    className="px-4 py-2 text-white hover:bg-zinc-600 cursor-pointer border-b border-zinc-600 last:border-b-0"
                  >
                    <button
                      type="button"
                      onMouseDown={() => handleSuggestionClick(suggestion)}
                      onKeyDown={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left cursor-pointer"
                    >
                      {suggestion}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <p className="text-sm mt-2">Min 3 characters ({searchTerm.length}/3)</p>
      </form>
    </div>
  );
};

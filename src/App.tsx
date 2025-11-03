import { useQuery } from '@tanstack/react-query';
import { MessageCircleMore } from 'lucide-react';
import { type FormEvent, useMemo, useState } from 'react';
import { CommentList } from './components/CommentList';
import { Pagination } from './components/Pagination';
import { SearchBox } from './components/SearchBox';
import { Loading } from './components/ui/Loading';
import { usePagination } from './hooks/usePagination';
import { api } from './lib/api';

export type CommentsType = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [submittedTerm, setSubmittedTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const fetchComments = async () => {
    const { data } = await api.get<CommentsType[]>('/comments');
    return data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ['comments'],
    queryFn: fetchComments,
  });

  const filtered = useMemo(() => {
    if (!submittedTerm || submittedTerm.length < 3) {
      return data || [];
    }

    const lower = submittedTerm.toLowerCase();
    return (data || []).filter(
      (comment) =>
        comment.body.toLowerCase().includes(lower) ||
        comment.name.toLowerCase().includes(lower) ||
        comment.email.toLowerCase().includes(lower),
    );
  }, [data, submittedTerm]);

  const { paginated, totalPages } = usePagination(currentPage, filtered);

  const suggestions = useMemo(() => {
    if (!data) return [];

    const words = new Set<string>();

    data.map((comment) => {
      return comment.body.split(/\s+/).forEach((word) => {
        const lowerWord = word.toLowerCase();
        if (lowerWord.length >= 3) {
          words.add(lowerWord);
        }
      });
    });
    // console.log(Array.from(words));
    return Array.from(words);
  }, [data]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setTimeout(() => {
      if (searchTerm.length >= 3) {
        setSubmittedTerm(searchTerm);
        setCurrentPage(1);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen ">
      <header className="w-full flex justify-center items-center border-b border-gray-200 py-6">
        <div className="max-w-4xl flex items-center gap-4 mx-auto px-4">
          <MessageCircleMore size={48} />
          <h1 className="text-3xl font-bold ">Comment Search</h1>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <SearchBox
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSubmit={handleSubmit}
          suggestions={suggestions}
          isSearching={!!submittedTerm}
          setSubmittedTerm={setSubmittedTerm}
        />

        {isLoading ? (
          <Loading message="Loading..." />
        ) : (
          <>
            {!!submittedTerm && (
              <p className="italic text-2xl pl-5 py-2 flex gap-1">
                Search Results:
                <span className="font-bold">{submittedTerm}</span>
              </p>
            )}

            {paginated.length === 0 && submittedTerm ? (
              <div className="text-center py-12">
                <p className="text-xl mb-2">No results found</p>
                <p className="text-gray-400">Try a different search term</p>
              </div>
            ) : (
              <>
                {paginated.map((comment) => (
                  <CommentList key={comment.id} comment={comment} />
                ))}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
};

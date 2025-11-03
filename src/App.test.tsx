import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App, type CommentsType } from './App';
import { CommentList } from './components/CommentList';
import { truncateText } from './components/utils/truncateText';

describe('App', () => {
  it('renders title and search input', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>,
    );

    // Check title
    expect(screen.getByText(/Comment Search/i)).toBeDefined();

    // Check input exists
    const input = screen.getByPlaceholderText(/Search comments/i);
    expect(input).toBeDefined();

    // Check button exists
    await waitFor(() => {
      const button = screen.getByRole('button', { name: /Search/i });
      expect(button).toBeDefined();
    });
  });

  it('button disabled with less than 3 characters', () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>,
    );

    //Select button and verify if it's disabled
    const button = screen.getByRole('button', { name: /Search/i });
    expect(button).toBeDisabled();
  });

  it('truncates body to maximum 64 characters', () => {
    const comment = {
      postId: 5,
      id: 22,
      name: 'porro repellendus aut tempore quis hic',
      email: 'Khalil@emile.co.uk',
      body: 'qui ipsa animi nostrum praesentium voluptatibus odit qui non impedit cum qui nostrum aliquid fuga explicabo voluptatem fugit earum voluptas exercitationem temporibus dignissimos distinctio esse inventore reprehenderit quidem ut incidunt nihil necessitatibus rerum',
    };

    render(<CommentList comment={comment} />);

    // Get rendered body text and remove (...)
    const bodyElement = screen.getByText(/qui ipsa animi/i);
    const bodyText = bodyElement.textContent.replace('...', '') || '';

    //Verify if the bodyText it's equal to 64 characters
    expect(bodyText.length).toEqual(64);
  });

  it('allows search with 3+ characters', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>,
    );

    const input = screen.getByPlaceholderText(/Search comments/i);
    const button = screen.getByRole('button', { name: /Search/i });

    // Type in input
    fireEvent.change(input, { target: { value: 'test' } });

    // Button now enabled
    expect(button).not.toBeDisabled();

    // Click search
    fireEvent.click(button);

    // Verify input keeps value
    expect(input).toHaveValue('test');
  });

  it('shows max 20 results per page', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>,
    );

    // Wait to almost one artible shows up, and verify if shows up only 20 articles
    await waitFor(
      () => {
        const items = screen.getAllByRole('article');
        expect(items.length).toBeGreaterThan(0);
      },
      { timeout: 3000 },
    );
    const items = screen.getAllByRole('article');
    expect(items.length).toBeLessThanOrEqual(20);
  });

  it('shows typeahead suggestions', async () => {
    // Mock API
    Promise.resolve({
      ok: true,
      json: async () =>
        [
          {
            postId: 4,
            id: 19,
            name: 'test',
            email: 'test@test.com',
            body: 'doloribus est illo sed minima aperiam',
          },
        ] as CommentsType[],
    } as Response);

    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Search comments/i)).toBeDefined();
    });

    const input = screen.getByPlaceholderText(/Search comments/i);

    // Try to type on input and wait shows the suggestions
    fireEvent.change(input, { target: { value: 'dolor' } });
    fireEvent.focus(input);

    const suggestion = await screen.findByText('doloribus');
    expect(suggestion).toBeDefined();
  });

  it('navigates between pages', async () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>,
    );

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getAllByRole('article').length).toBeGreaterThan(0);
    });

    // Check page 1
    expect(screen.getByText(/Page 1/i)).toBeDefined();

    // Click Next
    const nextButton = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextButton);

    // Check page 2
    await waitFor(() => {
      expect(screen.getByText(/Page 2/i)).toBeDefined();
    });

    // Click Previous
    const prevButton = screen.getByRole('button', { name: /Previous/i });
    fireEvent.click(prevButton);

    // Back to page 1
    await waitFor(() => {
      expect(screen.getByText(/Page 1/i)).toBeDefined();
    });
  });

  // testing the truncateText function returns a falsy input
  it('returns empty string for falsy input', () => {
    expect(truncateText('', 64)).toBe('');
    expect(truncateText(null as unknown as string, 64)).toBe('');
    expect(truncateText(undefined as unknown as string, 64)).toBe('');
  });
});

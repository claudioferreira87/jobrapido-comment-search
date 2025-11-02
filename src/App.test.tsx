import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './App';

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

    const button = screen.getByRole('button', { name: /Search/i });
    expect(button).toBeDisabled();
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
});

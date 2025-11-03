# Comment Search - Jobrapido Frontend Test

A React application for searching and browsing comments from JSONPlaceholder API with advanced features like typeahead suggestions and pagination.

## 🚀 Technologies

- **React 19** + **TypeScript**
- **Vite** - Build tool
- **TanStack Query (React Query)** - Data fetching
- **Tailwind CSS** - Styling
- **Vitest** + **Testing Library** - Testing (85%+ coverage)
- **Docker** + **Nginx** - Production deployment
- **Axios** - HTTP client
- **Biome** - Linting & Formatting

## 📦 Installation
```bash
# Install dependencies
pnpm install

# Development server
pnpm start

# Build for production
pnpm build

# Run tests
pnpm test

# Test coverage
pnpm test:coverage
```

## 🐳 Docker
```bash
# Build and run
pnpm prod:build

# Run existing image
pnpm prod

# Stop container
pnpm prod:down
```

Access at: `http://localhost:8080`

## ✨ Features

### Core Requirements
- ✅ Search comments by text (min 3 characters)
- ✅ Submit-triggered search (not while typing)
- ✅ Display up to 20 results per page
- ✅ Show name, email, and truncated body (max 64 chars)

### Bonus Features
- ✅ **Typeahead** - Autocomplete suggestions
- ✅ **Pagination** - Navigate through results

## 🎯 Implementation Highlights

- **Client-side filtering** - All comments fetched once, filtered in browser
- **React Query caching** - Optimized data fetching with 5min cache
- **Typeahead** - Extracts unique words from comments for suggestions
- **Pagination** - Client-side slicing of filtered results
- **Responsive design** - Mobile-friendly interface

## 🔧 Available Scripts
```bash
pnpm start          # Start development server
pnpm build          # Build for production
pnpm preview        # Preview production build
pnpm test           # Run tests
pnpm test:coverage  # Generate coverage report
pnpm format         # Format code with Biome
pnpm prod           # Run with Docker Compose
pnpm prod:build     # Build and run with Docker
pnpm prod:down      # Stop Docker containers
```

## 📝 Requirements

- Node.js 22+
- pnpm 10+
- Docker (optional, for production deployment)

## 🌐 API

This project uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/comments) - a free fake REST API for testing and prototyping.

---

**Author**: Claudio Ferreira

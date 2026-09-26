# Agent Coding Rules

## Project Stack

- React + TypeScript + Vite
- shadcn/ui components
- Zustand for state management
- Danfo.js for data analysis
- TanStack Table for data tables
- Axios for HTTP requests
- PapaParse for CSV parsing
- React Router for navigation

## DOs

### Component Architecture

- DO separate logic and rendering into two files: `<Component>.tsx` (view) and `use<Component>.tsx` (logic hook)
- DO use Zustand store to share state instead of prop drilling
- DO create reusable components and extract them when logic is repeated

### State Management

- DO use Zustand for global state (e.g., `useDatasetStore`)
- DO use selective subscriptions: `useDatasetStore((state) => state.df)` instead of destructuring entire store
- DO create custom hooks for data loading side effects (e.g., `useDatasetLoader`)

### Data Handling

- DO use `dfd.toJSON(df, { format: "row" })` instead of deprecated `df.toJSON()`
- DO use `extractNumber()` helper to convert Danfo.js tensor results to plain numbers
- DO keep DataFrame (`df`) as single source of truth, derive table rows from it

### TanStack Table

- DO add explicit `id` field to column definitions when using non-string headers (e.g., React components)
- DO guard DataTable rendering with `columns.length > 0` check to prevent race conditions

### TypeScript

- DO separate type imports: `import type { X }` from value imports `import { Y }`
- DO create shared types in `src/types/` directory
- DO use `Record<string, unknown>` for generic row data types

### Code Organization

- DO place utility functions in `src/lib/` (e.g., `number.ts` for formatting)
- DO place Zustand stores in `src/stores/`
- DO place custom hooks in `src/hooks/` or colocate with components as `use<Component>.tsx`
- DO place shared types in `src/types/`

### Folder Structure

The component tree mirrors the sidebar navigation hierarchy. Each sidebar section maps to a folder under `src/components/`:

```
src/components/
├── data-ingestion/          # 1. Data Ingestion
│   ├── select-dataset/      #    Select Dataset page + its specific components/hooks
│   └── transform/           #    Transform page + its specific components/hooks
├── pretraining/             # 2. Pretraining
│   ├── explore/             #    Explore page + its specific components/hooks
│   └── visualize/           #    Visualize page + its specific components/hooks
├── training/                # 3. Training
│   ├── linear-regression/   #    Linear Regression page + its specific components/hooks
│   ├── knn/                 #    KNN page + its specific components/hooks
│   ├── lda/                 #    LDA page + its specific components/hooks
│   └── logistic-regression/ #    Logistic Regression page + its specific components/hooks
├── ui/                      # shadcn/ui primitives (do NOT move these)
├── PageHeader.tsx           # Reusable components shared across pages
├── NoDatasetAlert.tsx
├── app-sidebar.tsx          # Shell/layout components
├── nav-main.tsx
├── nav-*.tsx
└── site-header.tsx
```

**Rules:**

- DO colocate each page component (`<Page>.tsx`), its logic hook (`use<Page>.ts`), and any page-specific child components in the same folder.
- DO keep components that are used by multiple pages (e.g., `PageHeader`, `NoDatasetAlert`) directly in `src/components/`.
- DO NOT move shadcn/ui components out of `src/components/ui/`.
- DO NOT move shell/layout components (`app-sidebar.tsx`, `nav-*.tsx`, `site-header.tsx`) into sub-folders.
- When adding a new sidebar page, create a new folder matching the `<section>/<page>` hierarchy (e.g., `training/new-model/`).

### HTTP & Data Fetching

- DO use Axios with `async/await` (no promise chaining)
- DO use PapaParse for CSV parsing with `header: true` and `skipEmptyLines: true`

### Styling

- DO use Tailwind CSS classes
- DO use shadcn/ui components from `@/components/ui/`

# Workout Finder

A modern web application for finding and filtering workout sessions. Built with Next.js, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Testing**: [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/) + [Cypress](https://www.cypress.io/)
- **Linting**: [ESLint](https://eslint.org/)
- **Formatting**: [Prettier](https://prettier.io/)

## Getting Started

### Prerequisites

- Node.js 18+
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/hari2309s/workout-finder.git
   cd workout-finder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Generate workouts:
   ```bash
   npm run generate-workouts
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `dev`: Start development server with Turbopack
  ```bash
  npm run dev
  ```
- `build`: Build for production
  ```bash
  npm run build
  ```
- `start`: Start production server
  ```bash
  npm start
  ```
- `test`: Run tests with Jest
  ```bash
  npm test
  ```
- `test:e2e`: Run end-to-end tests with Cypress
  ```bash
  npm run test:e2e
  ```
- `cypress:open`: Open Cypress test runner
  ```bash
  npm run cypress:open
  ```
- `generate-workouts`: Generate sample workout data
  ```bash
  npm run generate-workouts
  ```
- `lint`: Run ESLint
  ```bash
  npm run lint
  ```
- `format`: Format code with Prettier
  ```bash
  npm run format
  ```
- `format:check`: Check code formatting
  ```bash
  npm run format:check
  ```

## Data Generation

The application includes a script to generate sample workout data:

```bash
npm run generate-workouts
```

This will create a `workouts-page-1.json` file in the `src/data` directory with sample workout data that the application can use.

## State Persistence

The application uses `localStorage` to persist filter states between page reloads. The following filter states are saved:

- Current page number
- Selected start date
- Selected categories

### Storage API

The application provides utility functions for working with the filter state:

- `saveFilters(filters: FilterState)`: Saves the current filters to localStorage
- `loadFilters(): FilterState | null`: Loads the saved filters from localStorage
- `clearFilters()`: Clears all saved filters from localStorage

## Testing

The application includes comprehensive test coverage:

### Unit Tests
Run unit tests with Jest:
```bash
npm test
```

Run end-to-end tests with Cypress:
```bash
# Open Cypress test runner
npm run cypress:open

# Run all Cypress tests headlessly
npm run test:e2e
```

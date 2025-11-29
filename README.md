# AMKRTech - Intelligent Financial Planning Platform

AMKRTech is a comprehensive financial planning and calculation platform built with Angular and Express.js. It provides intelligent tools and insights to help users make smarter financial decisions, track investments, and build lasting wealth with confidence.

## Project Overview

This is a monorepo containing:

- **UI** - Angular 20 frontend application with Material Design
- **mid-tier** - Express.js backend API server with TypeScript

### Features

- 💰 **Tax Calculators** - Income tax, HRA, Gratuity calculations
- 📊 **Investment Tools** - SIP, PPF, NPS calculators
- 🏠 **Loan Calculators** - Home loan EMI calculations
- 📈 **Portfolio Tracking** - Track investments and returns
- 🔒 **Secure Data** - 100% data security and privacy
- 📱 **Responsive Design** - Works on desktop and mobile

## Prerequisites

- **Node.js** >= 20.0.0
- **npm** >= 9.0.0
- **Angular CLI** 20.x

## Installation

Install dependencies for all packages:

```bash
npm run install:all
```

## Development

Start both UI and API servers concurrently:

```bash
npm run dev
```

This will start:
- **UI**: http://localhost:4200
- **API**: http://localhost:3000 (or configured port)

## Available Scripts

### Root Commands

```bash
# Install all dependencies
npm run install:all

# Run development servers (UI + API)
npm run dev

# Build all packages
npm run build:all

# Lint all packages
npm run lint:all

# Format all code
npm run format:all

# Clean all build artifacts
npm run clean:all

# Check for dependency updates
npm run check-for-updates:all
```

### UI (Angular) Commands

```bash
cd UI

# Start development server
npm start

# Build for production
npm run build

# Run unit tests
npm run test

# Run linting
npm run lint

# Format code
npm run format

# Analyze bundle size
npm run analyze

# Clean build artifacts
npm run clean
```

### Mid-tier (API) Commands

```bash
cd mid-tier

# Start development server
npm run start:dev

# Build for production
npm run build

# Start production server
npm run start:prod

# Run linting
npm run lint

# Format code
npm run format

# Clean build artifacts
npm run clean
```

## Project Structure

```
AMKRTech/
├── UI/                          # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── calculators/    # Calculator components
│   │   │   ├── shared/         # Shared components
│   │   │   └── services/       # Angular services
│   │   └── main.ts
│   └── angular.json
├── mid-tier/                    # Express API server
│   ├── routes/                 # API route handlers
│   ├── services/               # Business logic
│   ├── server.ts               # Main entry point
│   └── tsconfig.json
└── package.json                 # Workspace configuration
```

## Technology Stack

### Frontend (UI)
- Angular 20.3.7
- Angular Material 20.2.10
- TypeScript 5.3.3
- RxJS 7.8.2
- Bootstrap 5.3.8
- Chart.js 4.5.1

### Backend (mid-tier)
- Express.js 4.18.2
- Node.js 20+
- TypeScript 5.3.3
- Nodemailer 7.0.10
- CORS 2.8.5

## Build Output

- **UI Build**: `UI/dist/amkrtech/` (optimized production bundle)
- **API Build**: `mid-tier/build/` (compiled JavaScript)

## Testing

### Run Unit Tests

```bash
# UI tests
cd UI && npm run test

# Mid-tier tests (configure as needed)
cd mid-tier && npm run test
```

## Code Quality

### Linting

```bash
npm run lint:all
```

### Formatting

```bash
npm run format:all
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Run linting and formatting
4. Submit a pull request

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.

---

**Version**: 1.0.0  
**Last Updated**: November 2025

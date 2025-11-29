# AMKRTech Mid-tier API Server

The backend API server for the AMKRTech financial planning platform. Built with Express.js and TypeScript, it provides RESTful APIs for financial calculations, mail services, and data management.

## Overview

This is the middle tier of the AMKRTech platform, handling:

- ✉️ **Email Services** - Send calculation reports and notifications
- 📧 **Contact Forms** - Handle user inquiries and feedback
- 📊 **Calculation APIs** - Tax, investment, and loan calculations
- 🔒 **Data Management** - Secure storage and retrieval

## Prerequisites

- **Node.js** >= 20.0.0
- **npm** >= 9.0.0

## Installation

```bash
npm install
```

## Development

### Start Development Server

```bash
npm run start:dev
```

Server runs on `http://localhost:3000` (or configured port)

### Environment Variables

Create a `.env` file in the mid-tier directory:

```env
NODE_ENV=development
PORT=3000
API_BASE_URL=http://localhost:3000

# Email Configuration (for Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-password
SMTP_FROM=noreply@amkrtech.com

# CORS Configuration
CORS_ORIGIN=http://localhost:4200
```

## Production

### Build

```bash
npm run build
```

Compiles TypeScript to JavaScript in the `build/` directory.

### Start Production Server

```bash
npm run start:prod
```

## Available Scripts

```bash
# Development server (with auto-reload)
npm run start:dev

# Build TypeScript
npm run build

# Production server
npm run start:prod

# Lint code
npm run lint

# Format code
npm run format

# Clean build artifacts
npm run clean
```

## Project Structure

```
mid-tier/
├── routes/
│   ├── mail.routes.ts          # Email route handlers
│   └── index.ts                # Route aggregation
├── services/
│   ├── mail.services.ts        # Email service logic
│   └── index.ts                # Service exports
├── server.ts                   # Main server file
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies
└── build/                      # Compiled output (generated)
```

## API Routes

### Email Service

**POST** `/api/mail/send`

Send an email with calculation results

```json
{
  "to": "user@example.com",
  "subject": "Your Tax Calculation Report",
  "body": "..."
}
```

### Health Check

**GET** `/api/health`

Server health check endpoint

```json
{
  "status": "ok",
  "timestamp": "2025-11-29T10:00:00Z"
}
```

## Dependencies

### Production

- **express** - Web framework
- **cors** - Cross-origin resource sharing
- **body-parser** - Request body parsing
- **nodemailer** - Email sending
- **node-fetch** - HTTP client
- **dotenv** - Environment variable management

### Development

- **TypeScript** - Type-safe JavaScript
- **ts-node** - TypeScript runtime
- **nodemon** - Auto-reload on file changes
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **@typescript-eslint** - TypeScript linting

## Configuration

### TypeScript (tsconfig.json)

- **Target**: ES2020
- **Module**: ES2020
- **Strict Mode**: Enabled
- **Source Maps**: Enabled for debugging
- **Declaration Files**: Generated for type safety

## Code Quality

### Linting

```bash
npm run lint
```

Lints all TypeScript files using ESLint.

### Formatting

```bash
npm run format
```

Formats all TypeScript files using Prettier.

## Error Handling

The server implements proper error handling with:

- Try-catch blocks
- Error logging
- Appropriate HTTP status codes
- CORS error handling

## Performance Considerations

- Uses async/await for non-blocking operations
- Implements request body limits
- Supports compression for responses
- Connection pooling for databases

## Testing

Configure testing framework as needed (Jest, Mocha, etc.):

```bash
npm install --save-dev jest @types/jest ts-jest
npm run test
```

## Deployment

### Using PM2

```bash
# Install PM2 globally
npm install -g pm2

# Start application
pm2 start build/server.js --name "amkrtech-api"

# Monitor
pm2 monit
```

### Using Docker

Create a `Dockerfile` for containerized deployment.

## Contributing

1. Follow the project structure
2. Write TypeScript code with proper types
3. Run linting: `npm run lint`
4. Run formatting: `npm run format`
5. Test your changes
6. Submit a pull request

## License

MIT

## Support

For issues and questions, please contact the development team.

---

**Version**: 1.0.0  
**Last Updated**: November 2025

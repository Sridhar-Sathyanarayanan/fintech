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

Server runs on `http://localhost:3010` (or configured port)

### Environment Variables

Create a `.env` file in the mid-tier directory:

```env
NODE_ENV=development
PORT=3010
API_BASE_URL=http://localhost:3010

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
├── config/
│   ├── api-constants.ts        # API constants and configurations
│   ├── app-config.ts           # Application configuration
│   ├── environment.config.ts   # Environment variable management
│   └── index.ts                # Config exports
├── routes/
│   ├── mail.routes.ts          # Email route handlers
│   ├── market.routes.ts        # Market data route handlers
│   ├── config.routes.ts        # Configuration route handlers
│   └── index.ts                # Route aggregation
├── services/
│   ├── mail.services.ts        # Email service logic
│   └── index.ts                # Service exports
├── server.ts                   # Main server file
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies
├── .env                        # Environment variables (create from .env.example)
└── build/                      # Compiled output (generated)
```

## API Routes

### Email Service

**POST** `/api/mail/send`

Send an email with feedback or calculation results

```json
{
  "email": "user@example.com",
  "subject": "Your Tax Calculation Report",
  "message": "..."
}
```

### Market Data Routes

**GET** `/api/market/indices` - Get all NSE indices

**GET** `/api/market/index/:symbol` - Get specific index data

**GET** `/api/market/stocks/movers` - Get top gainers, losers, and most active stocks

**GET** `/api/market/stats` - Get market statistics

**GET** `/api/market/sectors` - Get sectoral indices performance

**GET** `/api/market/currencies` - Get currency exchange rates

**GET** `/api/market/status` - Check if market is open

### Configuration Routes

**GET** `/api/config` - Get complete application configuration

**GET** `/api/config/company` - Get company information

**GET** `/api/config/statistics` - Get statistics and metrics

**GET** `/api/config/financial-rates` - Get financial rates and returns

**GET** `/api/config/tax-slabs` - Get tax slabs (optional query param: `year`)

**GET** `/api/config/quotes` - Get quotes (optional query param: `category`)

**GET** `/api/config/economic-indicators` - Get economic indicators

**GET** `/api/config/social-media` - Get social media links

**GET** `/api/config/path/:configPath` - Get configuration by dynamic path

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

### AWS Elastic Beanstalk (Recommended)

See [AWS_DEPLOYMENT.md](./AWS_DEPLOYMENT.md) for complete deployment guide with multiple environments.

Quick start:
```bash
# Install EB CLI
pip install awsebcli

# Initialize and deploy
cd mid-tier
eb init
eb create amkrtech-api-prod
eb deploy
```

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

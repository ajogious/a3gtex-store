# 🛒 A3GTEX - Modern E-Commerce Platform

A full-featured e-commerce website built with Next.js, TypeScript, PostgreSQL, and Prisma. Features modern payment integrations with Paystack, Flutterwave, Strip and PayPal, plus cash on delivery.

---

## 🚀 Features

### Authentication & User Management

- NextAuth.js authentication with multiple providers
- User registration and profile management
- Role-based access control (Admin/User)
- Secure session management

### Shopping Experience

- Product catalog with search, filtering, and pagination
- Shopping cart with persistent storage
- Product reviews and ratings system
- Multiple product images

### Payment & Checkout

- Paystack integration for card payments
- Flutterwave payment gateway support
- PayPal
- Stripe
- Cash on delivery option
- Secure checkout process
- Order tracking and history

### Admin Dashboard

- Sales analytics with charts (Recharts)
- Product management (CRUD operations)
- Order management and fulfillment tracking
- User management system
- Inventory management

### Additional Features

- Dark/Light mode theme switching
- Responsive design for all devices
- Order email notifications (Resend)
- Image upload (Uploadthing)
- Advanced search functionality
- Sorting and filtering products

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** PostgreSQL
- **Authentication:** NextAuth.js
- **Payments:** Paystack, Flutterwave
- **File Upload:** Uploadthing
- **Email:** Resend
- **UI Components:** Shadcn/ui
- **Charts:** Recharts

---

## 📦 Installation

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- Accounts for Paystack, Flutterwave, Uploadthing, and Resend

### 1. Clone the Repository

```bash
git clone https://github.com/ajogious/a3gtex-store.git
cd a3gtex-store
```

### 2. Install Dependencies

```bash
npm install
```

If you encounter dependency compatibility issues with React 19:

```bash
npm install --legacy-peer-deps
```

### 3. Environment Configuration

Rename `.example-env.txt` to `.env` and configure the following:

#### Database

```env
DATABASE_URL="postgresql://username:password@host:port/dbname"
```

#### Authentication

```env
NEXTAUTH_SECRET="your-generated-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

Generate a secret with:

```bash
openssl rand -base64 32
```

#### Payment Gateways

**Paystack:**

```env
PAYSTACK_PUBLIC_KEY="pk_test_your_public_key"
PAYSTACK_SECRET_KEY="sk_test_your_secret_key"
PAYSTACK_CALLBACK_URL="http://localhost:3000/api/paystack/callback"
```

**Flutterwave:**

```env
FLW_CLIENT_ID="FLWCLI_TEST_your_public_key"
FLW_CLIENT_SECRET="FLWCLI_TEST_your_secret_keyX"
FLW_ENCRYPTION_KEY="FLWSECK_TESTKEY"
FLW_CALLBACK_URL="http://localhost:3000/api/flutterwave/callback"
```

**Stripe Payment Gateway**

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
STRIPE_SECRET_KEY=""
```

**PayPal Payment Gateway**

```env
PAYPAL_API_URL="https://api-m.sandbox.paypal.com"
PAYPAL_CLIENT_ID=""
PAYPAL_APP_SECRET=""
```

#### File Upload (Uploadthing)

```env
UPLOADTHING_TOKEN="your_uploadthing_token"
UPLOADTHING_SECRET="your_uploadthing_secret"
UPLOADTHING_APPID="your_uploadthing_app_id"
```

#### Email (Resend)

```env
RESEND_API_KEY=""
SENDER_EMAIL="onboarding@resend.dev"
ADMIN_EMAIL="admin any email ID"
```

### Exchanges for money conversion

EXCHANGE_API_KEY="......................."

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed with sample data
npx tsx ./db/seed
```

### 5. Run the Application

```bash
# Development mode
npm run dev

# Production build
npm run build

# Start production server
npm start
```

Open http://localhost:3000 to view the application.

---

## 🗄️ Database Management

### Prisma Studio

View and manage your database data:

```bash
npx prisma studio
```

### Database Schema Updates

When making changes to the schema:

```bash
# Generate new Prisma client
npx prisma generate

# Apply migrations
npx prisma migrate dev
```

---

## 🎯 Project Structure

```
├── app/                    # Next.js app directory
│   ├── (admin)/           # Admin routes
│   ├── (auth)/            # Authentication routes
│   ├── (root)/            # Public routes
│   └── api/               # API routes
├── components/            # Reusable components
├── db/                   # Database configuration
├── lib/                  # Utility functions
├── public/               # Static assets
└── types/                # TypeScript type definitions
```

---

## 🔧 Payment Setup

### Paystack Configuration

1. Create a Paystack account
2. Get your test keys from the dashboard
3. Configure webhooks for payment verification

### Flutterwave Configuration

1. Sign up at Flutterwave
2. Obtain your API keys from the settings
3. Set up webhook endpoints for payment callbacks

### Stripe Configuration

1. Create a Stripe account
2. Get your test API keys from the Developers → API Keys section
3. Set up webhooks for payment verification under Developers → Webhooks

### PayPal Configuration

1. Create a PayPal Developer account at developer.paypal.com
2. Get your Client ID and Client Secret from the My Apps & Credentials page
3. Set up webhooks for payment notifications under My Apps & Credentials → Webhooks

### File Upload

The application uses Uploadthing for handling product images. Configure your upload settings in the admin panel.

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The application can be deployed on any platform that supports Next.js:

- Netlify
- AWS
- DigitalOcean
- Railway

---

## 🐛 Common Issues & Solutions

### Authentication Issues

- Ensure `NEXTAUTH_SECRET` is properly set
- Verify callback URLs in your authentication providers

### Payment Integration

- Test with sandbox credentials first
- Verify webhook endpoints are correctly configured
- Check CORS settings for local development

### Database Connection

- Verify `DATABASE_URL` format
- Ensure database is accessible from your deployment platform
- Check Prisma client generation

---

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub.

**Live Demo:** https://a3gtex-store.vercel.app

Built with ❤️ using Next.js and modern web technologies

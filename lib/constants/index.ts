export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME!;
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION!;
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL!;
export const EXCHANGE_API = process.env.EXCHANGE_API_KEY!;
export const LATEST_PRODUCTS_LIMIT =
  Number(process.env.LATEST_PRODUCTS_LIMIT) || 10;

export const signInDefaultValues = {
  email: '',
  password: '',
};

export const signUpDefaultValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const shippingAddressDefaultValues = {
  fullName: '',
  streetAddress: '',
  city: '',
  postalCode: '',
  country: '',
};

export const PAYMENT_METHODS = process.env.PAYMENT_METHODS
  ? process.env.PAYMENT_METHODS.split(', ')
  : ['Paystack', 'Flutterwave', 'PayPal', 'CashOnDelivery'];

export const DEFAULT_PAYMENT_METHOD =
  process.env.DEFAULT_PAYMENT_METHOD || 'Paystack';

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 12;

export const productDefaultValues = {
  name: '',
  slug: '',
  category: '',
  images: [],
  brand: '',
  description: '',
  price: '0',
  stock: 0,
  rating: '0',
  numReviews: '0',
  isFeatured: false,
  banner: null,
};

export const USER_ROLES = process.env.USER_ROLES
  ? process.env.USER_ROLES.split(', ')
  : ['admin', 'user'];

export const reviewFormDefaultValues = {
  title: '',
  comment: '',
  rating: 0,
};

export const SENDER_EMAIL = process.env.SENDER_EMAIL!;
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;

// frontend-safe (public)
export const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!;

// backend-only (use inside /api or server-side code)
export const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY!;
export const PAYSTACK_CALLBACK_URL = process.env.PAYSTACK_CALLBACK_URL!;

export const FLW_CLIENT_ID = process.env.FLW_CLIENT_ID;
export const FLW_CLIENT_SECRET = process.env.FLW_CLIENT_SECRET!;
export const FLW_ENCRYPTION_KEY = process.env.FLW_ENCRYPTION_KEY!;

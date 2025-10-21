import { NextRequest, NextResponse } from 'next/server';
import { verifyFlutterwaveTransaction } from '@/lib/actions/order.actions';
import { SERVER_URL } from '@/lib/constants';

// ✅ Prevent Vercel from trying to pre-render or statically analyze this route
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // ✅ Safety guard to avoid "Invalid URL" during build or unexpected calls
    if (!req?.url) {
      return NextResponse.json({
        success: false,
        message: 'Invalid request URL',
      });
    }

    const { searchParams } = new URL(req.url);
    const tx_ref = searchParams.get('tx_ref');

    if (!tx_ref) {
      return NextResponse.json({
        success: false,
        message: 'Missing tx_ref',
      });
    }

    const orderId = tx_ref.split('_')[0];
    const res = await verifyFlutterwaveTransaction(orderId, tx_ref);

    if (res.success) {
      // ✅ Safely handle redirect using fallback URL
      const redirectUrl = `${SERVER_URL}/order/${orderId}`;
      return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.json(res);
  } catch (error) {
    console.error('❌ Flutterwave callback error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

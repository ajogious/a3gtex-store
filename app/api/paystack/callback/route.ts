import { NextRequest, NextResponse } from 'next/server';
import { verifyPaystackTransaction } from '@/lib/actions/order.actions';
import { SERVER_URL } from '@/lib/constants';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get('reference');
  const orderId = reference?.split('_')[0]; // extract orderId from our custom ref

  if (!reference || !orderId) {
    return NextResponse.json({ success: false, message: 'Invalid reference' });
  }

  const result = await verifyPaystackTransaction(orderId, reference);
  if (result.success) {
    return NextResponse.redirect(`${SERVER_URL}/order/${orderId}`);
  }

  return NextResponse.json(result);
}

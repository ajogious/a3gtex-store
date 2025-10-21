import { NextRequest, NextResponse } from 'next/server';
import { verifyFlutterwaveTransaction } from '@/lib/actions/order.actions';
import { SERVER_URL } from '@/lib/constants';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tx_ref = searchParams.get('tx_ref');
  if (!tx_ref) {
    return NextResponse.json({ success: false, message: 'Missing tx_ref' });
  }
  const orderId = tx_ref.split('_')[0];
  const res = await verifyFlutterwaveTransaction(orderId, tx_ref);
  if (res.success) {
    return NextResponse.redirect(`${SERVER_URL}/order/${orderId}`);
  }
  return NextResponse.json(res);
}

import { NextRequest, NextResponse } from 'next/server';
import { createFlutterwaveTransaction } from '@/lib/actions/order.actions';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get('orderId') as string;
  if (!orderId) {
    return NextResponse.json({ success: false, message: 'Missing orderId' });
  }
  const res = await createFlutterwaveTransaction(orderId);
  return NextResponse.json(res);
}

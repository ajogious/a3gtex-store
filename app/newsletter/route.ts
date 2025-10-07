import { prisma } from '@/db/prisma';
import { APP_NAME, SERVER_URL } from '@/lib/constants';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import crypto from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // Generate a token
    const token = crypto.randomBytes(32).toString('hex');

    // Save subscriber (idempotent)
    await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: { active: true }, // keep existing token
      create: { email, unsubscribeToken: token },
    });

    // Fetch subscriber (to get token)
    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (!subscriber) {
      return NextResponse.json(
        { error: 'Failed to save subscriber' },
        { status: 500 }
      );
    }

    // Send confirmation email
    const confirmResult = await resend.emails.send({
      from: process.env.SENDER_EMAIL!,
      to: email,
      subject: `Welcome to ${APP_NAME} Newsletter 🎉`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
          <h1 style="color: #FF6600;">${APP_NAME}</h1>
          <h2>Welcome to our Newsletter 🎉</h2>
          <p>Thanks for subscribing! You’ll be the first to know about new arrivals and offers.</p>
          <p style="margin-top: 30px; font-size: 12px; color: #888;">
            If you no longer wish to receive these emails, you can 
            <a href="${SERVER_URL}/newsletter?token=${subscriber.unsubscribeToken}" 
              style="color:#FF6600; text-decoration:underline;">
              unsubscribe here
            </a>.
          </p>
        </div>
      `,
    });

    if (confirmResult.error) {
      throw new Error(confirmResult.error.message);
    }

    // Notify admin
    await resend.emails.send({
      from: process.env.SENDER_EMAIL!,
      to: process.env.ADMIN_EMAIL!,
      subject: 'New Newsletter Subscriber',
      html: `<p>New subscriber: <b>${email}</b></p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Token is required' }, { status: 400 });
  }

  try {
    await prisma.newsletterSubscriber.update({
      where: { unsubscribeToken: token },
      data: { active: false },
    });

    return new Response(
      `<div style="font-family: Arial, sans-serif; text-align:center; padding:40px;">
         <h1 style="color:#FF6600;">${APP_NAME}</h1>
         <h2>You have unsubscribed successfully ✅</h2>
         <p>We’re sorry to see you go. You can re-subscribe anytime on our website.</p>
       </div>`,
      { status: 200, headers: { 'Content-Type': 'text/html' } }
    );
  } catch {
    return new Response(
      `<h1>Unsubscribe failed</h1><p>The token is invalid or already used.</p>`,
      { status: 404, headers: { 'Content-Type': 'text/html' } }
    );
  }
}

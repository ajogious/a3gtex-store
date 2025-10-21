'use client';
import { useToast } from '@/hooks/use-toast';
import { APP_NAME } from '@/lib/constants';
import Link from 'next/link';
import { useState } from 'react';

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const subscribe = async () => {
    if (!email || !email.includes('@')) {
      toast({
        variant: 'destructive',
        description: '❌ Please enter a valid email.',
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        toast({ description: '🎉 Subscription successful! Check your inbox.' });
        setEmail('');
      } else {
        toast({
          variant: 'destructive',
          description: data.error || '❌ Something went wrong.',
        });
      }
    } catch {
      toast({
        variant: 'destructive',
        description: '⚠️ Network error. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center text-center space-y-2 pt-20 pb-14'>
      <h1 className='md:text-4xl text-2xl font-medium'>
        Subscribe now &amp; get 20% off
      </h1>
      <div className='flex flex-col md:flex-row items-stretch max-w-2xl w-full md:h-14 h-auto px-4'>
        <input
          className='border border-gray-500/30 rounded-md md:rounded-r-none h-12 md:h-full outline-none w-full px-3 text-gray-500'
          type='email'
          placeholder='Enter your email id'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className='md:px-12 px-8 h-12 md:h-full text-white bg-orange-600 rounded-md md:rounded-l-none mt-3 md:mt-0'
          onClick={subscribe}
          disabled={loading}
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>
    </div>
  );
}

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Newsletter Section */}
      <NewsletterForm />

      <footer className='container mx-auto'>
        <div className='flex flex-col md:flex-row items-start justify-center px-6 py-14 md:px-16 lg:px-32 gap-10 border-b border-gray-500/30 text-gray-500'>
          {/* About */}
          <div className='w-4/5'>
            <div className='flex items-center gap-2 text-2xl font-bold text-gray-800 mb-6'>
              <Link href='/' className='text-orange-600'>
                {APP_NAME}
              </Link>
            </div>
            <p className='mt-6 text-sm leading-relaxed'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
              asperiores dignissimos, fugit incidunt sequi tenetur, accusamus
              maiores quisquam repellat officia quia non nulla aliquam modi
              molestiae delectus magnam a illum! lorem20
            </p>
            <p className='mt-6 text-sm leading-relaxed'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos,
              consectetur?
            </p>
            <p className='mt-6 text-sm leading-relaxed'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos,
              consectetur? Lorem ipsum dolor, sit amet consectetur adipisicing
              elit. Itaque, quaerat?
            </p>
          </div>

          {/* Links */}
          <div className='w-1/2 flex items-center justify-start md:justify-center'>
            <div>
              <h2 className='font-medium text-gray-900 mb-5'>Company</h2>
              <ul className='text-sm space-y-2'>
                <li>
                  <Link className='hover:underline transition' href='/'>
                    Home
                  </Link>
                </li>
                <li>
                  <Link className='hover:underline transition' href='#'>
                    About us
                  </Link>
                </li>
                <li>
                  <Link className='hover:underline transition' href='#'>
                    Contact us
                  </Link>
                </li>
                <li>
                  <Link className='hover:underline transition' href='#'>
                    Privacy policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className='w-1/2 flex items-start justify-start md:justify-center'>
            <div>
              <h2 className='font-medium text-gray-900 mb-5'>Get in touch</h2>
              <div className='text-sm space-y-2'>
                <Link
                  href='https://wa.me/2348132925207'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-orange-600 transition block'
                >
                  +2347081512250
                </Link>
                <Link
                  href='mailto:a3globaltechsolutions@gmail.com'
                  className='hover:text-orange-600 transition block'
                >
                  a3globaltechsolutions@gmail.com
                </Link>
              </div>
            </div>
          </div>
        </div>
        <p className='py-4 text-center text-xs md:text-sm'>
          Copyright {currentYear} © {APP_NAME} All Rights Reserved.
        </p>
      </footer>
    </>
  );
};

export default Footer;

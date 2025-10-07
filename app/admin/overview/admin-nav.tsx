'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react'; // hamburger icon

const AdminNav = () => {
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: 'Overview' },
    { href: '/admin/products', label: 'Products' },
    { href: '/admin/orders', label: 'Orders' },
    { href: '/admin/users', label: 'Users' },
  ];

  return (
    <nav className='w-full flex items-center justify-between border-b p-4 bg-white'>
      {/* Logo / Title */}
      <h1 className='font-bold text-lg'>Admin</h1>

      {/* Desktop Nav */}
      <div className='hidden md:flex gap-4'>
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            <Button
              variant={pathname === link.href ? 'default' : 'ghost'}
              className='text-sm'
            >
              {link.label}
            </Button>
          </Link>
        ))}
      </div>

      {/* Mobile Nav */}
      <div className='md:hidden'>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='outline' size='icon'>
              <Menu className='w-5 h-5' />
              <span className='sr-only'>Open Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side='left'
            className='flex flex-col gap-6 p-6 bg-background'
            style={{
              WebkitOverflowScrolling: 'touch',
              overscrollBehaviorY: 'contain',
              touchAction: 'pan-y',
            }}
          >
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={pathname === link.href ? 'default' : 'ghost'}
                  className='w-full text-left'
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default AdminNav;

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu as MenuIcon } from 'lucide-react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

const links = [
  { title: 'Overview', href: '/admin/overview' },
  { title: 'Products', href: '/admin/products' },
  { title: 'Orders', href: '/admin/orders' },
  { title: 'Users', href: '/admin/users' },
];

const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();

  return (
    <nav className={cn('flex items-center', className)} {...props}>
      {/* Desktop Navigation */}
      <div className='hidden md:flex gap-6'>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              pathname.startsWith(link.href)
                ? 'text-primary'
                : 'text-muted-foreground'
            )}
          >
            {link.title}
          </Link>
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className='md:hidden'>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              className='border-none focus-visible:ring-0 focus-visible:ring-offset-0'
            >
              <MenuIcon className='h-5 w-5' />
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
            {/* ✅ Add hidden title for accessibility */}
            <SheetHeader>
              <VisuallyHidden>
                <SheetTitle>Navigation Menu</SheetTitle>
              </VisuallyHidden>
            </SheetHeader>

            <nav className='flex flex-col space-y-3'>
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-base font-medium transition-colors hover:text-primary',
                    pathname.startsWith(link.href)
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  )}
                >
                  {link.title}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default MainNav;

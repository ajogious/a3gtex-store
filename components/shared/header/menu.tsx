import { Button } from '@/components/ui/button';
import ModeToggle from './mode-toggle';
import Link from 'next/link';
import { ShoppingCart, User } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import UserButton from './user-button';

const Menu = () => {
  return (
    <div className='flex justify-end gap-3'>
      {/* Desktop */}
      <nav className='hidden md:flex w-full max-w-xs gap-1'>
        <ModeToggle />
        <Button asChild variant='ghost'>
          <Link href='/cart'>
            <ShoppingCart /> Cart
          </Link>
        </Button>
        <UserButton />
      </nav>

      {/* Mobile */}
      <nav className='md:hidden'>
        <Sheet>
          <SheetTrigger className='flex items-center gap-1'>
            <User size={20} />
            <span className='text-sm'>Account</span>
          </SheetTrigger>
          <SheetContent className='flex flex-col items-start'>
            <SheetTitle>Menu</SheetTitle>
            <ModeToggle />
            <Button asChild variant='ghost'>
              <Link href='/cart'>
                <ShoppingCart /> Cart
              </Link>
            </Button>
            <UserButton />
            <SheetDescription></SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;

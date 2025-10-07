import Link from 'next/link';
import { auth } from '@/auth';
import { signOutUser } from '@/lib/actions/user.actions';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserIcon } from 'lucide-react';

const UserButton = async () => {
  const session = await auth();

  if (!session) {
    return (
      <Button asChild>
        <Link href='/sign-in'>
          <UserIcon className='mr-1' /> Sign In
        </Link>
      </Button>
    );
  }

  const firstInitial = session.user?.name?.charAt(0).toUpperCase() ?? 'U';

  return (
    <div className='flex gap-2 items-center'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-gray-200 text-sm sm:text-base'
          >
            {firstInitial}
          </Button>
        </DropdownMenuTrigger>

        {/* Responsive width using Tailwind */}
        <DropdownMenuContent className='w-44 sm:w-56' align='end' forceMount>
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col space-y-1'>
              <span className='text-sm font-medium'>{session.user?.name}</span>
              <span className='text-xs text-muted-foreground'>
                {session.user?.email}
              </span>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuItem asChild>
            <Link href='/user/profile'>User Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href='/user/orders'>Order History</Link>
          </DropdownMenuItem>

          {session?.user?.role === 'admin' && (
            <DropdownMenuItem asChild>
              <Link href='/admin/overview'>Admin</Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem className='p-0'>
            <form action={signOutUser} className='w-full'>
              <Button
                variant='ghost'
                className='w-full justify-start text-left px-2 py-2 sm:py-3'
              >
                Sign Out
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserButton;

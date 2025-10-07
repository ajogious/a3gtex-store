import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import Menu from '@/components/shared/header/menu';
import MainNav from './main-nav';
import AdminSearch from '@/components/admin/admin-search';

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='flex min-h-screen flex-col bg-background'>
      {/* ✅ Fixed border + sticky header */}
      <header className='sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center gap-3'>
            {/* 🟢 Mobile Logo */}
            <Link href='/' className='flex items-center md:hidden'>
              <Image
                src='/images/logo.svg'
                height={30}
                width={30}
                alt={APP_NAME}
                priority
              />
            </Link>

            {/* 🟣 Desktop Logo */}
            <Link href='/' className='hidden md:flex items-center'>
              <Image
                src='/images/logo.svg'
                height={40}
                width={40}
                alt={APP_NAME}
                priority
              />
            </Link>

            <MainNav />
          </div>

          <div className='flex items-center gap-3'>
            <AdminSearch />
            <Menu />
          </div>
        </div>
      </header>

      {/* ✅ Main content area */}
      <main className='flex-1 container mx-auto w-full px-4 py-8 sm:px-6 lg:px-8'>
        {children}
      </main>
    </div>
  );
}

import Link from 'next/link';

const ViewAllProductsButton = () => {
  return (
    <div className='flex justify-center items-center my-4'>
      <button className='px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition'>
        <Link href='/search'>See more</Link>
      </button>
    </div>
  );
};

export default ViewAllProductsButton;

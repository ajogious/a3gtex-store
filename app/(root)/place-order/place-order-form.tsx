'use client';

import { useRouter } from 'next/navigation';
import { Check, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';
import { createOrder } from '@/lib/actions/order.actions';

type PlaceOrderFormProps = {
  usdTotal: string; // 👈 Accept usdTotal as a prop
};

const PlaceOrderForm = ({ usdTotal }: PlaceOrderFormProps) => {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const res = await createOrder(usdTotal); // now usdTotal is passed correctly

    if (res.redirectTo) {
      router.push(res.redirectTo);
    }
  };

  const PlaceOrderButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending} className='w-full'>
        {pending ? (
          <Loader className='w-4 h-4 animate-spin' />
        ) : (
          <Check className='w-4 h-4' />
        )}{' '}
        Place Order
      </Button>
    );
  };

  return (
    <form onSubmit={handleSubmit} className='w-full'>
      <PlaceOrderButton />
    </form>
  );
};

export default PlaceOrderForm;

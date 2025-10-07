'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Review } from '@/types';
import ReviewForm from './review-form';
import { getReviews } from '@/lib/actions/review.actions';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Calendar, User } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';
import Rating from '@/components/shared/product/rating';

const ReviewList = ({
  userId,
  productId,
  productSlug,
}: {
  userId: string;
  productId: string;
  productSlug: string;
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const loadReviews = async () => {
      const res = await getReviews({ productId });
      setReviews(res.data);
    };
    loadReviews();
  }, [productId]);

  const reload = async () => {
    const res = await getReviews({ productId });
    setReviews([...res.data]);
  };

  return (
    <div className='space-y-6'>
      {/* Review form / Sign-in prompt */}
      {userId ? (
        <ReviewForm
          userId={userId}
          productId={productId}
          onReviewSubmitted={reload}
        />
      ) : (
        <div className='text-sm'>
          Please
          <Link
            className='text-blue-600 px-1 underline hover:text-blue-800'
            href={`/sign-in?callbackUrl=/product/${productSlug}`}
          >
            sign in
          </Link>
          to write a review
        </div>
      )}

      {/* Reviews */}
      {reviews.length === 0 ? (
        <p className='text-gray-500 text-center text-sm'>No reviews yet</p>
      ) : (
        <div
          className='
            grid grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-3 
            gap-4
          '
        >
          {reviews.map((review) => (
            <Card key={review.id} className='flex flex-col'>
              <CardHeader className='pb-2'>
                <CardTitle className='text-base font-semibold line-clamp-1'>
                  {review.title}
                </CardTitle>
                <CardDescription className='line-clamp-2 text-sm'>
                  {review.description}
                </CardDescription>
              </CardHeader>
              <CardContent className='mt-auto'>
                <div className='flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground'>
                  <Rating value={review.rating} />
                  <div className='flex items-center'>
                    <User className='mr-1 h-3 w-3' />
                    {review.user ? review.user.name : 'User'}
                  </div>
                  <div className='flex items-center'>
                    <Calendar className='mr-1 h-3 w-3' />
                    {formatDateTime(review.createdAt).dateTime}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;

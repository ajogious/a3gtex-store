'use client';

import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { productDefaultValues } from '@/lib/constants';
import { insertProductSchema, updateProductSchema } from '@/lib/validators';
import { Product } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import slugify from 'slugify';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { createProduct, updateProduct } from '@/lib/actions/product.actions';
import { UploadButton } from '@/lib/uploadthing';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import { Checkbox } from '../ui/checkbox';

// 🔹 Validate file size & dimensions
function validateImage(
  files: File[],
  maxSizeKB: number,
  requiredWidth: number,
  requiredHeight: number,
  showToast: (msg: string) => void
): Promise<File[]> {
  const maxSizeBytes = maxSizeKB * 1024;

  return Promise.all(
    files.map(
      (file) =>
        new Promise<File | null>((resolve) => {
          if (file.size > maxSizeBytes) {
            showToast(
              `❌ File "${file.name}" is too large. Max size is ${maxSizeKB}KB.`
            );
            return resolve(null);
          }

          const img = new window.Image();
          img.src = URL.createObjectURL(file);

          img.onload = () => {
            if (img.width !== requiredWidth || img.height !== requiredHeight) {
              showToast(
                `❌ "${file.name}" must be exactly ${requiredWidth}x${requiredHeight}px.`
              );
              resolve(null);
            } else {
              resolve(file);
            }
          };

          img.onerror = () => {
            showToast(`❌ Could not read "${file.name}"`);
            resolve(null);
          };
        })
    )
  ).then((results) => results.filter((f): f is File => f !== null));
}

const ProductForm = ({
  type,
  product,
  productId,
}: {
  type: 'Create' | 'Update';
  product?: Product;
  productId?: string;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const tempUploads = useRef<string[]>([]); // 🔹 store temporary uploaded URLs

  const form = useForm<z.infer<typeof insertProductSchema>>({
    resolver:
      type === 'Update'
        ? zodResolver(updateProductSchema)
        : zodResolver(insertProductSchema),
    defaultValues:
      product && type === 'Update' ? product : productDefaultValues,
  });

  // =========================================================
  // 🔹 CLEANUP: Delete temporary uploads if user leaves page
  // =========================================================
  useEffect(() => {
    const cleanupUploads = async () => {
      if (type === 'Create' && tempUploads.current.length > 0) {
        await Promise.all(
          tempUploads.current.map(async (url) => {
            await fetch('/api/uploadthing/delete', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ url }),
            });
          })
        );
      }
    };

    // Browser refresh/close
    const handleBeforeUnload = () => {
      cleanupUploads();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    // React navigation
    return () => {
      cleanupUploads();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [type]);

  // =========================================================
  // 🔹 SUBMIT HANDLER
  // =========================================================
  const onSubmit: SubmitHandler<z.infer<typeof insertProductSchema>> = async (
    values
  ) => {
    if (type === 'Create') {
      const res = await createProduct(values);
      if (!res.success) {
        toast({ variant: 'destructive', description: res.message });
      } else {
        toast({ description: res.message });
        tempUploads.current = []; // ✅ clear temp uploads on success
        router.push('/admin/products');
      }
    }

    if (type === 'Update') {
      if (!productId) {
        router.push('/admin/products');
        return;
      }

      const res = await updateProduct({ ...values, id: productId });
      if (!res.success) {
        toast({ variant: 'destructive', description: res.message });
      } else {
        toast({ description: res.message });
        router.push('/admin/products');
      }
    }
  };

  // =========================================================
  // 🔹 DELETE IMAGE HANDLERS
  // =========================================================
  const handleDeleteImage = async (imageUrl: string) => {
    try {
      if (type === 'Create') {
        const response = await fetch('/api/uploadthing/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: imageUrl }),
        });
        const result = await response.json();
        if (!result.success) throw new Error(result.message);
      }

      const currentImages = form.getValues('images');
      form.setValue(
        'images',
        currentImages.filter((img: string) => img !== imageUrl)
      );

      tempUploads.current = tempUploads.current.filter(
        (url) => url !== imageUrl
      ); // ✅ remove from temp list
      toast({ description: 'Image removed (will apply after saving)' });
    } catch (error) {
      console.error('Error deleting image:', error);
      toast({
        variant: 'destructive',
        description:
          error instanceof Error ? error.message : 'Failed to delete image',
      });
    }
  };

  const handleDeleteBanner = async (bannerUrl: string) => {
    try {
      if (type === 'Create') {
        const response = await fetch('/api/uploadthing/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: bannerUrl }),
        });
        const result = await response.json();
        if (!result.success) throw new Error(result.message);
      }

      form.setValue('banner', '');
      tempUploads.current = tempUploads.current.filter(
        (url) => url !== bannerUrl
      ); // ✅ remove from temp list
      toast({ description: 'Banner removed (will apply after saving)' });
    } catch (error) {
      console.error('Error deleting banner:', error);
      toast({
        variant: 'destructive',
        description:
          error instanceof Error ? error.message : 'Failed to delete banner',
      });
    }
  };

  // =========================================================
  // 🔹 WATCH FORM FIELDS
  // =========================================================
  const images = form.watch('images');
  const isFeatured = form.watch('isFeatured');
  const banner = form.watch('banner');

  // =========================================================
  // 🔹 UI
  // =========================================================
  return (
    <Form {...form}>
      <form
        method='POST'
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8'
      >
        {/* ======================= NAME + SLUG ======================= */}
        <div className='flex flex-col md:flex-row gap-5'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter product name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='slug'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input placeholder='Enter slug' {...field} readOnly />
                    <Button
                      type='button'
                      className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 mt-2'
                      onClick={() =>
                        form.setValue(
                          'slug',
                          slugify(form.getValues('name'), { lower: true })
                        )
                      }
                    >
                      Generate
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* ======================= CATEGORY + BRAND ======================= */}
        <div className='flex flex-col md:flex-row gap-5'>
          <FormField
            control={form.control}
            name='category'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder='Enter category' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='brand'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input placeholder='Enter brand' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* ======================= PRICE + STOCK ======================= */}
        <div className='flex flex-col md:flex-row gap-5'>
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder='Enter product price' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='stock'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input placeholder='Enter stock' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* ======================= PRODUCT IMAGES ======================= */}
        <div className='upload-field flex flex-col md:flex-row gap-5'>
          <FormField
            control={form.control}
            name='images'
            render={() => (
              <FormItem className='w-full'>
                <FormLabel>
                  Product Images
                  <span className='block text-xs text-gray-500'>
                    Required: 900×900px, ≤30KB
                  </span>
                </FormLabel>
                <Card>
                  <CardContent className='space-y-2 mt-2 min-h-48'>
                    <div className='flex-start space-x-2'>
                      {images.map((image: string) => (
                        <div className='relative inline-block' key={image}>
                          <Image
                            src={image}
                            alt='product image'
                            className='w-20 h-20 object-cover object-center rounded-sm'
                            width={100}
                            height={100}
                          />
                          <button
                            type='button'
                            onClick={() => handleDeleteImage(image)}
                            className='absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 text-xs hover:bg-red-700'
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      <FormControl>
                        <UploadButton
                          endpoint='productUploader'
                          onBeforeUploadBegin={(files) =>
                            validateImage(files, 30, 900, 900, (msg) =>
                              toast({
                                variant: 'destructive',
                                description: msg,
                              })
                            )
                          }
                          onClientUploadComplete={(res) => {
                            if (!res || res.length === 0) return;
                            const uploadedUrl = res[0].ufsUrl;
                            form.setValue('images', [...images, uploadedUrl]);
                            tempUploads.current.push(uploadedUrl); // ✅ track temp upload
                          }}
                          onUploadError={(error: Error) => {
                            toast({
                              variant: 'destructive',
                              description: error.message,
                            });
                          }}
                        />
                      </FormControl>
                    </div>
                  </CardContent>
                </Card>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* ======================= FEATURED + BANNER ======================= */}
        <div className='upload-field'>
          Featured Product
          <Card>
            <CardContent className='space-y-2 mt-2'>
              <FormField
                control={form.control}
                name='isFeatured'
                render={({ field }) => (
                  <FormItem className='space-x-2 items-center'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Is Featured?</FormLabel>
                  </FormItem>
                )}
              />
              {isFeatured && (
                <>
                  <FormLabel>
                    Banner Image
                    <span className='block text-xs text-gray-500'>
                      Required: 1920×560px, ≤100KB
                    </span>
                  </FormLabel>
                  {banner && (
                    <div className='relative'>
                      <Image
                        src={banner}
                        alt='banner image'
                        className='w-full object-cover object-center rounded-sm'
                        width={1920}
                        height={560}
                      />
                      <button
                        type='button'
                        onClick={() => handleDeleteBanner(banner)}
                        className='absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 text-xs hover:bg-red-700'
                      >
                        ✕
                      </button>
                    </div>
                  )}
                  {!banner && (
                    <UploadButton
                      endpoint='bannerUploader'
                      onBeforeUploadBegin={(files) =>
                        validateImage(files, 100, 1920, 560, (msg) =>
                          toast({
                            variant: 'destructive',
                            description: msg,
                          })
                        )
                      }
                      onClientUploadComplete={(res) => {
                        if (!res || res.length === 0) return;
                        const uploadedUrl = res[0].ufsUrl;
                        form.setValue('banner', uploadedUrl);
                        tempUploads.current.push(uploadedUrl); // ✅ track temp upload
                      }}
                      onUploadError={(error: Error) => {
                        toast({
                          variant: 'destructive',
                          description: error.message,
                        });
                      }}
                    />
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* ======================= DESCRIPTION ======================= */}
        <div>
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Enter product description'
                    className='resize-none'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* ======================= SUBMIT ======================= */}
        <div>
          <Button
            type='submit'
            size='lg'
            disabled={form.formState.isSubmitting}
            className='button col-span-2 w-full'
          >
            {form.formState.isSubmitting ? 'Submitting' : `${type} Product`}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;

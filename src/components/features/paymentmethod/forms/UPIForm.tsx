import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const upiFormSchema = z.object({
  upiId: z.string().min(5).max(50),
  bankName: z.string().min(5).max(50),
  nickName: z.string().min(5).max(50).optional(),
});

type UPIFormValues = z.infer<typeof upiFormSchema>;

const UPIForm = () => {
  const form = useForm<UPIFormValues>({
    resolver: zodResolver(upiFormSchema),
    defaultValues: {
      upiId: '',
      bankName: '',
      nickName: '',
    },
  });

  function onSubmit(values: UPIFormValues) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6 ">
        <FormField
          control={form.control}
          name="upiId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>UPI ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter UPI ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bankName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter bank name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nickName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nickname (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter a nickname for this card" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" variant={'gradient'} size={'lg'} className=" font-bold">
          <Check strokeWidth={3} /> Save Payment Method
        </Button>
      </form>
    </Form>
  );
};

export default UPIForm;

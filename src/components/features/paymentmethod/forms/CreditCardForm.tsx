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

const creditCardFormSchema = z.object({
  cardName: z.string().min(5).max(50),
  cardNumber: z.string().min(16).max(19),
  bankName: z.string().min(5).max(50),
  nickName: z.string().min(5).max(50).optional(),
});

type CreditCardFormValues = z.infer<typeof creditCardFormSchema>;

const CreditCardForm = () => {
  const form = useForm<CreditCardFormValues>({
    resolver: zodResolver(creditCardFormSchema),
    defaultValues: {
      cardName: '',
      cardNumber: '',
      bankName: '',
      nickName: '',
    },
  });

  function onSubmit(values: CreditCardFormValues) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6 ">
        <FormField
          control={form.control}
          name="cardName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter card name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="1234 5678 9012 3456"
                  {...field}
                  maxLength={19}
                  onChange={e => {
                    const value = e.target.value.replace(/\D/g, '');
                    const formattedValue = value.replace(/(\d{4})/g, '$1 ').trim();
                    field.onChange(formattedValue);
                  }}
                />
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

export default CreditCardForm;

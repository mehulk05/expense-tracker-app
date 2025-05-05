import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; // For navigation

import {
  paymentMethodFormSchema,
  PaymentMethodFormValues,
} from '../../validators/add-payment-form.validator';
import { addCardInfo } from '../services/add-card.service';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormField,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';

interface Props {
  method: 'upi' | 'credit' | 'debit';
}

const AddPaymentForm: React.FC<Props> = ({ method }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Set appropriate default values based on payment method
  const defaultValues = {
    paymentType: method,
    upiId: '',
    cardName: '',
    cardNumber: '',
    bankName: '',
    nickName: '',
  };

  const form = useForm<PaymentMethodFormValues>({
    resolver: zodResolver(paymentMethodFormSchema),
    defaultValues,
    mode: 'onSubmit',
  });

  // This is important - update the paymentType when the method prop changes
  useEffect(() => {
    form.setValue('paymentType', method);
  }, [method, form]);

  const onSubmit = async (values: PaymentMethodFormValues) => {
    if (!currentUser?.uid) {
      setError('You must be logged in to add a payment method');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      console.log('Form submitted successfully with values:', values);
      await addCardInfo(currentUser.uid, values);
      form.reset(defaultValues);

      // Redirect to the listing page after successful submission
      navigate('payment-methods');
    } catch (err) {
      console.error('Error saving payment method:', err);
      setError(
        err instanceof Error ? err.message : 'Failed to save payment method. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
        {/* We don't need a hidden input anymore, the useEffect handles setting the payment type */}
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {method === 'upi' ? (
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
        ) : (
          <>
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
                        const formatted = value.replace(/(\d{4})/g, '$1 ').trim();
                        field.onChange(formatted);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

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
                <Input placeholder="Enter a nickname" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="font-medium"
            onClick={() => navigate('/payment-method')}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="gradient"
            size="lg"
            className="font-bold"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
              </>
            ) : (
              <>
                <Check strokeWidth={3} className="mr-2" /> Save Method
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddPaymentForm;

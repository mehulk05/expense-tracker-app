import { z } from 'zod';

// Create two separate schemas for different payment types
const upiSchema = z.object({
  paymentType: z.literal('upi'),
  upiId: z.string().min(1, 'UPI ID is required').max(20),
  bankName: z.string().min(1, 'Bank Name is required').max(20),
  nickName: z.string().max(20).optional(),
  // These fields are not needed for UPI but need to be in the type
  cardName: z.string().optional(),
  cardNumber: z.string().optional(),
});

const cardSchema = z.object({
  paymentType: z.enum(['credit', 'debit']),
  cardName: z.string().min(1, 'Card Name is required').max(20),
  cardNumber: z.string().min(1, 'Card Number is required').max(19),
  bankName: z.string().min(1, 'Bank Name is required').max(20),
  nickName: z.string().max(20).optional(),
  // This field is not needed for cards but needs to be in the type
  upiId: z.string().optional(),
});

// Combine them with a discriminated union
export const paymentMethodFormSchema = z.discriminatedUnion('paymentType', [upiSchema, cardSchema]);

export type PaymentMethodFormValues = z.infer<typeof paymentMethodFormSchema>;

import { LucideIcon } from 'lucide-react';

export type PaymentMethod = 'credit' | 'debit' | 'upi';

// Interface for a single payment method
export interface IPaymentMethodOptions {
  id: PaymentMethod;
  title: string;
  icon: LucideIcon;
}

export interface IPaymentProps {
  cardName?: string;
  cardNumber?: string;
  bankName: string;
  nickName?: string;
  upiId?: string;
  paymentType: PaymentMethod;
}

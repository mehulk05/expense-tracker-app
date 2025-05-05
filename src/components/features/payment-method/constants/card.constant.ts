import { CreditCard, Landmark, Smartphone } from 'lucide-react';

import { IPaymentMethodOptions } from '../interface/add-card.interface';

export const paymentMethods: IPaymentMethodOptions[] = [
  {
    id: 'credit',
    title: 'Credit Card',
    icon: CreditCard,
  },
  {
    id: 'debit',
    title: 'Debit Card',
    icon: Landmark,
  },
  {
    id: 'upi',
    title: 'UPI',
    icon: Smartphone,
  },
];

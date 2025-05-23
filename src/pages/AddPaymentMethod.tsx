import { useState } from 'react';

import { CreditCard, Landmark, Smartphone } from 'lucide-react';

import AddPaymentForm from '@/components/features/payment-method/components/forms/AddPaymentForm';
import { PaymentMethod } from '@/components/features/payment-method/interface/add-card.interface';

const paymentMethods = [
  { id: 'credit', title: 'Credit Card', icon: CreditCard },
  { id: 'debit', title: 'Debit Card', icon: Landmark },
  { id: 'upi', title: 'UPI', icon: Smartphone },
];

const AddPaymentMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('credit');

  return (
    <div>
      <div className="flex justify-between items-center py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add a Payment Method</h1>
      </div>
      <div className="py-8 px-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Select Payment Method
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {paymentMethods.map(method => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id as PaymentMethod)}
              className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all ${
                selectedMethod === method.id
                  ? 'border-indigo-600 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600'
              }`}
            >
              <method.icon
                size={32}
                className={`mb-3 ${
                  selectedMethod === method.id
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              />
              <span
                className={`font-medium ${
                  selectedMethod === method.id
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {method.title}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-8">{<AddPaymentForm method={selectedMethod} />}</div>
      </div>
    </div>
  );
};

export default AddPaymentMethod;

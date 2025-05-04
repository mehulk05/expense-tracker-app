import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';

const PaymentMethods = () => {
  const navigate = useNavigate();

  return (
    <div className="">
      <div className="flex justify-between items-center py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Payment Methods</h1>
        <Button
          onClick={() => navigate('/dashboard/add-payment-method')}
          variant={'gradient'}
          size={'lg'}
          className="text-base font-bold"
        >
          <Plus strokeWidth={4} />
          Add Payment Method
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethods;

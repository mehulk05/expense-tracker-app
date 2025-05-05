import { useState, useEffect } from 'react';

import { getDocs, collection, doc } from 'firebase/firestore';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { IPaymentProps } from '@/components/features/payment-method/interface/add-card.interface';
import { Button } from '@/components/ui/button';
import { db } from '@/firebase';
import { useAuth } from '@/hooks/useAuth';

const PaymentMethods = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [payments, setPayments] = useState<IPaymentProps[]>([]);

  const uid = currentUser?.uid;

  useEffect(() => {
    const fetchPayments = async () => {
      if (!uid) return;

      try {
        const userDocRef = doc(db, 'users', uid);

        const cardsRef = collection(userDocRef, 'cards'); // ✅ Now it's correct
        const querySnapshot = await getDocs(cardsRef);

        const data: IPaymentProps[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as unknown as IPaymentProps[];

        console.log('Fetched Payment Methods:', data);
        setPayments(data);
      } catch (error) {
        console.error('Error fetching payment methods:', error);
      }
    };

    if (uid) {
      fetchPayments();
    }
  }, [uid]);

  console.log(payments);

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

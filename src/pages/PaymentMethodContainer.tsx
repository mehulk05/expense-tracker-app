import { useState, useEffect, useCallback } from 'react';

import { CreditCard, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import PaymentList from '@/components/features/payment-method/components/payment-list/PaymentList';
import { IPaymentList } from '@/components/features/payment-method/interface/add-card.interface';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import DeleteConfirmation from '@/shared/component/DeleteConfirmation';
import { deletePaymentMethod, getPaymentMethodByUserId } from '@/components/features/payment-method/components/services/payment-method.service';

// Get payments filtered by active tab
const getFilteredPayments = (payments: IPaymentList[], activeTab: string) => {
  if (activeTab === 'all') return payments;
  return payments.filter(payment => payment.paymentType === activeTab);
};


const PaymentMethodContainer = () => {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true); // Start with true

  const navigate = useNavigate();
  const [payments, setPayments] = useState<IPaymentList[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const uid = currentUser?.uid;

  const fetchPayments = useCallback(async () => {
    if (!uid) return;

    try {
      setIsLoading(true); // Start loading

      const res = await getPaymentMethodByUserId(uid);
      setPayments(res);
    } catch (error) {
      console.error('Error fetching payment methods:', error);
    } finally {
      setIsLoading(false); // Stop loading regardless of success or error
    }
  }, [uid]);

  useEffect(() => {
      fetchPayments();
  }, [fetchPayments]);




  // Empty state component
  const EmptyState = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center shadow-sm">
      <CreditCard className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
        No payment methods
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-4">
        Add your first payment method to track expenses easily.
      </p>
      <button className="mx-auto flex items-center justify-center border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg font-medium">
        <Plus className="mr-1 h-4 w-4" />
        Add Payment Method
      </button>
    </div>
  );

  // Loading state component
  const LoadingState = () => (
    <div className="grid grid-cols-1 gap-4 animate-pulse">
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-gray-100 dark:bg-gray-800 h-24 rounded-xl" />
      ))}
    </div>
  );

  const handleDeletePaymentMethod = (id: string) => {
    setSelectedPaymentMethod(id);
    setShowDeleteConfirmation(true);
  };

  const closeDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
    setSelectedPaymentMethod(null)
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    if (currentUser?.uid && selectedPaymentMethod) {
      try {
        await deletePaymentMethod(currentUser.uid, selectedPaymentMethod);
        setShowDeleteConfirmation(false);
        
        // Call the success callback if provided
        fetchPayments();

      } catch (err) {
        console.error('Error deleting payment method:', err);
      
      } finally {
        setIsDeleting(false);
      }
    }
  };
  
  const filteredPayments = getFilteredPayments(payments, activeTab);

  return (

    <>
      <div className="flex justify-between items-center mt-6 mb-3">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Methods</h1>
        <Button
          onClick={() => navigate('/dashboard/add-payment-method')}
          variant={'gradient'}
          size={'lg'}
          className="text-base font-medium"
        >
          <Plus strokeWidth={4} />
          Add Payment Method
        </Button>
      </div>

      <div className="w-full height:[calc(100vh-180px] bg-white p-5">

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab('all')}
            className={`py-3 px-6 font-semibold ${activeTab === 'all'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-black-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab('credit')}
            className={`py-3 px-6 font-semibold ${activeTab === 'credit'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-black-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
          >
            Credit
          </button>
          <button
            onClick={() => setActiveTab('debit')}
            className={`py-3 px-6 font-semibold ${activeTab === 'debit'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-black-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
          >
            Debit
          </button>
          <button
            onClick={() => setActiveTab('upi')}
            className={`py-3 px-6 font-semibold ${activeTab === 'upi'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-black-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
          >
            UPI
          </button>
        </div>


        {isLoading ? (
          <LoadingState />
        ) : filteredPayments.length === 0 ? (
          <EmptyState />
        ) : (
          <PaymentList payments={filteredPayments} onDeletePaymentMethod={handleDeletePaymentMethod} />
        )}
      </div>


       {/* Delete Confirmation Dialog */}
       <DeleteConfirmation
        isOpen={showDeleteConfirmation}
        title='Delete Payment Method'
        message='Are you sure you want to delete this payment method?'
        isDeleting={isDeleting}
        onClose={closeDeleteConfirmation}
        onConfirm={confirmDelete}
      />
    </>

  );
};

export default PaymentMethodContainer;

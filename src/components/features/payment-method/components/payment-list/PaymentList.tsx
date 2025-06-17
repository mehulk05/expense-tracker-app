import {
  CreditCard,
  Wallet,
  Smartphone,
  MoreVertical,
  Trash2,
  PencilLine,
  Calendar,
  Building,
} from 'lucide-react';
import { useState } from 'react';

import { IPaymentList } from '../../interface/add-card.interface';
import { IFirebaseTimeStamp } from '@/shared/interfaces/firebase-timestamp.interface';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/route.constants';

const PaymentList = ({ payments, onDeletePaymentMethod }: { payments: IPaymentList[], onDeletePaymentMethod: (id: string) => void }) => {
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // Get the icon based on payment type
  const getPaymentIcon = (paymentType: string) => {
    switch (paymentType) {
      case 'credit':
        return <CreditCard className="h-5 w-5 text-white" />;
      case 'debit':
        return <Wallet className="h-5 w-5 text-white" />;
      case 'upi':
        return <Smartphone className="h-5 w-5 text-white" />;
      default:
        return <CreditCard className="h-5 w-5 text-white" />;
    }
  };

  // Get background color based on payment type
  const getIconBgColor = (paymentType: string) => {
    switch (paymentType) {
      case 'credit':
        return 'bg-indigo-500';
      case 'debit':
        return 'bg-emerald-500';
      case 'upi':
        return 'bg-amber-500';
      default:
        return 'bg-indigo-500';
    }
  };

  // Format card number with asterisks for security
  const formatCardNumber = (cardNumber: string | undefined) => {
    if (!cardNumber) return '';
    const parts = cardNumber.split(' ');
    if (parts.length <= 1) return '••••';
    return `•••• ${parts[parts.length - 1]}`;
  };

  // Convert Firestore timestamp to readable date
  const formatDate = (timestamp: IFirebaseTimeStamp) => {
    if (!timestamp) return '';
    return new Date(timestamp.seconds * 1000).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  };

  // Handle edit payment method
  const handleEdit = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`${ROUTES.DASHBOARD.ADD_PAYMENT_METHOD}/${id}`);

    setActiveMenu(null);
  };

  // Handle delete payment method
  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMenu(null);
    onDeletePaymentMethod(id);
  };

  // Toggle action menu
  const toggleMenu = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === id ? null : id);
  };

  // Close menu when clicking outside
  const handleCardClick = () => {
    setActiveMenu(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {payments.map(payment => (
        <div
          key={payment.id}
          onClick={handleCardClick}
          className="bg-white dark:bg-gray-800 rounded-sm transition-all duration-300 overflow-hidden border border-gray-300 dark:border-gray-700"
        >
          <div className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className={`${getIconBgColor(payment.paymentType)} p-3 rounded-lg shadow-sm`}>
                  {getPaymentIcon(payment.paymentType)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {payment.nickName || payment.cardName}
                    </h3>
                    <span
                      className={`text-xs px-2 py-2 rounded-full font-medium ${
                        payment.paymentType === 'credit'
                          ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
                          : payment.paymentType === 'debit'
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300'
                            : 'bg-amber-50 text-amber-700 dark:bg-amber-900 dark:text-amber-300'
                      }`}
                    >
                      {payment.paymentType.charAt(0).toUpperCase() + payment.paymentType.slice(1)}
                    </span>
                  </div>
                  
                  <div className="text-sm text-black-600 dark:text-gray-300 mt-1 font-mono">
                    {payment.paymentType === 'upi' ? (
                      <span>{payment.upiId}</span>
                    ) : (
                      <span>{formatCardNumber(payment.cardNumber)}</span>
                    )}
                  </div>
                  
                  {payment.bankName && (
                    <div className="flex items-center text-xs text-black-500 dark:text-gray-400 mt-2">
                      <Building className="h-3 w-3 mr-1" />
                      {payment.bankName}
                    </div>
                  )}
                  
                  {payment.createdAt && (
                    <div className="flex items-center text-xs text-gray-600 dark:text-gray-500 mt-2">
                      <Calendar className="h-3 w-3 mr-1" />
                      Added {formatDate(payment.createdAt)}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="relative">
                <button
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                  onClick={(e) => toggleMenu(payment.id, e)}
                >
                  <MoreVertical className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
                
                {activeMenu === payment.id && (
                  <div className="absolute right-0 top-8 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-1 z-10 border border-gray-100 dark:border-gray-700">
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                      onClick={(e) => handleEdit(payment.id, e)}
                    >
                      <PencilLine className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                      Edit
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                      onClick={(e) => handleDelete(payment.id, e)}
                    >
                      <Trash2 className="h-4 w-4 mr-2 text-red-500 dark:text-red-400" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentList;
import { collection, serverTimestamp, addDoc, doc, getDoc, setDoc } from 'firebase/firestore';

import { IPaymentProps } from '../../interface/add-card.interface';

import { db } from '@/firebase';

/**
 * Add a credit card to the user's collection of cards.
 * @param {string} userId - The id of the user.
 * @param {IPaymentProps} data - The data of the credit card to be added.
 * @returns {Promise<DocumentReference<DocumentData>>} - A promise that resolves with a DocumentReference that points to the newly added credit card document.
 */

export const addCardInfo = async (userId: string, data: IPaymentProps) => {
  const ref = collection(db, 'users', userId, 'cards');
  const payload = {
    ...data,
    createdAt: serverTimestamp(),
  };

  return await addDoc(ref, payload);
};


/**
 * Update an existing payment method in the user's collection
 * @param {string} userId - The user's ID
 * @param {string} paymentId - The payment method ID to update
 * @param {IPaymentProps} data - The updated payment method data
 * @returns {Promise<void>} - A promise that resolves when the update is complete
 */
export const updateCardInfo = async (
  userId: string,
  paymentId: string,
  data: IPaymentProps
) => {
  const paymentDocRef = doc(db, 'users', userId, 'cards', paymentId);
  
  const payload = {
    ...data,
    updatedAt: serverTimestamp(),
  };
  
  return await setDoc(paymentDocRef, payload, { merge: true });
};

/**
 * Retrieves a specific payment method by ID
 * @param {string} userId - The user's ID
 * @param {string} paymentId - The payment method ID
 * @returns {Promise<any>} - The payment method data
 */
export const getPaymentMethodById = async (
  userId: string,
  paymentId: string
): Promise<any> => {
  try {
    const paymentDocRef = doc(db, 'users', userId, 'cards', paymentId);
    const paymentDoc = await getDoc(paymentDocRef);
    
    if (!paymentDoc.exists()) {
      throw new Error('Payment method not found');
    }
    
    return {
      id: paymentDoc.id,
      ...paymentDoc.data()
    };
  } catch (error) {
    console.error('Error fetching payment method:', error);
    throw error;
  }
};
import { collection, serverTimestamp, addDoc } from 'firebase/firestore';

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

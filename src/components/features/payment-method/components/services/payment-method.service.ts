
import { collection, serverTimestamp, addDoc, doc, getDoc, setDoc, deleteDoc, query, where, getDocs } from 'firebase/firestore';

import { IPaymentProps } from '../../interface/add-card.interface';

import { db } from '@/firebase';

/**
 * Add a credit card to the cards collection.
 * @param {string} userId - The id of the user.
 * @param {IPaymentProps} data - The data of the credit card to be added.
 * @returns {Promise<DocumentReference<DocumentData>>} - A promise that resolves with a DocumentReference that points to the newly added credit card document.
 */
export const addPaymentMethod = async (userId: string, data: IPaymentProps) => {
  const cardsCollection = collection(db, 'payment-method');
  const payload = {
    userId,
    ...data,
    createdAt: serverTimestamp(),
  };

  return await addDoc(cardsCollection, payload);
};

/**
 * Update an existing card in the cards collection
 * @param {string} userId - The user's ID
 * @param {string} cardId - The card ID to update
 * @param {IPaymentProps} data - The updated card data
 * @returns {Promise<void>} - A promise that resolves when the update is complete
 */
export const updatePaymentMethod = async (
  userId: string,
  cardId: string,
  data: IPaymentProps
) => {
  const cardDocRef = doc(db, 'payment-method', cardId);
  
  // First check if the card belongs to the user
  const cardDoc = await getDoc(cardDocRef);
  if (!cardDoc.exists() || cardDoc.data().userId !== userId) {
    throw new Error('Card not found or does not belong to the user');
  }
  
  const payload = {
    ...data,
    updatedAt: serverTimestamp(),
  };
  
  return await setDoc(cardDocRef, payload, { merge: true });
};

/**
 * Retrieves a specific card by ID
 * @param {string} userId - The user's ID
 * @param {string} cardId - The card ID
 * @returns {Promise<any>} - The card data
 */
export const getPaymentMethodById = async (
  userId: string,
  cardId: string
): Promise<any> => {
  try {
    const cardDocRef = doc(db, 'payment-method', cardId);
    const cardDoc = await getDoc(cardDocRef);
    
    if (!cardDoc.exists()) {
      throw new Error('Card not found');
    }
    
    const cardData = cardDoc.data();
    
    // Verify that the card belongs to the user
    if (cardData.userId !== userId) {
      throw new Error('Card does not belong to this user');
    }
    
    return {
      id: cardDoc.id,
      ...cardData
    };
  } catch (error) {
    console.error('Error fetching card:', error);
    throw error;
  }
};

/**
 * Retrieves all cards for a user
 * @param {string} userId - The user's ID
 * @returns {Promise<any[]>} - Array of the user's cards
 */
export const getPaymentMethodByUserId = async (userId: string): Promise<any[]> => {
  try {
    const cardsCollection = collection(db, 'payment-method');
    const q = query(cardsCollection, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    const cards: any[] = [];
    querySnapshot.forEach((doc) => {
      cards.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return cards;
  } catch (error) {
    console.error('Error fetching user cards:', error);
    throw error;
  }
};

/**
 * Deletes a card from the cards collection
 * @param {string} userId - The user's ID
 * @param {string} cardId - The card ID to delete
 * @returns {Promise<void>} - A promise that resolves when the deletion is complete
 */
export const deletePaymentMethod = async (
  userId: string,
  cardId: string
): Promise<void> => {
  try {
    const cardDocRef = doc(db, 'payment-method', cardId);
    
    // First check if the card belongs to the user
    const cardDoc = await getDoc(cardDocRef);
    if (!cardDoc.exists() || cardDoc.data().userId !== userId) {
      throw new Error('Card not found or does not belong to the user');
    }
    
    await deleteDoc(cardDocRef);
  } catch (error) {
    console.error('Error deleting card:', error);
    throw error;
  }
};

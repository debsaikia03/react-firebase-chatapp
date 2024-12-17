import { create } from 'zustand';
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useUserStore } from './useStore';

export const useChatStore = create((set) => ({

    chatId: null,

    user: null,
  
    isCurrentUserBlocked: false,
    
    isReceiverBlocked: false,

    changeChat: (chatId, user) => {

        const currentUser = useUserStore.getState().currentUser;

        // Check if currentUser or user is undefined
        if (!currentUser) {
            console.error('currentUser is undefined.');
            return;
        }

        if (!user) {
            console.error('user is undefined.');
            return;
        }

        // Ensure blocked array exists
        const currentUserBlocked = currentUser.blocked || [];
        const userBlocked = user.blocked || [];

        // Check if current user is blocked
        if (userBlocked.includes(currentUser.id)) {
            return set({
                chatId,
                user: null,
                isCurrentUserBlocked: true,
                isReceiverBlocked: false,
            });
        }

        // Check if the receiver user is blocked
        else if (currentUserBlocked.includes(user.id)) {
            return set({
                chatId,
                user: user,
                isCurrentUserBlocked: false,
                isReceiverBlocked: true,
            });
        }

        // Neither user is blocked
        else {
            return set({
                chatId,
                user,
                isCurrentUserBlocked: false,
                isReceiverBlocked: false,
            });
        }
    },

    changeBlock: () => {
        set(state => ({ ...state, isReceiverBlocked: !state.isReceiverBlocked }));
    }

}));

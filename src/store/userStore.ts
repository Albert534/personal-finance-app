import { create } from 'zustand';

export type User = {
	name: string;
	email: string;
};
interface UserStore {
	user: User;
	setUser: (user: User) => void;
}

export const useUserStore = create<UserStore>((set) => {
	return {
		user: {
			name: '',
			email: '',
		},
		setUser: (user) => set({ user }),
	};
});

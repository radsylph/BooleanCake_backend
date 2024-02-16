export interface UserInterface {
	name: string;
	lastname: string;
	username: string;
	email: string;
	password: string;
	profilePicture: string | null;
	cellphone: string;
	role: string;
	token: string | null;
	verify: boolean;
	timestamps: boolean;
	verificarPassword: (password: string) => Promise<boolean>;
}

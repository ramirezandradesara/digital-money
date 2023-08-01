//! Interfaces used for the register form and the input text

export type IRegisterForm = {
    dni: number;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
    phone: string;
  };
  
 export type IControlledTextInput = {
	type?: string;
	name: string;
	label?: string;
	placeholder: string;
	required?: boolean;
	passwordAdornment?: boolean;
}

export type ICardForm = {
  number: string;
  expiry: string;
  name: string;
  cvc: string;
};

export interface AccountActivityType {
  account_id: number;
  amount: number;
  dated: string;
  description: string;
  destination: string;
  id: number;
  origin: string;
  type: string;
}

export interface AccountType {
  user_id: number;
  cvu: string;
  alias: string;
  available_amount: number;
  id: number;
}

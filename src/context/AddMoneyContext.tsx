
import React, { FC, PropsWithChildren, createContext, useState } from 'react'


export type AddMoney = {
  card_number: number; 
  card_type:string;
  amount: number;
  dated:string;
};

export interface AddMoneyContextState {
  deposit: AddMoney,
  setDeposit:React.Dispatch<React.SetStateAction<AddMoney>>
}

export const AddMoneyContext = createContext<AddMoneyContextState | undefined>(undefined);

const initialAddMoneyState: AddMoney = {
  card_number: 0, 
  card_type:"",
  amount: 0,
  dated:''
};

export const AddMoneyProvider: FC<PropsWithChildren> = ({ children }) => {
  const [deposit, setDeposit] = useState<AddMoney>(initialAddMoneyState)
  return (
    <AddMoneyContext.Provider value={{ deposit, setDeposit }}>{children}</AddMoneyContext.Provider>
  );
};

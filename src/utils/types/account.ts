export interface IAccount {
    alias: string;
    available_amount: number;
    cvu: string;
    id: number;
    user_id: number;
  }

export const setAccountStorage = (account: IAccount) => {
  localStorage.setItem("accountData", JSON.stringify(account));
};

export const getAccountStorage = () => {
  return JSON.parse(localStorage.getItem("accountData") as string);
};
setTimeout(() => {
  console.log('getaccoun77',getAccountStorage());
  
}, 6000);

export const removeAccountStorage = () => {
  localStorage.removeItem("accountData");
};
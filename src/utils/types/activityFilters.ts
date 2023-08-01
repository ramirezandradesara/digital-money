import moment from "moment";

import { IFilterInfo } from "../../context/activity/ActivityContext";
import { AccountActivityType } from "./interfaces.types";

interface IApplyFilters {
  transactions: AccountActivityType[] | [];
  filterInfo: IFilterInfo;
}

export const activityFilters = ({
  transactions,
  filterInfo,
}: IApplyFilters) => {
  let transactionsFiltered = transactions;
  if (filterInfo.operation !== "") {
    switch (filterInfo.operation) {
      case "Ingresos":
        transactionsFiltered = transactionsFiltered.filter((element) => {
          return element.type === "Deposit";
        });
        break;
      case "Egresos":
        transactionsFiltered = transactionsFiltered.filter((element) => {
          return element.type === "Transaction";
        });
        break;
    }
  }
  if (filterInfo.period !== "") {
    switch (filterInfo.period) {
      case "Hoy":
        transactionsFiltered = transactionsFiltered.filter((element) => {
          return moment(element.dated).format("L") === moment().format("L");
        });
        break;
      case "Ayer":
        transactionsFiltered = transactionsFiltered.filter((element) => {
          return (
            moment(element.dated).format("L") ===
            moment().subtract(1, "days").format("L")
          );
        });
        break;
      case "Última semana":
        transactionsFiltered = transactionsFiltered.filter((element) => {
          return (
            moment(element.dated).isAfter(moment().subtract(7, "days"))
          );
        });
        break;
      case "Últimos 15 días":
        transactionsFiltered = transactionsFiltered.filter((element) => {
          return (
            moment(element.dated).isAfter(moment().subtract(15, "days"))
          );
        });
        break;
      case "Último mes":
        transactionsFiltered = transactionsFiltered.filter((element) => {
          return (
            moment(element.dated).isAfter(moment().subtract(1, "month"))
          );
        });
        break;
      case "Último año":
        transactionsFiltered = transactionsFiltered.filter((element) => {
          return (
            moment(element.dated).isAfter(moment().subtract(1, "year"))
          );
        });
        break;
    }
  }
  if (filterInfo.amount !== "") {
    switch (filterInfo.amount) {
      case "$0 a $999":
        transactionsFiltered = transactionsFiltered.filter((element) => {
          return Math.abs(element.amount) <= 999;
        });
        break;
      case "$1000 a $4999":
        transactionsFiltered = transactionsFiltered.filter((element) => {
          return (
            Math.abs(element.amount) >= 1000 && Math.abs(element.amount) <= 4999
          );
        });
        break;
      case "$5000 a $19999":
        transactionsFiltered = transactionsFiltered.filter((element) => {
          return (
            Math.abs(element.amount) >= 5000 &&
            Math.abs(element.amount) <= 19999
          );
        });
        break;
      case "$20000 a $99999":
        transactionsFiltered = transactionsFiltered.filter((element) => {
          return (
            Math.abs(element.amount) >= 20000 &&
            Math.abs(element.amount) <= 99999
          );
        });
        break;
      case "$100000 o superior":
        transactionsFiltered = transactionsFiltered.filter((element) => {
          return Math.abs(element.amount) >= 100000;
        });
        break;
    }
  }
  if (filterInfo.search !== "" && filterInfo.search !== null) {
    const searchTerm = filterInfo.search.toLowerCase();
    transactionsFiltered = transactionsFiltered.filter((element) => {
      const description = element.description.toLowerCase();
      return description.includes(searchTerm);
    });
  }
  return transactionsFiltered;
};

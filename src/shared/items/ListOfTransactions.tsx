import React, { FC } from "react";
import { Divider, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import moment from "moment";
import "moment/locale/es";
import { AccountActivityType } from "../../utils/types/interfaces.types";
import { TransactionAvatar } from "../../shared/styled/avatars";
import {
  HorizontalCenteredStack,
  HorizontalSpacedStack,
  HorizontalStack,
} from "../../shared/styled/containers";
import { useRouter } from "next/router";

interface IListOfTransactionsProps {
  listOfTransactions: AccountActivityType[] | [];
}

const ListOfTransactions: FC<IListOfTransactionsProps> = ({
  listOfTransactions,
}) => {
  const router = useRouter();
  return (
    <Stack>
      {listOfTransactions.length > 0 ? (
        listOfTransactions.map((transaction) => (
          <Box
            key={transaction.id}
            onClick={() => {
              router.push({
                pathname: `/dashboard/activity/${transaction.id}`,
              });
            }}
            sx={{
              cursor: "pointer",
              borderTop: "1px solid transparent",
              borderBottom: "1px solid transparent",
              "&:hover": {
                backgroundColor: "rgba(193, 253, 53, 0.1)",
                borderTop: "1px solid gray",
                borderBottom: "1px solid gray",
              },
            }}
          >
            <HorizontalSpacedStack sx={{ pt: "12px", pb: "12px" }}>
              <HorizontalStack sx={{ gap: "16px" }}>
                <TransactionAvatar />
                <Typography sx={{ fontSize: "14px" }}>
                  {transaction.description}
                </Typography>
              </HorizontalStack>
              <Stack sx={{ alignItems: "flex-end" }}>
                <Typography sx={{ fontSize: "14px" }}>
                  ${transaction.amount.toLocaleString("es-ES")}
                </Typography>
                <Typography color="#808080" sx={{ fontSize: "14px" }}>
                  {moment(transaction.dated).locale("es").format("L")}
                </Typography>
              </Stack>
            </HorizontalSpacedStack>
            <Divider />
          </Box>
        ))
      ) : (
        <>
          <HorizontalCenteredStack
            sx={{ paddingTop: "24px", paddingBottom: "24px" }}
          >
            <Typography variant="body2" color="#4B4949">
              No hay transacciones registradas
            </Typography>
          </HorizontalCenteredStack>
          <Divider />
        </>
      )}
    </Stack>
  );
};

export default ListOfTransactions;

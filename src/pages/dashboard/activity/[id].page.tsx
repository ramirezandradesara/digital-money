import { NextPage } from "next";
import HomeLayout from "@/components/layouts/layout-home";
import MetadataHead from "@/shared/items/MetadataHead";
import { BodyCenterActivity } from "@/shared/styled/Register";
import { Divider, Stack, Typography, Modal, Button } from "@mui/material";
import SectionWrapper from "@/shared/wrappers/SectionWrapper";
import Spinner from "@/shared/items/Spinner";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  ButtonActivityDetail,
  ButtonsContainer,
  DateTypography,
  HeaderCardStack,
  StatusStack,
  TypographySize16,
  TypographySize20Green,
  TypographySize24Green,
} from "@/shared/styled/ActivityDetail";
import moment from "moment";
import "moment/locale/es";
import { useEffect, useState } from "react";
import { getAccount } from "@/service/accountActivity.service";
import { useRouter } from "next/router";
import {
  AccountActivityType,
  AccountType,
} from "@/utils/types/interfaces.types";
import { getTransaction } from "@/service/accountActivity.service";

const Home: NextPage = () => {
  const router = useRouter();
  const { id }: any = router?.query;

  const [permission, setPermission] = useState<boolean>(false);
  const [account, setAccount] = useState<AccountType>();
  const [transaction, setTransaction] = useState<AccountActivityType>();
  const [loading, setLoading] = useState<boolean>(false);

  const getTransactionDetail = async (
    accountId: number,
    transactionId: string
  ) => {
    const TransactionDetail = await getTransaction(accountId, transactionId);
    if (!TransactionDetail) {
      router.push("/activity");
    } else {
      setTransaction(TransactionDetail);
      setLoading(false);
    }
  };

  const getUserAccount = async () => {
    const userAccount = await getAccount();
    if (!userAccount) {
      router.push("/login");
    } else {
      setAccount(userAccount);
    }
  };

  useEffect(
    () => {
      const token = localStorage.getItem("token");
      token && setPermission(true);
      token && getUserAccount();
      setLoading(true);
      !token && router.push("/login");
    },
    // eslint-disable-next-line
    []
  );

  useEffect(
    () => {
      const token = localStorage.getItem("token");
      !token && router.push("/login");
      token && account && getTransactionDetail(account.id, id);
    },
    // eslint-disable-next-line
    [account]
  );

  const generateTicket = () => {
    typeof window === "undefined" ? undefined : window.print();
  };

  return (
    <>
      <MetadataHead
        title="DMH | Actividad"
        content="Ver actividad de la cuenta"
      />
      <BodyCenterActivity>
        {permission && (
          <>
            <SectionWrapper bgcolor="#201F22" color="#fff">
              {!transaction ? (
                <Spinner />
              ) : (
                <>
                  <HeaderCardStack>
                    <StatusStack>
                      <CheckCircleOutlineIcon />
                      <Typography fontWeight={"bold"} fontSize={20}>
                        Aprobada
                      </Typography>
                    </StatusStack>
                    <DateTypography>
                      {`Creada el ${moment(transaction?.dated)
                        .locale("es")
                        .format("LL")} a las ${moment(transaction?.dated)
                        .locale("es")
                        .format("LT")}hs.`}
                    </DateTypography>
                  </HeaderCardStack>
                  <Divider color="#CECECE" />
                  <Stack sx={{ marginTop: "18px" }}>
                    <TypographySize16 fontWeight="700">
                      {transaction?.type === "Transfer"
                        ? "Transferencia de dinero"
                        : transaction?.type === "Deposit"
                        ? "Depósito de dinero"
                        : "Transacción"}
                    </TypographySize16>
                    <TypographySize20Green>
                      $ {transaction?.amount}
                    </TypographySize20Green>
                    {transaction?.type === "Transaction" &&
                      transaction?.description && (
                        <>
                          <TypographySize16>Descripción</TypographySize16>
                          <TypographySize24Green>
                            {transaction?.description}
                          </TypographySize24Green>
                        </>
                      )}
                    {transaction?.destination && (
                      <>
                        <TypographySize16>
                          {transaction?.type === "Transfer"
                            ? "Le transferiste a"
                            : "Para"}
                        </TypographySize16>
                        <TypographySize24Green>
                          {transaction?.destination}
                        </TypographySize24Green>
                      </>
                    )}
                    <TypographySize16>Número de operación</TypographySize16>
                    <TypographySize16 color="#C1FD35">
                      {transaction?.id}
                    </TypographySize16>
                  </Stack>
                </>
              )}
            </SectionWrapper>
            <ButtonsContainer>
              <ButtonActivityDetail
                variant="contained"
                sx={{ backgroundColor: "#CECECE" }}
                onClick={() => router.push("/dashboard")}
              >
                Ir al inicio
              </ButtonActivityDetail>
              <ButtonActivityDetail
                variant="contained"
                sx={{ backgroundColor: "#C1FD35" }}
                onClick={() => {
                  generateTicket();
                }}
              >
                Descargar comprobante
              </ButtonActivityDetail>
            </ButtonsContainer>
          </>
        )}
      </BodyCenterActivity>
    </>
  );
};

(Home as any).Layout = HomeLayout;

export default Home;

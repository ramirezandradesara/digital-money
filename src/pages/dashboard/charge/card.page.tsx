import HomeLayout from "@/components/layouts/layout-home";
import useStep from "@/context/useStep";
import { Stack, useMediaQuery } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import { theme } from "@/styles/material-theme";
import { CardSelection } from "@/components/dashboard/chargeMoney/cardSelection";
import { AmountSelection } from "@/components/dashboard/chargeMoney/amountSelection";
import Voucher from "@/components/dashboard/chargeMoney/Voucher";
import { AddMoneyProvider } from "@/context/AddMoneyContext";
import DepositConfirmation from "@/components/dashboard/chargeMoney/DepositConfirmation";
import { useEffect } from "react";
import { useRouter } from "next/router";

export const CardPage: NextPage = () => {

    let router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login")
        }
      }, []);
    

    const { step } = useStep(4);

    const laptopOrDesktop = useMediaQuery(theme.breakpoints.up("laptop"));
    const desktop = useMediaQuery(theme.breakpoints.up("desktop"));
    const mobile = useMediaQuery(theme.breakpoints.down("tablet"));
    let laptop;
    if (laptopOrDesktop && !desktop)
        laptop = true;

    return (
        <>
            <Head>
                <title>Add money</title>
                <meta name="description" content="Digital Money House" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <Stack>
                <AddMoneyProvider>
                    {step === 1 && <CardSelection />}
                    {step === 2 && <AmountSelection />}
                    {step === 3 && <Voucher />}
                    {step === 4 && <DepositConfirmation />}
                </AddMoneyProvider>
            </Stack>
        </>
    )
}
(CardPage as any).Layout = HomeLayout;

export default CardPage;
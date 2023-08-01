import { useState, useEffect, ChangeEvent, useContext } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import {
  Pagination,
  Stack,
  Divider,
  Typography,
  Box,
  Tooltip,
} from "@mui/material";

import HomeLayout from "@/components/layouts/layout-home";

import SectionIndexMobile from "../../../shared/items/SectionIndexMobile";
import MetadataHead from "../../../shared/items/MetadataHead";
import SearchBar from "../../../shared/items/SearchBar";

import "moment/locale/es";

import {
  BodyCenterActivity,
  PrimaryButton,
} from "../../..//shared/styled/Register";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import Grid from "@mui/material/Unstable_Grid2";
import {
  AccountActivityType,
  AccountType,
} from "../../../utils/types/interfaces.types";
import SectionWrapper from "../../../shared/wrappers/SectionWrapper";
import ListOfTransactions from "../../../shared/items/ListOfTransactions";
import { usePagination } from "../../../hooks/usePagination";
import { activityFilters } from "../../../utils/types/activityFilters";
import useActivity from "../../../context/activity/useActivity";
import FilterTagList from "../../../components/activity/FilterTagList";
import { filterInitialState } from "../../../context/activity/ActivityContext";
import TransitionsModal from "../../../shared/items/TransitionsModal";
import VerticalTabs from "../../../components/activity/VerticalTabs";
import {
  getAccount,
  getAccountActivity,
} from "../../../service/accountActivity.service";
import { getAuthStorage } from "../../../utils/types/auth";
import { DataUser } from "@/context/UserDataContext";

const Home: NextPage = () => {
  const { filterInfo, dispatch } = useActivity();
  const router = useRouter();
  const [permission, setPermission] = useState<boolean>(false);
  const [account, setAccount] = useState<AccountType>();
  const [modal, setModal] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<AccountActivityType[] | []>(
    []
  );
  const PER_PAGE = 10;
  const { userData } = useContext(DataUser);

  const getUserAccount = async () => {
    const userAccount = await getAccount();

    if (!userAccount) {
      router.push("/login");
    } else {
      setAccount(userAccount);
    }
  };

  const getUserTransactions = async () => {
    const userTransactions = await getAccountActivity(userData);
    if (!userTransactions) {
    } else {
      setTransactions(userTransactions.reverse());
    }
  };

  useEffect(
    () => {
      const token = localStorage.getItem("token");

      token && setPermission(true);
      token && getUserAccount();
      !token && router.push("/login");
    },
    // eslint-disable-next-line
    []
  );

  useEffect(
    () => {
      const token = getAuthStorage();
      token && account && getUserTransactions();
    },
    // eslint-disable-next-line
    [account]
  );

  const { jump, currentData, currentPage, maxPage } = usePagination(
    activityFilters({ transactions, filterInfo }),
    PER_PAGE
  );

  const handleChange = (event: ChangeEvent<unknown>, page: number) => {
    jump(page);
  };
  return (
    <>
      <MetadataHead
        title="DMH - Actividad"
        content="Visualizá toda la actividad realizada con tu billetera virtual."
      />
      {permission && (
        <BodyCenterActivity>
          <SectionIndexMobile section={"Tu actividad"} />
          <Stack spacing={2}>
            <Grid container spacing={2}>
              <Grid mobile={12} tablet={6} laptop={8} desktop={9}>
                <SearchBar
                  placeholder="Buscar en tu actividad"
                  transactions={transactions}
                />
              </Grid>
              <Grid mobile={12} tablet={6} laptop={4} desktop={3}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  width="100%"
                  spacing={2}
                  sx={{ height: "100%" }}
                >
                  <PrimaryButton
                    variant="contained"
                    fullWidth
                    onClick={() => {
                      setModal(true);
                    }}
                    sx={{ height: "100%" }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      width="100%"
                    >
                      <Box>Filtrar</Box> <FilterAltIcon />
                    </Stack>
                  </PrimaryButton>
                  <Tooltip title="Borrar filtros">
                    <Box>
                      <PrimaryButton
                        variant="contained"
                        color="secondary"
                        startIcon={<FilterAltOffIcon />}
                        disabled={
                          JSON.stringify(filterInfo) ===
                          JSON.stringify(filterInitialState)
                        }
                        onClick={() => {
                          dispatch({ type: "DELETE_FILTERS" });
                        }}
                        sx={{
                          width: "min-content",
                          height: "100%",
                          ".css-1d6wzja-MuiButton-startIcon": {
                            margin: "0",
                          },
                        }}
                      ></PrimaryButton>
                    </Box>
                  </Tooltip>
                </Stack>
              </Grid>
            </Grid>
            {JSON.stringify(filterInfo) !==
              JSON.stringify(filterInitialState) && <FilterTagList />}
            <SectionWrapper bgcolor="#fff" color="#201F22">
              <Typography component="h5" variant="h5" sx={{ pb: "16px" }}>
                Tu actividad
              </Typography>
              <Divider />
              <ListOfTransactions listOfTransactions={currentData()} />
              <Pagination
                count={maxPage}
                page={currentPage}
                shape="rounded"
                onChange={handleChange}
                sx={{
                  paddingTop: "24px",
                  ul: { justifyContent: "center" },
                  button: { fontWeight: "700" },
                }}
              />
            </SectionWrapper>
          </Stack>
          {modal && (
            <TransitionsModal open={modal} setOpen={setModal}>
              <VerticalTabs setModal={setModal} />
            </TransitionsModal>
          )}
        </BodyCenterActivity>
      )}
    </>
  );
};

(Home as any).Layout = HomeLayout;

export default Home;

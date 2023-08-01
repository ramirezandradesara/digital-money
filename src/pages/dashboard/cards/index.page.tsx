import React, { useEffect, useState, useContext } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import Link from "next/link";
import { DataUser } from "../../../context/UserDataContext";
import HomeLayout from "../../../components/layouts/layout-home";
import ListCards from "../../../components/cards/ListCards";
import ConfirmDeleteModal from "./confirmDeleteModal";
import getCards from "@/service/get_cards.service";
import { BankCard } from "@/types/bank_card.type";
import { useRouter } from "next/router";

/* interface Card {
  account_id: number;
  cod: number;
  expiration_date: string;
  first_last_name: string;
  id: number;
  number_id: number;
} */

function Cards() {
  const [cards, setCards] = useState<BankCard[]>([]);
  const { userData } = useContext(DataUser);
  const [cardToDelete, setCardToDelete] = useState<BankCard | null>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  /**
   * Function that allows to delete a card by id
   */
  const deleteCard = (id: any) => {
    const token = localStorage.getItem("token");

    fetch(
      `https://digitalmoney.ctd.academy/api/accounts/${userData?.id}/cards/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDeleteCard = (card: any) => {
    setCardToDelete(card);
    setShowDeleteModal(true);
  };

  const confirmDeleteCard = () => {
    deleteCard(cardToDelete?.id);
    setCards(cards.filter((card: any) => card.id !== cardToDelete?.id));
    setCardToDelete(null);
    setShowDeleteModal(false);
  };

  /**
   * Function that gets all the cards from the user and set the response in the "cards" state
   */
  const getCardsAsync = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No hay token");
      return;
    }
    if (!userData?.id) return;

    try {
      const data = await getCards(userData?.id, token);
      setCards(data);
    }
    catch (err) {
      //  console.error(err);
    }
  };

  let router = useRouter();

  useEffect(() => {
    let token = localStorage.getItem("token")
    !token && router.push("/login");
    getCardsAsync();
  }, [userData]);

  return (
    <Grid
      container
      direction="column"
      sx={{
        marginTop: 0,
        marginLeft: 0,
        backgroundColor: "secondary.light",
        paddingX: { mobile: 3, tablet: 6, laptop: 9, desktop: 8 },
        paddingY: { mobile: 3, tablet: 5, laptop: 5, desktop: 5 },
        gap: { mobile: 2, tablet: 3 },
        minHeight: "90vh",
      }}
    >
      {showDeleteModal && (
        <ConfirmDeleteModal
          confirmDeleteCard={confirmDeleteCard}
          setShowDeleteModal={setShowDeleteModal}
          cardToDelete={cardToDelete}
        />
      )}
      <Box
        sx={{
          display: { mobile: "flex", tablet: "none" },
          alignItems: "center",
        }}
      >
        <ArrowForwardRoundedIcon
          sx={{ fontSize: "25px", color: "#0000008c" }}
        />
        <Typography variant={"h4"} sx={{ marginLeft: "10px" }}>
          Tarjetas
        </Typography>
      </Box>

      <Grid
        sx={{
          backgroundColor: "primary.main",
          borderRadius: 1,
          padding: { mobile: 3, tablet: 5, laptop: 5, desktop: 5 },
        }}
      >
        <Typography
          variant={"h4"}
          sx={{ color: "secondary.light", marginBottom: "35px" }}
        >
          Agregá tu tarjeta de débito o crédito
        </Typography>
        <Link href="/dashboard/cards/add-card">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button sx={{ textTransform: "none", padding: "0" }}>
                <AddCircleOutlineOutlinedIcon
                  sx={{ color: "secondary.main", fontSize: "30px" }}
                />
                <Typography
                  variant={"h3"}
                  sx={{
                    color: "secondary.main",
                    fontSize: "20px",
                    marginLeft: "16px",
                  }}
                >
                  Nueva tarjeta
                </Typography>
              </Button>
            </Box>
            <ArrowForwardRoundedIcon
              sx={{
                color: "secondary.main",
                fontSize: "30px",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            />
          </Box>
        </Link>
      </Grid>

      <ListCards cards={cards} handleDeleteCard={handleDeleteCard} />
    </Grid>
  );
}

(Cards as any).Layout = HomeLayout;

export default Cards;
import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  List,
  Divider,
  ListItem,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { lastFourDigits } from "@/helpers/lastFourDigits";
import { checkExpDate } from "@/helpers/checkExpDate";
import { BankCard } from "@/types/bank_card.type";


function ListCards({
  cards,
  handleDeleteCard,
}: {
  cards: BankCard[]
  handleDeleteCard: any;
}) {

  return (
    <Grid
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: 1,
        padding: { mobile: 3, tablet: 5, laptop: 5, desktop: 5 },
      }}
    >
      <Typography
        variant={"h4"}
        sx={{ color: "primary.main", marginBottom: "10px" }}
      >
        Tus tarjetas
      </Typography>
      {cards &&
        (cards?.length <= 0 ? (
          <Typography
            variant={"h4"}
            sx={{ color: "#8a8888", marginTop: "30px", textAlign: "center" }}
          >
            No tenés tarjetas asociadas
          </Typography>
        ) : (
          <List>
            {cards?.length > 0
              ? cards?.map((card: any) => (
                <>
                  <ListItem
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingY: "20px",
                      paddingX: { mobile: 0 },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <CircleIcon
                        sx={{ color: "secondary.main", fontSize: "30px" }}
                      />
                      <Typography
                        sx={{
                          fontSize: { sm: "16px", tablet: "16px" },
                          marginLeft: "16px",
                        }}
                      >
                        Terminada en {lastFourDigits(card?.number_id)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      {checkExpDate(card.expiration_date) && (
                        <Typography sx={{ fontWeight: "bold", fontSize: 16, color: "#ebac01" }}>
                          VENCIDA
                        </Typography>
                      )}
                      <Button
                        aria-label="delete card button"
                        sx={{ textTransform: "none", padding: "0" }}
                        onClick={() => handleDeleteCard(card)}
                      >
                        <Typography
                          variant={"h4"}
                          sx={{ fontSize: "16px", marginLeft: "16px" }}
                        >
                          Eliminar
                        </Typography>
                      </Button>
                    </Box>
                  </ListItem>
                  <Divider sx={{ border: "1px solid #0000002c" }} />
                </>
              ))
              : null}
          </List>
        ))}
    </Grid>
  );
}

export default ListCards;

import { lastFourDigits } from "@/helpers/lastFourDigits";
import { Box, Button, Typography } from "@mui/material";
import React from "react";

const ConfirmDeleteModal = ({
  confirmDeleteCard,
  setShowDeleteModal,
  cardToDelete,
}: {
  confirmDeleteCard: any;
  setShowDeleteModal: any;
  cardToDelete: any;
}) => {
  const handleBackdropClick = (e: any) => {
    if (e.target === e.currentTarget) {
      setShowDeleteModal(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#49474755",
        minHeight: "100%",
        minWidth: "100%",
        position: "fixed",
        top: 0,
        right: 0,
        zIndex: 1500,
      }}
      onClick={handleBackdropClick}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: { mobile: 350, tablet: 600, laptop: 600, desktop: 600 },
          height: 200,
          gap: 4,
          backgroundColor: "primary.main",
          padding: { mobile: 2, tablet: 5, laptop: 5, desktop: 5 },
          borderRadius: 2,
        }}
      >
        <Typography
          sx={{ fontWeight: "bold", color: "white", textAlign: "center" }}
        >
          Estás seguro de eliminar la tarjeta terminada en{" "}
          {lastFourDigits(cardToDelete?.number_id)}?
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Button
            variant="contained"
            sx={{
              fontWeight: "bold",
              backgroundColor: "secondary.main",
              color: "primary.main",
              "&:hover": {
                backgroundColor: "secondary.main",
              },
            }}
            onClick={confirmDeleteCard}
          >
            Si, borrar
          </Button>
          <Button
            variant="contained"
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              backgroundColor: "secondary.light",
              "&:hover": {
                backgroundColor: "secondary.light",
              },
            }}
            onClick={() => setShowDeleteModal(false)}
          >
            No, no borrar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ConfirmDeleteModal;

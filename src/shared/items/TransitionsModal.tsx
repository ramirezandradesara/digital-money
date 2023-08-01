import React, { ReactNode } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#EEEAEA",
  border: "1px solid #2A292C",
  borderRadius: "4px",
  boxShadow: 24,
  p: 4,
};
interface ITransitionsModalProps {
  children: ReactNode;
  open: boolean;
  setOpen: (value: boolean) => void;
}
export default function TransitionsModal({
  children,
  open,
  setOpen,
}: ITransitionsModalProps) {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>{children}</Box>
        </Fade>
      </Modal>
    </div>
  );
}

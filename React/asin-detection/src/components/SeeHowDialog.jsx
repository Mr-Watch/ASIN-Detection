import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useState, Fragment } from "react";
import Dialog from "@mui/material/Dialog";
import DOMPurify from "dompurify";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    minWidth: 500,
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function SeeHowDialog({ title, body, visibility }) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <a
        onClick={handleClickOpen}
        style={{
          visibility: visibility,
          position: "relative",
          top: "20px",
          left: "-120px",
          color: "blue",
          width: "85px",
        }}
      >
        see how
      </a>
      <BootstrapDialog onClose={handleClose} open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }}>{title}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography
            component="div"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(body),
            }}
          ></Typography>
        </DialogContent>
      </BootstrapDialog>
    </Fragment>
  );
}

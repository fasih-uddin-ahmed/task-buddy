import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Descriptionn from "./Descriptionn";

export default function FormDialog(idd) {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <Fragment>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        size="small"
        color="primary"
        style={{ marginLeft: "5px" }}
      >
        Edit Description
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Create your detailed description
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To edit the description of your board, please enter your new
            description here. So we can update
          </DialogContentText>
          <Descriptionn cardIDD={idd} onClose={handleClose} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

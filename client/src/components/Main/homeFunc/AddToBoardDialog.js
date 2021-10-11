import React, { Fragment } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from "@material-ui/core/Button";
import AddToBoard from "./AddToBoard";

export default function FormDialog(boardID) {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <Fragment>
      <Fab onClick={handleClickOpen} color="primary" aria-label="add" style={{ height: "12px", width: "35px", marginRight: "5px" }}>
        <AddIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Invite your friends</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If your friend will be found we will send invitation and will giva
            ya his profile, otherwise we will redirect to the teams.
          </DialogContentText>
          <AddToBoard bordID={boardID} onClose={handleClose} />
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

import React, { Fragment } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DueDate from "../common/DueDate";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import Button from "@material-ui/core/Button";

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
      <Button onClick={handleClickOpen}>
        <FontAwesomeIcon
          style={{ marginRight: "5px" }}
          icon={faClock}
          size="sm"
        />
        Deadline
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Set the deadline for your task
        </DialogTitle>
        <DialogContent>
          <DueDate cardID={idd} onClose={handleClose} />
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

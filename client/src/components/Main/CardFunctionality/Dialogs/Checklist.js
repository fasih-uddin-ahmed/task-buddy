import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt } from "@fortawesome/free-regular-svg-icons";
import CreateCheckbox from "../common/checkbox/createCheckbox";

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
          icon={faListAlt}
          size="sm"
        />
        Checklist
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create your checklists</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Checklists can help you track your subtasks so easily by connecting
            them with progress bar.
          </DialogContentText>
          <CreateCheckbox cardIDD={idd} onClose={handleClose} />
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

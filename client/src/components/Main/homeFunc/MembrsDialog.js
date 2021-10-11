import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Membrs from "./membrs/Membrs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

export default function ScrollDialog(members, idd) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = scrollType => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  function handleClose() {
    setOpen(false);
  }

  return (
    <Fragment>
      <Button
        onClick={handleClickOpen("paper")}
        variant="contained"
        size="small"
        color="primary"
      >
        <FontAwesomeIcon
          style={{ marginRight: "5px" }}
          icon={faUser}
          size="sm"
        />
        Members
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
      >
        <DialogTitle id="scroll-dialog-title">Board Members</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText>
            These are the only users who have the access to this board, here you
            can also remove them from board.
          </DialogContentText>
          <Membrs members={members} id={idd} />
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

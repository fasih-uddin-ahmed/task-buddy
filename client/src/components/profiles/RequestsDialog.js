import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";

import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import DialogTitle from "@material-ui/core/DialogTitle";
import Requestt from "./common/Requests";

export default function ScrollDialog(users) {
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
      <Button onClick={handleClickOpen("paper")}>
        <FontAwesomeIcon
          style={{ marginRight: "5px" }}
          icon={faUser}
          size="sm"
        />
        Check Recent Invitations
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
      >
        <DialogTitle id="scroll-dialog-title">Requests</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
        <DialogContentText>
            So here are the invitations for joining new team, you have both options,as you can reject and accept the invitations here.you can also leave them pending as they are. 
          </DialogContentText>
          <Requestt users={users} />
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

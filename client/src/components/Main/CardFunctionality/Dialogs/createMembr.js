import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import MemberAdd from "../common/members/addmembers/Memberss";

export default function ScrollDialog(idd, memberss) {
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
        Members
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
      >

        <DialogTitle id="scroll-dialog-title">ADD TO CARD</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
        <DialogContentText>
            Here we are displaying all the board members for you, so you have to just select the members you wanna allot responsibility.
          </DialogContentText>
          <MemberAdd crdID={idd} mmbrs={memberss} />
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

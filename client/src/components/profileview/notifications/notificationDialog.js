import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Notifications from "./Notifications";

export default function ScrollDialog(noti) {
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

      <button
        onClick={handleClickOpen("paper")}
        className="btn btn-lg btn-danger"
        style={{
          width: "130px",
          height: "40px",
          paddingBottom: "7px",
          paddingTop: "-5px",
          fontSize: "17px",
          marginLeft: "105px"
        }}
      >
        Notifications
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
      >
        <DialogTitle id="scroll-dialog-title">
          Notifications
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText>
            So here are your latest notifications that you should know before visiting your boards.
          </DialogContentText>
          <Notifications notii={noti} />
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

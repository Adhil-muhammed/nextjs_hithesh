import * as React from "react";
import {
  Grid,
  Button,
  Divider,
  Stack,
  Dialog,
  TextField,
  IconButton,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const CreateModal = (props: any) => {
  const { open, handleClose } = props;
  console.log("open: ", open);

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Create new category"}
        </DialogTitle>
        <Divider sx={{ marginTop: 1 }} />
        <IconButton
          aria-label="close"
          className="del-modali-close"
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Stack gap={10} alignItems={"center"} p={3}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="outlined-basic"
                    label="Name*"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="outlined-basic"
                    label="Description*"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outlined" onClick={handleClose} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

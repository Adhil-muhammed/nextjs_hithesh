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
  const {
    open,
    onChange,
    onConfirm,
    isLoading,
    handleClose,
    onUploadFile,
    createCategory,
  } = props;

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
                    name="title"
                    variant="outlined"
                    autoComplete="off"
                    value={createCategory?.title}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="outlined-basic"
                    name="discription"
                    label="Description*"
                    fullWidth
                    variant="outlined"
                    autoComplete="off"
                    value={createCategory?.discription}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12} className="justify-center">
                  <TextField
                    onChange={onUploadFile}
                    id="outlined-basic"
                    fullWidth
                    type="file"
                    // value={createCategory?.image}
                    variant="outlined"
                    autoComplete="off"
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
          <Button
            disabled={isLoading}
            variant="outlined"
            onClick={onConfirm}
            autoFocus
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

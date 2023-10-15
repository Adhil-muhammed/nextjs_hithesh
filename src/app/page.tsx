"use client";
import * as React from "react";
import { Stack, Button, Container } from "@mui/material";
import { InputFileUpload } from "@/shared/FIleUpload";
import { CreateModal } from "@/shared/CreateModal";

export default function MainPage() {
  const [open, setOpen] = React.useState(false);
  console.log("open: ", open);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onUploadFile = (e: any) => {
    console.log("e: ", URL.createObjectURL(e.target.files[0]));
  };
  return (
    <>
      <Stack p={3} width={"100%"} bgcolor={"antiquewhite"}>
        <Stack
          px={3}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <span>search</span>
          <Button variant="outlined">Create new product</Button>
        </Stack>
      </Stack>
      <Container maxWidth="lg">
        <Stack p={2} bgcolor={"beige"} mt={3}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <span>Total Count</span>
            <Stack
              gap={3}
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Button variant="outlined" onClick={handleClickOpen}>
                Create new category
              </Button>
              <InputFileUpload onUploadFile={onUploadFile} />
            </Stack>
          </Stack>
        </Stack>
        <Stack mt={2} p={2}>
          <Stack
            gap={10}
            direction={"row"}
            // flexWrap={"wrap"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
          >
            <div>no:1</div>
            <div>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                error reiciendis minima obcaecati sequi, blanditiis distinctio!
                Molestias quos dignissimos expedita a tempore error doloremque
              </span>
            </div>
            <Stack direction={"row"} gap={3}>
              <Button variant="outlined">edit</Button>
              <Button variant="outlined" color="error">
                Delete
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Container>
      <CreateModal open={open} handleClose={handleClose} />
    </>
  );
}

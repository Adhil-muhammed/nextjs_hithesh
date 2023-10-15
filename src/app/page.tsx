"use client";
import * as React from "react";
import axios from "axios";
import { useImmer } from "use-immer";
import { Stack, Button, Container } from "@mui/material";
import { InputFileUpload } from "@/shared/FIleUpload";
import { CreateModal } from "@/shared/CreateModal";
import { useQuery, useMutation } from "@tanstack/react-query";

const initCreateCategory = {
  title: "",
  image: "",
  discription: "",
};

interface Category {
  title: string;
  image: string;
  discription: string;
}

const fetchData = async (Newcategory: Category) => {
  const res = await axios.post("api/product", Newcategory);
  return res.data;
};

export default function MainPage() {
  const [open, setOpen] = useImmer(false);
  const [selectedFile, setSelectedFile] = useImmer(false);
  const [createCategory, setCreateCategory] = useImmer(initCreateCategory);
  console.log("createCategory: ", createCategory);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onUploadFile = (e: any) => {
    setCreateCategory((draft: Category) => {
      draft.image = URL.createObjectURL(e.target.files[0]);
      return draft;
    });
  };

  const onChange = (e: any) => {
    const { name, value } = e?.target;
    setCreateCategory((draft: any) => {
      draft[name] = value;
    });
  };

  const createNewCategory = useMutation({
    mutationFn: fetchData,
    onSuccess: (data, variables, context) => {
      // navigate.push("/login");
    },
  });

  const onCreateCategory = async () => {
    createNewCategory?.mutate(createCategory);
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
      <CreateModal
        open={open}
        onChange={onChange}
        handleClose={handleClose}
        onUploadFile={onUploadFile}
        onConfirm={onCreateCategory}
        createCategory={createCategory}
        isLoading={createNewCategory?.isLoading}
      />
    </>
  );
}

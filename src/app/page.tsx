"use client";
import * as React from "react";
import axios from "axios";
import { useImmer } from "use-immer";
import { Stack, Button, Container } from "@mui/material";
import { InputFileUpload, CreateModal, Loader } from "@/shared";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { isArray } from "util";

const initCreateCategory = {
  title: "",
  image: "",
  discription: "",
};

interface Category {
  title: string;
  image: any;
  discription: string;
}

const fetchData = async (Newcategory: Category) => {
  const res = await axios.post("api/product", Newcategory);
  return res.data;
};

const listAllCategory = async () => {
  const res = await axios.get("api/product");
  return res.data;
};

export default function MainPage() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useImmer(false);
  const [isFetch, setIsFetch] = useImmer(false);
  console.log("isFetch: ", isFetch);
  const [createCategory, setCreateCategory] = useImmer(initCreateCategory);

  const userData = useQuery({
    queryKey: ["category"],
    queryFn: listAllCategory,
    enabled: isFetch,
    onSuccess: (data) => {
      const { product } = data;
      product?.forEach((element: any) => {
        if (element?.image instanceof Blob) {
          // Check if the image is a Blob (assuming it was created using createObjectURL)
          URL.revokeObjectURL(element?.image);
        }
      });
    },
  });

  const { isLoading } = userData;
  const { product } = userData?.data ?? !isLoading;

  React?.useEffect(() => {
    setIsFetch(true);
    return () => {
      setIsFetch(false);
    };
  }, []);

  const handleClickOpen = () => {
    setCreateCategory(initCreateCategory);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onUploadFile = (e: any) => {
    setCreateCategory((draft: any) => {
      draft.image = URL.createObjectURL(e?.target?.files[0]);
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
      queryClient?.invalidateQueries(["category"]);
      setOpen(false);
    },
  });

  const onCreateCategory = async () => {
    createNewCategory?.mutate(createCategory);
  };

  if (isLoading) {
    return <Loader />;
  }

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
          {product?.map((category: any, index: Number) => {
            return (
              <Stack
                gap={10}
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                key={category?._id}
              >
                <Stack>{`no:${index}`}</Stack>
                <Stack>{category?.title}</Stack>
                <Stack>{category?.discription}</Stack>
                {/* <div>
                  {category?.image && (
                    <img
                      src={category?.image}
                      alt=""
                      className="uploaded-img"
                    />
                  )}
                </div> */}
                <Stack direction={"row"} gap={3} alignItems={"center"}>
                  <Button variant="outlined">edit</Button>
                  <Button variant="outlined" color="error">
                    Delete
                  </Button>
                </Stack>
              </Stack>
            );
          })}
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

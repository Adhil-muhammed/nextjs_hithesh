"use client";
import * as React from "react";
import axios from "axios";
import { useImmer } from "use-immer";
import { Stack, Button, Container } from "@mui/material";
import { InputFileUpload, CreateModal, Loader } from "@/shared";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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

const getProductsById = async (id: any) => {
  const res = await axios.get(`api/product/${id}`);
  return res.data;
};

const updateProducts = async (product: any) => {
  const res = await axios.put(`api/product`, product);
  return res.data;
};

const deleteCategories = async (id: String) => {
  const res = await axios.delete(`api/product/${id}`);
  return res.data;
};

export default function MainPage() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useImmer(false);
  const [productId, setProductId] = useImmer(null);
  const [createCategory, setCreateCategory] = useImmer(initCreateCategory);
  // console.log("createCategory: ", createCategory);

  const userData = useQuery({
    queryKey: ["category"],
    queryFn: listAllCategory,
    enabled: true,
  });

  const getProductById = useQuery({
    queryKey: ["categoryByID", productId],
    queryFn: () => getProductsById(productId),
    onSuccess: (data) => {
      onUpdateProduct(data);
    },
    enabled: productId !== null,
  });

  React.useEffect(() => {
    if (getProductById?.data) {
      setCreateCategory(getProductById?.data);
    }
  }, [getProductById?.data]);

  // React.useEffect(() => {
  //   if (productId) {
  //     onUpdateProduct();
  //   }
  // }, [productId]);

  const { isLoading } = userData;
  const { product, totalCount } = userData?.data ?? !isLoading;

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

  const updateProduct = useMutation({
    mutationFn: updateProducts,
    onSuccess: (data, variables, context) => {
      // queryClient?.invalidateQueries(["category"]);
    },
  });

  const deleteCategory = useMutation({
    mutationFn: deleteCategories,
    onSuccess: (data, variables, context) => {
      queryClient?.invalidateQueries(["category"]);
    },
  });

  const onCreateCategory = async () => {
    createNewCategory?.mutate(createCategory);
  };

  const onDeleteCategory = (id: String) => {
    deleteCategory?.mutate(id);
  };

  const onHandleProductID = (id: any) => {
    setProductId(id);
  };

  const onUpdateProduct = (data: any) => {
    console.log("function call");

    updateProduct?.mutate(data);
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
            <span>Total Count:{totalCount}</span>
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
                className="sm:overflow-x-scroll"
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
                  <Button
                    variant="outlined"
                    onClick={() => onHandleProductID(category?._id)}
                  >
                    edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => onDeleteCategory(category?._id)}
                  >
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

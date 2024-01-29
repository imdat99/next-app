"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/hooks";
import { addTodoAsync } from "@/store/slices/todo";
import React, { useState } from "react";

const ButtonAdd = () => {
  const dispatch = useAppDispatch();
  const [pageIndex, setIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const handleClick = () => {
    setIndex((prev) => prev + 1);
    dispatch(
      addTodoAsync({
        apiUrl: "https://jsonplaceholder.typicode.com/todos",
        pageIndex,
        pageSize,
      })
    );
  };
  return (
    <>
      <Button onClick={handleClick} size={"sm"}>
        Call todo
      </Button>
    </>
  );
};

export default ButtonAdd;

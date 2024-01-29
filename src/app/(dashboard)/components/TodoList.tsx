"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { removeTodo, todoStore } from "@/store/slices/todo";
import { TrashIcon } from "@radix-ui/react-icons";
import React from "react";

const TodoList = () => {
  const { todos } = useAppSelector(todoStore);
  const dispatch = useAppDispatch();
  const handleRemoveClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    dispatch(removeTodo(Number(event.currentTarget.dataset.id)));
  };
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Completed</TableHead>
          <TableHead>Id</TableHead>
          <TableHead>title</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">
              <Checkbox checked={item.completed} />
            </TableCell>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell className="text-right">
              <Button
                size={"icon"}
                variant="destructive"
                data-id={item.id}
                onClick={handleRemoveClick}
              >
                <TrashIcon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TodoList;

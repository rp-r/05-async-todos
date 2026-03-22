import type { CreateTodoPayload } from "./../types/Todo.types";
/***
 *
 *
 * Services for communticating with json -server backend
 */

import axios from "axios";
import type { Todo } from "../types/Todo.types";

const BASE_URL = "http://localhost:3000";

/**
 *
 * GET TO DOS FETCH ADDITION
 */

export const getTodosFetch = async () => {
  const res = await fetch(BASE_URL + "/todos");
  if (!res.ok) {
    throw new Error("Response was not Ok!");
  }

  const data = await res.json();
  return data;
};
/**
 * get all todos
 */

export const getTodos = async () => {
  const res = await axios.get<Todo[]>(BASE_URL + "/todos");
  return res.data;
};

/**
 *
 * Create todo
 */
export const createTodo = async (payload: CreateTodoPayload) => {
  const res = await axios.post<Todo>(BASE_URL + "/todos", payload);
  return res.data;
};

const newTodo = { title: "My new todo", completed: false };

fetch(BASE_URL + "/todos", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(newTodo),
});

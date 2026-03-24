import "./assets/App.scss";
import Container from "react-bootstrap/Container";
import type { Todo } from "../src/types/Todo.types";
import { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import InputGroup from "react-bootstrap/InputGroup";
import TodoCounter from "./components/TodoCounter";
import TodoListitem from "./components/TodoListitem";
import Todolist from "./components/Todolist";
import TodoForm from "./components/TodoForm";
import * as TodosAPI from "./Services/TodoAPI";
import { Alert } from "react-bootstrap";

const intialTodos: Todo[] = [
  { id: 1, title: "Make coffee", completed: true },
  { id: 2, title: "Drink coffee", completed: false },
  { id: 3, title: "Drink MOAR coffee", completed: false },
  { id: 4, title: "Drink ALL ZE  coffee", completed: false },
];

function App() {
  const [error, setError] = useState<string | false>(false);
  const [loading, setLoading] = useState(true);
  const [inputtodotitle, setInputtodotitle] = useState("");

  //const [inputtodotitle, setInputtodotitle] = useState("");

  const [todos, setTodos] = useState<Todo[]>([]);

  const trimmedinputtodotitle = inputtodotitle.trim();

  const getTodos = async () => {
    try {
      {
        /**        const res = await fetch("http://localhost:3000/todos");

        if (!res.ok) {
          throw new Error("Response was not ok");
        }
        //const data: Todo[] = await res.json();
        //const data = (await res.json()) as Todo[];
        const data = await res.json(); */
      }

      const data = await TodosAPI.getTodos();

      setTodos(data);

      //setLoading(false);
    } catch (err) {
      console.error("get Error", err);
      setError(
        err instanceof Error
          ? "could not load todos from API" + err
          : "It is not me ,it 's you ",
      );
    }

    setLoading(false);
  };

  const handleAdd = (e: React.SubmitEvent) => {
    e.preventDefault();

    //CREATE NEW todos
    setTodos([
      ...todos,
      {
        id: Math.max(0, ...todos.map((todo) => todo.id)) + 1,
        title: inputtodotitle.trim(),
        completed: false,
      },
    ]);
    setInputtodotitle("");
  };

  const handleAdd2 = (title: string) => {
    //e.preventDefault();

    //CREATE NEW todos and set a new list of todos containg the
    //previous todos + the new todo

    setTodos([
      ...todos,
      {
        id: Math.max(0, ...todos.map((todo) => todo.id)) + 1,
        title,
        completed: false,
      },
    ]);
    setInputtodotitle("");
  };

  const handleAddServer = async (title: string) => {
    //e.preventDefault();

    //CREATE TODO ON SERVER

    try {
      //Post todo payload to API
      const createdTodo = await TodosAPI.createTodo({
        title,
        completed: false,
      });

      console.log("Created todo,yay!!! Relaoding todos....");

      //await getData();

      setTodos([...(todos ?? []), createdTodo]);
    } catch (error) {
      console.error("Error throw when creating todo:", error);
      setError(
        error instanceof Error
          ? "Could not create  todos :" + error.message
          : "It's not me ,it's you",
      );
    }
  };

  const handleToggleTodo = (todo: Todo) => {
    todo.completed = !todo.completed;
    setTodos([...todos]);
  };

  const handleToggleTodoServer = async (todo: Todo) => {

  try{

      await TodosAPI.updateTodo(todo.id,       {
         completed:!todo.completed
        }
      );
      await getTodos()

    }
    catch(err)
    {
 console.error("Error throw when deleting todos:"+todo.id, error);
      setError(
        err instanceof Error
          ? `Could not delete todos : ${todo.id}+ ${err.message}`
          : "It's not me ,it's you",
      );
    }



  };
  const handleDeleteTodo = (todo: Todo) => {
    setTodos(todos.filter((td) => td.id !== todo.id));
  };


  const handleDeleteTodoServer = async (todo: Todo) => {
    
    try{

      await TodosAPI.deleteTodo(todo.id);
      await getTodos()

    }
    catch(err)
    {
 console.error("Error throw when deleting todos:"+todo.id, error);
      setError(
        err instanceof Error
          ? `Could not delete todos : ${todo.id}+ ${err.message}`
          : "It's not me ,it's you",
      );
    }
  };
  //DERIVE LIST OF COMPLETED  /INCOMPLETE TODOS

  useEffect(() =>
    //MAKE REQUEST TO API

    {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      getTodos();
    }, []);

  const completedtodos = todos?.filter((todo) => todo.completed) ?? [];
  const incompletedtodos = todos?.filter((todo) => !todo.completed) ?? [];
  return (
    <>
      <p className="text-primary"> IN THE NAME OF ALLLAH</p>
      <Container>
        <h1> Async todos</h1>
        <TodoForm onhandleAdd={handleAddServer} />

        {/**     <Form onSubmit={handleAdd} className="mb-4">
          <InputGroup>
            <Form.Control
              aria-label="New todo title"
              onChange={(e) => setInputtodotitle(e.target.value)}
              value={inputtodotitle}
              placeholder="learn abour GTD"
              required
            />
            <Button
              disabled={trimmedinputtodotitle.length < 3}
              variant="success"
              type="submit"
            >
              {" "}
              Create
            </Button>
          </InputGroup>

          {trimmedinputtodotitle.length > 0 &&
            trimmedinputtodotitle.length < 3 && (
              <Form.Text className="text-danger text-small">
                That's a too short to do ,better to do it right away instead!
              </Form.Text>
            )}
        </Form>*/}

        {error && <Alert variant="danger">{error}</Alert>}
        {loading && <p>Loading todos.....</p>}

        {todos &&
          (todos.length ? (
            <>
              <h2 className="h5 mb-2">💪🏻 stuff I got to do</h2>
              {/**   <ListGroup className="todolist mb-3">
              {incompletedtodos.map((todo) => (
                <TodoListitem
                  todo={todo}
                  key={todo.id}
                  onDelete={handleDeleteTodo}
                  onToggle={handleToggleTodo}
                />





              ))}
            </ListGroup> */}
              <Todolist
                onDelete={handleDeleteTodoServer}
                onToggle={handleToggleTodoServer}
                todos={incompletedtodos}
              />

              <h2 className="h5 mb-2">🙄 stuff I have completed </h2>

              {/**    <ListGroup className="todolist mb-3">
              {completedtodos.map((todo) => (
                <TodoListitem
                  key={todo.id}
                  todo={todo}
                  onDelete={handleDeleteTodo}
                  onToggle={handleToggleTodo}
                />
              ))}
            </ListGroup> */}

              <Todolist
                onDelete={handleDeleteTodoServer}
                onToggle={handleToggleTodoServer}
                todos={completedtodos}
              />

              <TodoCounter
                completed={completedtodos.length}
                total={todos.length}
              />
            </>
          ) : (
            <p> You are not go todos to do. No todos are left</p>
          ))}
      </Container>
    </>
  );
}

export default App;

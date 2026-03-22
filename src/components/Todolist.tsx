import { ListGroup } from "react-bootstrap";
import type { Todo } from "../types/Todo.types";
import TodoListitem from "./TodoListitem";

interface TodoListitemProps {
  onDelete: (todo: Todo) => void;
  onToggle: (todo: Todo) => void;
  todos: Todo[];
}

const Todolist: React.FC<TodoListitemProps> = ({
  onDelete,
  onToggle,
  todos,
}) => {
  return (
    <ListGroup className="todolist mb-3">
      {todos.map((todo) => (
        <TodoListitem
          todo={todo}
          key={todo.id}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </ListGroup>
  );
};

export default Todolist;

//PROP DRILING

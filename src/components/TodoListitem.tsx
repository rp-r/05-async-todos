import { Button } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";

import type { Todo } from "../types/Todo.types";
interface TodoListitemProps {
  todo: Todo;
  onDelete: (todo: Todo) => void;
  onToggle: (todo: Todo) => void;
}

const TodoListitem: React.FC<TodoListitemProps> = ({
  todo,
  onDelete,
  onToggle,
}) => {
  return (
    <>
      <ListGroup.Item
        key={todo.id}
        className={todo.completed ? "completed" : ""}
      >
        <span className="todo-title">{todo.title}</span>

        <div>
          <Button
            size="sm"
            variant="outline-warning"
            onClick={() => onToggle(todo)}
          >
            Toggle
          </Button>

          <Button
            size="sm"
            variant="outline-danger"
            onClick={() => onDelete(todo)}
          >
            Delete
          </Button>
        </div>
      </ListGroup.Item>
    </>
  );
};

export default TodoListitem;

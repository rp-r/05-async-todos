import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { Form } from "react-bootstrap";

interface TodoFormProps {
  onhandleAdd: (todo: Todo) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onhandleAdd }) => {
  const [inputtodotitle, setInputtodotitle] = useState("");
  const trimmedinputtodotitle = inputtodotitle.trim();

  const inputTodoTitleRef=useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    onhandleAdd(trimmedinputtodotitle);

    //CREATE NEW todos

    /*
    setTodos([...todos,{

      id:Math.max(0, ...todos.map(todo=>todo.id))+1,
      title:inputtodotitle.trim(),
      completed:false
    }])

*/
    //TELL THE PARENT SOME ONE

    setInputtodotitle("");
    inputTodoTitleRef.current?.focus();
  };
useEffect(()=>{

  //FOUCS ON INPUT ELEMENT AFTER SUBMIT
 /**
  if(!inputTodoTitleRef.current)
  {
    return;
  }
  inputTodoTitleRef.current.focus();

 
   * 


   */
  inputTodoTitleRef.current?.focus();
},[])

  return (
    <>
      {" "}
      <Form onSubmit={handleSubmit} className="mb-4">
        <InputGroup>
          <Form.Control
            aria-label="New todo title"
            onChange={(e) => setInputtodotitle(e.target.value)}
            value={inputtodotitle}
            /// <reference path="" />
            ref={inputTodoTitleRef}            
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
      </Form>
    </>
  );
};

export default TodoForm;

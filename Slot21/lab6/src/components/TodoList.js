import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, removeTodo } from '../redux/todoSlice';
import { Container, Button, ListGroup, Form, InputGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';

const TodoList = () => {
  const todos = useSelector(state => state.todos.todos);
  const dispatch = useDispatch();
  const [todoText, setTodoText] = useState('');

  const handleAddTodo = () => {
    if (todoText.trim()) {
      dispatch(addTodo(todoText));
      setTodoText('');
      toast.success('Todo added');
    }
  };

  return (
    <Container className="my-4">
      <h2 className="mb-4">Todo List</h2>
      <InputGroup className="mb-3">
        <Form.Control
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          placeholder="Add new todo"
        />
        <Button variant="primary" onClick={handleAddTodo}>Add</Button>
      </InputGroup>
      <ListGroup>
        {todos.map(todo => (
          <ListGroup.Item
            key={todo.id}
            className="d-flex justify-content-between align-items-center"
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            {todo.text}
            <div>
              <Button
                variant="success"
                size="sm"
                onClick={() => dispatch(toggleTodo(todo.id))}
                className="me-2"
              >
                {todo.completed ? 'Undo' : 'Done'}
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => dispatch(removeTodo(todo.id))}
              >
                Delete
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default TodoList;
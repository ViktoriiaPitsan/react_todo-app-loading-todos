import React, { useState } from 'react';

type Props = {
  onAddTodo: (title: string) => void;
};

export const NewTodoForm: React.FC<Props> = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (title.trim()) {
      onAddTodo(title);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={event => setTitle(event.target.value)}
      />
    </form>
  );
};

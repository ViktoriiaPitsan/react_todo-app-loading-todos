import React, { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoItem } from './components/TodoItem';
import { NewTodoForm } from './components/NewTodoForm';
import { Footer } from './components/Footer';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [error]);

  useEffect(() => {
    if (!USER_ID) {
      return;
    }

    const loadTodos = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const todosData = await getTodos();

        setTodos(todosData);
      } catch (err) {
        setError('Unable to load todos');
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, []);

  const handleAddTodo = (title: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      userId: USER_ID,
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  const handleCloseError = () => {
    setError(null);
  };

  const hasTodos = todos.length > 0;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {hasTodos && (
            <button
              type="button"
              className="todoapp__toggle-all active"
              data-cy="ToggleAllButton"
            />
          )}
          <NewTodoForm onAddTodo={handleAddTodo} />
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {isLoading ? (
            <div className="spinner">Loading...</div>
          ) : (
            filteredTodos.map(todo => <TodoItem key={todo.id} todo={todo} />)
          )}
        </section>

        {hasTodos && (
          <Footer
            remainingItemsCount={todos.filter(todo => !todo.completed).length}
            filter={filter}
            onFilterChange={setFilter}
          />
        )}
      </div>

      <ErrorNotification message={error} onClose={handleCloseError} />
    </div>
  );
};

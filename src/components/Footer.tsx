import React from 'react';

type Props = {
  remainingItemsCount: number;
  filter: 'all' | 'active' | 'completed';
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
};

export const Footer: React.FC<Props> = ({
  remainingItemsCount,
  filter,
  onFilterChange,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {remainingItemsCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
          data-cy="FilterLinkAll"
          onClick={() => onFilterChange('all')}
        >
          All
        </a>
        <a
          href="#/active"
          className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
          data-cy="FilterLinkActive"
          onClick={() => onFilterChange('active')}
        >
          Active
        </a>
        <a
          href="#/completed"
          className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
          data-cy="FilterLinkCompleted"
          onClick={() => onFilterChange('completed')}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};

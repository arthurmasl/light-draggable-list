import React from 'react';

import './Draggable.style.scss';

import { useSelector, useDispatch } from 'react-redux';
import { selectItems, addList } from './draggableSlice';

import DraggableList from './DraggableList';

const Draggable = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);

  const addListHandler = () => dispatch(addList());

  return (
    <div className="mt-4">
      <button className="btn btn-success" onClick={addListHandler}>
        add list
      </button>

      {items.map((list) => (
        <DraggableList key={list.id} items={list.items} listId={list.id} />
      ))}
    </div>
  );
};

export default Draggable;

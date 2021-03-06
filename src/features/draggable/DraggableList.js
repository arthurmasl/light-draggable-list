import React, { memo } from 'react';

import { useDispatch } from 'react-redux';
import { removeList, addItem } from './draggableSlice';
import DraggableItem from './DraggableItem';

const DraggableList = ({ items, listId }) => {
  const dispatch = useDispatch();

  const addItemHandler = () => dispatch(addItem({ listId }));
  const removeListHandler = () => dispatch(removeList({ listId }));

  return (
    <div className="list-group mt-4">
      <div className="list-group-item bg-dark text-light">
        List {listId}
        <div className="btn-group">
          <button className="btn btn-primary" onClick={addItemHandler}>
            add item
          </button>
          <button className="btn btn-danger" onClick={removeListHandler}>
            remove list
          </button>
        </div>
      </div>
      {items.map((item) => (
        <DraggableItem key={item} listId={listId} item={item} />
      ))}
    </div>
  );
};

export default memo(DraggableList);

import React, { memo } from 'react';

import { useDispatch } from 'react-redux';
import { removeItem, setPicked, moveItem } from './draggableSlice';

const DraggableItem = ({ item, listId }) => {
  const dispatch = useDispatch();

  const removeItemHandler = () => dispatch(removeItem({ listId, id: item }));

  const dragHandler = () => {
    dispatch(setPicked({ listId, item }));
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const dropHandler = () =>
    dispatch(moveItem({ listToDropId: listId, itemToDropId: item }));

  return (
    <div
      className="draggable list-group-item"
      draggable
      onDragStart={dragHandler}
      onDragOver={allowDrop}
      onDrop={dropHandler}
    >
      {item}
      <button className="btn btn-danger" onClick={removeItemHandler}>
        remove item
      </button>
    </div>
  );
};

export default memo(DraggableItem);

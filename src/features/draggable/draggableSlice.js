import { createSlice, nanoid } from '@reduxjs/toolkit';

export const draggableSlice = createSlice({
  name: 'draggable',
  initialState: {
    items: [],
    picked: {},
  },
  reducers: {
    addList: (state) => {
      state.items.push({ id: nanoid(), items: [] });
    },

    removeList: (state, action) => {
      const { listId } = action.payload;

      state.items = state.items.filter((list) => list.id !== listId);
    },

    addItem: (state, action) => {
      const { listId, item } = action.payload;
      const index = state.items.findIndex((list) => list.id === listId);

      state.items[index].items.push(item || nanoid());
    },

    removeItem: (state, action) => {
      const { listId, id } = action.payload;

      const listIndex = state.items.findIndex((list) => list.id === listId);

      state.items[listIndex].items = state.items[listIndex].items.filter(
        (item) => item !== id
      );
    },

    setPicked: (state, action) => {
      const { listId, item } = action.payload;

      state.picked = { listId, item };
    },
  },
});

export const moveItem = (listToDropId) => (dispatch, getState) => {
  const state = getState();

  const { item, listId } = state.draggable.picked;

  const listToDrop = state.draggable.items.find(
    (list) => list.id === listToDropId
  );

  if (!listToDrop.items.includes(item)) {
    dispatch(addItem({ listId: listToDropId, item }));
    dispatch(removeItem({ listId, id: item }));
  }

  dispatch(setPicked({}));
};

export const {
  addList,
  removeList,
  addItem,
  removeItem,
  setPicked,
} = draggableSlice.actions;

export const selectItems = (state) => state.draggable.items;

export default draggableSlice.reducer;

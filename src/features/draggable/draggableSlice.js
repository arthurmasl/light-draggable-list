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

    changeList: (state, action) => {
      const { listToDropId, itemToDropId } = action.payload;

      const list = state.items.find((list) => list.id === listToDropId);
      const itemIndex = list.items.findIndex((item) => item === itemToDropId);

      const head = list.items.slice(0, itemIndex);
      const tail = list.items.slice(itemIndex, list.items.length);

      list.items = [...head, state.picked.item, ...tail];
    },
  },
});

export const {
  addList,
  removeList,
  addItem,
  removeItem,
  setPicked,
  changeList,
} = draggableSlice.actions;

export const moveItem = ({ listToDropId, itemToDropId }) => (
  dispatch,
  getState
) => {
  const state = getState();

  const { item, listId } = state.draggable.picked;

  dispatch(removeItem({ listId, id: item }));
  dispatch(changeList({ listToDropId, itemToDropId }));

  dispatch(setPicked({}));
};

export const selectItems = (state) => state.draggable.items;

export default draggableSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import draggableReducer from '../features/draggable/draggableSlice';

export default configureStore({
  reducer: {
    draggable: draggableReducer,
  },
});

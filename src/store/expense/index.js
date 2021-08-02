import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAlbums, getPhotos } from "../../api/expense";

const fetchAlbums = createAsyncThunk("albums/fetch", async () => {
  const response = await getAlbums();
  return response;
});

const fetchPhotos = createAsyncThunk("phots/fetch", async () => {
  const response = await getPhotos();
  return response;
});

const slice = createSlice({
  name: "expense",
  initialState: {
    albums: [],
    photos: [],
    error: null,
    ui: {
      loading: false,
    },
  },

  reducers: {
    add: (state, action) => {},

    remove: (state, action) => {},
  },

  extraReducers: {
    [fetchAlbums.pending]: (state, action) => {
      state.ui.loading = true;
    },
    [fetchAlbums.fulfilled]: (state, action) => {
      state.ui.loading = false;
      state.albums = action.payload.data.slice(0, 5);
    },
    [fetchAlbums.rejected]: (state, action) => {
      state.ui.loading = false;
      state.ui.error = action.error.message;
    },

    [fetchPhotos.pending]: (state, action) => {
      state.ui.loading = true;
    },
    [fetchPhotos.fulfilled]: (state, action) => {
      state.ui.loading = false;
      state.albums = state.albums.map((album) => {
        return {
          ...album,
          photos: action.payload.data
            .slice(0, 500)
            .filter((photo) => {
              return photo.albumId === album.id;
            })
            .slice(0, 10),
        };
      });
      state.photos = action.payload.data.slice(0, 100);
    },
    [fetchPhotos.rejected]: (state, action) => {
      state.ui.loading = false;
      state.ui.error = action.error.message;
    },
  },
});

const getExpenseSlice = (state) => state.expense;
const expenseActions = slice.actions;
const expenseReducer = slice.reducer;

export {
  expenseReducer,
  expenseActions,
  getExpenseSlice,
  fetchAlbums,
  fetchPhotos,
};
export default slice;

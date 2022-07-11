import { createSlice } from "@reduxjs/toolkit";
import { SelectedState } from "../types";

const initialState: SelectedState = {
  selected: [],
};

export const selectedSlice = createSlice({
  name: "selected",
  initialState,
  reducers: {
    //add a new country to the list using push to the selected list
    addSelected: (state, action) => {
      const newSelected = action.payload;
      //check if selected country is already in the list of selected countries, if it isn't then push the payload to the selected list
      const alreadySelected = state.selected.find(
        (selected) => selected.alpha3Code === newSelected.countryCode
      );
      if (!alreadySelected) {
        state.selected.push(action.payload);
      }
    },
    //delete a selected country from the list comparing via country code
    deleteSelected: (state, action) => {
      const deleteCountry = action.payload;
      state.selected = state.selected.filter(
        (selected) => selected.alpha3Code !== deleteCountry
      );
    },
  },
});

export const { addSelected, deleteSelected } = selectedSlice.actions;

export default selectedSlice.reducer;

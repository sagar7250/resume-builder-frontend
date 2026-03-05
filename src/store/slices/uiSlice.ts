import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  darkMode: boolean;
  sidebarOpen: boolean;
  builderStep: number;
  previewMode: boolean;
  notification: { message: string; type: "success" | "error" | "info" | "warning" } | null;
}

const initialState: UIState = {
  darkMode: false,
  sidebarOpen: true,
  builderStep: 0,
  previewMode: false,
  notification: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleDarkMode: (state) => { state.darkMode = !state.darkMode; },
    toggleSidebar: (state) => { state.sidebarOpen = !state.sidebarOpen; },
    setBuilderStep: (state, action: PayloadAction<number>) => { state.builderStep = action.payload; },
    togglePreviewMode: (state) => { state.previewMode = !state.previewMode; },
    showNotification: (state, action: PayloadAction<UIState["notification"]>) => {
      state.notification = action.payload;
    },
    clearNotification: (state) => { state.notification = null; },
  },
});

export const { toggleDarkMode, toggleSidebar, setBuilderStep, togglePreviewMode, showNotification, clearNotification } = uiSlice.actions;
export default uiSlice.reducer;
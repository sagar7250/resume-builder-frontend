import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Resume } from "../../types";
import { resumeService } from "../../services/resumeService";

interface ResumeState {
  resumes: Resume[];
  currentResume: Resume | null;
  loading: boolean;
  saving: boolean;
  error: string | null;
  lastSaved: string | null;
}

const initialState: ResumeState = {
  resumes: [],
  currentResume: null,
  loading: false,
  saving: false,
  error: null,
  lastSaved: null,
};

export const fetchResumes = createAsyncThunk("resume/fetchAll", async (_, { rejectWithValue }) => {
  try { return await resumeService.getAll(); }
  catch (e: any) { return rejectWithValue(e.response?.data?.message || "Failed to fetch resumes"); }
});

export const fetchResumeById = createAsyncThunk("resume/fetchById", async (id: string, { rejectWithValue }) => {
  try { return await resumeService.getById(id); }
  catch (e: any) { return rejectWithValue(e.response?.data?.message || "Failed to fetch resume"); }
});

export const createResume = createAsyncThunk("resume/create", async (resume: Partial<Resume>, { rejectWithValue }) => {
  try { return await resumeService.create(resume); }
  catch (e: any) { return rejectWithValue(e.response?.data?.message || "Failed to create resume"); }
});

export const updateResume = createAsyncThunk("resume/update",
  async ({ id, resume }: { id: string; resume: Partial<Resume> }, { rejectWithValue }) => {
    try { return await resumeService.update(id, resume); }
    catch (e: any) { return rejectWithValue(e.response?.data?.message || "Failed to update resume"); }
  }
);

export const deleteResume = createAsyncThunk("resume/delete", async (id: string, { rejectWithValue }) => {
  try { await resumeService.delete(id); return id; }
  catch (e: any) { return rejectWithValue(e.response?.data?.message || "Failed to delete resume"); }
});

export const duplicateResume = createAsyncThunk("resume/duplicate", async (id: string, { rejectWithValue }) => {
  try { return await resumeService.duplicate(id); }
  catch (e: any) { return rejectWithValue(e.response?.data?.message || "Failed to duplicate resume"); }
});

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    setCurrentResume: (state, action: PayloadAction<Resume | null>) => {
      state.currentResume = action.payload;
    },
    updateCurrentResume: (state, action: PayloadAction<Partial<Resume>>) => {
      if (state.currentResume) {
        state.currentResume = { ...state.currentResume, ...action.payload };
      }
    },
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResumes.pending, (state) => { state.loading = true; })
      .addCase(fetchResumes.fulfilled, (state, action) => { state.loading = false; state.resumes = action.payload; })
      .addCase(fetchResumes.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(fetchResumeById.fulfilled, (state, action) => { state.currentResume = action.payload; state.loading = false; })
      .addCase(createResume.fulfilled, (state, action) => {
        state.resumes.unshift(action.payload);
        state.currentResume = action.payload;
        state.saving = false;
      })
      .addCase(updateResume.pending, (state) => { state.saving = true; })
      .addCase(updateResume.fulfilled, (state, action) => {
        state.saving = false;
        state.lastSaved = new Date().toISOString();
        state.currentResume = action.payload;
        const idx = state.resumes.findIndex(r => r.id === action.payload.id);
        if (idx !== -1) state.resumes[idx] = action.payload;
      })
      .addCase(updateResume.rejected, (state) => { state.saving = false; })
      .addCase(deleteResume.fulfilled, (state, action) => {
        state.resumes = state.resumes.filter(r => r.id !== action.payload);
        if (state.currentResume?.id === action.payload) state.currentResume = null;
      })
      .addCase(duplicateResume.fulfilled, (state, action) => {
        state.resumes.unshift(action.payload);
      });
  },
});

export const { setCurrentResume, updateCurrentResume, clearError } = resumeSlice.actions;
export default resumeSlice.reducer;
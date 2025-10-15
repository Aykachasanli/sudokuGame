import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  difficulty: null,
  elapsed: 0,
  hintsLeft: 4,
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setDifficulty: (state, action) => {
      state.difficulty = action.payload
    },
    setElapsed: (state, action) => {
      state.elapsed = action.payload
    },
    decHints: (state) => {
      if (state.hintsLeft > 0) state.hintsLeft -= 1
    },
    resetGame: (state) => {
      state.elapsed = 0
      state.hintsLeft = 4
    }
  }
})

export const { setDifficulty, setElapsed, decHints, resetGame } = gameSlice.actions
export default gameSlice.reducer

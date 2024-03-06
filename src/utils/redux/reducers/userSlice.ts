import { createSlice } from "@reduxjs/toolkit";
import { GypsieUser } from "../../../components/navigators/types/types";

export type UserState = Readonly<{
  user: GypsieUser;
}>;

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserSlice: () => initialState,
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;

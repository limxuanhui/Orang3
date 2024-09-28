import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { EditProfile } from '@components/profile/types/types';
import type { Media } from '@components/feed/types/types';
import { GypsieUser } from '@navigators/types/types';

type EditProfileState = Readonly<EditProfile>;

const initialState: EditProfileState = {
  originalUser: {
    id: '',
    email: '',
    name: '',
    handle: '',
    bio: '',
    avatar: undefined,
    isDeactivated: false,
    createdAt: '',
  },
  avatar: undefined,
  name: '',
  handle: '',
  bio: '',
  saving: false,
};

const editProfileSlice = createSlice({
  name: 'editProfile',
  initialState,
  reducers: {
    editProfile_initProfile: (
      state,
      action: PayloadAction<{
        user: GypsieUser;
      }>,
    ) => {
      state.originalUser = action.payload.user;
      state.avatar = action.payload.user.avatar;
      state.name = action.payload.user.name;
      state.handle = action.payload.user.handle;
      state.bio = action.payload.user.bio ? action.payload.user.bio : '';
    },
    editProfile_setAvatar: (
      state,
      action: PayloadAction<{ avatar: Media }>,
    ) => {
      state.avatar = action.payload.avatar;
    },
    editProfile_setName: (state, action: PayloadAction<{ name: string }>) => {
      state.name = action.payload.name;
    },
    editProfile_setHandle: (
      state,
      action: PayloadAction<{ handle: string }>,
    ) => {
      state.handle = action.payload.handle;
    },
    editProfile_setBio: (state, action: PayloadAction<{ bio: string }>) => {
      state.bio = action.payload.bio;
    },
    editProfile_setSaving: (
      state,
      action: PayloadAction<{ saving: boolean }>,
    ) => {
      state.saving = action.payload.saving;
    },
    editProfile_resetEditProfileSlice: () => initialState,
  },
});

export const {
  editProfile_initProfile,
  editProfile_setAvatar,
  editProfile_setName,
  editProfile_setHandle,
  editProfile_setBio,
  editProfile_setSaving,
  editProfile_resetEditProfileSlice,
} = editProfileSlice.actions;

export default editProfileSlice.reducer;

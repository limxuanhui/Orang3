import type { Feed } from "../components/feed/types/types";
import type { Itinerary } from "../components/itinerary/types/types";
import type { GypsieUser } from "../components/navigators/types/types";
import type { Tale, TaleThumbnailInfo } from "../components/tale/types/types";
import { DUMMY_TALES, DUMMY_TALE_THUMBNAILS } from "./tales";

/**
 * This dummy database lets useDataManager to return dummy data on request,
 * based on object key.
 */
type DummyDatabase = {
  users?: GypsieUser[];
  feeds?: Feed[];
  tales?: Tale[];
  itineraries?: Itinerary[];
  "tales-md"?: TaleThumbnailInfo[];
};

export const DUMMY_DATABASE: DummyDatabase = {
  users: [],
  feeds: [],
  tales: DUMMY_TALES,
  itineraries: [],
  "tales-md": DUMMY_TALE_THUMBNAILS,
};

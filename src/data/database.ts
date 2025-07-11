import type { Feed, FeedThumbnailInfo } from '../components/feed/types/types';
import type { Itinerary } from '../components/itinerary/types/types';
import type { GypsieUser } from '../components/navigators/types/types';
import type { Tale, TaleThumbnailInfo } from '../components/tale/types/types';
import { DUMMY_FEEDS, DUMMY_FEED_THUMBNAILS } from './feeds';
import { DUMMY_TALES, DUMMY_TALE_THUMBNAILS } from './tales';

/**
 * This dummy database lets useDataManager to return dummy data on request,
 * based on object key.
 */
type DummyDatabase = {
  users: GypsieUser[];
  feeds: Feed[];
  tales: Tale[];
  itineraries: Itinerary[];
  'tales-md': TaleThumbnailInfo[];
  'feeds-md': FeedThumbnailInfo[];
};

export const DUMMY_DATABASE: DummyDatabase = {
  users: [],
  feeds: DUMMY_FEEDS,
  tales: DUMMY_TALES,
  itineraries: [],
  'tales-md': DUMMY_TALE_THUMBNAILS,
  'feeds-md': DUMMY_FEED_THUMBNAILS,
};

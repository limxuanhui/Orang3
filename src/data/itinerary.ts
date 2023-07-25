import { LinkedFeedsListItem } from "../utils/types/itinerary";
import { RouteNodeInfo } from "../utils/types/route";

export const DUMMY_ITINERARY_FEED = [];

type Itinerary = {
  id: number;
  routes: RouteNodeInfo[];
  linkedFeeds: LinkedFeedsListItem[];
};

export const DUMMY_ITINERARIES: Itinerary[] = [
  {
    id: 90001,
    routes: [],
    linkedFeeds: [
      {
        feedId: 1,
        uri: "",
      },
    ],
  },
];

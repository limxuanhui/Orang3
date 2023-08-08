import type { Itinerary, ItineraryFeedThumbnailInfo } from "../components/itinerary/types/types";

export const DUMMY_ITINERARY_FEED: ItineraryFeedThumbnailInfo[] = [
  {
    id: Math.random().toString(),
    imageUri: "/Users/limxuanhui/bluextech/gypsie/assets/avatars/jennie2.png",
    caption: "Ea nisi sint pariatur eu laborum consequat sit."
  },
  {
    id: Math.random().toString(),
    imageUri: "/Users/limxuanhui/bluextech/gypsie/assets/avatars/nayeon.jpeg",
    caption: "Fugiat sit qui dolore sunt consequat excepteur velit non. Ad ut amet qui ipsum pariatur ad tempor est est laboris in fugiat irure. Amet nisi ut non nostrud et. Duis dolore magna qui Lorem officia culpa aliquip culpa voluptate et veniam duis veniam. Velit ipsum anim labore ipsum do id ullamco veniam reprehenderit magna non nostrud Lorem. Aliqua dolor non minim ea officia consectetur dolore sit. Nulla adipisicing reprehenderit aliqua aliquip enim."
  },
  {
    id: Math.random().toString(),
    imageUri: "/Users/limxuanhui/bluextech/gypsie/assets/avatars/yoona.jpeg",
    caption: "Minim amet et est ullamco enim aliquip magna amet pariatur tempor culpa Lorem in ex."
  },
  {
    id: Math.random().toString(),
    imageUri: "/Users/limxuanhui/bluextech/gypsie/assets/avatars/iu.jpeg",
    caption: "Ad adipisicing labore officia duis reprehenderit ea ex deserunt deserunt officia sit excepteur laborum pariatur. Dolor commodo commodo ex est cillum nostrud deserunt consectetur nisi est aute ad culpa reprehenderit. Veniam sint dolor consequat ad Lorem aliqua ullamco officia eiusmod. Exercitation ea cupidatat esse anim eu duis mollit tempor. Officia pariatur non dolor magna fugiat. Veniam sunt nulla dolor nulla laboris in."
  },
  {
    id: Math.random().toString(),
    imageUri: "/Users/limxuanhui/bluextech/gypsie/assets/avatars/kimjiwon.jpeg",
    caption: "Dolore tempor laborum adipisicing enim tempor. Quis eu reprehenderit aute amet qui sunt sunt minim. Do excepteur ea anim qui qui incididunt ut occaecat voluptate. Consequat deserunt duis cillum pariatur nisi nostrud id. Do magna proident culpa commodo exercitation excepteur aliqua excepteur ut cillum labore excepteur. Id Lorem eu officia do amet."
  },
];

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

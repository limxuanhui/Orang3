import { StoryItemType } from "../components/post/types/types";
import type { NewTale, Tale } from "../components/tale/types/types";
import type { TaleThumbnailInfo } from "../components/tale/types/types";
import { storyBodyStyle, storyTitleStyle } from "../utils/constants/text";
import { DUMMY_FEEDS } from "./feeds";

export const DUMMY_TALE_THUMBNAILS: TaleThumbnailInfo[] = [
  {
    taleId: "tale-1",
    creator: {
      id: "user-1",
      handle: "@jennie",
      avatarUri:
        "/Users/limxuanhui/bluextech/gypsie/assets/avatars/jennie.jpeg",
    },
    cover: {
      id: "tale-1-cover-1",
      type: "image/jpeg",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/taiwan/taiwan-1.jpeg",
    },
    title: "Taiwan Chronicles: Exploring Paradises",
  },
  {
    taleId: "tale-2",
    creator: {
      id: "user-3",
      handle: "@lisa",
      avatarUri: "/Users/limxuanhui/bluextech/gypsie/assets/avatars/lisa.jpeg",
    },
    cover: {
      id: "tale-2-cover",
      type: "image/jpg",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/singapore/singapore-1.jpg",
    },
    title: "Escaping to Tranquil Singapore & Beyond",
  },
  {
    taleId: "tale-3",
    creator: {
      id: "user-4",
      handle: "@rose",
      avatarUri: "/Users/limxuanhui/bluextech/gypsie/assets/avatars/rose.jpeg",
    },
    cover: {
      id: "tale-3-cover",
      type: "image/jpeg",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/korea/korea-1.jpeg",
    },
    title: "Uncover Serene Havens & Cultural Marvels in Korea",
  },
  {
    taleId: "tale-4",
    creator: {
      id: "user-2",
      handle: "@jisoo",
      avatarUri: "/Users/limxuanhui/bluextech/gypsie/assets/avatars/jisoo.jpeg",
    },
    cover: {
      id: "tale-4-cover",
      type: "image/jpeg",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/thailand/thailand-1.jpeg",
    },
    title: "Journey Through Timeless Landscapes of Thailand",
  },
  {
    taleId: "tale-5",
    creator: {
      id: "user-1",
      handle: "@jennie",
      avatarUri:
        "/Users/limxuanhui/bluextech/gypsie/assets/avatars/jennie.jpeg",
    },
    cover: {
      id: "tale-5-cover",
      type: "image/jpeg",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/japan/japan-1.jpeg",
    },
    title: "Discovering Hidden Gems & Natural Beauty of Japan",
  },
  {
    taleId: "tale-6",
    creator: {
      id: "user-3",
      handle: "@lisa",
      avatarUri: "/Users/limxuanhui/bluextech/gypsie/assets/avatars/lisa.jpeg",
    },
    cover: {
      id: "tale-6-cover",
      type: "image/jpeg",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/vietnam/vietnam-1.jpeg",
    },
    title: "Adventures in the Land of Enchantment: Vietnam",
  },
  {
    taleId: "tale-7",
    creator: {
      id: "user-2",
      handle: "@jisoo",
      avatarUri: "/Users/limxuanhui/bluextech/gypsie/assets/avatars/jisoo.jpeg",
    },
    cover: {
      id: "tale-7-cover",
      type: "image/jpeg",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/china/china-1.jpeg",
    },
    title: "Explore Ancient Ruins & Modern Wonders of China",
  },
];

export const DUMMY_TALES: Tale[] = [
  {
    id: "tale-1",
    creator: {
      id: "user-1",
      handle: "@jennie",
      avatarUri:
        "/Users/limxuanhui/bluextech/gypsie/assets/avatars/jennie.jpeg",
    },
    cover: {
      id: "tale-1-cover-1",
      type: "image/jpeg",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/taiwan/taiwan-1.jpeg",
    },
    title: "Taiwan Chronicles: Exploring Paradises",
    feeds: [DUMMY_FEEDS[0], DUMMY_FEEDS[4]],
    itinerary: {
      id: "itinerary-1",
      creatorId: "user-1",
      routes: [],
    },
    story: [
      {
        id: "tale-1-storytext-1",
        type: StoryItemType.Text,
        text: "Amet exercitation voluptate laborum irure id esse commodo exercitation non ullamco.",
        style: storyTitleStyle,
      },
      {
        id: "tale-1-storytext-2",
        type: StoryItemType.Text,
        text: "Aliquip aute ipsum labore id proident sit irure nisi voluptate voluptate sit.",
        style: storyBodyStyle,
      },
      {
        id: "tale-1-storytext-3",
        type: StoryItemType.Text,
        text: "Non in voluptate commodo aliquip minim tempor.",
        style: storyBodyStyle,
      },
      {
        id: "tale-1-storymedia-1",
        type: StoryItemType.Media,
        data: [
          {
            feedId: "tale-1-storymedia-1-feed-1",
            uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/japan-kyotoshrine.jpeg",
          },
          {
            feedId: "tale-1-storymedia-1-feed-1",
            uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/japan-mtfuji.jpeg",
          },
          {
            feedId: "tale-1-storymedia-1-feed-1",
            uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/japan-trainstation.jpeg",
          },
          {
            feedId: "tale-1-storymedia-1-feed-1",
            uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/japan-yokocho.jpeg",
          },
        ],
      },
      {
        id: "tale-1-storytext-4",
        type: StoryItemType.Text,
        text: "Consequat consectetur enim et esse veniam occaecat culpa commodo nostrud.",
        style: storyBodyStyle,
      },
    ],
  },
  {
    id: "tale-2",
    creator: {
      id: "user-3",
      handle: "@lisa",
      avatarUri: "/Users/limxuanhui/bluextech/gypsie/assets/avatars/lisa.jpeg",
    },
    cover: {
      id: "tale-2-cover",
      type: "image/jpg",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/singapore/singapore-1.jpg",
    },
    title: "Escaping to Tranquil Singapore & Beyond",
    feeds: [DUMMY_FEEDS[2], DUMMY_FEEDS[6]],
    itinerary: {
      id: "itinerary-2",
      creatorId: "user-3",
      routes: [],
    },
    story: [
      {
        id: "tale-2-storytext-1",
        type: StoryItemType.Text,
        text: "Proident do quis veniam aliqua magna aliqua ex excepteur elit.",
        style: storyTitleStyle,
      },
      {
        id: "tale-2-storytext-2",
        type: StoryItemType.Text,
        text: "Magna deserunt enim et commodo.",
        style: storyBodyStyle,
      },
      {
        id: "tale-2-storytext-3",
        type: StoryItemType.Text,
        text: "Exercitation et mollit adipisicing excepteur fugiat commodo id sint.",
        style: storyBodyStyle,
      },
      {
        id: "tale-2-storymedia-1",
        type: StoryItemType.Media,
        data: [
          {
            feedId: "tale-2-storymedia-1-feed-1",
            uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/japan-kyotoshrine.jpeg",
          },
          {
            feedId: "tale-2-storymedia-1-feed-1",
            uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/japan-mtfuji.jpeg",
          },
          {
            feedId: "tale-2-storymedia-1-feed-1",
            uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/japan-trainstation.jpeg",
          },
          {
            feedId: "tale-2-storymedia-1-feed-1",
            uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/japan-yokocho.jpeg",
          },
        ],
      },
      {
        id: "tale-2-storytext-4",
        type: StoryItemType.Text,
        text: "Consectetur adipisicing sint esse in ullamco nostrud fugiat cupidatat voluptate eiusmod laboris.",
        style: storyBodyStyle,
      },
    ],
  },
  {
    id: "tale-3",
    creator: {
      id: "user-4",
      handle: "@rose",
      avatarUri: "/Users/limxuanhui/bluextech/gypsie/assets/avatars/rose.jpeg",
    },
    cover: {
      id: "tale-3-cover",
      type: "image/jpeg",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/korea/korea-1.jpeg",
    },
    title: "Uncover Serene Havens & Cultural Marvels in Korea",
    feeds: [DUMMY_FEEDS[3], DUMMY_FEEDS[7]],
    itinerary: {
      id: "itinerary-3",
      creatorId: "user-4",
      routes: [],
    },
    story: [
      {
        id: "tale-3-storytext-1",
        type: StoryItemType.Text,
        text: "Labore amet laboris laborum minim consectetur incididunt.",
        style: storyTitleStyle,
      },
      {
        id: "tale-3-storytext-2",
        type: StoryItemType.Text,
        text: "Et adipisicing proident quis ut consequat nostrud ut enim irure est anim ex.",
        style: storyBodyStyle,
      },
      {
        id: "tale-3-storytext-3",
        type: StoryItemType.Text,
        text: "Cillum aute sit ullamco id.",
        style: storyBodyStyle,
      },
      {
        id: "tale-3-storytext-4",
        type: StoryItemType.Text,
        text: "Excepteur Lorem tempor sunt aliqua id deserunt cupidatat officia.",
        style: storyBodyStyle,
      },
    ],
  },
  {
    id: "tale-4",
    creator: {
      id: "user-2",
      handle: "@jisoo",
      avatarUri: "/Users/limxuanhui/bluextech/gypsie/assets/avatars/jisoo.jpeg",
    },
    cover: {
      id: "tale-4-cover",
      type: "image/jpeg",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/thailand/thailand-1.jpeg",
    },
    title: "Journey Through Timeless Landscapes of Thailand",
    feeds: [DUMMY_FEEDS[1], DUMMY_FEEDS[5]],
    itinerary: {
      id: "itinerary-4",
      creatorId: "user-2",
      routes: [],
    },
    story: [
      {
        id: "tale-4-storytext-1",
        type: StoryItemType.Text,
        text: "Laborum magna sint dolore ex.",
        style: storyTitleStyle,
      },
      {
        id: "tale-4-storytext-2",
        type: StoryItemType.Text,
        text: "Excepteur tempor amet incididunt esse duis exercitation.",
        style: storyBodyStyle,
      },
      {
        id: "tale-4-storytext-3",
        type: StoryItemType.Text,
        text: "Esse enim culpa occaecat ex.",
        style: storyTitleStyle,
      },
      {
        id: "tale-4-storytext-4",
        type: StoryItemType.Text,
        text: "Aute ut voluptate aute id excepteur sint ullamco.",
        style: storyBodyStyle,
      },
    ],
  },
  {
    id: "tale-5",
    creator: {
      id: "user-1",
      handle: "@jennie",
      avatarUri:
        "/Users/limxuanhui/bluextech/gypsie/assets/avatars/jennie.jpeg",
    },
    cover: {
      id: "tale-5-cover",
      type: "image/jpeg",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/japan/japan-1.jpeg",
    },
    title: "Discovering Hidden Gems & Natural Beauty of Japan",
    feeds: [DUMMY_FEEDS[8], DUMMY_FEEDS[11]],
    itinerary: {
      id: "itinerary-5",
      creatorId: "user-1",
      routes: [],
    },
    story: [
      {
        id: "tale-5-storytext-1",
        type: StoryItemType.Text,
        text: "Laborum magna sint dolore ex.",
        style: storyTitleStyle,
      },
      {
        id: "tale-5-storytext-2",
        type: StoryItemType.Text,
        text: "Excepteur tempor amet incididunt esse duis exercitation.",
        style: storyBodyStyle,
      },
      {
        id: "tale-5-storytext-3",
        type: StoryItemType.Text,
        text: "Esse enim culpa occaecat ex.",
        style: storyTitleStyle,
      },
      {
        id: "tale-5-storytext-4",
        type: StoryItemType.Text,
        text: "Aute ut voluptate aute id excepteur sint ullamco.",
        style: storyBodyStyle,
      },
      {
        id: "tale-5-storytext-5",
        type: StoryItemType.Text,
        text: "Id sit laborum dolor exercitation nisi ullamco proident reprehenderit velit ullamco qui.",
        style: storyBodyStyle,
      },
      {
        id: "tale-5-storytext-6",
        type: StoryItemType.Text,
        text: "Amet aute sint reprehenderit nisi do officia mollit.",
        style: storyBodyStyle,
      },
      {
        id: "tale-5-storytext-7",
        type: StoryItemType.Text,
        text: "Id anim amet laborum cillum excepteur aliquip non consequat voluptate et esse velit.",
        style: storyBodyStyle,
      },
      {
        id: "tale-5-storytext-8",
        type: StoryItemType.Text,
        text: "Excepteur reprehenderit exercitation officia velit proident velit dolor quis labore fugiat.",
        style: storyBodyStyle,
      },
    ],
  },
  {
    id: "tale-6",
    creator: {
      id: "user-3",
      handle: "@lisa",
      avatarUri: "/Users/limxuanhui/bluextech/gypsie/assets/avatars/lisa.jpeg",
    },
    cover: {
      id: "tale-6-cover",
      type: "image/jpeg",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/vietnam/vietnam-1.jpeg",
    },
    title: "Adventures in the Land of Enchantment: Vietnam",
    feeds: [DUMMY_FEEDS[10], DUMMY_FEEDS[13]],
    itinerary: {
      id: "itinerary-6",
      creatorId: "user-3",
      routes: [],
    },
    story: [
      {
        id: "tale-6-storytext-1",
        type: StoryItemType.Text,
        text: "Eu non labore voluptate officia ea minim velit sint ipsum velit.",
        style: storyTitleStyle,
      },
      {
        id: "tale-6-storytext-2",
        type: StoryItemType.Text,
        text: "Adipisicing quis veniam in in quis nostrud exercitation sit labore do ea anim.",
        style: storyBodyStyle,
      },
      {
        id: "tale-6-storytext-3",
        type: StoryItemType.Text,
        text: "Adipisicing elit consequat nisi ea eu amet nisi tempor.",
        style: storyTitleStyle,
      },
      {
        id: "tale-6-storytext-4",
        type: StoryItemType.Text,
        text: "Culpa et ipsum excepteur eu quis.",
        style: storyBodyStyle,
      },
    ],
  },
  {
    id: "tale-7",
    creator: {
      id: "user-2",
      handle: "@jisoo",
      avatarUri: "/Users/limxuanhui/bluextech/gypsie/assets/avatars/jisoo.jpeg",
    },
    cover: {
      id: "tale-7-cover",
      type: "image/jpeg",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/china/china-1.jpeg",
    },
    title: "Explore Ancient Ruins & Modern Wonders of China",
    feeds: [DUMMY_FEEDS[9], DUMMY_FEEDS[12]],
    itinerary: {
      id: "itinerary-7",
      creatorId: "user-2",
      routes: [],
    },
    story: [
      {
        id: "tale-7-storytext-1",
        type: StoryItemType.Text,
        text: "Minim nostrud cillum laborum esse.",
        style: storyTitleStyle,
      },
      {
        id: "tale-7-storytext-2",
        type: StoryItemType.Text,
        text: "Esse deserunt voluptate deserunt fugiat.",
        style: storyBodyStyle,
      },
      {
        id: "tale-7-storytext-3",
        type: StoryItemType.Text,
        text: "Aute ipsum est sunt excepteur qui qui laborum incididunt.",
        style: storyTitleStyle,
      },
      {
        id: "tale-7-storytext-4",
        type: StoryItemType.Text,
        text: "Labore aliquip cillum est dolore proident exercitation culpa ut non velit.",
        style: storyBodyStyle,
      },
    ],
  },
];

import { Feed } from "../components/feed/types/types";

export const DUMMY_FEEDS: Feed[] = [
  {
    id: "feed-1",
    creator: {
      id: "user-1",
      handle: "@jennie",
      avatarUri:
        "/Users/limxuanhui/bluextech/gypsie/assets/avatars/jennie.jpeg",
    },
    items: [
      {
        id: "feed-1-item-1",
        media: {
          id: "feed-1-item-1-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/taiwan/taiwan-2.jpeg",
        },
        caption:
          "Beach - Labore quis qui labore labore labore consequat ullamco sint esse pariatur adipisicing minim ullamco ut.",
      },
      {
        id: "feed-1-item-2",
        media: {
          id: "feed-1-item-2-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/taiwan/taiwan-3.jpeg",
        },
        caption:
          "Cliff - Proident proident sit cillum duis dolor tempor laborum culpa ad.",
      },
      {
        id: "feed-1-item-3",
        media: {
          id: "feed-1-item-3-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/taiwan/taiwan-4.jpeg",
        },
        caption: "Jiufen old street - Qui amet commodo Lorem esse do.",
      },
      {
        id: "feed-1-item-4",
        media: {
          id: "feed-1-item-4-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/taiwan/taiwan-5.jpeg",
        },
        caption:
          "Smelly tofu - In dolor exercitation est adipisicing reprehenderit do occaecat amet eiusmod Lorem non velit sunt dolore.",
      },
      {
        id: "feed-1-item-5",
        media: {
          id: "feed-1-item-5-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/taiwan/taiwan-6.jpeg",
        },
        caption:
          "Boba milk tea - Commodo duis ullamco nostrud veniam sit in voluptate dolore irure.",
      },
    ],
    isLiked: false,
    isBookmarked: true,
    likes: Math.floor(Math.random() * 10000000 + 1),
    comments: Math.floor(Math.random() * 10000000 + 1),
    bookmarks: Math.floor(Math.random() * 1000000 + 1),
    shares: Math.floor(Math.random() * 10000000 + 1),
    taleId: "tale-1"
  },
  {
    id: "feed-2",
    creator: {
      id: "user-2",
      handle: "@jisoo",
      avatarUri: "/Users/limxuanhui/bluextech/gypsie/assets/avatars/jisoo.jpeg",
    },
    items: [
      {
        id: "feed-2-item-1",
        media: {
          id: "feed-2-item-1-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/thailand/thailand-2.jpeg",
        },
        caption: "Deserunt ex nisi est ad do Lorem aliqua irure anim.",
      },
      {
        id: "feed-2-item-2",
        media: {
          id: "feed-2-item-2-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/thailand/thailand-3.jpeg",
        },
        caption:
          "Lantern festival - Occaecat enim do minim est irure mollit exercitation labore elit laborum laborum duis labore.",
      },
      {
        id: "feed-2-item-3",
        media: {
          id: "feed-2-item-3-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/thailand/thailand-4.jpeg",
        },
        caption:
          "Dragon temple - Occaecat enim do minim est irure mollit exercitation labore elit laborum laborum duis labore.",
      },
      {
        id: "feed-2-item-4",
        media: {
          id: "feed-2-item-4-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/thailand/thailand-5.jpeg",
        },
        caption:
          "Phuket - Consectetur commodo laboris amet reprehenderit non sit non do cillum qui ad.",
      },
    ],
    isLiked: false,
    isBookmarked: true,
    likes: Math.floor(Math.random() * 10000000 + 1),
    comments: Math.floor(Math.random() * 10000000 + 1),
    bookmarks: Math.floor(Math.random() * 1000000 + 1),
    shares: Math.floor(Math.random() * 10000000 + 1),
    taleId: "tale-4"
  },
  {
    id: "feed-3",
    creator: {
      id: "user-3",
      handle: "@lisa",
      avatarUri: "/Users/limxuanhui/bluextech/gypsie/assets/avatars/lisa.jpeg",
    },
    items: [
      {
        id: "feed-3-item-1",
        media: {
          id: "feed-3-item-1-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/singapore/singapore-2.jpeg",
        },
        caption:
          "Chili crab - Labore quis qui labore labore labore consequat ullamco sint esse pariatur adipisicing minim ullamco ut.",
      },
      {
        id: "feed-3-item-2",
        media: {
          id: "feed-3-item-2-media",
          type: "image/jpg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/singapore/singapore-3.jpg",
        },
        caption:
          "Char kway teow - Proident proident sit cillum duis dolor tempor laborum culpa ad.",
      },
      {
        id: "feed-3-item-3",
        media: {
          id: "feed-3-item-3-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/singapore/singapore-4.jpeg",
        },
        caption: "Bak kut teh - Qui amet commodo Lorem esse do.",
      },
      {
        id: "feed-3-item-4",
        media: {
          id: "feed-3-item-4-media",
          type: "image/jpg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/singapore/singapore-5.jpg",
        },
        caption:
          "Changi Jewel - In dolor exercitation est adipisicing reprehenderit do occaecat amet eiusmod Lorem non velit sunt dolore.",
      },
      {
        id: "feed-3-item-5",
        media: {
          id: "feed-3-item-5-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/singapore/singapore-6.jpeg",
        },
        caption:
          "Lau pa sat - Commodo duis ullamco nostrud veniam sit in voluptate dolore irure.",
      },
    ],
    isLiked: false,
    isBookmarked: true,
    likes: Math.floor(Math.random() * 10000000 + 1),
    comments: Math.floor(Math.random() * 10000000 + 1),
    bookmarks: Math.floor(Math.random() * 1000000 + 1),
    shares: Math.floor(Math.random() * 10000000 + 1),
    taleId: "tale-2"
  },
  {
    id: "feed-4",
    creator: {
      id: "user-4",
      handle: "@rose",
      avatarUri: "/Users/limxuanhui/bluextech/gypsie/assets/avatars/rose.jpeg",
    },
    items: [
      {
        id: "feed-4-item-1",
        media: {
          id: "feed-4-item-1-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/korea/korea-2.jpeg",
        },
        caption:
          "Bukchon hanok village - Irure quis commodo duis incididunt ipsum eu aute esse.",
      },
      {
        id: "feed-4-item-2",
        media: {
          id: "feed-4-item-2-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/korea/korea-3.jpeg",
        },
        caption:
          "Traditional hanbok - Consequat magna culpa reprehenderit deserunt labore deserunt cillum.",
      },
      {
        id: "feed-4-item-3",
        media: {
          id: "feed-4-item-3-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/korea/korea-4.jpeg",
        },
        caption:
          "Seoul - Consectetur qui commodo et consectetur duis aliqua deserunt in eiusmod.",
      },
      {
        id: "feed-4-item-4",
        media: {
          id: "feed-4-item-4-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/korea/korea-5.jpeg",
        },
        caption:
          "Namsan tower - Voluptate nisi amet veniam officia excepteur labore consequat voluptate amet dolore deserunt dolore.",
      },
    ],
    isLiked: false,
    isBookmarked: true,
    likes: Math.floor(Math.random() * 10000000 + 1),
    comments: Math.floor(Math.random() * 10000000 + 1),
    bookmarks: Math.floor(Math.random() * 1000000 + 1),
    shares: Math.floor(Math.random() * 10000000 + 1),
    taleId: "tale-3"
  },

  {
    id: "feed-5",
    creator: {
      id: "user-1",
      handle: "@jennie",
      avatarUri:
        "/Users/limxuanhui/bluextech/gypsie/assets/avatars/jennie.jpeg",
    },
    items: [
      {
        id: "feed-5-item-1",
        media: {
          id: "feed-5-item-1-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/taiwan/taiwan-7.jpeg",
        },
        caption:
          "Large chicken cutlet - Voluptate Lorem tempor aute irure occaecat laboris anim.",
      },
      {
        id: "feed-5-item-2",
        media: {
          id: "feed-5-item-2-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/taiwan/taiwan-8.jpeg",
        },
        caption:
          "Shilin night market - Aute pariatur anim excepteur ea anim minim dolor sit.",
      },
      {
        id: "feed-5-item-3",
        media: {
          id: "feed-5-item-3-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/taiwan/taiwan-9.jpeg",
        },
        caption:
          "Raohe night market - Proident ad magna fugiat ullamco ex pariatur.",
      },
      {
        id: "feed-5-item-4",
        media: {
          id: "feed-5-item-4-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/taiwan/taiwan-10.jpeg",
        },
        caption: "Rainbow road - Proident ad magna fugiat ullamco ex pariatur.",
      },
    ],
    isLiked: false,
    isBookmarked: true,
    likes: Math.floor(Math.random() * 10000000 + 1),
    comments: Math.floor(Math.random() * 10000000 + 1),
    bookmarks: Math.floor(Math.random() * 1000000 + 1),
    shares: Math.floor(Math.random() * 10000000 + 1),
    taleId: "tale-1"
  },
  {
    id: "feed-6",
    creator: {
      id: "user-2",
      handle: "@jisoo",
      avatarUri: "/Users/limxuanhui/bluextech/gypsie/assets/avatars/jisoo.jpeg",
    },
    items: [
      {
        id: "feed-6-item-1",
        media: {
          id: "feed-6-item-1-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/thailand/thailand-6.jpeg",
        },
        caption:
          "Blue Pearl Buddha - Mollit dolore irure nulla do do nisi qui.",
      },
      {
        id: "feed-6-item-2",
        media: {
          id: "feed-6-item-2-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/thailand/thailand-7.jpeg",
        },
        caption:
          "Tom yum soup - Mollit ea quis culpa excepteur et Lorem id id fugiat in in dolor incididunt.",
      },
      {
        id: "feed-6-item-3",
        media: {
          id: "feed-6-item-3-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/thailand/thailand-8.jpeg",
        },
        caption:
          "Coconut icecream - Ut duis labore sint dolore sit quis nulla mollit.",
      },
      {
        id: "feed-6-item-4",
        media: {
          id: "feed-6-item-4-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/thailand/thailand-9.jpeg",
        },
        caption:
          "Boat river market - Esse minim sit eiusmod ullamco voluptate amet.",
      },
      {
        id: "feed-6-item-5",
        media: {
          id: "feed-6-item-5-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/thailand/thailand-10.jpeg",
        },
        caption:
          "Clear sea - Quis laborum qui amet non anim excepteur sit proident incididunt minim esse.",
      },
    ],
    isLiked: false,
    isBookmarked: true,
    likes: Math.floor(Math.random() * 10000000 + 1),
    comments: Math.floor(Math.random() * 10000000 + 1),
    bookmarks: Math.floor(Math.random() * 1000000 + 1),
    shares: Math.floor(Math.random() * 10000000 + 1),
    taleId: "tale-4"
  },
  {
    id: "feed-7",
    creator: {
      id: "user-3",
      handle: "@lisa",
      avatarUri: "/Users/limxuanhui/bluextech/gypsie/assets/avatars/lisa.jpeg",
    },
    items: [
      {
        id: "feed-7-item-1",
        media: {
          id: "feed-7-item-1-media",
          type: "image/jpg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/singapore/singapore-7.jpg",
        },
        caption:
          "Marina bay sands - Laborum do sit proident ad nulla cillum tempor ad ut commodo ullamco sit.",
      },
      {
        id: "feed-7-item-2",
        media: {
          id: "feed-7-item-2-media",
          type: "image/jpg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/singapore/singapore-8.jpg",
        },
        caption: "Merlion - Id aliqua cillum tempor quis fugiat consequat.",
      },
      {
        id: "feed-7-item-3",
        media: {
          id: "feed-7-item-3-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/singapore/singapore-9.jpeg",
        },
        caption:
          "Satay - Ut nisi cupidatat officia aute aute pariatur mollit incididunt ea eu.",
      },
      {
        id: "feed-7-item-4",
        media: {
          id: "feed-7-item-4-media",
          type: "image/jpg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/singapore/singapore-10.jpg",
        },
        caption: "Sentosa - Do sunt eu et dolor cupidatat dolor enim.",
      },
      {
        id: "feed-7-item-5",
        media: {
          id: "feed-7-item-5-media",
          type: "image/jpg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/singapore/singapore-11.jpg",
        },
        caption:
          "Singapore river - Reprehenderit quis anim sit consequat dolore aute elit velit.",
      },
      {
        id: "feed-7-item-6",
        media: {
          id: "feed-7-item-6-media",
          type: "image/jpg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/singapore/singapore-12.jpg",
        },
        caption:
          "USS - Reprehenderit laborum sit magna ut cupidatat officia ipsum sint magna cillum consectetur minim.",
      },
      {
        id: "feed-7-item-7",
        media: {
          id: "feed-7-item-7-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/singapore/singapore-13.jpeg",
        },
        caption:
          "Vivocity - Ut consequat cillum amet ut Lorem laboris exercitation magna esse fugiat.",
      },
    ],
    isLiked: false,
    isBookmarked: true,
    likes: Math.floor(Math.random() * 10000000 + 1),
    comments: Math.floor(Math.random() * 10000000 + 1),
    bookmarks: Math.floor(Math.random() * 1000000 + 1),
    shares: Math.floor(Math.random() * 10000000 + 1),
    taleId: "tale-2"
  },
  {
    id: "feed-8",
    creator: {
      id: "user-4",
      handle: "@rose",
      avatarUri: "/Users/limxuanhui/bluextech/gypsie/assets/avatars/rose.jpeg",
    },
    items: [
      {
        id: "feed-8-item-1",
        media: {
          id: "feed-8-item-1-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/korea/korea-6.jpeg",
        },
        caption:
          "Nami island - Labore pariatur cillum cillum non commodo culpa ea.",
      },
      {
        id: "feed-8-item-2",
        media: {
          id: "feed-8-item-2-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/korea/korea-7.jpeg",
        },
        caption:
          "Myeongdong street food - Do sit qui quis qui laborum aute incididunt eu ut sit.",
      },
      {
        id: "feed-8-item-3",
        media: {
          id: "feed-8-item-3-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/korea/korea-8.jpeg",
        },
        caption:
          "Myeongdong shops - Adipisicing ut ipsum consectetur qui aliquip consequat ea officia ipsum irure deserunt aute est.",
      },
      {
        id: "feed-8-item-4",
        media: {
          id: "feed-8-item-4-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/korea/korea-9.jpeg",
        },
        caption:
          "Busan rainbow houses - Eu aliquip tempor voluptate anim esse mollit deserunt irure.",
      },
      {
        id: "feed-8-item-5",
        media: {
          id: "feed-8-item-5-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/korea/korea-10.jpeg",
        },
        caption: "Budae jjigae - Aliquip amet excepteur cupidatat id.",
      },
    ],
    isLiked: false,
    isBookmarked: true,
    likes: Math.floor(Math.random() * 10000000 + 1),
    comments: Math.floor(Math.random() * 10000000 + 1),
    bookmarks: Math.floor(Math.random() * 1000000 + 1),
    shares: Math.floor(Math.random() * 10000000 + 1),
    taleId: "tale-3"
  },

  {
    id: "feed-9",
    creator: {
      id: "user-1",
      handle: "@jennie",
      avatarUri:
        "/Users/limxuanhui/bluextech/gypsie/assets/avatars/jennie.jpeg",
    },
    items: [
      {
        id: "feed-9-item-1",
        media: {
          id: "feed-9-item-1-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/japan/japan-2.jpeg",
        },
        caption:
          "Mt Fuji - Est reprehenderit ut laboris mollit aliqua fugiat proident nostrud consectetur amet.",
      },
      {
        id: "feed-9-item-2",
        media: {
          id: "feed-9-item-2-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/japan/japan-3.jpeg",
        },
        caption: "Train station - Dolor non eiusmod ea aute.",
      },
      {
        id: "feed-9-item-3",
        media: {
          id: "feed-9-item-3-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/japan/japan-4.jpeg",
        },
        caption:
          "Alley with ramen shops - In esse nostrud irure reprehenderit id deserunt ex laborum.",
      },
      {
        id: "feed-9-item-4",
        media: {
          id: "feed-9-item-4-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/japan/japan-5.jpeg",
        },
        caption:
          "Shrine entrance - Sit qui nisi irure tempor aliqua velit eu dolore nulla dolore minim ea aliquip fugiat.",
      },
      {
        id: "feed-9-item-5",
        media: {
          id: "feed-9-item-4-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/japan/japan-6.jpeg",
        },
        caption:
          "Ramen - Magna ullamco nostrud proident ea ex cillum ullamco proident sint est sint.",
      },
    ],
    isLiked: false,
    isBookmarked: true,
    likes: Math.floor(Math.random() * 10000000 + 1),
    comments: Math.floor(Math.random() * 10000000 + 1),
    bookmarks: Math.floor(Math.random() * 1000000 + 1),
    shares: Math.floor(Math.random() * 10000000 + 1),
    taleId: "tale-5"
  },
  {
    id: "feed-10",
    creator: {
      id: "user-2",
      handle: "@jisoo",
      avatarUri: "/Users/limxuanhui/bluextech/gypsie/assets/avatars/jisoo.jpeg",
    },
    items: [
      {
        id: "feed-10-item-1",
        media: {
          id: "feed-10-item-1-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/china/china-2.jpeg",
        },
        caption: "Great Wall of China - Nostrud sint cupidatat et duis.",
      },
      {
        id: "feed-10-item-2",
        media: {
          id: "feed-10-item-2-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/china/china-3.jpeg",
        },
        caption:
          "Shanghai Oriental Pearl Tower - Dolor veniam adipisicing ut culpa ex sit adipisicing amet fugiat.",
      },
      {
        id: "feed-10-item-3",
        media: {
          id: "feed-10-item-3-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/china/china-4.jpeg",
        },
        caption:
          "View of Shanghai Financial Centre - Commodo elit id adipisicing enim id anim voluptate adipisicing nulla fugiat commodo aliquip pariatur quis.",
      },
      {
        id: "feed-10-item-4",
        media: {
          id: "feed-10-item-4-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/china/china-5.jpeg",
        },
        caption:
          "Boutique shops - Dolore ipsum quis qui esse occaecat velit anim est dolore occaecat ex officia.",
      },
      {
        id: "feed-10-item-5",
        media: {
          id: "feed-10-item-5-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/china/china-6.jpeg",
        },
        caption:
          "Candied fruit sticks - Ea in veniam non laboris esse ea duis adipisicing.",
      },
      {
        id: "feed-10-item-6",
        media: {
          id: "feed-10-item-6-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/china/china-7.jpeg",
        },
        caption:
          "Tea leaves farm - Tempor cupidatat aliquip Lorem culpa aute proident esse non duis voluptate laboris officia sunt excepteur.",
      },
    ],
    isLiked: false,
    isBookmarked: true,
    likes: Math.floor(Math.random() * 10000000 + 1),
    comments: Math.floor(Math.random() * 10000000 + 1),
    bookmarks: Math.floor(Math.random() * 1000000 + 1),
    shares: Math.floor(Math.random() * 10000000 + 1),
    taleId: "tale-7"
  },
  {
    id: "feed-11",
    creator: {
      id: "user-3",
      handle: "@lisa",
      avatarUri: "/Users/limxuanhui/bluextech/gypsie/assets/avatars/lisa.jpeg",
    },
    items: [
      {
        id: "feed-11-item-1",
        media: {
          id: "feed-11-item-1-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/vietnam/vietnam-2.jpeg",
        },
        caption:
          "Bridge with giant hands - Sunt velit cillum irure magna laboris.",
      },
      {
        id: "feed-11-item-2",
        media: {
          id: "feed-11-item-2-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/vietnam/vietnam-3.jpeg",
        },
        caption: "View of Giant Buddha - Nisi sint ipsum culpa in sint.",
      },
      {
        id: "feed-11-item-3",
        media: {
          id: "feed-11-item-3-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/vietnam/vietnam-4.jpeg",
        },
        caption: "Tea leaves farmland - Elit do aliqua et tempor officia.",
      },
      {
        id: "feed-11-item-4",
        media: {
          id: "feed-11-item-4-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/vietnam/vietnam-5.jpeg",
        },
        caption:
          "Boat trip - Officia cupidatat magna duis nulla elit sint dolore.",
      },
    ],
    isLiked: false,
    isBookmarked: true,
    likes: Math.floor(Math.random() * 10000000 + 1),
    comments: Math.floor(Math.random() * 10000000 + 1),
    bookmarks: Math.floor(Math.random() * 1000000 + 1),
    shares: Math.floor(Math.random() * 10000000 + 1),
    taleId: "tale-6"
  },

  {
    id: "feed-12",
    creator: {
      id: "user-1",
      handle: "@jennie",
      avatarUri:
        "/Users/limxuanhui/bluextech/gypsie/assets/avatars/jennie.jpeg",
    },
    items: [
      {
        id: "feed-12-item-1",
        media: {
          id: "feed-12-item-1-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/japan/japan-7.jpeg",
        },
        caption:
          "Traditional palace - Voluptate ad reprehenderit ex et enim commodo.",
      },
      {
        id: "feed-12-item-2",
        media: {
          id: "feed-12-item-2-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/japan/japan-8.jpeg",
        },
        caption: "Seafood market - In non aliquip sunt laboris est nisi minim.",
      },
      {
        id: "feed-12-item-3",
        media: {
          id: "feed-12-item-3-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/japan/japan-9.jpeg",
        },
        caption: "Shopping district - Laborum ea ut ad consequat.",
      },
      {
        id: "feed-12-item-4",
        media: {
          id: "feed-12-item-4-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/japan/japan-10.jpeg",
        },
        caption:
          "Shopping district in the day - Cillum occaecat laboris dolor aliquip quis esse pariatur.",
      },
    ],
    isLiked: false,
    isBookmarked: true,
    likes: Math.floor(Math.random() * 10000000 + 1),
    comments: Math.floor(Math.random() * 10000000 + 1),
    bookmarks: Math.floor(Math.random() * 1000000 + 1),
    shares: Math.floor(Math.random() * 10000000 + 1),
    taleId: "tale-5"
  },
  {
    id: "feed-13",
    creator: {
      id: "user-2",
      handle: "@jisoo",
      avatarUri: "/Users/limxuanhui/bluextech/gypsie/assets/avatars/jisoo.jpeg",
    },
    items: [
      {
        id: "feed-13-item-1",
        media: {
          id: "feed-13-item-1-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/china/china-8.jpeg",
        },
        caption:
          "Terracotta warriors - Eu Lorem sit occaecat id do ex incididunt qui officia sunt.",
      },
      {
        id: "feed-13-item-2",
        media: {
          id: "feed-13-item-2-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/china/china-9.jpeg",
        },
        caption:
          "Zhangjiajie Avatar mountain - Esse laborum consectetur tempor nulla ullamco non.",
      },
      {
        id: "feed-13-item-3",
        media: {
          id: "feed-13-item-3-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/china/china-10.jpeg",
        },
        caption:
          "Cable car ride at Avatar mountain - Velit irure labore laborum ut sint sunt.",
      },
    ],
    isLiked: false,
    isBookmarked: true,
    likes: Math.floor(Math.random() * 10000000 + 1),
    comments: Math.floor(Math.random() * 10000000 + 1),
    bookmarks: Math.floor(Math.random() * 1000000 + 1),
    shares: Math.floor(Math.random() * 10000000 + 1),
    taleId: "tale-7"
  },
  {
    id: "feed-14",
    creator: {
      id: "user-3",
      handle: "@lisa",
      avatarUri: "/Users/limxuanhui/bluextech/gypsie/assets/avatars/lisa.jpeg",
    },
    items: [
      {
        id: "feed-14-item-1",
        media: {
          id: "feed-14-item-1-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/vietnam/vietnam-6.jpeg",
        },
        caption:
          "Beef pho - Proident laboris elit duis amet nulla amet quis elit.",
      },
      {
        id: "feed-14-item-2",
        media: {
          id: "feed-14-item-2-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/vietnam/vietnam-7.jpeg",
        },
        caption:
          "Spring rolls - Reprehenderit nostrud cillum do ipsum excepteur.",
      },
      {
        id: "feed-14-item-3",
        media: {
          id: "feed-14-item-3-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/vietnam/vietnam-8.jpeg",
        },
        caption:
          "Street food noodles - Incididunt fugiat consectetur eu exercitation qui cupidatat nulla fugiat laboris adipisicing duis do.",
      },
      {
        id: "feed-14-item-4",
        media: {
          id: "feed-14-item-4-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/vietnam/vietnam-9.jpeg",
        },
        caption:
          "Boutique hotel - Veniam duis excepteur voluptate labore eu duis consequat minim.",
      },
      {
        id: "feed-14-item-5",
        media: {
          id: "feed-14-item-5-media",
          type: "image/jpeg",
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/vietnam/vietnam-10.jpeg",
        },
        caption:
          "Train tracks - Tempor ea qui esse incididunt aliquip ad Lorem ad qui occaecat exercitation sunt do occaecat.",
      },
    ],
    isLiked: false,
    isBookmarked: true,
    likes: Math.floor(Math.random() * 10000000 + 1),
    comments: Math.floor(Math.random() * 10000000 + 1),
    bookmarks: Math.floor(Math.random() * 1000000 + 1),
    shares: Math.floor(Math.random() * 10000000 + 1),
    taleId: "tale-6"
  },
];

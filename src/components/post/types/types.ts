// Feed
export type WriteFeedSideControlsProps = {
  onPressAdd: () => void;
  onPressDelete: () => void;
  onPressEdit: () => void;
  onPressPost: () => void;
};

// Tale
export type ItineraryMapOverviewProps = {
  canEdit?: boolean;
};

export enum StoryTextStyle {
  'TITLE',
  'PARAGRAPH',
}

export type StoryText = {
  id: string;
  type: StoryItemType.Text;
  data: {
    text: string;
    style: StoryTextStyle;
  };
  order: number;
  isRemote?: boolean;
};

export type StoryMedia = {
  id: string;
  type: StoryItemType.Media;
  data: {
    feedId: string;
  };
  order: number;
  isRemote?: boolean;
};

export enum StoryItemType {
  'Text',
  'Media',
}

export type StoryItem = StoryText | StoryMedia;

export type Story = StoryItem[];

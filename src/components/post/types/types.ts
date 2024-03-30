// import type { StyleProp, TextStyle } from 'react-native';

// Feed
export type WriteFeedSideControlsProps = {
  onPressAdd: () => void;
  onPressDelete: () => void;
  onPressEdit: () => void;
  onPressPost: () => void;
};

// Tale
export type ItineraryMapOverviewProps = {
  creatorId: string;
  itineraryId?: string;
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
};

export type StoryMedia = {
  id: string;
  type: StoryItemType.Media;
  data: {
    feedId: string;
  };
  order: number;
};

export enum StoryItemType {
  'Text',
  'Media',
}

export type StoryItem = StoryText | StoryMedia;

export type Story = StoryItem[];

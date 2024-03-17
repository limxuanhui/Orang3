type DimensionValue = number | string | undefined;

type DimensionType = {
  TEN_PERCENT: DimensionValue;
  FIFTEEN_PERCENT: DimensionValue;
  EIGHTEEN_PERCENT: DimensionValue;
  TWENTY_PERCENT: DimensionValue;
  TWENTYFIVE_PERCENT: DimensionValue;
  THIRTY_PERCENT: DimensionValue;
  FORTY_PERCENT: DimensionValue;
  FIFTY_PERCENT: DimensionValue;
  SIXTY_PERCENT: DimensionValue;
  SEVENTY_PERCENT: DimensionValue;
  EIGHTY_PERCENT: DimensionValue;
  NINETY_PERCENT: DimensionValue;
  HUNDRED_PERCENT: DimensionValue;
};

export const DIMENSION: DimensionType = {
  TEN_PERCENT: '10%',
  FIFTEEN_PERCENT: '15%',
  EIGHTEEN_PERCENT: '18%',
  TWENTY_PERCENT: '20%',
  TWENTYFIVE_PERCENT: '25%',
  THIRTY_PERCENT: '30%',
  FORTY_PERCENT: '40%',
  FIFTY_PERCENT: '50%',
  SIXTY_PERCENT: '60%',
  SEVENTY_PERCENT: '70%',
  EIGHTY_PERCENT: '80%',
  NINETY_PERCENT: '90%',
  HUNDRED_PERCENT: '100%',
};

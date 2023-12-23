import { useCallback, useMemo, useRef } from "react";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { SharedValue } from "react-native-reanimated";

type useBottomSheetHandlersProps = {
  snapPointsArr: (string | number)[] | SharedValue<(string | number)[]>;
};

const useBottomSheetHandlers = ({
  snapPointsArr,
}: useBottomSheetHandlersProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
      />
    ),
    [],
  );

  const snapPoints = useMemo(() => snapPointsArr, [snapPointsArr]);

  return { bottomSheetRef, snapPoints, renderBackdrop };
};

export default useBottomSheetHandlers;

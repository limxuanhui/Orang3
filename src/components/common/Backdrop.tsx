import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated from "react-native-reanimated";

type BackdropProps = {
  scrollX: number;
};

const Backdrop = ({ scrollX }: BackdropProps) => {
  return <Animated.View style={{ backgroundColor: "" }} />;
};

export default Backdrop;

const styles = StyleSheet.create({});

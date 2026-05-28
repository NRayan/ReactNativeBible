import React from "react";
import type { FlexStyle, StyleProp, ViewStyle } from "react-native";
import { View } from "react-native";
import { useThemeStore } from "@stores/theme";
import { s } from "@theme/spacing";
import { ColorTokens, RadiusTokens } from "@theme";

export type BoxProps = {
  flex?: number;
  row?: boolean;
  align?: FlexStyle["alignItems"];
  justify?: FlexStyle["justifyContent"];
  wrap?: FlexStyle["flexWrap"];

  p?: number;
  px?: number;
  py?: number;
  pt?: number;
  pb?: number;
  pl?: number;
  pr?: number;
  m?: number;
  mx?: number;
  my?: number;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  gap?: number;
  rowGap?: number;
  columnGap?: number;

  w?: number;
  h?: number;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;

  bgColor?: keyof ColorTokens;
  borderColor?: keyof ColorTokens;
  border?: boolean;
  rounded?: keyof RadiusTokens;
  opacity?: number;

  position?: "absolute" | "relative";
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;

  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

export function Box({
    flex,
    row,
    align,
    justify,
    wrap,
    p, px, py, pt, pb, pl, pr,
    m, mx, my, mt, mb, ml, mr,
    gap, rowGap, columnGap,
    w, h, minW, minH, maxW, maxH,
    bgColor,
    borderColor,
    border,
    rounded,
    opacity,
    position,
    top, bottom, left, right,
    style,
    children,
}: BoxProps) {

    const { theme: { colors, radius, size } } = useThemeStore();

    const computedStyle: ViewStyle = {
        ...(flex !== undefined && { flex }),
        ...(row && { flexDirection: "row" }),
        ...(align !== undefined && { alignItems: align }),
        ...(justify !== undefined && { justifyContent: justify }),
        ...(wrap !== undefined && { flexWrap: wrap }),

        ...(p !== undefined && { padding: s(p) }),
        ...(px !== undefined && { paddingHorizontal: s(px) }),
        ...(py !== undefined && { paddingVertical: s(py) }),
        ...(pt !== undefined && { paddingTop: s(pt) }),
        ...(pb !== undefined && { paddingBottom: s(pb) }),
        ...(pl !== undefined && { paddingLeft: s(pl) }),
        ...(pr !== undefined && { paddingRight: s(pr) }),

        ...(m !== undefined && { margin: s(m) }),
        ...(mx !== undefined && { marginHorizontal: s(mx) }),
        ...(my !== undefined && { marginVertical: s(my) }),
        ...(mt !== undefined && { marginTop: s(mt) }),
        ...(mb !== undefined && { marginBottom: s(mb) }),
        ...(ml !== undefined && { marginLeft: s(ml) }),
        ...(mr !== undefined && { marginRight: s(mr) }),

        ...(gap !== undefined && { gap: s(gap) }),
        ...(rowGap !== undefined && { rowGap: s(rowGap) }),
        ...(columnGap !== undefined && { columnGap: s(columnGap) }),

        ...(w !== undefined && { width: w }),
        ...(h !== undefined && { height: h }),
        ...(minW !== undefined && { minWidth: minW }),
        ...(minH !== undefined && { minHeight: minH }),
        ...(maxW !== undefined && { maxWidth: maxW }),
        ...(maxH !== undefined && { maxHeight: maxH }),

        ...(bgColor !== undefined && { backgroundColor: colors[bgColor] }),
        ...((borderColor !== undefined || border) && { borderColor: colors[borderColor ?? "border"] }),
        ...(border && { borderWidth: size["border-width"] }),
        ...(rounded !== undefined && { borderRadius: radius[rounded] }),
        ...(opacity !== undefined && { opacity }),

        ...(position !== undefined && { position }),
        ...(top !== undefined && { top: s(top) }),
        ...(bottom !== undefined && { bottom: s(bottom) }),
        ...(left !== undefined && { left: s(left) }),
        ...(right !== undefined && { right: s(right) }),
    };

    return <View style={[computedStyle, style]}>{children}</View>;
}

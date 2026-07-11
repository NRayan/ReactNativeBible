import React from "react";
import type { DimensionValue, FlexStyle, StyleProp, ViewProps, ViewStyle } from "react-native";
import { View } from "react-native";
import { useThemeStore } from "@stores/theme";
import { s } from "@theme/spacing";
import { ColorTokens, RadiusTokens } from "@theme";
import type { Theme } from "@theme/types";

export type BoxProps = Omit<ViewProps, "style" | "children"> & {
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

    fullWidth?: boolean;
    fullHeight?: boolean;
    w?: DimensionValue;
    h?: DimensionValue;
    minW?: DimensionValue;
    minH?: DimensionValue;
    maxW?: DimensionValue;
    maxH?: DimensionValue;

    bgColor?: keyof ColorTokens;
    borderColor?: keyof ColorTokens;
    border?: boolean;
    rounded?: keyof RadiusTokens;

    position?: "absolute" | "relative";
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;

    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
};

export function buildBoxStyle(props: Omit<BoxProps, "style" | "children">, theme: Theme): ViewStyle {
    const { colors, radius, size } = theme;
    const {
        flex, row, align, justify, wrap,
        p, px, py, pt, pb, pl, pr,
        m, mx, my, mt, mb, ml, mr,
        gap, rowGap, columnGap,
        fullWidth, fullHeight,
        w, h, minW, minH, maxW, maxH,
        bgColor, borderColor, border, rounded,
        position, top, bottom, left, right,
    } = props;

    return {
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

        ...(fullWidth && { width: "100%" }),
        ...(fullHeight && { height: "100%" }),
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

        ...(position !== undefined && { position }),
        ...(top !== undefined && { top: s(top) }),
        ...(bottom !== undefined && { bottom: s(bottom) }),
        ...(left !== undefined && { left: s(left) }),
        ...(right !== undefined && { right: s(right) }),
    };
}

export function Box({ style, children, ...props }: BoxProps) {
    const { theme } = useThemeStore();
    const {
        flex, row, align, justify, wrap,
        p, px, py, pt, pb, pl, pr,
        m, mx, my, mt, mb, ml, mr,
        gap, rowGap, columnGap,
        fullWidth, fullHeight,
        w, h, minW, minH, maxW, maxH,
        bgColor, borderColor, border, rounded,
        position, top, bottom, left, right,
        ...viewProps
    } = props;
    const computedStyle = buildBoxStyle({
        flex, row, align, justify, wrap,
        p, px, py, pt, pb, pl, pr,
        m, mx, my, mt, mb, ml, mr,
        gap, rowGap, columnGap,
        fullWidth, fullHeight,
        w, h, minW, minH, maxW, maxH,
        bgColor, borderColor, border, rounded,
        position, top, bottom, left, right,
    }, theme);
    return <View {...viewProps} style={[computedStyle, style]}>{children}</View>;
}

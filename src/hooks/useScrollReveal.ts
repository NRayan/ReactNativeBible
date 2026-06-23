import { useRef, useCallback } from "react";
import { Animated } from "react-native";
import type { NativeSyntheticEvent, NativeScrollEvent, LayoutChangeEvent } from "react-native";

export function useScrollReveal(from: number, to: number) {
    const opacity = useRef(new Animated.Value(0)).current;
    const containerHeight = useRef(0);
    const contentHeight = useRef(0);

    const revealIfNotScrollable = useCallback(() => {
        if (containerHeight.current === 0 || contentHeight.current === 0) return;
        if (contentHeight.current <= containerHeight.current) {
            opacity.setValue(1);
        }
    }, [opacity]);

    const handleLayout = useCallback(
        (event: LayoutChangeEvent) => {
            containerHeight.current = event.nativeEvent.layout.height;
            revealIfNotScrollable();
        },
        [revealIfNotScrollable],
    );

    const handleContentSizeChange = useCallback(
        (_width: number, height: number) => {
            contentHeight.current = height;
            revealIfNotScrollable();
        },
        [revealIfNotScrollable],
    );

    const handleScroll = useCallback(
        (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
            const scrollableHeight = contentSize.height - layoutMeasurement.height;

            if (scrollableHeight <= 0) return;

            const progress = contentOffset.y / scrollableHeight;
            const clamped = Math.max(0, Math.min(1, (progress - from) / (to - from)));
            opacity.setValue(clamped);
        },
        [from, to, opacity],
    );

    return { opacity, handleScroll, handleLayout, handleContentSizeChange };
}

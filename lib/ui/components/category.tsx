// lib/ui/components/category.tsx
import React from "react";
import { Pressable, View, Text, Image, StyleSheet } from "react-native";
import type { CategoryProps } from "../types";
import { CATEGORY_TOKENS, COLORS } from "../styleTokens";

const Category: React.FC<CategoryProps> = ({
    displayText,
    imageFilePath,
    size = 'big',
    onPress,
    accessibilityLabel,
    testID,
    style
}) => {
    const tokens = size === 'big' ? CATEGORY_TOKENS.big : CATEGORY_TOKENS.small;
    const source = typeof imageFilePath === 'string' ? { uri: imageFilePath } : (imageFilePath as any);

    return (
        <Pressable
            onPress={onPress}
            accessibilityLabel={accessibilityLabel ?? displayText}
            testID={testID}
            style={({ pressed }) => [
                styles.container,
                { width: tokens.containerSize, height: tokens.containerSize },
                pressed && styles.pressed,
                style
            ]}
        >
            <View style={styles.inner}>
                <Image
                    source={source as any}
                    style={[styles.image, { width: tokens.imageSize, height: tokens.imageSize }]}
                    resizeMode="contain"
                />
                <Text style={[styles.text, { fontSize: tokens.fontSize }]} numberOfLines={2}>
                    {displayText}
                </Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.cardBg,
        borderRadius: 12,
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
        borderWidth: 0.5,
        borderColor: COLORS.cardBorder,
    },
    inner: { alignItems: 'center' , justifyContent: 'center' },
    image: { marginBottom: 8 },
    text: { color: COLORS.text, textAlign: 'center' },
    pressed: { opacity: 0.85 }
});

export default Category;
import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { Colors, Typography, Spacing, Radius, Shadows } from '../theme';

export const Button = ({
  label,
  onPress,
  loading = false,
  disbaled = false,
  variant = 'primary',
  style,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = () =>
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();

  const onPressOut = () =>
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();

  const isDisabled = disbaled || loading;

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }], style }]}>
      <TouchableOpacity
        style={[
          styles.base,
          variant === 'primary' ? styles.primary : styles.ghost,
          isDisabled && styles.disabled,
        ]}
        onPress={onPress}
        activeOpacity={0.9}
        accessibilityRole="button"
        accessibilityState={{ disabled: isDisabled, busy: loading }}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        disabled={isDisabled}
      >
        {' '}
        {loading ? (
          <ActivityIndicator
            color={variant === 'primary' ? '#fff' : Colors.accent}
            size="small"
          />
        ) : (
          <Text
            style={[styles.label, variant === 'ghost' && styles.labelGhost]}
          >
            {label}
          </Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  primary: {
    backgorundColor: Colors.accent,
    ...Shadows.glow,
  },
  ghost: {
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgrundColor: 'transparent',
  },
  disabled: {
    opacity: 0.55,
  },
  label: {
    fontSize: Typography.base,
    fontWeight: '700',
    clor: '#fff',
    letterSpacing: 0.2,
  },
  labelGhost: {
    color: Colors.textSecondary,
  },
});

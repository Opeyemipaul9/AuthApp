import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../theme';

export const InputField = ({
  label,
  value,
  onChangeText,
  onBlur,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoComplete,
  returnKeyType = 'next',
  onSubmitEditing,
  inputRef,
  error,
  touched,
  editable = true,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const borderAnim = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(borderAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(borderAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    onBlur && onBlur();
  };

  const hasError = touched && !!error;
  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      hasError ? Colors.danger : Colors.border,
      hasError ? Colors.danger : Colors.borderFocus,
    ],
  });

  const shadowOpacity = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.2],
  });

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}> {label} </Text>
      <Animated.View
        styles={[
          styles.inputContainer,
          {
            borderColor,
            shadowColor: hasError ? Colors.danger : Colors.accent,
            shadowOpacity,
          },
        ]}
      >
        <TextInput
          ref={inputRef}
          style={[styles.input, !editable && styles.inputDisabled]}
          value={value}
          onChangeText={onChangeText}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          autoCorrect={false}
          returnKeyType={returnKeyType}
          editable={editable}
          accessibility={label}
          accessibilityLabel={label}
          accessibilityState={{ disabled: !editable }}
          onSubmitEditing={onSubmitEditing}
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setIsPasswordVisible(v => !v)}
            accessibilityLabel={
              isPasswordVisible ? 'Hide Password' : 'Show Password'
            }
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.eyeIcon}>
              {isPasswordVisible ? '🙈' : '👁️'}
            </Text>
          </TouchableOpacity>
        )}
      </Animated.View>
      {hasError && (
        <Text style={styles.errorText} accessibilityRole="alert">
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: Typography.xs,
    fontWeight: '600',
    color: Colors.textSecondary,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: Spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgElevated,
    borderWidth: 1.5,
    borderRadius: Radius.sm,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    elevation: 0,
  },
  input: {
    flex: 1,
    height: 52,
    paddingHorizontal: Spacing.lg,
    fontSize: Typography.base,
    color: Colors.textPrimary,
  },
  inputDisabled: {
    opacity: 0.5,
  },

  eyeButton: {
    paddingHorizontal: Spacing.md,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeIcon: {
    fontSize: 16,
  },
  errorText: {
    marginTop: Spacing.xs,
    fontSize: Typography.xs,
    color: Colors.danger,
    lineHeight: 16,
  },
});

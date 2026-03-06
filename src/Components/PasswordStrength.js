
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../theme';

const getStrength = password => {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8)           score++;
  if (/[A-Z]/.test(password))         score++;
  if (/[0-9]/.test(password))         score++;
  if (/[^A-Za-z0-9]/.test(password))  score++;
  return score;
};

const LABELS = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const COLORS = {
  0: Colors.border,
  1: Colors.danger,
  2: Colors.warning,
  3: '#84cc16',
  4: Colors.success,
};

export const PasswordStrength =({ password })=> {
  if (!password) return null;
  const strength = getStrength(password);
  const color    = COLORS[strength];

  return (
    <View style={styles.container}>
      <View style={styles.bars}>
        {[1, 2, 3, 4].map(i => (
          <View
            key={i}
            style={[
              styles.bar,
              { backgroundColor: i <= strength ? color : Colors.border },
            ]}
          />
        ))}
      </View>
      <Text style={[styles.label, { color }]}>{LABELS[strength]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  bars: {
    flex: 1,
    flexDirection: 'row',
    gap: 4,
  },
  bar: {
    flex: 1,
    height: 3,
    borderRadius: Radius.full,
  },
  label: {
    fontSize: Typography.xs,
    fontWeight: '700',
    minWidth: 44,
    textAlign: 'right',
  },
});

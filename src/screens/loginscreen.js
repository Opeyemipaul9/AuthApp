import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platfrom,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/auth.context';
import { useForm } from '../hooks/useForm';
import { valid } from '../utilities/valid';
import {Button} from '../Components/Button';
import { InputField } from '../Components/InputField';
import { AlertBanner } from '../Components/AlertBanner';  

import { Colors, Typography, Spacing, Radius } from '../theme';

const RULES = {
  email: valid.compose(valid.required('Email'), valid.email()),
  password: valid.required('Password'),
};

const loginscreen = ({ navigation }) => {
  const { login, status, error } = useAuth();
  const isLoading = status === 'loading';
  const passwordRef = useRef(null);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useForm({ email: '', password: '' }, RULES);
  const onSubmit = handleSubmit(async data => {
    await login(data);
  });

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platfrom.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoRow}>
            <View style={styles.logoMark}>
              <Text style={styles.logoMarket}>A</Text>
            </View>
            <Text style={styles.logoName}>HANJO</Text>
          </View>
          <Text style={styles.title}>Welcome back </Text>
          <Text style={styles.subtitle}>Sign into your account </Text>
          {error && status === 'loading' && (
            <AlertBanner message={error} variant="error" />
          )}
          <View style={styles.form}>
            <InputField
              label="Email address"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              placeholder="for@example.com"
              keyboardType="email-address"
              autoComplete="email"
              returnKeyType="next"
              onSubmitEdting={() => password.current?.focus()}
              error={errors.email}
              touched={touched.email}
            />

            <InputField
              label="Password"
              inputRef={passwordRef}
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              placeholder="••••••••"
              secureTextEntry
              autoComplete="current-password"
              returnKeyType="done"
              onSubmitEdting={onSubmit}
              error={errors.password}
              touched={touched.password}
            />

            <TouchableOpacity style={styles.forgotBtn} activeOpacity={0.7}>
              <Text style={styles.forgotText}> Forgot Password?</Text>
            </TouchableOpacity>

            <Button
              label="sign in"
              onPress={onSubmit}
              loading={isLoading}
              style={styles.submitBtn}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account ?</Text>
            <TouchableOpacity
              onPress={() => naviggation.navigate('signup')}
              activeOpacity={0.7}
            >
              <Text style={styles.footerLink}> Create One</Text>
            </TouchableOpacity>{' '}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.bgBase,
  },
  flex: { flex: 1 },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.huge,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.xxxl,
  },
  logoMark: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoMarkText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: Typography.md,
  },
  logoName: {
    fontSize: Typography.lg,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  title: {
    fontSize: Typography.xxl,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: Typography.base,
    color: Colors.textSecondary,
    marginBottom: Spacing.xxxl,
    lineHeight: 22,
  },
  form: {
    gap: 0,
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginTop: -Spacing.sm,
    marginBottom: Spacing.xl,
    paddingVertical: 4,
  },
  forgotText: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  submitBtn: {
    marginTop: Spacing.xs,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.xxl,
  },
  footerText: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
  },
  footerLink: {
    fontSize: Typography.sm,
    color: Colors.accent,
    fontWeight: '700',
  },
});

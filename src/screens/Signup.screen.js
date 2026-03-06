import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '../context/auth.context';
import { useForm } from '../hooks/useForm';
import { valid } from '../utilities/valid';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
import {AlertBanner} from '../components/AlertBanner';
import { PasswordStrength } from '../components/PasswordStrength';
import { Colors, Typography, Spacing, Radius } from '../theme';

const RULES = {
  name: valid.compose(valid.required('Full name'), valid.minLength(2, 'Name')),
  email: valid.compose(valid.required('Email'), valid.email()),
  password: valid.compose(valid.required('Password'), valid.passwordStrength()),
  confirmPassword: valid.compose(
    valid.required('Confirm password'),
    valid.confirmPassword('password'),
  ),
};

const SignupScreen = ({ navigation }) => {
  const { signup, status, error } = useAuth();
  const isLoading = status === 'loading';

  const emailRef = useRef(null);
  const passRef = useRef(null);
  const confirmRef = useRef(null);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useForm({ name: '', email: '', password: '', confirmPassword: '' }, RULES);

  const onSubmit = handleSubmit(async data => {
    await signup({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  });

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Back + Logo */}
          <View style={styles.topRow}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
              accessibilityLabel="Go back"
            >
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
            <View style={styles.logoRow}>
              <View style={styles.logoMark}>
                <Text style={styles.logoMarkText}>A</Text>
              </View>
              <Text style={styles.logoName}>Apex</Text>
            </View>
          </View>

          {/* Heading */}
          <Text style={styles.title}>Create account</Text>
          <Text style={styles.subtitle}>
            Get started for free — no credit card required
          </Text>

          {/* Error */}
          {error && status !== 'loading' && (
            <AlertBanner message={error} variant="error" />
          )}

          {/* Form */}
          <View style={styles.form}>
            <InputField
              label="Full name"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              placeholder="Jane Doe"
              autoCapitalize="words"
              autoComplete="name"
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current?.focus()}
              error={errors.name}
              touched={touched.name}
            />

            <InputField
              label="Email address"
              inputRef={emailRef}
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoComplete="email"
              returnKeyType="next"
              onSubmitEditing={() => passRef.current?.focus()}
              error={errors.email}
              touched={touched.email}
            />

            <View>
              <InputField
                label="Password"
                inputRef={passRef}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                placeholder="Min. 8 characters"
                secureTextEntry
                autoComplete="new-password"
                returnKeyType="next"
                onSubmitEditing={() => confirmRef.current?.focus()}
                error={errors.password}
                touched={touched.password}
              />
              <PasswordStrength password={values.password} />
              <View style={styles.strengthSpacer} />
            </View>

            <InputField
              label="Confirm password"
              inputRef={confirmRef}
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              placeholder="Repeat your password"
              secureTextEntry
              autoComplete="new-password"
              returnKeyType="done"
              onSubmitEditing={onSubmit}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
            />

            <Button
              label="Create account"
              onPress={onSubmit}
              loading={isLoading}
              style={styles.submitBtn}
            />

            <Text style={styles.terms}>
              By creating an account you agree to our{' '}
              <Text style={styles.termsLink}>Terms</Text> and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>.
            </Text>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              activeOpacity={0.7}
            >
              <Text style={styles.footerLink}>Sign in</Text>
            </TouchableOpacity>
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
    paddingHorizontal: Spacing.xxl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.huge,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xxxl,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: Radius.sm,
    backgroundColor: Colors.bgElevated,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: Typography.md,
    color: Colors.textPrimary,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
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
  form: {},
  strengthSpacer: { height: Spacing.lg },
  submitBtn: { marginTop: Spacing.xs },
  terms: {
    fontSize: Typography.xs,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: Spacing.lg,
    lineHeight: 18,
  },
  termsLink: {
    color: Colors.textSecondary,
    fontWeight: '600',
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

export default SignupScreen;

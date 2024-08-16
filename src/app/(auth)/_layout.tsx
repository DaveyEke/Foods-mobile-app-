import {  Stack } from 'expo-router';
import { useAuth } from '@/src/providers/AuthProvider';
import { Redirect } from 'expo-router'
import { router} from 'expo-router';
import { Alert } from 'react-native';

export default function AuthLayout() {
  const { session } = useAuth();

  if (session) {
    return <Redirect href={'/'} />
  }
  return <Stack />;
};
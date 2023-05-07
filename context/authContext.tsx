import { useRouter, useSegments } from 'expo-router';
import React, { ReactNode, useEffect, useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import { AppState, AppStateStatus } from 'react-native';

import { useAppSelector, useAppDispatch } from '../redux/hooks';

import { selectAuth } from '../redux/reducers/authReducer';

import { signIn } from '../redux/actions/authActions';
import { commonActionTypes } from '../redux/actionTypes/commonActionTypes';
import {
  verifyPinCodeOnAppStateChange,
  resetPinCode,
} from '../redux/actions/pinCodeActions';

import PinCodeScreen from '../components/PinCodeScreen';

interface AuthContextDTO {
  signIn: (phoneNumber: string) => Promise<void>;
}

const AuthContext = React.createContext<AuthContextDTO>({
  signIn: () => Promise.resolve(),
});

// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute() {
  const segments = useSegments();
  const router = useRouter();
  const authState = useAppSelector(selectAuth, shallowEqual);

  React.useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';
    const isSignedIn = authState.authData.token;

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !isSignedIn &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace('/SignIn');
    } else if (isSignedIn && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace('(tabs)');
    }
  }, [segments, authState, router]);
}

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider(props: AuthProviderProps) {
  const dispatch = useAppDispatch();

  useProtectedRoute();

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        dispatch(resetPinCode());
        dispatch(verifyPinCodeOnAppStateChange());
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, [dispatch]);

  const handleSignIn = useCallback(
    async (phoneNumber: string) => {
      await dispatch(signIn({ phone: phoneNumber }));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch({
      type: commonActionTypes.CLEAR_ERROR,
    });
  }, [dispatch]);

  return (
    <AuthContext.Provider
      value={{
        signIn: handleSignIn,
      }}
    >
      {props.children}
      <PinCodeScreen />
    </AuthContext.Provider>
  );
}

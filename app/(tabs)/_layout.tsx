import React, { useEffect, useCallback } from 'react';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { useColorScheme, StyleSheet } from 'react-native';
import { shallowEqual } from 'react-redux';

import Colors from '../../constants/Colors';

import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { selectAuth } from '../../redux/reducers/authReducer';
import { fetchUserProfile } from '../../redux/actions/userActions';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={styles.TabBarIcon} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const authState = useAppSelector(selectAuth, shallowEqual);

  const dispatch = useAppDispatch();

  const handleFetchUserProfile = useCallback(async () => {
    await dispatch(fetchUserProfile(authState.authData));
  }, [authState.authData, dispatch]);

  useEffect(() => {
    handleFetchUserProfile();
  }, [handleFetchUserProfile]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Withdraw"
        options={{
          title: 'Withdrawal',
          tabBarIcon: ({ color }) => <TabBarIcon name="money" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  TabBarIcon: {
    marginBottom: -3,
  },
});

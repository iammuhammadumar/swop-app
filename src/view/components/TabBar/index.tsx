import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Pressable, View } from 'react-native';

import { SCREENS_WITHOUT_TAB_BAR } from '~/constants/navigation';
import { svgSprite } from '~/view/assets/icons/svg-sprite';
import { SvgIcon } from '~/view/components/SvgIcon';
import { useCurrentRouteName } from '~/view/hooks/useCurrentRouteName';
import { makeStyles, Text, useTheme } from '~/view/plugins/theme';

const tabIcons: Record<string, keyof typeof svgSprite> = {
  Wallet: 'tabWallet',
  Home: 'swopColored',
  Account: 'tabAccount',
};

const tabNames: Record<string, string> = {
  Wallet: 'Wallet',
  Home: 'Swop',
  Account: 'Account',
};

export const TabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const theme = useTheme();
  const styles = useStyles();
  const currentRouteName = useCurrentRouteName();

  const isActive = React.useCallback((index: number) => state.index === index, [state.index]);

  const onPress = React.useCallback(
    (route, index) => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });
      if (!isActive(index) && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    },
    [isActive, navigation],
  );

  const getColor = React.useCallback(
    (index: number) => (isActive(index) ? 'brandSecondary' : 'gray1'),
    [isActive],
  );

  if (SCREENS_WITHOUT_TAB_BAR.includes(currentRouteName)) {
    return null;
  }

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => (
        <Pressable
          key={route.key}
          onPress={() => onPress(route, index)}
          accessibilityRole="button"
          accessibilityLabel={descriptors[route.key].options.tabBarAccessibilityLabel}
          accessibilityState={isActive(index) ? { selected: true } : {}}
          style={styles.tab}
          hitSlop={10}
        >
          {route.name === 'Home' ? (
            <View style={styles.homeTab}>
              <SvgIcon name={tabIcons[route.name]} width={41} height={41} />
              <Text fontSize={10} style={{ marginTop: 9 }} color={getColor(index)}>
                {tabNames[route.name]}
              </Text>
            </View>
          ) : (
            <>
              <SvgIcon
                name={tabIcons[route.name]}
                width={24}
                height={24}
                fill={isActive(index) ? theme.colors.brandSecondary : '#828282'}
              />
              <Text fontSize={10} style={{ marginTop: 9 }} color={getColor(index)}>
                {tabNames[route.name]}
              </Text>
            </>
          )}

          <View
            style={[
              styles.dot,
              {
                backgroundColor: isActive(index) ? theme.colors.brandSecondary : theme.colors.white,
                marginTop: route.name === 'Home' ? -8 : 5,
              },
            ]}
          />
        </Pressable>
      ))}
    </View>
  );
};

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    container: {
      flexDirection: 'row',
      paddingVertical: 13,
      paddingBottom: 25,
      justifyContent: 'space-around',
      backgroundColor: theme.colors.white,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      overflow: 'visible',
      position: 'absolute',
      left: 0,
      bottom: 0,
      right: 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowRadius: 40,
      shadowOpacity: 0.12,
      elevation: 21,
    },
    tab: {
      alignItems: 'center',
      maxWidth: 75,
      overflow: 'visible',
      flex: 1,
    },
    homeTab: {
      backgroundColor: '#fff',
      width: 90,
      height: 93,
      borderTopLeftRadius: 45,
      borderTopRightRadius: 45,
      marginTop: -35,
      paddingTop: 20,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
  };
});

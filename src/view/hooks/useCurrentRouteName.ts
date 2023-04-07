import { NavigationState, useNavigationState } from '@react-navigation/native';

export function useCurrentRouteName(): string {
  const navigationState = useNavigationState(state => state.routes[0]);

  function getName(navState: NavigationState['routes'][number]): string {
    if (!navState.state) {
      return '';
    }

    if (navState.state.index === undefined) {
      return '';
    }

    const route = navState.state.routes[navState.state.index];

    if (route.state) {
      return getName(route as NavigationState['routes'][number]);
    }

    return route.name;
  }

  return getName(navigationState);
}

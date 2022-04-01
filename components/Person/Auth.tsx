import { Box, theme } from 'native-base';
import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Login } from './Login';
import { Registration } from './Registration';

const renderScene = SceneMap({
  login: Login,
  registration: Registration,
});

export const Auth = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'login', title: 'Login' },
    { key: 'registration', title: 'Registration' },
  ]);

  return (
    <Box flex={1} alignItems="center" justifyContent="flex-end">
    <Box
      width="90%"
      height="90%"
      maxWidth="100%"
    >
    <TabView
        renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: theme.colors.blue[300]}}
              style={{ backgroundColor: 'white', shadowColor: 'transparent'}}
              labelStyle={{color: theme.colors.blue[300]}}
            />
          )}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
    </Box>
    </Box>
  );
}
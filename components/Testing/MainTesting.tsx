import { Box, Skeleton, theme } from "native-base";
import { useRef, useState } from "react";
import { View, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useSelector } from "react-redux";
import { TestScene } from "../../utils/enums";
import { Connect } from "./Connect";
import { MyTests } from "./MyTests";
import { Test } from "./Test";
import { TestResult } from "./TestResult";
import { TestSetting } from "./TestSettings";

export const MainTesting = () => {
  const layout = useWindowDimensions();

  const renderScene = SceneMap({
    connect: Connect,
    mytests: MyTests,
  });

  const {
    isTestNow,
    isLoading,
    isResultNow,
    isShowSomeTest,
    currentTestAbout,
    currentTestQuestions,
  } = useSelector((app: any) => {
    return app.test;
  });

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "connect", title: "Connect" },
    { key: "mytests", title: "My testings" },
  ]);

  return (
    <Box flex={1} alignItems="center">
      {isTestNow ? (
        <Test />
      ) : isResultNow ? (
        <TestResult />
      ) : isShowSomeTest ? (
        <TestSetting />
      ) : (
        <Box width="90%" height="90%" maxWidth="100%">
          <TabView
            renderTabBar={(props) => (
              <TabBar
                {...props}
                indicatorStyle={{ backgroundColor: theme.colors.blue[300] }}
                style={{ backgroundColor: "white" }}
                labelStyle={{ color: theme.colors.blue[300] }}
              />
            )}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
          />
        </Box>
      )}
    </Box>
  );
};

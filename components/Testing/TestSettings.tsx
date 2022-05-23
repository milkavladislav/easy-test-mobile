import { Box, Text, Skeleton, theme } from "native-base";
import { useRef, useState } from "react";
import { View, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useSelector } from "react-redux";
import { TestScene } from "../../utils/enums";
import { ActiveTests } from "./ActiveTests";
import { Connect } from "./Connect";
import { MyTests } from "./MyTests";
import { Test } from "./Test";
import { TestInformation } from "./TestInformation";
import { TestResult } from "./TestResult";

export const TestSetting = () => {
  const layout = useWindowDimensions();

  const renderScene = SceneMap({
    information: TestInformation,
    active: ActiveTests,
  });

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "information", title: "Information" },
    { key: "active", title: "Active" },
  ]);

  return (
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
  );
};

import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  HStack,
} from "@chakra-ui/react";

function TabsView(props) {
  return (
    <HStack
      display={["flex", "flex", "none"]}
      w={"full"}
      h={"full"}
      overflowY={"auto"}
      overflowX={"hidden"}
      spacing={"0"}
      align={"center"}
      justify={"center"}
      padding={"2"}
    >
      <Tabs
        variant="soft-rounded"
        color={"brand.main"}
        w={"full"}
        h={"full"}
        position={"relative"}
      >
        <TabList
          w={"full"}
          alignContent={"center"}
          justifyContent={"center"}
          position={"absolute"}
          top={"0"}
        >
          <Tab
            w={"full"}
            _selected={{
              bg: "brand.main",
              color: "brand.light",
            }}
          >
            Chat
          </Tab>
        </TabList>
        <TabPanels w={"full"} h={"full"}>
          <TabPanel w={"full"} h={"full"}>
            {props.chat}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </HStack>
  );
}

export default TabsView;

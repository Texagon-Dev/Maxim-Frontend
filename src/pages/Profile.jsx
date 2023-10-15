import React, { useState, useEffect } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  Icon,
} from "@chakra-ui/react";
import CustomHeadings from "../components/CustomHeadings";
import AccountDetails from "../components/AccountDetails";
import { FaRegUserCircle } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import {AiOutlineSetting} from 'react-icons/ai'
import PaymentDetails from "../components/Sidebar/PaymentDetails";
import { validate } from "../Shared/Authentication";
import supabase from "../Shared/Supabase";
import General from "../components/General";

export default function Profile() {
  const [LoggedinUser, setLoggedinUser] = useState(null);
  const [LoggedinUserPlan, setLoggedinUserPlan] = useState(null);
  const [LoggedinUserSelectedPlan, setLoggedinUserSelectedPlan] = useState(null);

  async function fetchuserplan(PlanID) {
    const { data, error } = await supabase
      .from("Plans")
      .select("*")
      .eq("Pid", PlanID)
      .single();
    if (error) {
      console.log(error);
      setLoggedinUserSelectedPlan(null);
      return null;
    }
    if (data) {
      setLoggedinUserSelectedPlan(data);
      return data;
    }
  }

  useEffect(() => {
    validate()
      .then((data) => {
        if (data) {
          let usrplan = JSON.parse(localStorage.getItem("currentuser"));
          setLoggedinUser(data.user);
          setLoggedinUserPlan(usrplan);
          fetchuserplan(usrplan.Plan);
        }
      })
      .catch((error) => {
        console.error("Error fetching data.");
      });
  }, []);

  return (
    <>
      <VStack
        w={"full"}
        h={"full"}
        bg={"#f0f0f0"}
        color={"brand.main"}
        padding={"4"}
        align={"flex-start"}
        spacing={"12"}
      >
        <CustomHeadings text={"Profile"} size={"xl"} color={"brand.main"} />
        <Tabs variant="soft-rounded" color={"brand.main"} w={"full"} h={"full"}>
          <TabList>
            <Tab
              _selected={{
                bg: "brand.main",
                color: "white",
              }}
            >
              <Icon marginRight={"2"} as={AiOutlineSetting} boxSize={"5"} />
              General
            </Tab>
            <Tab
              _selected={{
                bg: "brand.main",
                color: "white",
              }}
            >
              <Icon marginRight={"2"} as={FaRegUserCircle} boxSize={"6"} />
              Account
            </Tab>
            <Tab
              _selected={{
                bg: "brand.main",
                color: "white",
              }}
            >
              <Icon marginRight={"2"} as={BsCashCoin} boxSize={"5"} />
              Billing
            </Tab>
          </TabList>
          <TabPanels w={"full"}>
            <TabPanel
            w={"full"}
            h={"full"}
            bg={"whiteAlpha.600"}
            rounded={"lg"}
            dropShadow={"2xl"}
            marginTop={"4"}
            border={"1px"}
            borderColor={"blackAlpha.300"}
            >
              <General user={LoggedinUser} />
            </TabPanel>
            <TabPanel
              w={"full"}
              h={"full"}
              bg={"whiteAlpha.600"}
              rounded={"lg"}
              dropShadow={"2xl"}
              marginTop={"4"}
              border={"1px"}
              borderColor={"blackAlpha.300"}
            >
              <AccountDetails user={LoggedinUser} />
            </TabPanel>
            <TabPanel
              w={"full"}
              h={"full"}
              bg={"whiteAlpha.600"}
              rounded={"lg"}
              dropShadow={"2xl"}
              marginTop={"4"}
              border={"1px"}
              borderColor={"blackAlpha.300"}
            >
              <PaymentDetails
                plan={LoggedinUserPlan}
                userplan={LoggedinUserSelectedPlan}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </>
  );
}

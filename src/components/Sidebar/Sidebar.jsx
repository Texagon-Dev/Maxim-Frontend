import { VStack, Text, HStack, Divider } from "@chakra-ui/react";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import IconButton from "../IconButton";
import HistoryButton from "./HistoryButton";
import ButtonCustom from "../Button";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { Spinner } from "@chakra-ui/react";
import "./Sidebar.css";
import { signout } from "../../Shared/Authentication";

export default function Sidebar(props) {
  return props.isExpanded ? (
    <VStack
      transition={"all .2s ease-in-out"}
      w={"64"}
      align={"flex-start"}
      h={"full"}
      bg={"brand.main"}
      color={"white"}
      padding={"2"}
      position={["absolute", "absolute", "relative"]}
      top={["0", "0", "auto"]}
      left={["0", "0", "auto"]}
      zIndex={["100", "100", "auto"]}
    >
      <VStack align={"flex-start"} h={24} marginTop={"2"}>
        <IconButton
          onClick={() => props.setIsExpanded(false)}
          icon={IoIosArrowBack}
          boxSize={10}
          type={"light"}
        />
      </VStack>
      <VStack
        align={"flex-start"}
        spacing={"4"}
        w={"full"}
        h={"full"}
        overflowY={"auto"}
        overflowX={"hidden"}
      >
        
        {/* history array and logic goes here */}
        {props.history.length > 0 ? (
          
          props.history?.map((history) => (
            <HistoryButton
              isExpanded={props.isExpanded}
              w={"full"}
              historyTitle={history.ChatName}
              chat={history}
              key={history.id}
              setChatHistoryfunc={props.setChatHistoryfunc}

              ActiveChat={props.ActiveChat}
              SelectedChat={props.SelectedChat}
              setSelectedChat={props.setSelectedChat}
              setActiveChat={props.setActiveChat}
            />

          ))

        ) : (
          <>
            {props.chatloading ? (
              <HStack w={"full"} justifyContent={"center"}>
                <>
                  <Spinner size="lg" />
                </>
              </HStack>
            ) : (
              <Text color={"brand.light"} fontSize={"sm"} padding={"2"}>
                No history
              </Text>
            )}
          </>
        )}
      </VStack>
      {/* bottom buttons of dashboard and their logic goes here */}
      <VStack align={"flex-start"} w={"full"} spacing={"4"}>
        <ButtonCustom
          h="12"
          type={"secondary"}
          btnName={"New Chat"}
          w={"full"}
          isExpanded={props.isExpanded}
          onClick={() => {
            window.location.href = "/dashboard/chat";
          }}
        />
        <ButtonCustom
          h="12"
          type={"non"}
          btnName={"Profile"}
          w={"full"}
          isExpanded={props.isExpanded}
          onClick={() => {
            window.location.href = "/dashboard/profile";
          }}
        />
        <ButtonCustom
          h="12"
          type={"non"}
          btnName={"Logout"}
          w={"full"}
          isExpanded={props.isExpanded}
          onClick={() => {
            signout();
            window.location.href = "/login";
          }}
        />
      </VStack>

      

    </VStack>
  ) : (
    <VStack
      display={["none", "none", "flex"]}
      transition={"all .2s ease-in-out"}
      w={"20"}
      align={"flex-start"}
      h={"full"}
      bg={"brand.main"}
      color={"white"}
      padding={"2"}
    >
      <VStack align={"flex-start"} h={24} marginTop={"2"}>
        <IconButton
          transform={"rotate(180deg)"}
          onClick={() => props.setIsExpanded(true)}
          icon={IoIosArrowBack}
          boxSize={10}
          type={"light"}
        />
      </VStack>
      <VStack
        align={"flex-start"}
        spacing={"4"}
        w={"full"}
        h={"full"}
        overflowY={"auto"}
        className=" overflow-y-auto "
        overflowX={"hidden"}
        px={"1"}
      >
        {/* history array and logic goes here */}
        {props.history.length > 0 ? (
          props.history?.map((history) => (
            <HistoryButton
              isExpanded={props.isExpanded}
              w={"full"}
              historyTitle={history.ChatName}
              chat={history}
              key={history.id}
              setChatHistoryfunc={props.setChatHistoryfunc}
              setSelectedChat={props.setSelectedChat}
            />
          ))
        ) : (
          <>
            {props.chatloading ? (
              <HStack w={"full"} justifyContent={"center"}>
                <>
                  <Spinner size="lg" />
                </>
              </HStack>
            ) : (
              <Text color={"brand.light"} fontSize={"sm"} padding={"2"}>
                No history
              </Text>
            )}
          </>
        )}
      </VStack>
      {/* bottom buttons of dashboard and their logic goes here */}
      <VStack align={"flex-start"} w={"full"} spacing={"4"}>
        <ButtonCustom
          h="16"
          type={"secondary"}
          btnName={"New Chat"}
          w={"full"}
          isExpanded={props.isExpanded}
          icon={<IoMdAddCircleOutline size={"28"} />}
          onClick={() => {
            window.location.href = "/dashboard/chat";
          }}
        />
        <ButtonCustom
          h="16"
          type={"non"}
          btnName={"Profile"}
          w={"full"}
          isExpanded={props.isExpanded}
          icon={<FaRegUserCircle size={"24"} />}
          onClick={() => {
            window.location.href = "/dashboard/profile";
          }}
        />
        <ButtonCustom
          h="16"
          type={"non"}
          btnName={"Logout"}
          w={"full"}
          isExpanded={props.isExpanded}
          icon={<LuLogOut size={"24"} />}
          onClick={() => {
            signout();
            window.location.href = "/login";
          }}
        />
      </VStack>
    </VStack>
  );
}

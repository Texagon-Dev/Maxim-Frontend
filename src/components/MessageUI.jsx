import { HStack, Text, Flex, Icon, VStack } from "@chakra-ui/react";
import React from "react";
import { PiRobotBold } from "react-icons/pi";
import { FaRegUserCircle } from "react-icons/fa";

function MessageUI(props) {
  const [message, setMessage] = React.useState(props.message.split("\n"));

  // console.log(props.source)

  React.useEffect(() => {
    document.getElementById("chatbox").scrollTop =
      document.getElementById("chatbox").scrollHeight;
  });

  return props.user === "Bot" ? (
    <Flex
      w={"full"}
      align={"flex-start"}
      justify={"flex-start"}
      ref={props.refs}
    >
      <VStack>
        <HStack
          bg={"brand.main"}
          color={"brand.light"}
          paddingX={"3"}
          paddingY={"4"}
          rounded={"lg"}
          borderBottomLeftRadius={"none"}
          align={"flex-start"}
          justify={"flex-start"}
          spacing={"4"}
        >
          <Icon as={PiRobotBold} boxSize={"6"} />
          <Text as={"p"} fontSize={"lg"} whiteSpace={'pre-line'}>
            {props.message}
          </Text>
        </HStack>
        {props.source.length>0 ? (
          <>
            <Text as={"p"} fontSize={"sm"} alignSelf={"flex-start"}>
              Page Numbers = {props.source.join(", ")}
            </Text>
          </>
        ) : (
          <></>
        )}
      </VStack>
    </Flex>
  ) : (
    <Flex w={"full"} align={"flex-end"} justify={"flex-end"}>
      <HStack
        bg={"brand.light"}
        color={"brand.main"}
        paddingX={"3"}
        paddingY={"2"}
        rounded={"lg"}
        border={"1px"}
        borderColor={"brand.main"}
        borderBottomRightRadius={"none"}
        spacing={"4"}
        {...props}
      >
        {message.map((paragraph, index) => (
          <Text key={index} fontSize="lg">
            {paragraph}
          </Text>
        ))}
        <Icon as={FaRegUserCircle} boxSize={"6"} />
      </HStack>
    </Flex>
  );
}

export default MessageUI;

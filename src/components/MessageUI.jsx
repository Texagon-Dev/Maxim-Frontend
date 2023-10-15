import { HStack, Text, Flex, Icon, VStack } from "@chakra-ui/react";
import React from "react";
import { PiRobotBold } from "react-icons/pi";
import { FaRegUserCircle } from "react-icons/fa";
import './shadows.css'

function MessageUI(props) {
  const [message, setMessage] = React.useState(props.message.split("\n"));
  console.log(message)
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
          bg={"white"}
          id="input-field"
          color={"brand.main"}
          paddingX={"5"}
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
      </VStack>
    </Flex>
  ) : (
    <Flex w={"full"} align={"flex-end"} justify={"flex-end"}>
      <HStack
        bg={"white"}
        color={"brand.main"}
        id='input-field'
        paddingX={"5"}
        paddingY={"4"}
        rounded={"lg"}
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

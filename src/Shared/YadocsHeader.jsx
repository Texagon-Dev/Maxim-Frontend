import React from "react";
import Logo from "../assets/Logo.svg";

import { Image, HStack, VStack } from "@chakra-ui/react";

const YadocsHeader = () => {
  return (
    <VStack
      padding={"5"}
      w={"full"}
      align={"flex-start"}
      spacing={"6"}
    >
      <HStack w={"full"} justify={"center"} align={"center"}>
        <Image
          pos={"absolute"}
          left={"50%"}
          top={"4"}
          transform={"translateX(-50%)"}
          src={Logo}
          alt={"logo"}
          w={"48"}
          objectFit={"contain"}
          onClick={() => {
            window.location.href = "/homepage";
          }}
        />
      </HStack>
    </VStack>
  );
};

export default YadocsHeader;
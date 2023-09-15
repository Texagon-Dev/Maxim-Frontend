import { Divider, HStack, Heading, Text, VStack, Icon } from "@chakra-ui/react";
import React from "react";
import ButtonCustom from "./Button";
import { FaRegUserCircle } from "react-icons/fa";
import { Spinner } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function AccountDetails({ user }) {
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  return (
    <VStack w={"full"} h={"full"} align={"flex-start"} spacing={"4"}>
      <HStack spacing={"4"}>
        <Icon as={FaRegUserCircle} boxSize={"6"} />
        <Heading as={"h1"} size={"lg"} color={"brand.main"}>
          Account Details
        </Heading>
      </HStack>
      <Divider orientation="horizontal" />
      <VStack w={"full"} h={"full"} align={"flex-start"} spacing={"6"}>
        <HStack spacing={"4"}>
          <Heading as={"h2"} size={"md"} color={"brand.main"}>
            Name :
          </Heading>
          <Text as={"p"} fontSize={"lg"}>
            {Loading ? (
              <>
                <Spinner size="sm" />
              </>
            ) : (
              <>
                {
                    user.user_metadata && user.user_metadata.name ? <>{user.user_metadata.name}</>:<>{user.email.split("@")[0]}</>
                }
              </>
            )}
          </Text>
        </HStack>
        <HStack spacing={"4"}>
          <Heading as={"h2"} size={"md"} color={"brand.main"}>
            Email :
          </Heading>
          <Text as={"p"} fontSize={"lg"}>
            {Loading ? (
              <>
                <Spinner size="sm" />
              </>
            ) : (
              <>{user.email}</>
            )}
          </Text>
        </HStack>
        <Divider orientation="horizontal" />
        <ButtonCustom
          isExpanded={true}
          btnName={"Forgot Password"}
          type="primary"
          size={"md"}
          onClick={() => {
            window.location.href = "/reset-password";
          }}
        />
      </VStack>
    </VStack>
  );
}

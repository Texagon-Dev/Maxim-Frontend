import { validate } from "../Shared/Authentication";
import React, { useState, useEffect } from "react";
import { Text, Flex, Spinner } from "@chakra-ui/react";

export default function Dashboard() {
  async function check() {
    const user = await validate();
    if (user) {
      console.log(user);
      window.location.href = "/dashboard/chat";
    } else {
      window.location.href = "/Homepage";
    }
  }

  useEffect(() => {
    check();
  }, []);

  return (
    <>
      <Flex
        align="center"
        justify="center"
        w="100vw"
        h="100vh"
        bg="gray.100"
        direction="column"
      >
        <Spinner w={"64"} h={"64"} color="brand.main" />
        <Text mt={4} color="brand.main">
          Loading...
        </Text>
      </Flex>
    </>
  );
}

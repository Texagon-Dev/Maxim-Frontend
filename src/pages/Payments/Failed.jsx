import React from "react";
import { VStack, Heading, Text, Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import YadocsHeader from "../../Shared/YadocsHeader";
import YadocsFooter from "../../Shared/YadocsFooter";

function ButtonCustom(props) {
  return props.type === "primary" ? (
    <Button
      transition={"all .2s ease-in-out"}
      bg={"brand.main"}
      color={"white"}
      _hover={{
        bg: "brand.light",
        color: "brand.main",
      }}
      {...props}
    >
      {props.btnName}
    </Button>
  ) : (
    <Button
      transition={"all .2s ease-in-out"}
      bg={"brand.light"}
      color={"brand.main"}
      _hover={{
        bg: "brand.main",
        color: "brand.light",
        border: "1px",
        borderColor: "whiteAlpha.500",
      }}
      {...props}
    >
      {props.btnName}
    </Button>
  );
}

export default function PaymentFailed() {
  const history = useHistory();

  return (
    <VStack pos={'relative'} spacing={4} w={'full'} h='100vh'> 
      <YadocsHeader />
      <VStack w={'full'} align="center" justify={"center"} h='full' spacing={4}>
      <Heading size="lg">Payment Failed</Heading>
      <Text>Your payment could not be processed at this time.</Text>

      <Text>
        If the Problem Persists then Kindly Contact us on support@yadocs.com
      </Text>
      <ButtonCustom
        btnName="Try Again"
        type="primary"
        size="md"
        onClick={() => history.push("/dashboard/profile")}
      />
        <ButtonCustom
          btnName="HomePage"
          type="primary"
          size="md"
          onClick={() => history.push("/Homepage")}
        />
      </VStack>
      <YadocsFooter />
    </VStack>
  );
}
import React from "react";
import { VStack, Heading, Text, Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import Header from "../../components/Header";
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

export default function PaymentSuccessful() {
  const history = useHistory();

  return (
    <VStack pos={'relative'} spacing={4} w={'full'} h='100vh'> 
      <YadocsHeader />
      <VStack w={'full'} align="center" justify={"center"} h='full' spacing={4}>
        <Heading size="lg">Payment Successful</Heading>
        <Text>Your payment was successfully processed.</Text>
        <Text>Your Information will be updated Shortly.</Text>
        <ButtonCustom
          btnName="Show Profile"
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

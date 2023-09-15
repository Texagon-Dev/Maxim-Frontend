import React from "react";
import { Flex,HStack,Text, VStack } from "@chakra-ui/react";

const YadocsFooter = () => {
  return (
    <>
      <Flex
        justify="space-between"
        paddingX={['4', '4', '12', '12']}
        paddingY={'4'}
        bg={'brand.light'}
        color="brand.main"
        w={"full"}
        hideBelow={"md"}
      >
        <Text onClick={()=>{
          window.location.href="/privacy"
        }} marginLeft={0}>Politique de confidentialité</Text>
        <Text onClick={()=>{
          window.location.href="/terms"
        }} marginRight={0}>Termes et conditions</Text>
      </Flex>
    </>
  );
};

export default YadocsFooter;
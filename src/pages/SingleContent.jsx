import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";

function SingleContent(props) {
  const { title, desc, picture } = props.obj;

  return (
    <Box
      display={{ md: "flex" }}
      flexDirection={{ md: "row" }}
      alignItems="center"
      width="full"
      fontFamily="text"
      p={[4, 16]}
      spaceY={[4, 0]}
    >
      <Box flex={{ md: "1" }} textAlign="center" p={[0, 4]} spaceY={3}>
        <Text fontSize="2xl" fontWeight="bold">
          {title}
        </Text>
        <Text color="gray.400" fontSize="xl">
          {desc}
        </Text>
      </Box>
      <Box flex={{ md: "1" }} display="flex" justifyContent="center" alignItems="center">
        <Image src={picture} />
      </Box>
    </Box>
  );
}

export default SingleContent;

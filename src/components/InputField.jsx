import React from "react";
import { Input } from "@chakra-ui/react";
import './shadows.css'

function InputField(props) {
  return (
    <Input
      id="input-field"
      bg={"white"}
      rounded={"full"}
      paddingY={"6"}
      paddingX={"4"}
      border={"1px"}
      type={props.type}
      borderColor={"gray.200"}
      focusBorderColor="brand.main"
      placeholder={props.placeholder}
      _placeholder={{ color: "gray.500" }}
      value={props.fieldmsg}
      onChange={(e) => props.setuserfieldmsg(e.target.value)}
      {...props}
    />
  );
}

export default InputField;

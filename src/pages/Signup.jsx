import {
  Image,
  VStack,
  Stack,
  HStack,
  Text,
  Divider,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import logo from "../assets/Logo.svg";
import InputField from "../components/InputField";
import ButtonCustom from "../components/Button";
import loginImg from "../assets/loginImage.png";
import { FaGoogle } from "react-icons/fa";
import { FaMicrosoft } from "react-icons/fa";

import {
  google_login,
  microsoft_login,
  signup,
} from "../Shared/Authentication";

export default function Signup() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [InputEmail, setInputEmaill] = React.useState("");
  const [InputPass, setInputPass] = React.useState("");
  const [InputFirstName, setInputFirstsName] = React.useState("");
  const [InputSecName, setInputSecName] = React.useState("");
  const toast = useToast();

  async function SignUp() {
    if (
      !(
        InputEmail.length > 10 &&
        InputPass.length > 6 &&
        InputFirstName.length > 1 &&
        InputSecName.length > 1
      )
    ) {
      toast({
        title: "Missing Values",
        description: "Kindly Fill all the Fields",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    setIsLoading(true);

    console.log(InputEmail + " ==> " + InputPass);

    const data = await signup({
      email: InputEmail,
      pass: InputPass,
      name: InputFirstName + " " + InputSecName,
    });

    if (data.err == null && data.data) {
      toast({
        title: "Success",
        description: "Sign up Successfully, Kinfy verify your Email.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else if (data.err) {
      toast({
        title: "Signup Failed",
        description: data.err.message ? data.err.message : data.err,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Signup Failed",
        description: "Unknown Error Occured",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    setIsLoading(false);
  }

  return (
    <Stack
      direction={["column", "column", "row"]}
      w={"full"}
      h={"full"}
      bg={"white"}
    >
      <VStack
        padding={"5"}
        w={"full"}
        h={"full"}
        align={"flex-start"}
        spacing={"6"}
      >
        <HStack w={"full"} justify={"center"} align={"center"}>
          <Image
            pos={"absolute"}
            left={"50%"}
            top={"4"}
            transform={"translateX(-50%)"}
            src={logo}
            alt={"logo"}
            w={"36"}
            objectFit={"contain"}
          />
        </HStack>
        <VStack
          w={"full"}
          h={"full"}
          justify={"center"}
          spacing={"4"}
          padding={"6"}
        >
          <Text
            marginBottom={"12"}
            fontSize={"2xl"}
            fontWeight={"bold"}
            color={"black"}
          >
            Lets get started!
          </Text>
          <VStack w={"full"} spacing={"6"} align={"flex-start"}>
            <ButtonCustom
              leftIcon={<FaGoogle />}
              isExpanded={true}
              size={"lg"}
              btnName={"Login with Google"}
              type={"google"}
              w={"full"}
              onClick={() => {
                google_login();
              }}
            />
            <ButtonCustom
              leftIcon={<FaMicrosoft />}
              isExpanded={true}
              size={"lg"}
              btnName={"Login with Microsoft"}
              type={"google"}
              w={"full"}
              onClick={() => {
                microsoft_login();
              }}
            />
          </VStack>
          <Divider orientation="horizontal" w={"full"} />
          <HStack w={"full"}>
            <InputField
              label={"First Name"}
              placeholder={"Julie"}
              type={"text"}
              value={InputFirstName}
              onChange={(e) => {
                setInputFirstsName(e.target.value);
              }}
            />
            <InputField
              label={"Second Name"}
              placeholder={"Dupont"}
              type={"text"}
              value={InputSecName}
              onChange={(e) => {
                setInputSecName(e.target.value);
              }}
            />
          </HStack>
          <InputField
            label={"Email"}
            placeholder={"julie.dupont@email.com"}
            type={"email"}
            value={InputEmail}
            onChange={(e) => {
              setInputEmaill(e.target.value);
            }}
          />
          <InputField
            label={"Password"}
            placeholder={"@123Ju!"}
            type={"password"}
            value={InputPass}
            onChange={(e) => {
              setInputPass(e.target.value);
            }}
          />
          <ButtonCustom
            isExpanded={true}
            size={"lg"}
            btnName={"Signup"}
            type={"primary"}
            w={"full"}
            marginBotton={"8"}
            onClick={(e) => {
              SignUp();
            }}
          />
          <Text fontSize={"md"} color={"black"}>
            Already have an account?{" "}
            <Text
              as={"span"}
              cursor={"pointer"}
              onClick={() => {
                window.location.href = "/login";
              }}
              fontWeight={"bold"}
              textDecor={"underline"}
              color={"brand.main"}
            >
              Signin
            </Text>
          </Text>
        </VStack>
      </VStack>
      <VStack hideBelow={"md"} w={"full"} h={"full"}>
        <Image
          src={loginImg}
          alt={"logo"}
          w={"full"}
          h={"full"}
          objectFit={"contain"}
        />
      </VStack>
    </Stack>
  );
}

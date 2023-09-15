import {
  Image,
  VStack,
  Stack,
  HStack,
  Text,
  Divider,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import React,{useState} from "react";
import logo from "../assets/Logo.svg";
import InputField from "../components/InputField";
import ButtonCustom from "../components/Button";
import loginImg from "../assets/loginImage.png";
import { FaGoogle } from "react-icons/fa";
import { FaMicrosoft } from "react-icons/fa";
import { google_login, microsoft_login,login } from "../Shared/Authentication";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [InputEmail, setInputEmaill] = useState("");
  const [InputPass, setInputPass] = useState("");
  const toast = useToast();

  const isValidEmailFormat = (email) => {
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  async function loginSupabase() {
    if (!isValidEmailFormat(InputEmail)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const status = await login({ email: InputEmail, pass: InputPass });
    console.log("Status : " + status);


    if (status.statuscode === 200) {
      toast({
        title: "Success",
        description: "Signed in Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      window.location.href = "/dashboard/chat";
    } else if (status.statuscode === 400) {
      toast({
        title: "Failure",
        description: status.err,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Failure",
        description: "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  function LoginFunction() {
    setIsLoading(true);
    if (InputEmail.length < 10 || InputPass.length < 6) {
      toast({
        title: "Error",
        description: "Please enter a valid email address and password",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      loginSupabase();
    }
    setIsLoading(false);
  }

  function fp() {s

    if (InputEmail.length < 10) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    forgotpassword(InputEmail);
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
            Welcome back!
          </Text>
          <VStack w={"full"} spacing={"6"} align={"flex-start"}>
            <ButtonCustom
              leftIcon={<FaGoogle />}
              isExpanded={true}
              size={"lg"}
              btnName={"Login with Google"}
              type={"google"}
              w={"full"}
              onClick={google_login}
            />
            <ButtonCustom
              leftIcon={<FaMicrosoft />}
              isExpanded={true}
              size={"lg"}
              btnName={"Login with Microsoft"}
              type={"google"}
              w={"full"}
              onClick={microsoft_login}
            />
          </VStack>
          <Divider orientation="horizontal" w={"full"} />
          <InputField
            label={"Email"}
            placeholder={"Enter your email"}
            type={"email"}
            value={InputEmail}
            onChange={(e) => setInputEmaill(e.target.value)}
          />
          <InputField
            label={"Password"}
            placeholder={"Enter your password"}
            type={"password"}
            value={InputPass}
            onChange={(e) => setInputPass(e.target.value)}
          />
          <ButtonCustom
            isExpanded={true}
            size={"lg"}
            btnName={
              isLoading ? <><Spinner /></>:<>Login</>
            }
            type={"primary"}
            w={"full"}
            marginBotton={"8"}
            onClick={()=>{
              LoginFunction();
            }}
          />
          <Text fontSize={"md"} color={"black"}>
            Don't have an account?{" "}
            <Text
              as={"span"}
              cursor={"pointer"}
              onClick={() => {
                window.location.href = "/signup";
              }}
              fontWeight={"bold"}
              textDecor={"underline"}
              color={"brand.main"}
            >
              Sign up
            </Text>
          </Text>
          <Text
            onClick={() => {
              window.location.href = "/reset-password";
            }}
            fontSize={"sm"}
            color={"brand.main"}
            fontWeight={"bold"}
            cursor={"pointer"}
            _hover={{
              textDecoration: "underline",
            }}
          >
            Forgot password?
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

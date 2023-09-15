import {
  Image,
  VStack,
  Stack,
  HStack,
  Text,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import React from "react";
import logo from "../assets/Logo.svg";
import InputField from "../components/InputField";
import ButtonCustom from "../components/Button";
import loginImg from "../assets/loginImage.png";
import axios from "axios";
import {
  forgotpassword,
  getCurrentLocalUser,
  updatepswd,
} from "../Shared/Authentication";
import supabase from "../Shared/Supabase";

const Backend = import.meta.env.VITE_BACKEND;

export default function ForgotPassword() {
  const toast = useToast();
  const [email, setEmail] = React.useState("");
  const [emailLoading, setEmailLoading] = React.useState(false);
  const [isVerified, setIsVerified] = React.useState(false);

  const [password1, setPassword1] = React.useState("");
  const [password2, setPassword2] = React.useState("");

  function checkLoginTime(last_sign_in_at, recovery_sent_at, updated_at) {
    const user = {
      last_sign_in_at,
      recovery_sent_at,
      updated_at,
    };

    const lastSignInTime = new Date(user.last_sign_in_at);
    const currentTime = new Date();
    console.log("The Current time UTC : ", currentTime.toISOString());
    console.log("The Last Sign In Time : ", lastSignInTime.toISOString());

    const timeDifference = currentTime - lastSignInTime;
    console.log(
      "The Total Time For Login (ms): ",
      timeDifference / (60 * 1000)
    );

    const thirtyMinutes = 10 * 60 * 1000;
    if (timeDifference < thirtyMinutes) {
      setIsVerified(true);
      console.log("User has been logged in for less than 30 minutes");
    } else {
      setIsVerified(false);
      localStorage.clear();
      console.log("User has been logged in for more than 30 minutes");
    }
  }

  React.useEffect(() => {
    async function check() {
      const user = await getCurrentLocalUser();
      if (user) {
        console.log(user);
        checkLoginTime(
          user.user.last_sign_in_at,
          user.user.recovery_sent_at,
          user.user.updated_at
        );
      }
    }

    check();
  }, []);

  const sendEmail = async () => {
    setEmailLoading(true);
    await forgotpassword(email);
    setEmailLoading(false);
    toast({
      title: "Email Sent",
      description: "Kindly check your email for further instructions",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const VerifyCheck = async () => {

    if (password1 !== password2) {
      toast({
        title: "Password Mismatch",
        description: "Kindly check your passwords",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const user = await getCurrentLocalUser();
    if (user) {
      console.log("The Password Change is Provoked .");

      const { data, error } = await updatepswd(password1);

      if (error) {
        console.log(error);
        toast({
          title: "Password Reset Failed",
          description: "Kindly check your password",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      if (data) {
        console.log(data);
        toast({
          title: "Password Reset Success",
          description: "Kindly login with your new password",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        window.location.href = "/login";
        return;
      }
    } else {
      toast({
        title: "Password Reset Failed",
        description: "Some Error Occured",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
  };

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
            Reset Password
          </Text>
          {!isVerified ? (
            <>
              <InputField
                label={"Email"}
                placeholder={"Enter your email"}
                type={"email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <ButtonCustom
                onClick={sendEmail}
                isExpanded={true}
                size={"lg"}
                btnName={
                  emailLoading ? (
                    <>
                      <Spinner size={"md"} />
                    </>
                  ) : (
                    <>Send Email</>
                  )
                }
                type={"primary"}
                w={"full"}
                marginBotton={"8"}
              />
              <ButtonCustom
                isExpanded={true}
                size={"lg"}
                btnName={"Login"}
                type={"primary"}
                w={"full"}
                marginBottom={"8"}
                onClick={() => {
                  window.location.href = "/login";
                }}
              />
            </>
          ) : (
            <>
              <>
                <InputField
                  label={"New Password"}
                  placeholder={"Enter your new password"}
                  type={"password"}
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                />
                <InputField
                  label={"Confirm Password"}
                  placeholder={"Confirm your new password"}
                  type={"password"}
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
                <ButtonCustom
                  isExpanded={true}
                  size={"lg"}
                  btnName={"Reset Password"}
                  type={"primary"}
                  w={"full"}
                  marginBottom={"8"}
                  onClick={() => {
                    VerifyCheck();
                  }}
                />
              </>
            </>
          )}
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

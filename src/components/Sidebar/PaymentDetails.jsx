import {
  Divider,
  HStack,
  Heading,
  Text,
  VStack,
  Icon,
  Grid,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import ButtonCustom from "../Button";
import { BsCashCoin } from "react-icons/bs";
import { useState, useEffect } from "react";
import axios from "axios";
import { GetPaymentListLink } from "../../Shared/Function";

const Backend = import.meta.env.VITE_BACKEND;

export default function PaymentDetails({ plan, userplan }) {
  const [Loading, setLoading] = useState(true);
  const [PayLoading, setPayLoading] = useState(false);
  const toast = useToast();

  async function FetchPayListLink() {
    setPayLoading(true);
    const data = await GetPaymentListLink(window.location.href);
    console.log("Payment Link : ", data);
    if (data && data.status == 2) {
      window.location.href = data.link.url;
    } else if (data && data.status == 5) {
      toast({
        title: "Information",
        description: "Kindly Purchase a Plan First in Pricing Section.",
        status: "info",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: "Error in fetching Current Subscription link.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    setPayLoading(false);
  }

  useEffect(() => {
    if (plan && userplan) {
      setLoading(false);
    }
  }, [plan, userplan]);

  return (
    <VStack w={"full"} h={"full"} align={"flex-start"} spacing={"4"}>
      <HStack spacing={"4"}>
        <Icon as={BsCashCoin} boxSize={"6"} />
        <Heading as={"h1"} size={"lg"} color={"brand.main"}>
          Billing Details
        </Heading>
      </HStack>
      <Divider orientation="horizontal" />
      <Grid
        templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)"]}
        gap={6}
        w={"full"}
        h={"full"}
      >
        <HStack spacing={"4"}>
          <Heading as={"h2"} size={"md"} color={"brand.main"}>
            Plan Name :
          </Heading>
          <Text as={"p"} fontSize={"lg"}>
            {Loading ? (
              <>
                <Spinner size="sm" />
              </>
            ) : (
              <>
                {userplan.PlanName ? (
                  <>{userplan.PlanName}</>
                ) : (
                  <>
                    <Spinner size="sm" />
                  </>
                )}
              </>
            )}
            {/* {props.name} */}
          </Text>
        </HStack>
        <HStack spacing={"4"}>
          <Heading as={"h2"} size={"md"} color={"brand.main"}>
            Plan Price :
          </Heading>
          <Text as={"p"} fontSize={"lg"}>
            {Loading ? (
              <>
                <Spinner size="sm" />
              </>
            ) : (
              <>
                {userplan.Price + 1 ? (
                  <>{userplan.Price} €</>
                ) : (
                  <>
                    <Spinner size="sm" />
                  </>
                )}
              </>
            )}
            {/* {props.purchaseDate} */}
          </Text>
        </HStack>
        <HStack spacing={"4"}>
          <Heading as={"h2"} size={"md"} color={"brand.main"}>
            Document Size Allowed :
          </Heading>
          <Text as={"p"} fontSize={"lg"}>
            {Loading ? (
              <>
                <Spinner size="sm" />
              </>
            ) : (
              <>
                {userplan.SizeAllowed + 1 ? (
                  <>{userplan.SizeAllowed} MB</>
                ) : (
                  <>
                    <Spinner size="sm" />
                  </>
                )}
              </>
            )}
            {/* {props.size} */}
          </Text>
        </HStack>
        <HStack spacing={"4"}>
          <Heading as={"h2"} size={"md"} color={"brand.main"}>
            Questions Allowed :
          </Heading>
          <Text as={"p"} fontSize={"lg"}>
            {Loading ? (
              <>
                <Spinner size="sm" />
              </>
            ) : (
              <>
                <>
                  {userplan.qps ? (
                    <>{userplan.qps}</>
                  ) : (
                    <>
                      <Spinner size="sm" />
                    </>
                  )}
                </>
              </>
            )}
            {/* {props.questions} */}
          </Text>
        </HStack>
        <HStack spacing={"4"}>
          <Heading as={"h2"} size={"md"} color={"brand.main"}>
            Book Uploads Left :
          </Heading>
          <Text as={"p"} fontSize={"lg"}>
            {Loading ? (
              <>
                <Spinner size="sm" />
              </>
            ) : (
              <>
                {plan.bookuploads >= 0 ? (
                  <>{plan.bookuploads}</>
                ) : (
                  <>{/* <Spinner size="sm" /> */}</>
                )}
              </>
            )}
            {/* {props.uploadsLeft} */}
          </Text>
        </HStack>

        <HStack spacing={"4"}>
          <Heading as={"h2"} size={"md"} color={"brand.main"}>
            Purchase Date :
          </Heading>
          <Text as={"p"} fontSize={"lg"}>
            {Loading ? (
              <>
                <Spinner size="sm" />
              </>
            ) : (
              <>
                {" "}
                <pre>
                  {plan.purchasedate ? (
                    <>{plan.purchasedate} </>
                  ) : (
                    <>
                      <Spinner size="sm" />
                    </>
                  )}
                </pre>
              </>
            )}
            {/* {props.purchaseDate} */}
          </Text>
        </HStack>
      </Grid>
      <Divider orientation="horizontal" />
      <HStack>
        <ButtonCustom
          isExpanded={true}
          btnName={"Pricing"}
          type="primary"
          size={"md"}
          onClick={() => {
            window.location.href = "/pricing";
          }}
        />

        <ButtonCustom
          isExpanded={true}
          btnName={
            PayLoading ? (
              <>
                <Spinner size={"md"} />
              </>
            ) : (
              "Payment Details"
            )
          }
          onClick={() => {
            FetchPayListLink();
          }}
          type="primary"
          size={"md"}
        />
        {/* <ButtonCustom
          isExpanded={true}
          btnName={
            PayLoading ? (
              <>
                <Spinner size={"md"} />
              </>
            ) : (
              "Stripe Dashboard"
            )
          }
          onClick={() => {
            FetchPayListLink();
          }}
          type="primary"
          size={"md"}
        /> */}
      </HStack>
    </VStack>
  );
}

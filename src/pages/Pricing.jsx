import {
    Image,
    VStack,
    Stack,
    HStack,
    Text,
    Divider,
    SimpleGrid,
    Box,
    Spinner,
    useToast,
} from "@chakra-ui/react";
import React from "react";
import logo from "../assets/Logo.svg";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import ButtonCustom from "../components/Button";
import IconButton from "../components/IconButton";
import { IoIosArrowRoundBack } from "react-icons/io";
import { validate } from "../Shared/Authentication";
import supabase from "../Shared/Supabase";
import axios from "axios";

const Backend = import.meta.env.VITE_BACKEND;

export default function Pricing() {
    const toast = useToast();
    const [currentuser, setCurrentuser] = React.useState(null);
    const [Loading, setLoading] = React.useState(false);
    const [Plans, setPlans] = React.useState([]);

    async function GetAllPlans() {
        let { data: Plans, error } = await supabase.from("Plans").select("*");
        return Plans;
    }

    React.useEffect(() => {
        async function GetPlans() {
            setLoading(true);
            const currentuser = JSON.parse(localStorage.getItem("currentuser"));
            if (currentuser) {
                setCurrentuser(currentuser);
            } else {
                setCurrentuser(null);
            }
            let Plans = await GetAllPlans();
            setPlans(Plans);
            console.log(Plans);
            setLoading(false);
        }
        GetPlans();
    }, []);

    async function Charge(planid) {

        if (!currentuser) {
            window.location.href = "/login";
            return;
        }

        toast({
            title: "Info",
            description: "You will be redirected to Stripe to complete the payment",
            status: "info",
            duration: 5000,
            position: "top-right",
            isClosable: true,
        });
        try {
            const access_token = (await validate()).access_token;
            const resp = await axios.post(`${Backend}/getStripe`, {
                access_token,
                planid,
            });
            const data = resp.data;
            console.log(data);
            window.location.href = data;
        } catch (err) {
            console.log(err);

            toast({
                title: "Error",
                description: err,
                status: "error",
                duration: 5000,
            });
        }
    }

    return (
        <VStack w={"full"} h={"full"} >
            <HStack
                w={"full"}
                justify={"space-between"}
                align={"center"}
                py="4"
                paddingX={["6", "12", "12"]}
                spacing={"6"}
            >
                <IconButton
                    icon={IoIosArrowRoundBack}
                    color={"brand.light"}
                    boxSize={"8"}
                    padding={"1"}
                    onClick={() => window.history.back()}
                />
                <Image src={logo} alt={"logo"} w={"48"} objectFit={"contain"} />
                <Box />
            </HStack>
            <VStack
                padding={"5"}
                w={"full"}
                h={"full"}
                spacing={"6"}
                overflowY={"auto"}
                align={"center"}
                justify={"center"}
            >
                <SimpleGrid
                    spacing={4}
                    mt={["60", "24", "0"]}
                    columns={{ base: 1, md: 2 }}
                >
                    {Loading ? (
                        <>
                            <Spinner w={"20"} h={"20"} />
                        </>
                    ) : (
                        <>
                            {Plans.map((item, index) => (
                                <Card
                                    bg="whiteAlpha.400"
                                    key={index}
                                    borderWidth="1px"
                                    borderRadius="lg"
                                    shadow={"md"}
                                    borderColor={"brand.main"}
                                    overflow="hidden"
                                >
                                    <CardHeader p="6">
                                        <Text fontSize="2xl" fontWeight="bold" color="black">
                                            {item.PlanName}
                                        </Text>
                                    </CardHeader>
                                    <CardBody p="4">
                                        <Text fontSize="3xl" fontWeight="bold" color="brand.main">
                                            €{item.Price}/month
                                        </Text>
                                        <Divider
                                            marginTop={"3"}
                                            marginBottom={"3"}
                                            orientation="horizontal"
                                            w={"full"}
                                        />
                                        <VStack w={"full"} spacing={"6"} align={"flex-start"}>
                                            <Text fontSize="md" color="black">
                                                {`You can upload ${item.bc} documents`}
                                            </Text>
                                            <Text fontSize="md" color="black">
                                                {`You can ask ${item.qps} Queries per document`}
                                            </Text>
                                            <Text fontSize="md" color="black">
                                                {`Maximum Size Allowed: ${item.SizeAllowed} MB per document`}
                                            </Text>
                                        </VStack>
                                    </CardBody>
                                    <CardFooter p="6">
                                        <ButtonCustom
                                            isExpanded={true}
                                            size={"lg"}
                                            btnName={
                                                currentuser && currentuser.Plan == item.Pid
                                                    ? "Selected"
                                                    : <>{currentuser ? <>
                                                        {
                                                            currentuser.Plan <= item.Pid ? "Upgrade" : "Downgrade"
                                                        }

                                                    </> : "Get Started"}</>
                                            }
                                            isDisabled={currentuser && currentuser.Plan == item.Pid}
                                            type={"primary"}
                                            w={"full"}
                                            onClick={() => {
                                                Charge(item.Pid);
                                            }}
                                        />
                                    </CardFooter>
                                </Card>
                            ))}
                        </>
                    )}
                </SimpleGrid>
            </VStack>
        </VStack>
    );
}

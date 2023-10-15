import { Divider, HStack, Heading, Text, VStack, Icon, Select } from "@chakra-ui/react";
import React from "react";
import ButtonCustom from "./Button";
import {AiOutlineSetting} from 'react-icons/ai'
import { Spinner } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Switch } from '@chakra-ui/react'

export default function General({ user }) {
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            setLoading(false);
        }
    }, [user]);

    return (
        <VStack w={"full"} h={"full"} align={"flex-start"} spacing={"4"}>
            <HStack spacing={"4"}>
                <Icon as={AiOutlineSetting} boxSize={"6"} />
                <Heading as={"h1"} size={"lg"} color={"brand.main"}>
                    General
                </Heading>
            </HStack>
            <Divider orientation="horizontal" />
            <VStack w={"full"} h={"full"} align={"flex-start"} spacing={"6"}>
                <HStack spacing={"4"}>
                <Heading as={"h2"} size={"md"} color={"brand.main"}>
                        Toogle Dark Mode :
                    </Heading>
                    <Switch size="md" />
                </HStack>
                <HStack spacing={"4"}>
                    <Heading as={"h2"} size={"md"} color={"brand.main"}>
                        Language:
                    </Heading>
                    <Select placeholder="Select option">
                        <option value="option1">English</option>
                        <option value="option2">Hindi</option>
                        <option value="option3">Marathi</option>
                        <option value="option4">Gujrati</option>
                    </Select>
                </HStack>
            </VStack>
        </VStack>
    );
}

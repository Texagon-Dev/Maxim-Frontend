import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Icon,
    Text,
    Stack,
} from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { BsFiletypeDoc } from 'react-icons/bs'
import { BsFillFileImageFill } from 'react-icons/bs'
import './shadows.css'

export default function PdfModal({ pdf, isOpen, onClose }) {
    const options = [
        {
            id: 1,
            title: 'Upload a Document',
            icon: BsFiletypeDoc,
        },
        {
            id: 2,
            title: 'Upload a Picture',
            icon: BsFillFileImageFill,
        },
    ]
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="#f0f0f0">
                <ModalHeader>Upload </ModalHeader>
                <ModalCloseButton />
                <ModalBody bg="#f0f0f0">
                    <Stack
                        direction={['column', 'row']}
                        spacing={4}
                        mb={4}
                    >
                        {options.map((option) => (
                            <Card
                                id='input-field'
                                key={option.id}
                                onClick={() => pdf(option.id)}
                                cursor={'pointer'}
                            >
                                <CardHeader>
                                    <Icon as={option.icon} color={'brand.main'} boxSize={10} />
                                </CardHeader>
                                <CardBody>
                                    <Text color={'brand.main'} fontSize={'xl'}>{option.title}</Text>
                                </CardBody>
                            </Card>
                        ))}
                    </Stack>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

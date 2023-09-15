import { HStack, Show } from '@chakra-ui/react'
import React from 'react'
import IconButton from './IconButton'
import {HamburgerIcon} from '@chakra-ui/icons'


export default function Header(props) {
    return (
        <Show below='md'>
            <HStack
                w={'full'}
                paddingY={'2'}
                bg={'brand.main'}
                color={'brand.light'}
                padding={'2'}
                align={'center'}
                justify={'space-between'}
                transition={'all .2s ease-in-out'}
            >
                <IconButton
                    onClick={() => props.setIsExpanded(true)}
                    icon={HamburgerIcon}
                    boxSize={10}
                    type={'light'}
                />
            </HStack>
        </Show>
    )
}

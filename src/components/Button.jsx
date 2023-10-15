import React from 'react'
import { Button, Text } from '@chakra-ui/react'

function ButtonCustom(props) {
    return (
        props.type === 'primary' ?
        <Button
            transition={'all .2s ease-in-out'}
            bgGradient={'linear(to-r, brand.main,brand.light)'}
            color={'white'}
            rounded={'full'}
            _hover={{
                bg: 'brand.light',
                color: 'brand.main'
            }}
            {...props}
        >
            {props.isExpanded ? 
            props.btnName
            : props.icon}
        </Button>
        :
        <Button
            transition={'all .2s ease-in-out'}
            bgGradient={'linear(to-r, brand.light,brand.main)'}
            color={"white"}
            rounded={'full'}
            _hover={{
                bg: 'brand.main',
                color: 'brand.light',
                border: '1px',
                borderColor: 'whiteAlpha.500',
            }}
            {...props}
        >
            {props.isExpanded ? 
            props.btnName
            : props.icon}
        </Button>
    )
}

export default ButtonCustom
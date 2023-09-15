import { Icon } from '@chakra-ui/react'
import React from 'react'

function IconButton(props) {
    return (
        <Icon 
            as={props.icon}
            color={props.type === 'primary' ? 'brand.main' : 'brand.light'}
            bg={props.type === 'primary' ? 'brand.light' : 'brand.main'}
            padding={'2'}
            cursor={'pointer'}
            rounded={'lg'}
            boxSize={props.boxSize}
            {...props}
        />
    )
}

export default IconButton
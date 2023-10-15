import { Icon } from '@chakra-ui/react'
import React from 'react'

function IconButton(props) {
    return (
        <Icon 
            as={props.icon}
            color={props.type === 'primary' ? 'black' : 'black'}
            bg={props.type === 'primary' ? 'brand.main' : 'white'}
            padding={'2'}
            cursor={'pointer'}
            rounded={'lg'}
            boxSize={props.boxSize}
            {...props}
        />
    )
}

export default IconButton
import { Heading } from '@chakra-ui/react'
import React from 'react'

function CustomHeadings(props) {
    return (
        <Heading 
            as="h1"
            size={["sm", "xl", "xl", "xl"]}
            color="black"
            {...props}
        >
            {props.text}
        </Heading>
    )
}

export default CustomHeadings
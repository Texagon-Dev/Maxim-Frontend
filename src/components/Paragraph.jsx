import { Text } from '@chakra-ui/react'
import React from 'react'

function Paragraph(props) {
    return (
        <Text 
            as="p"
            size={["md", "xl", "xl", "2xl"]}
            color="blackAlpha.700"
            {...props}
        >
            {props.text}
        </Text>
    )
}

export default Paragraph
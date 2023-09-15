import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import './index.css'


const theme = extendTheme({
  colors: {
    brand: {
      main: '#5A9DAE',
      light: '#E4F0F5',
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
)

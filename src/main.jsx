import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import './index.css'


const theme = extendTheme({
  colors: {
    brand: {
      main: '#2760AA',
      light: '#34CFDF',
      text: '#FFFFFF'
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
)

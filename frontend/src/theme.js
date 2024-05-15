// theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    primary: {
      50: '#e4f9ff',
      100: '#bae4ff',
      200: '#8fd0ff',
      300: '#64bbff',
      400: '#39a7ff',
      500: '#1f8dee',
      600: '#156fbb',
      700: '#0c5089',
      800: '#033056',
      900: '#001023',
    },
  },
  fonts: {
    body: 'Roboto, system-ui, sans-serif',
    heading: 'Roboto, system-ui, sans-serif',
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'md',
        _focus: {
          boxShadow: 'none',
        },
      },
      sizes: {
        md: {
          height: '48px',
          fontSize: 'lg',
        },
      },
      variants: {
        solid: {
          bg: 'primary.500',
          color: 'white',
          _hover: {
            bg: 'primary.600',
          },
        },
        outline: {
          borderColor: 'primary.500',
          color: 'primary.500',
          _hover: {
            bg: 'primary.50',
          },
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          borderRadius: 'md',
          _focus: {
            borderColor: 'primary.500',
            boxShadow: '0 0 0 1px #1f8dee',
          },
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.900',
      },
    },
  },
});

export default theme;

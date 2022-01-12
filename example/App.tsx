import styled from '@emotion/styled'
import { styledWithVariants } from '../src/index'

const Button = styledWithVariants('button', {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '0.5rem 1rem',

  outline: 'none',
  fontWeight: 500,
  fontSize: 16,
  lineHeight: 1,
  borderWidth: '1px',
  borderStyle: 'solid',
  transition: 'background-color .3s ease,color .3s ease,border-color .3s ease',
  cursor: 'pointer',

  variants: {
    variant: {
      solid: {
        background: '#1b9aee',
        borderColor: '#1b9aee',
        color: '#fff',
        '&:hover': {
          background: '#0171c2',
        },
      },
      outline: {
        background: '#fff',
        color: '#1b9aee',
        borderColor: '#ccecff',
        '&:hover': {
          background: '#f2fbff',
          borderColor: '#ccecff',
        },
      },
      ghost: {
        background: '#fff',
        color: '#1b9aee',
        borderColor: '#fff',
        '&:hover': {
          background: '#f2fbff',
        },
      },
    },

    isRounded: {
      true: {
        borderRadius: '9999px',
      },
      false: {
        borderRadius: '4px',
      },
    },
  },

  defaultVariants: {
    variant: 'solid',
    isRounded: false,
  },
})

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '100vw',

  '&> *': {
    marginBottom: '1rem',
  },
})

const HStack = styled.div({
  display: 'flex',
  justifyContent: 'center',
  '& > *': {
    marginRight: '1rem',
  },
})

function App() {
  return (
    <Container>
      <HStack>
        <Button>Button</Button>
        <Button variant='outline'>Button</Button>
        <Button variant='ghost'>Button</Button>
      </HStack>

      <HStack>
        <Button isRounded='true'>Button</Button>
        <Button isRounded='true' variant='outline'>
          Button
        </Button>
        <Button isRounded='true' variant='ghost'>
          Button
        </Button>
      </HStack>
    </Container>
  )
}

export default App

import { ThemeProvider } from 'styled-components'
import { Card } from './components/Card'
import { GlobalStyle } from './styles/GlobalStyle'

const theme = {}

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Card />
    </ThemeProvider>
  )
}

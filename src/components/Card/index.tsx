import { ReactNode, HtmlHTMLAttributes } from 'react'

import { Action, Body, Container, Title } from './styles'

type CardProps = {
  children?: ReactNode
} & HtmlHTMLAttributes<HTMLDivElement>

export function Card(props: CardProps) {
  return (
    <Container {...props}>
      <Title>新消息</Title>
      <Body>1</Body>
      <Action>
        <span>忽略全部</span>
      </Action>
    </Container>
  )
}

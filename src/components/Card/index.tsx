import { ReactNode, HtmlHTMLAttributes, useEffect, useState } from 'react'

import { Action, Body, Container, Title } from './styles'

type CardProps = {
  children?: ReactNode
} & HtmlHTMLAttributes<HTMLDivElement>

export function Card(props: CardProps) {
  const [pingIsRunning, setPingIsRunning] = useState<boolean>(
    window.Main.isPingRunning
  )

  const handleBtnClick = () => {
    if (pingIsRunning) {
      window.Main.killPing()
    } else {
      window.Main.startPing()
    }
  }

  useEffect(() => {
    window.Main.on('ping-runing-change', (isRuning: boolean) => {
      setPingIsRunning(isRuning)
    })

    window.Main.on('ping-data', (data: string) => {
      console.log(data)
    })
  }, [])

  return (
    <Container {...props}>
      <Title>新消息</Title>
      <Body>1</Body>
      <Action>
        <span onClick={handleBtnClick}>
          {pingIsRunning ? '停止小眼睛' : '启动小眼睛'}
        </span>
      </Action>
    </Container>
  )
}

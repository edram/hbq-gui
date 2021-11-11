import { ReactNode, HtmlHTMLAttributes, useEffect, useState } from 'react'

import { Action, Body, Container, Title } from './styles'

type CardProps = {
  children?: ReactNode
} & HtmlHTMLAttributes<HTMLDivElement>

export function Card(props: CardProps) {
  const [ids, setIds] = useState<string[]>([])
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

  const changeTrayWindowSize = () => {
    window.Main.changeTrayWindowSize(600)
  }

  useEffect(() => {
    setIds([])
  }, [pingIsRunning])

  useEffect(() => {
    window.Main.on('ping-runing-change', (isRuning: boolean) => {
      setPingIsRunning(isRuning)
    })

    return () => {
      window.Main.removeAllListeners('ping-runing-change')
    }
  }, [pingIsRunning])

  useEffect(() => {
    window.Main.on('ping-data', (data: string) => {
      setIds([...ids, data])
    })

    return () => {
      window.Main.removeAllListeners('ping-data')
    }
  }, [ids])

  return (
    <Container {...props}>
      <Title>新消息</Title>
      <Body>
        {ids.map((id, index) => (
          <div key={index}>{id}</div>
        ))}
      </Body>
      <Action>
        <span onClick={handleBtnClick}>
          {pingIsRunning ? '停止小眼睛' : '启动小眼睛'}
        </span>
        <span onClick={changeTrayWindowSize}>测试</span>
      </Action>
    </Container>
  )
}

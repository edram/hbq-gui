import { ReactNode, HtmlHTMLAttributes, useEffect, useState } from 'react'
import { useMeasure } from 'react-use'
import { Action, Body, Container, Title } from './styles'
import CopySvg from '../Icons/Copy'
import styled from 'styled-components'

type CardProps = {
  children?: ReactNode
} & HtmlHTMLAttributes<HTMLDivElement>

const Icon = styled(CopySvg)`
  color: #000;
  cursor: pointer;
`

export function Card(props: CardProps) {
  const [ids, setIds] = useState<string[]>(['1', '2', '3'])
  const [pingIsRunning, setPingIsRunning] = useState<boolean>(
    window.Main.isPingRunning
  )
  const [ref, { height }] = useMeasure<HTMLDivElement>()

  useEffect(() => {
    window.Main.changeTrayWindowSize(height)
  }, [height])

  console.log(height)

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
    <Container {...props} ref={ref}>
      <Title>新消息</Title>
      <Body>
        {ids.map((id, index) => (
          <div className="id" key={index}>
            <span>{id}</span>
            <Icon
              onClick={() => {
                window.Main.setClipboard(id)
                window.Main.notify({
                  title: '复制成功',
                  body: '修改文件就好噢，不需要重新启动命令',
                })
              }}
            />
          </div>
        ))}
      </Body>
      <Action>
        <span onClick={handleBtnClick}>
          {pingIsRunning ? '停止小眼睛' : '启动小眼睛'}
        </span>
      </Action>
    </Container>
  )
}

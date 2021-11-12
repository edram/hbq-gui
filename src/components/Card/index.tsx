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
  const [ids, setIds] = useState<string[]>([])
  const [xyjIsRunning, setXyjIsRunning] = useState<boolean>(
    window.Main.isXyjRunning
  )
  const [slIsRunning, setSlIsRunning] = useState<boolean>(
    window.Main.isSlRunning
  )
  const [ref, { height }] = useMeasure<HTMLDivElement>()

  useEffect(() => {
    window.Main.changeTrayWindowSize(height)
  }, [height])

  console.log(height)

  const handleXyjBtnClick = () => {
    if (xyjIsRunning) {
      window.Main.killXyj()
    } else {
      window.Main.startXyj()
    }
  }

  const handleSlBtnClick = () => {
    if (slIsRunning) {
      window.Main.killSl()
    } else {
      window.Main.startSl()
    }
  }

  useEffect(() => {
    window.Main.on('xyj-runing-change', (isRuning: boolean) => {
      setXyjIsRunning(isRuning)
    })
    window.Main.on('sl-runing-change', (isRuning: boolean) => {
      setSlIsRunning(isRuning)
    })

    return () => {
      window.Main.removeAllListeners('xyj-runing-change')
      window.Main.removeAllListeners('sl-runing-change')
    }
  }, [xyjIsRunning])

  useEffect(() => {
    const regex = /小红书 ID： (.*)/
    const handleStdout = (data: string) => {
      console.log(data)
      if (regex.test(data)) {
        const matches = data.match(regex)
        if (ids.length > 5) {
          const [, ...restIds] = ids
          setIds([...restIds, matches![1]])
        } else {
          setIds([...ids, matches![1]])
        }
      }
    }
    window.Main.on('xyj-data', handleStdout)
    window.Main.on('sl-data', handleStdout)

    return () => {
      window.Main.removeAllListeners('xyj-data')
      window.Main.removeAllListeners('sl-data')
    }
  }, [ids])

  return (
    <Container {...props} ref={ref}>
      <Title>新消息{!!ids.length && `（${ids.length}）`}</Title>
      <Body>
        {ids.map((id, index) => (
          <div className="id" key={index}>
            <span>小红书ID: {id}</span>
            <Icon
              onClick={() => {
                window.Main.setClipboard(id)
                window.Main.notify({
                  title: '小红书ID复制成功',
                  body: '点击配置修改即可，不需要重新启动命令',
                })
              }}
            />
          </div>
        ))}
      </Body>
      <Action>
        <span onClick={handleXyjBtnClick}>
          {xyjIsRunning ? '停止小眼睛' : '启动小眼睛'}
        </span>

        <span onClick={handleSlBtnClick}>
          {slIsRunning ? '停止收录' : '启动收录'}
        </span>

        <span onClick={()=>{
          window.Main.exec('code /Users/edram/xhs/data')
        }}>配置</span>

        <span
          onClick={() => {
            setIds([])
          }}
        >
          忽略全部
        </span>
      </Action>
    </Container>
  )
}

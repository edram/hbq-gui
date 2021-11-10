import styled from 'styled-components'

export const Container = styled.div`
  background: #f5f5f5;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid #dcdcdc;
  box-shadow: 0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%);
  user-select: none;
`

export const Title = styled.div`
  padding: 8px 10px;
  font-weight: bold;
  font-size: 12px;
`

export const Body = styled.div`
  flex: 1;
`

export const Action = styled.div`
  height: 34px;
  border-top: 1px solid #dcdcdc;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 12px;
  font-weight: 400;
  span {
    color: #23a323;
    margin: 0 10px;
    cursor: pointer;
  }
`

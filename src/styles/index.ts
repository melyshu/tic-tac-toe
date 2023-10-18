import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Row = styled.div`
  display: flex;
`

export const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  height: 50px;
  width: 50px;

  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: lightgray;
  }
`

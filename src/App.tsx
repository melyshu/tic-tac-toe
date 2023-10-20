import React, { useState } from "react"
import { Cell, Container, Row } from "./styles"

type CELL = "x" | "o" | " "

const winner = (board: CELL[]) => {
  const checkThree = (board: CELL[], start: number, stride: number) => {
    const c1 = board[start]
    const c2 = board[start + stride]
    const c3 = board[start + 2 * stride]
    if (c1 === c2 && c1 === c3 && c1 !== " ") return c1
    return " "
  }

  const toCheck = [
    [0, 1],
    [3, 1],
    [6, 1],
    [0, 3],
    [1, 3],
    [2, 3],
    [0, 4],
    [2, 2],
  ]
  for (let i = 0; i < toCheck.length; ++i) {
    const [start, stride] = toCheck[i]
    const c = checkThree(board, start, stride)
    if (c !== " ") return c
  }
  return " "
}

const App = () => {
  const [board, setBoard] = useState<CELL[]>(Array(9).fill(" "))
  const [isXFirst, setIsXFirst] = useState<boolean>(true)
  const [isXTurn, setIsXTurn] = useState<boolean>(true)
  const [turnNumber, setTurnNumber] = useState<number>(0)

  const w = winner(board)

  function handleClick(c: number) {
    if (w !== " ") return
    if (board[c] !== " ") return
    const newBoard = [...board]
    newBoard[c] = isXTurn ? "x" : "o"

    setBoard(newBoard)
    setIsXTurn(!isXTurn)
    setTurnNumber(turnNumber + 1)
  }

  function handleClear() {
    setBoard(Array(9).fill(" "))
    setIsXFirst(!isXFirst)
    setIsXTurn(!isXFirst)
    setTurnNumber(0)
  }

  const rows = []
  for (let i = 0; i < 3; ++i) {
    const row = []
    for (let j = 0; j < 3; ++j) {
      const c = 3 * i + j
      row.push(
        <Cell key={j} onClick={() => handleClick(c)}>
          {board[c]}
        </Cell>
      )
    }
    rows.push(<Row key={i}>{row}</Row>)
  }

  const message =
    w === " " ? `Next player: ${isXTurn ? "X" : "O"}` : `${w.toUpperCase()} won`

  return (
    <Container>
      {process.env.REACT_APP_LABEL}
      <div key="turn">Turn number: {turnNumber + 1}</div>
      <div key="message">{message}</div>
      {rows}
      <button key="clear" onClick={handleClear}>
        Clear board
      </button>
    </Container>
  )
}

export default App

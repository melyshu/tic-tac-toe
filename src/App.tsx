import React, { useState } from "react"
import { Cell, Container, Row } from "./styles"

type CELL = "x" | "o" | " "

const App = () => {
  const [board, setBoard] = useState<CELL[]>(Array(9).fill(" "))
  const [isXFirst, setIsXFirst] = useState<boolean>(true)
  const [isXTurn, setIsXTurn] = useState<boolean>(true)

  function handleClick(c: number) {
    if (board[c] !== " ") return
    const newBoard = [...board]
    newBoard[c] = isXTurn ? "x" : "o"
    setBoard(newBoard)
    setIsXTurn(!isXTurn)
  }

  function handleClear() {
    setBoard(Array(9).fill(" "))
    setIsXFirst(!isXFirst)
    setIsXTurn(!isXFirst)
  }

  const rows = []
  for (let i = 0; i < 3; ++i) {
    const row = []
    for (let j = 0; j < 3; ++j) {
      const c = 3 * i + j
      row.push(<Cell onClick={() => handleClick(c)}>{board[c]}</Cell>)
    }
    rows.push(<Row>{row}</Row>)
  }

  return (
    <Container>
      {process.env.REACT_APP_LABEL}
      <div>Next player: {isXTurn ? "X" : "O"}</div>
      {rows}
      <button onClick={handleClear}>Clear board</button>
    </Container>
  )
}

export default App

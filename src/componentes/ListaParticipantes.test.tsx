import { render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { useListaParticipantes } from "../state/hook/useListaParticipantes";
import ListaParticipantes from "./ListaParticipantes";

jest.mock("../state/hook/useListaParticipantes", () => {
  return {
    useListaParticipantes: jest.fn()
  }
})

describe("Lista participantes vazia", () => {
  
  beforeEach(() => {
    (useListaParticipantes as jest.Mock).mockReturnValue([])
  })

  test("deve ser renderizada sem elementos", () => {
    render(
    <RecoilRoot>
      <ListaParticipantes/>
    </RecoilRoot>
    )

    const itens = screen.queryAllByRole("listitem")
    expect(itens).toHaveLength(0)
  })
})

describe("Lista participantes preenchida", () => {
  const participante = ["Ana", "Carolina"]

  beforeEach(() => {
    (useListaParticipantes as jest.Mock).mockReturnValue(participante)
  })
  test("deve ser renderizada sem elementos", () => {
    render(
      <RecoilRoot>
        <ListaParticipantes/>
      </RecoilRoot>
    )
  
    const itens = screen.queryAllByRole("listitem")
    expect(itens).toHaveLength(participante.length)
    
  })
})
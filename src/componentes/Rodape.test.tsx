import { fireEvent, render, screen } from "@testing-library/react"
import React from "react"
import { RecoilRoot } from "recoil"
import { useListaParticipantes } from "../state/hook/useListaParticipantes"
import { useSorteador } from "../state/hook/useSorteador"
import Rodape from "./Rodape"

jest.mock("../state/hook/useListaParticipantes", () => {
  return {
    useListaParticipantes: jest.fn()
  }
})

const mockNavegacao = jest.fn()
const mockSorteio = jest.fn()

jest.mock("react-router-dom", () => {
  return {
    useNavigate: () => mockNavegacao
  }
})

jest.mock("../state/hook/useSorteador", () => {
  return {
    useSorteador: () => mockSorteio
  }
})

describe("onde nao existem participantes suficientes", () => {
  beforeEach(() => {
    (useListaParticipantes as jest.Mock).mockReturnValue([])
  })

  test("a brincadeira nao pode comecar" , () => {
    render(
    <RecoilRoot>
      <Rodape/>
    </RecoilRoot>)

    const botao = screen.getByRole("button")
    expect(botao).toBeDisabled()
  })
})

describe("onde existem participantes suficientes", () => {
  const participantes = ["Ana", "Carolina", "Josefina"]

  beforeEach(() => {
    (useListaParticipantes as jest.Mock).mockReturnValue(participantes)
  })

  test("a brincadeira pode comecar" , () => {
    render(
    <RecoilRoot>
      <Rodape/>
    </RecoilRoot>)

    const botao = screen.getByRole("button")
    expect(botao).not.toBeDisabled()
  })

  test("a brincadeira foi iniciada" , () => {
    render(
    <RecoilRoot>
      <Rodape/>
    </RecoilRoot>)

    const botao = screen.getByRole("button")
    fireEvent.click(botao)

    expect(mockNavegacao).toBeCalledTimes(1)
    expect(mockNavegacao).toHaveBeenCalledWith("/sorteio")
    expect(mockSorteio).toBeCalledTimes(1)
  })
})
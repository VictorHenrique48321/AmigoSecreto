import { act, fireEvent, render, screen } from "@testing-library/react"
import { RecoilRoot } from "recoil"
import Formulario from "./Formulario"


describe("Comportamento do formulario.tsx", () => {
  test("Quando o input esta vazio, novos participantes nao podem ser adicionados", () => {
    render(
      <RecoilRoot>
        <Formulario/>
      </RecoilRoot>
    )
    // encontra no DOM o input
    const input = screen.getByPlaceholderText("Insira os nomes dos participantes")
    
    //encontrar o botao
    const botao = screen.getByRole("button")
    
    //garantir que o input esteja no documento
    expect(input).toBeInTheDocument()
    
    //garantir que o botao esteja desabilitado
    expect(botao).toBeDisabled()
  })
  
  test("Adicionar Participante", () => {
    render(
      <RecoilRoot>
        <Formulario/>
      </RecoilRoot>
    )
    
    // encontra no DOM o input
    const input = screen.getByPlaceholderText("Insira os nomes dos participantes")
    
    //encontrar o botao
    const botao = screen.getByRole("button")
    
    //inserir valor no input
    fireEvent.change(input, {
      target: {
        value: "Ana Catarina"
      }
    })
    
    //clicar no botao de submeter
    fireEvent.click(botao)
    
    //garantir que o input esteja com foco ativo
    expect(input).toHaveFocus()
  
    //garantir que o input nao tenha valor
    expect(input).toHaveValue("")
  })
  
  test("Participante duplicados", () => {
    render(
      <RecoilRoot>
        <Formulario/>
      </RecoilRoot>
    )
    
    // encontra no DOM o input
    const input = screen.getByPlaceholderText("Insira os nomes dos participantes")
    
    //encontrar o botao
    const botao = screen.getByRole("button")
    
    //inserir valor no input
    fireEvent.change(input, {
      target: {
        value: "Ana Catarina"
      }
    })
  
    fireEvent.click(botao)
  
    fireEvent.change(input, {
      target: {
        value: "Ana Catarina"
      }
    })
  
    fireEvent.click(botao)
  
    const mensagemDeErro = screen.getByRole("alert")
  
    expect(mensagemDeErro.textContent).toBe("Nomes duplicados nao sao permitidos!")
  })

  test("Mensagem de erro sumir apos timers", () => {
    jest.useFakeTimers()

    render(
      <RecoilRoot>
        <Formulario/>
      </RecoilRoot>
    )
    
    // encontra no DOM o input
    const input = screen.getByPlaceholderText("Insira os nomes dos participantes")
    
    //encontrar o botao
    const botao = screen.getByRole("button")
    
    //inserir valor no input
    fireEvent.change(input, {
      target: {
        value: "Ana Catarina"
      }
    })
  
    fireEvent.click(botao)
  
    fireEvent.change(input, {
      target: {
        value: "Ana Catarina"
      }
    })
  
    fireEvent.click(botao)
  
    let mensagemDeErro = screen.queryByRole("alert")
    expect(mensagemDeErro).toBeInTheDocument()


    act(() => {
      jest.runAllTimers()
    })

    mensagemDeErro = screen.queryByRole("alert")
    expect(mensagemDeErro).toBeNull()
  })
})



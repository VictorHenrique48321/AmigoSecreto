import { realizarSorteio } from "./sorteador"

describe("Dado um sorteio de amigo secreto", () => {
  test("cada participante nao sorteie o proprio nome", () => {

    const participantes = [
      "Ana",
      "Catarina",
      "Juliana",
      "Joao",
      "Vinicios",
      "Nathalia"
    ]

    const sorteio = realizarSorteio(participantes)

    participantes.forEach(participante => {
      
      const amigoSecreto = sorteio.get(participante)

      expect(amigoSecreto).not.toEqual(participante)

    })

  })
})
import { useRecoilValue } from "recoil"
import { erroState } from "../atom"


export const UseMensagemDeErro = () => {
  const mensagem = useRecoilValue(erroState)
  return mensagem
}
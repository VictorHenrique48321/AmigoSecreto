import React from 'react'
import { useListaParticipantes } from '../state/hook/useListaParticipantes'

const ListaParticipantes = () => {

  const listaParticipantes: string[] = useListaParticipantes()

  return (
    <ul>
      {listaParticipantes.map((participante) => <li key={participante}>{participante}</li>)}
    </ul>
  )
}

export default ListaParticipantes
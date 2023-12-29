import {useState, useEffect} from 'react'
import styled from '@emotion/styled'
import Error from './Error'
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'



const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    margin-top: 30px;
    transition: background-color .3s ease;

    &:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }   
`

const Formulario = ({setMonedas}) => {

  const [criptos, setCriptos] = useState([])
  const [error, setError] = useState(false)

  const [moneda, SelectMonedas] = useSelectMonedas("Elige tu moneda", monedas)
  const [criptoMoneda, SelectCriptomoneda] = useSelectMonedas("Elige tu Criptomoneda", criptos)
  
  useEffect(() => {
    const consultarApi = async() => {
      const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"

      const respuesta = await fetch(url)
      const resultado = await respuesta.json()

      const arrayCriptos = resultado.Data.map(cripto => {

        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName,
        }

        return objeto
      })

      setCriptos(arrayCriptos)
    }
    consultarApi()
  }, [])

  const handleSubmit = e => {
    e.preventDefault()

    if([moneda, criptoMoneda].includes("")){
      setError(true)
      return
    }

    setError(false)
    
    setMonedas({
      moneda,
      criptoMoneda
    })
  }

  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}

      <form
        onSubmit={handleSubmit}
      >
        <SelectMonedas/>
        <SelectCriptomoneda/>

        <InputSubmit
          type='submit' 
          value="Cotizar"
        />
      </form>
    </>
    
    
  )
}

export default Formulario

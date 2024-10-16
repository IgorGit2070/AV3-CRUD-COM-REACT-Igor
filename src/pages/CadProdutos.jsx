// rafce
import React from 'react'
import { useState } from 'react';

//Importando o Form
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';

//Importando o Alerta
import Alert from 'react-bootstrap/Alert';

//Importando o Botão
import Button from 'react-bootstrap/Button';

//Importando o NavLink
import Nav from 'react-bootstrap/Nav'

//Importando o Link
import { Link } from 'react-router-dom';

//Importando o Navigate
import { useNavigate } from 'react-router-dom';

//Importar a NavBar
import NaveBar from '../components/NaveBar';

//Importando o CSS da página
import style from './CadProdutos.module.css'

//Importando a URL do server
const url = "http://localhost:5000/produtos"

const CadProdutos = () => {
    //Variaveis pro usuario
    //Variaveis pro produto
    const [nome, setNome] = useState("")
    const [categoria, setCategoria] = useState("")
    const [preco, setPreco] = useState("")
    
    //Variaveis pro Alerta
    const [alertaClass, setAlertaClass] = useState("mb-3 d-none")
    const [alertaMensagem, setAlertaMensagem] = useState("")

    //
    const navigate = useNavigate()

    //Criando o método para cadastrar o produto
    const handleSubmit = async (e) => {
      e.preventDefault()

      if( !nome == "" ) {
        if( !preco == "" ) {
            
            console.log("Entrei")
            const product = {nome, categoria, preco}
            const res = await fetch(url, {
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify(product)
            })
            alert("Cadastrado com sucesso")
            setNome("")
            setCategoria("")
            setPreco("")
            // navigate("/produtos")
        } else {
          setAlertaClass("mb-3")
          setAlertaMensagem("O campo preço não pode ser vazio")
        }
      } else {
        setAlertaClass("mb-3")
        setAlertaMensagem("O campo nome não pode ser vazio")
      }
    }

  return (
    // <div>CadProdutos</div>
    <div className={style.fundoPagina}>
        <NaveBar />
        <Container style={{padding: 20}}>
        <span class="material-symbols-outlined" style={{ fontSize: "100px"}}>inventory</span>
            <form onSubmit={handleSubmit}>
            {/* caixinha do nome */}
        <FloatingLabel
        controlId="floatingInputName"
        label="Nome"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="Digite seu nome" value={nome} onChange={ (e) => {setNome(e.target.value)}} />
      </FloatingLabel>

      {/* caixinha do preço */}
      <FloatingLabel
        controlId="floatingInputPrice"
        label="Preço"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="Digite o preço do produto" value={preco} onChange={ (e) => {setPreco(e.target.value)}} />
      </FloatingLabel>

      {/* caixinha da categoria */}
      <Form.Group controlId="formGridCategoria">
          <Form.Label>Categoria</Form.Label>
          <Form.Select value={categoria} onChange={(e) => {setCategoria(e.target.value)}}>
            <option>Perecíveis</option>
            <option>Açougue</option>
            <option>Frios e laticícios</option>
            <option>Padaria</option>
            <option>Cereais</option>
          </Form.Select>
        </Form.Group>

      

      {/* Alerta do erro */}
      <Alert key="danger" variant="danger" className={alertaClass}>
          {alertaMensagem}
        </Alert>

        <Button variant="primary" type='submit'>Cadastrar</Button>

        </form>

      </Container>
    </div>
  )
}

export default CadProdutos
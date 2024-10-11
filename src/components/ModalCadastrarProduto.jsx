import React from 'react'
import { useState } from 'react';

//Importando o Modal
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/esm/Container';

//Importando o Form
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

//Importando a URL do server
const url = "http://localhost:5000/produtos"

const ModalCadastrarProduto = (props) => {
    //Variaveis pro produto
    const [nome, setNome] = useState("")
    const [categoria, setCategoria] = useState("")
    const [preco, setPreco] = useState("")

    const handleCadastrar = async () => {
        if( nome != "" && categoria != "" && preco != ""){
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
            props.onHide()
        } else {
            alert("Cadastrado com sucesso")
        }
    }
    
  return (
    // <div>ModalCadastrar</div>
    <div>
        <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Cadastrar produto
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <h4>Centered Modal</h4> */}
        <Container style={{padding: 20, backgroundColor: "#90ee90", borderRadius: "10px"}}>
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


      </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleCadastrar}>Cadastrar</Button>
      </Modal.Footer>
    </Modal>
    </div>
  )
}

export default ModalCadastrarProduto
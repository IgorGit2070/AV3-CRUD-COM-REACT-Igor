// rafce
import React from 'react'
//
import { useState, useEffect } from 'react';
//
import Container from 'react-bootstrap/esm/Container';
//
import Button from 'react-bootstrap/Button';
//
import Table from 'react-bootstrap/Table';
//
import ButtonGroup from 'react-bootstrap/ButtonGroup';
//Importando o Componente Modal Cadastrar
import ModalCadastrarProduto from '../components/ModalCadastrarProduto';

//Importar a NavBar
import NaveBar from '../components/NaveBar';

//Importando o CSS da página
import style from './Produtos.module.css'

//Importando a URL do server
const url = "http://localhost:5000/produtos"

const Produtos = () => {
  //Lista de produtos
  const [produtos, setProdutos] = useState([])

  //ModalShow para ativar o buton
  const [modalCadastrarProduto, setModalCadastrarProduto] = useState(false);

  //Resgate de dados da API
  useEffect( () => {
    async function fetchData() {
      try {
        const res = await fetch(url)
        const products = await res.json()
        setProdutos(products)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchData()
    console.log(produtos)

  }, [])

  return (
    // <div>Produtos</div>
    <div className={style.fundoPagina}>
        <NaveBar />
      <Container>
        <h1>Lista de Produtos</h1>
        <div className='d-grid col-2 gap-2'>
        <Button variant="primary" size='lg' className='mb-3 d-inline-flex justify-content-center' onClick={() => {setModalCadastrarProduto(true)}}><span class="material-symbols-outlined flex" style={{ fontSize: "30px"}}>add_circle</span>Cadastrar</Button>
        </div>

        <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Categoria</th>
          <th>Preço</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {produtos.map((product) => (
        <tr key={product.id}>
          <td>{product.id}</td>
          <td>{product.nome}</td>
          <td>{product.categoria}</td>
          <td>{product.preco}</td>
          <td><ButtonGroup size='sm'>
      {/* Editar será implementado no futuro */}
      {/* <Button variant="info">Editar</Button> */}
      <Button variant="danger" onClick={async () => {
        const res = await fetch(`http://localhost:5000/produtos/${product.id}`, {
          method: "DELETE",
          headers: {"Content-Type": "application/json"},
          })

          const produtoRemovido = await res.json()
          alert(`Produto ${produtoRemovido.nome} foi excluído`)
      }}>Excluir</Button>
      </ButtonGroup></td>
        </tr>
        ))}
      </tbody>
    </Table>

    <ModalCadastrarProduto show={modalCadastrarProduto} onHide={ () => { setModalCadastrarProduto(false)}}/>

      </Container>
    </div>
  )
}

export default Produtos
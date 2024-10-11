import React from 'react'
import { useState, useEffect } from 'react';

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

//Importando o CSS da página
import style from './Login.module.css'

//Importando a URL do server
const url = "http://localhost:5000/usuarios"

const Login = () => {
    //Variaveis pro usuario
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    
    //Variaveis pro Alerta
    const [alertaClass, setAlertaClass] = useState("mb-3 d-none")
    const [alertaMensagem, setAlertaMensagem] = useState("")
    const [alertaVariant, setAlertaVariant] = useState("danger")

    //Lista de usuarios
    const [usuarios, setUsuarios] = useState([])

    //Resgate de dados da API
    useEffect( () => {
      async function fetchData() {
        try {
          const res = await fetch(url)
          const users = await res.json()
          setUsuarios(users)
        } catch (error) {
          console.log(error.message)
        }
      }
      fetchData()
      console.log(usuarios)

    }, [])

    //
    const navigate = useNavigate()

    //Armazenando no Local Storage do Navegador
    const gravarLocalStorage = (usuario) => {
      localStorage.setItem("userName", usuario.nome)
      localStorage.setItem("userEmail", usuario.email)
    }

    //Criando o método para logar
    const handleLogin = async (e) => {
      e.preventDefault()

      //
      const user = {email, senha}

      //Encontrando um usuaruio cadastrado
      const userToFind = usuarios.find(
        (userFind) => userFind.email == user.email
      )

      if( email != "" ) {
        if( senha != "" ) {
          if(userToFind != undefined && userToFind.senha == senha) {

            console.log(userToFind)
            console.log("Entrei")
            setAlertaClass("mb-3")
            gravarLocalStorage(userToFind)
            setAlertaMensagem("Login efetuado com Sucesso")
            setAlertaVariant("success")
            alert("Login efetuado com Sucesso")
            navigate("/produtos")

          } else {
            setAlertaClass("mb-3")
            setAlertaMensagem("Usuário ou senha inválidos")
          }
        } else {
          setAlertaClass("mb-3")
          setAlertaMensagem("O campo senha não pode ser vazio")
        }
      } else {
        setAlertaClass("mb-3")
        setAlertaMensagem("O campo email não pode ser vazio")
      }
    }

  
  return (
    // <div>Login</div>
    <div className={style.fundoPagina}>
        <Container style={{padding: 20, borderRadius: "10px"}}>
        <span class="material-symbols-outlined" style={{ fontSize: "100px"}}>login</span>
            <form onSubmit={handleLogin}>

      {/* caixinha do email*/}
      <FloatingLabel
        controlId="floatingInputEmail"
        label="Email"
        className="mb-3"
      >
        <Form.Control type="email" placeholder="name@example.com" value={email} onChange={ (e) => {setEmail(e.target.value)}} />
      </FloatingLabel>

      {/* caixinha da senha */}
      <FloatingLabel controlId="floatingPassword" label="Senha" className="mb-3">
        <Form.Control type="password" placeholder="Password" value={senha} onChange={ (e) => {setSenha(e.target.value)}} />
      </FloatingLabel>


      {/* Alerta do erro */}
      <Alert key="danger" variant={alertaVariant} className={alertaClass}>
          {alertaMensagem}
        </Alert>

        <Button variant="primary" type='submit'>Login</Button>

        </form>

        {/* <p>Não tem cadastro? <Nav.Link href="/cadastro">Cadastrar-se</Nav.Link></p> */}

        {/* <p>Não tem cadastro? <Link to="/cadastro">Cadastrar-se</Link></p> */}

      </Container>
    </div>
  )
}

export default Login
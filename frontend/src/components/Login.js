import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import logo from '../public/share32.png';
import axios from 'axios'
import { withAlert } from "react-alert";

class Login extends Component {
    constructor(props){
      super(props)
      this.state = {
        user : '',
        pass : '',
        status : 0,
        form : 'form-control'
      }
      this.handleInput = this.handleInput.bind(this);
      this.handleRegister = this.handleRegister.bind(this);
      this.handleLogin = this.handleLogin.bind(this);

    }
    handleInput(e){
      const { value, name} = e.target;
      this.setState({
        [name]: value
      })
    }
    handleRegister (){
      this.setState({
        status : 1
      })
    }
    handleLogin(){
      axios({
        method: 'post',
        url: '/auth/exec',
        data: {
          user: this.state.user,
          pass: this.state.pass,
        }
      })
      .then((response) => {
        
        window.sessionStorage.setItem("token", response.data.token);
        window.sessionStorage.setItem("user_id", response.data.user_id);
        window.sessionStorage.setItem("user", response.data.user);

        this.setState({
          status: 200
        })
        this.props.alert.success('Login!')

      })
      .catch((error) => {
        this.props.alert.error('Usuario o contraseña no válidos :(')

      })
    }
    handleClose(e){

    }
    render(){
      if(this.state.status === 200){
        return(<Redirect to="home" />);
      }
      if(this.state.status === 1){
        return(<Redirect to="/register" />);
      }
      return(
        <div className="col-md-4 Lg">
          <div className="card">
            <div className="card-header text-white bg-dark">
              <div className="row">
                <div className="col-md-2">
                  <img className="App-logo-login" src={logo} />
                </div>
                <div className="col-md-10 mt-2">
                  Bienvenido a SmartQueue - Entrar
                </div>
              </div>
            </div>
            <div className="row">
                <form className="card-body ml-4 mr-4">
                    <label>Usuario: </label>
                    <div className="input-group mb-3">
                        <input className={this.state.form} onChange={this.handleInput} type="text" name="user" required/>
                    </div>
                    <label>Contraseña: </label>
                    <div className="input-group mb-3">
                        <input className={this.state.form} onChange={this.handleInput} type="password" name="pass" required/>
                    </div>
                </form>
            </div>
              <div className="card-footer bg-dark ">
                  <div className="row">
                    <button type="submit" onClick={this.handleLogin} className="btn btn-outline-primary col-md-5" name="button">Entrar</button>
                    <div className="col-md-2"></div>
                    <button type="button" onClick={this.handleRegister} className="btn btn-outline-warning col-md-5" name="button">Registrarse</button>
                  </div>
              </div>
            </div>
          </div>
      )
    }
}
export default withAlert(Login);

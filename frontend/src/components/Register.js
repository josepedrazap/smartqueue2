import React, { Component } from 'react'
import logo from '../public/share32.png';
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { withAlert } from "react-alert";

class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
      cancel : 0,
      user : '',
      pass : '',
      pass_rpt : '',
      status: 0

    }
    this.handleCancel = this.handleCancel.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleInput = this.handleInput.bind(this);

  }
  handleCancel(){
    this.setState({
      status : 1
    })
  }
  handleInput(e){
    const { value, name} = e.target;
    this.setState({
      [name]: value
    })
  }
  handleRegister(){
      if(this.state.user.length < 6){
        this.props.alert.error('El nombre debe contener mínimo 6 caracteres!')
      }else if(this.state.pass.length < 6){
        this.props.alert.error('La contraseña debe contener mínimo 6 caracteres!')
      }else if(this.state.pass !== this.state.pass_rpt){
        this.props.alert.error('Las contraseñas no coinciden!')
      }else{
        axios({
          url: '/auth/create_user',
          method: 'post',
          data: {
            user: this.state.user,
            pass: this.state.pass,
            pass_rpt: this.state.pass_rpt
          }
        })
        .then((response) => {

          if(response.data === 500){
            alert('Ha ocurrido un error')
          }else if(response.data === 600){
            this.props.alert.error('El usuario ya existe!')

          }else{
            this.setState({
              status: 1
            })
            this.props.alert.success('Registrado con éxito!')
          }

        })
        .catch((error) => {

        });
    }
}
    render(){

      if(this.state.status === 1){
        return(<Redirect to='login' />)
      }
      return(
        <div className="col-md-4 Rg">
          <div className="card">
          <div className="card-header text-white bg-dark">
            <div className="row">
              <div className="col-md-2">
                <img className="App-logo-login" src={logo} />
              </div>
              <div className="col-md-10 mt-2">
                Bienvenido a SmartQueue - Registrar
              </div>
            </div>
          </div>
          <div className="row">
                <form className="card-body ml-4 mr-4">
                    <label>Ingrese usuario: </label>
                    <div className="input-group mb-3">
                        <input className="form-control" onChange={this.handleInput} type="text" name="user" required/>
                    </div>
                    <label>Ingrese contraseña: </label>
                    <div className="input-group mb-3">
                        <input className="form-control" onChange={this.handleInput} type="password" name="pass" required/>
                    </div>
                    <label>Reingrese contraseña: </label>
                    <div className="input-group mb-3">
                        <input className="form-control" onChange={this.handleInput} type="password" name="pass_rpt" required/>
                    </div>
                </form>
          </div>
              <div className="card-footer bg-dark ">
                  <div className="row">
                    <button type="submit" onClick={this.handleRegister} className="btn btn-outline-success col-md-5" name="button">Registrar</button>
                    <div className="col-md-2"></div>
                    <button type="submit" onClick={this.handleCancel} className="btn btn-outline-danger col-md-5" name="button">Cancelar</button>
                  </div>
              </div>
            </div>
          </div>
      )
    }
}
export default withAlert(Register);

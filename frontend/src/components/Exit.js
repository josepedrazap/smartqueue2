import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import logo from '../public/share32.png';
import { withAlert } from "react-alert";

class Exit extends Component {
    constructor(props){
      super(props)
      this.state = {
        exit: 0
      }
      this.handleExit = this.handleExit.bind(this);
      this.handleReturn = this.handleReturn.bind(this);

    }
    handleExit(){
      this.setState({
        exit: 1
      });
      this.props.alert.show('Hasta luego, que vuelvas pronto!');
      window.sessionStorage.setItem("token", "0");
    };
    handleReturn(){
      this.setState({
        exit: 2
      });
    };

    render(){

      if(window.sessionStorage.getItem("token") === "0"){
        return(<Redirect to="login" />)
      }

      if(this.state.exit === 1){
        return(<Redirect to="login" />);
      }
      if(this.state.exit === 2){
        return(<Redirect to="home" />);
      }
      return(
        <div className="col-md-3 Lg">
          <div className="card">
            <div className="card-header text-white bg-dark">
              <div className="row">
                <div className="col-md-2">
                  <img className="App-logo-login" src={logo} />
                </div>
                <div className="col-md-10 mt-2">
                SmartQueue - Salir
                </div>
              </div>
            </div>
            <div className="row">
                <form className="card-body ml-4 mr-4">
                    <p>¿Estás seguro de que deseas abandonar tu sesión?</p>
                </form>
            </div>
              <div className="card-footer bg-dark ">
                  <div className="row">
                    <button type="submit" onClick={this.handleExit} className="btn btn-outline-success col-md-5" name="button">Sí, salir</button>
                    <div className="col-md-2"></div>

                    <button type="button" onClick={this.handleReturn} className="btn btn-outline-warning col-md-5" name="button">No, volver</button>

                  </div>
              </div>
            </div>
          </div>
      )
    }
}
export default withAlert(Exit);

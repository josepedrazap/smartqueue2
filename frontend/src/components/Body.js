import React, { Component } from 'react'
import Card_queue from './Card_queue'
import logo from '../public/share64.png';
import { Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom'

class Body extends Component {
  static propTypes = {
    token: PropTypes.String
  };

  constructor(props){
    super(props);
    this.state = {
      queues: [],
      status: 0,
    }
  }
  componentWillMount() {
    var url = '/run/queue_header/list?id_user=' + window.sessionStorage.getItem("user_id");
    fetch(url, {
      headers: {
        authorization: 'beare '+ window.sessionStorage.getItem("token")
      }
    })
     .then((response) => {
       console.log(response);
       if(response.status){
         this.setState({ status: response.status})
       }else{
         this.setState({ status: 0})
       }
       return response.json();
    })
    .then((data) => {
      this.setState({ queues: data })
    })
    .catch(error => console.error('Error:', error))


  }
  componentDidMount(){
  }

  render(){

    if(window.sessionStorage.getItem("token") === "0"){
      return(<Redirect to="login" />)
    }
      const options = {
        timeout: 5000,
        position: "bottom center"
      }

      const { token } = this.props;

      if (this.state.status === 403){
        return(<Redirect to="login" />)
      }else{

        if (this.state.queues.length > 0 && this.state.status !== 0) {
          const cards = this.state.queues.map((queue, i) => {
            return (
              <Provider
                template={AlertTemplate} {...options}
              >
                <Card_queue
                  title={queue.name}
                  n_nodes="0"
                  address={queue.address}
                  description={queue.description}
                  queue_id={queue._id}
                />
              </Provider>
            )
          })
        return(
          <div className="container">
            <div className="row mt-4">
              {cards}
            </div>
          </div>
        )
      }else if(this.state.queues.length === 0 && this.state.status !== 0){
          return (
            <div className="col-md-4 Div-body-cargando">
              <img className="App-logo" src={logo} />
              <p className="text-center Font-body-cargando text-white ">No tienes queues :( </p>
              <p className="text-center text-white ">Crea una con el botón + que está parpadeando </p>
            </div>
          )
        }else{
          return (
            <div className="col-md-4 Div-body-cargando">
              <img className="App-logo" src={logo} />
              <p className="text-center Font-body-cargando text-white ">Cargando queues... </p>
              <p className="text-center text-white ">(Comprobando la conexión) </p>

            </div>
          )
        }
    }
  }
}
export default connect((state) => ({
  token: state.auth.token
}), null)(Body);

import React, {Component} from 'react'
import Maps from './Maps'
import { Redirect } from 'react-router-dom'
import { render } from "react-dom";
import ReactTable from "react-table";
import logo from '../public/share32.png';

class Maps_queue extends Component {
  constructor(){
    super();
    this.state = {
      status: 0,
      queues: []
    }
    this.handleQuit = this.handleQuit.bind(this);

    var url = '/run/queue_header/list?id_user=' + window.sessionStorage.getItem("user_id");
    fetch(url, {
      headers: {
        authorization: 'beare '+ window.sessionStorage.getItem("token")
      }
    })
     .then((response) => {
       if(response.status){
         this.setState({ status: response.status})
       }else{
         this.setState({ status: 0})
       }
       return response.json();
    })
    .then((data) => {
      console.log(data);

      this.setState({ queues: data })
    })
    .catch(error => console.error('Error:', error))
  }

  handleQuit(){
    this.setState({
      status: 1
    })
  }
  render () {
    if(window.sessionStorage.getItem("token") === "0"){
      return(<Redirect to="login" />)
    }

    if(this.state.status == 1){
      return(<Redirect to="home" />)
    }

  const columns = [{
    Header: 'Nombre',
    accessor: 'name' // String-based value accessors!
  }, {
    Header: 'Dirección',
    accessor: 'address',
  }]

    return(
    <div className="col-md-8 Cq">
      <div className="card">
      <div className="card-header text-white bg-dark">
        <div className="row">
          <div className="col-md-1">
            <img className="App-logo-login" src={logo} />
          </div>
          <div className="col-md-11 mt-2">
            Queues por posición geográfica
          </div>
        </div>
      </div>
        <div className="row">
          <div className="col-md-6">
          <ReactTable
              data={this.state.queues}
              columns={columns}
              defaultPageSize={5}
              className="-striped -highlight"
          />
          </div>
          <div className="col-md-6">
            <Maps />
          </div>
        </div>

        <div className="card-footer bg-dark ">
          <div className="row text-align:center">
              <div className="col-md-4"></div>
              <button type="submit" onClick={this.handleQuit} className="btn col-md-4 btn-outline-success" name="button">Aceptar</button>

          </div>
        </div>

      </div>
    </div>
    )
  }
};
export default Maps_queue;

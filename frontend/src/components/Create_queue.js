import React, {Component} from 'react'
import SimpleExample from './SimpleExample'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { withAlert } from "react-alert";
import logo from '../public/share32.png';


class Create_queue extends Component {
  constructor(){
    super();
    this.state = {
      title: '',
      address: '',
      description: '',
      queue_id: '',
      lat: 0,
      lng: 0,
      status: 0
    };

    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude)
      this.setState({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    })

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClose = this.handleClose.bind(this);

  }
  handleInput(e){
    const { value, name} = e.target;
    this.setState({
      [name]: value
    })
  }
  handleSubmit(e){
    if(this.state.title.length < 1){
      this.props.alert.error('Debes ingresar un nombre para la queue.')
    }else if(this.state.lat === 0 || this.state.long === 0){
      this.props.alert.error('Debes ingresar una posición geografica para la queue.')
    }else{
    axios({
      method: 'post',
      url: '/run/queue/create_queue',
      data: {
        lat: this.state.lat,
        long: this.state.lng,
        name_queue: this.state.title,
        alias_qr_queue: '',
        address_queue: this.state.address,
        description_queue: this.state.description,
      },
      headers: {
        authorization: 'beare '+ window.sessionStorage.getItem("token")
      }
    })
    .then((response) => {
      if(response.status === 200){
        this.props.alert.success('Se ha creado la queue!')

        this.setState({status: response.status})
      }
    })
    .catch((error) => {
      this.setState({status: 500})
    });
    }
  }
  handleClose(e){
    this.setState({
      status: 200
    })
  }

  handleSearch(e){
    const provider = new OpenStreetMapProvider();
    provider
      .search({ query: this.state.address })
      .then((result) => {
        console.log(result);
        if(result.length > 0){
          this.setState({
            lat: result[0].y,
            lng: result[0].x
          })
        }

      });
  }

  render () {
    if(window.sessionStorage.getItem("token") === "0"){
      return(<Redirect to="login" />)
    }
    if (this.state.status === 403){
      return(<Redirect to="login" />)
    }
    if(this.state.status === 200){
      return(<Redirect to="/home" />);
    }else{
      return(
      <div className="col-md-8 col-sm-10 col-12 Cq">
        <div className="card">
        <div className="card-header text-white bg-dark">
          <div className="row">
            <div className="col-md-1">
              <img className="App-logo-login" src={logo} />
            </div>
            <div className="col-md-11 mt-2">
              Creando una queue
            </div>
          </div>
        </div>
          <div className="row">
                <div className="col-md-6 col-lg-6 col-12">
                  <form className="card-body" >

                    <label>Nombre: </label>
                    <div className="input-group mb-3">
                      <input className="form-control" onChange={this.handleInput} type="text" name="title" required/>
                    </div>

                    <label>Dirección geográfica: </label>
                    <div className="input-group mb-3">
                      <input className="form-control" onChange={this.handleInput} type="text" name="address" required/>
                      <div className="input-group-append">
                        <button className="btn btn-dark"  onClick={this.handleSearch} type="button">Buscar</button>
                      </div>
                    </div>

                    <label>Descripción: </label>
                    <div className="input-group mb-3">
                      <input className="form-control" onChange={this.handleInput} type="text" name="description" required/>
                    </div>
                  </form>
                </div>

            <div className="col-md-6 col-12 map-cq border-solid">
              <SimpleExample
                title={this.state.title}
                lat={this.state.lat}
                lng={this.state.lng}
              />
            </div>
          </div>

          <div className="card-footer bg-dark ">
            <div className="row Cq_buttons">
                <button type="submit" onClick={this.handleSubmit} className="btn col-md-3 col-sm-6 col-6 btn-outline-success mr-1" name="button">Aceptar</button>
                <button type="button" onClick={this.handleClose} className="btn col-md-3 col-sm-6   col-6 btn-outline-warning" name="button">Cancelar</button>
            </div>
          </div>

        </div>
      </div>
      )
    }

  }
};
export default withAlert(Create_queue);

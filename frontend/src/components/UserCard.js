import React, { Component } from 'react';
import PropTypes from 'prop-types'
//import { Redirect } from 'react-router-dom'

class UserCard extends Component {

  constructor(props){
    super(props);
    this.state = {

    };

  }
  render(){
    return (
      <div className="col-md-2">
        <div className="card bg-light">
          <div className="card-header text-white bg-dark">
            Usuario
          </div>
          <div className="card-footer bg-dark">
            <div className="row mx-auto">
              <button type="button" className="btn col-md-6 btn-info" name="button"><i className="far fa-eye"></i></button>
              <button type="button" className="btn col-md-6 btn-outline-danger" name="button"><i className="fas fa-trash-alt"></i></button>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

  export default UserCard;

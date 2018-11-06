import React , {Component} from 'react'
import PropTypes from 'prop-types';
import { Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
class Content extends Component {

  static propTypes = {
    body: PropTypes.object.isRequired,
    token: PropTypes.String
  };

  render() {
    const { token } = this.props;
    const { body } = this.props;
    const options = {
      timeout: 5000,
      position: "bottom center"
    };
        return (
          <Provider
            template={AlertTemplate} {...options}
          >
            <div>
              {body}
            </div>
          </Provider>
        );
  }
}

export default connect(state => ({
  token: state.auth.token
}), null)(Content);

import React, {Component} from 'react'

class Table_queues extends Component {
  render(){
    return (
      <table className="table table-striped table-dark table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Id usuario</th>
            <th scope="col">Hora de llegada</th>
            <th scope="col">Tiempo promedio de espera</th>
            <th scope="col">Número</th>
            <th scope="col">Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>data</td>
            <td>data</td>
            <td>data</td>
            <td>data</td>
            <td>
              <button type="button" className="btn btn-danger" name="button"><i className="fas fa-trash-alt"></i></button>
            </td>
          </tr>
        </tbody>
    </table>
    )
  }
}

export default Table_queues;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Kremowka = props => (
  <tr>
    <td>{props.kremowka.username}</td>
    <td>{props.kremowka.nazwa_kremowki}</td>
    <td>{props.kremowka.opis}</td>
    <td>{props.kremowka.ilosc}</td>
    <td>{props.kremowka.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.kremowka._id}>edit</Link> | <a href="#" onClick={() => { props.deleteKremowka(props.kremowka._id) }}>delete</a>
    </td>
  </tr>
)

export default class KremowkaList extends Component {
  constructor(props) {
    super(props);

    this.deleteKremowka = this.deleteKremowka.bind(this)

    this.state = {kremowki: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/towary/')
      .then(response => {
        this.setState({ kremowki: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteKremowka(id) {
    axios.delete('http://localhost:5000/towary/delete/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      kremowki: this.state.kremowki.filter(el => el._id !== id)
    })
  }

  kremowkaList() {
    return this.state.kremowki.map(currentkremowka => {
      return <Kremowka kremowka={currentkremowka} deleteKremowka={this.deleteKremowka} key={currentkremowka._id}/>;
    })
  }

  render() {
    return (
      <div className="container">
        <h3>Nasze kremówki</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Nazwa kremówki</th>
              <th>Opis</th>
              <th>Ilość</th>
              <th>Data</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.kremowkaList() }
          </tbody>
        </table>
      </div>
    )
  }
}
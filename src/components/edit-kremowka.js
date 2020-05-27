import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditKremowka extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeNazwa = this.onChangeNazwa.bind(this);
    this.onChangeOpis = this.onChangeOpis.bind(this);
    this.onChangeIlosc = this.onChangeIlosc.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      nazwa_kremowki: '',
      opis: '',
      ilosc: 0,
      date: new Date(),
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/towary/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          nazwa_kremowki: response.data.nazwa_kremowki,
          opis: response.data.opis,
          ilosc: response.data.ilosc,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeNazwa(e) {
    this.setState({
      nazwa_kremowki: e.target.value
    })
  }

  onChangeOpis(e) {
    this.setState({
      opis: e.target.value
    })
  }

  onChangeIlosc(e) {
    this.setState({
      ilosc: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const kremowka = {
      username: this.state.username,
      nazwa_kremowki: this.state.nazwa_kremowki,
      opis: this.state.opis,
      ilosc: this.state.ilosc,
      date: this.state.date
    }

    console.log(kremowka);

    axios.patch('http://localhost:5000/towary/update/' + this.props.match.params.id, kremowka)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edytuj informacje o danym produkcie</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Nazwa produktu: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.nazwa_kremowki}
              onChange={this.onChangeNazwa}
              />
        </div>
        <div className="form-group"> 
          <label>Opis: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.opis}
              onChange={this.onChangeOpis}
              />
        </div>
        <div className="form-group">
          <label>Ilosc: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.ilosc}
              onChange={this.onChangeIlosc}
              />
        </div>
        <div className="form-group">
          <label>Data: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Zmień kremówkę" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}
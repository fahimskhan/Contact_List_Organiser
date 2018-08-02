import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
    }
  }

  componentDidMount() {
    
  }

  getNewContact(contact) {
    let copyContacts = this.state.contacts.slice();
    copyContacts.push(contact);
    this.setState({
      contacts: copyContacts,
    })
  }

  render() {
    return(
      <div className="Container">
        <table>
          <tr className="TopHeaders">
            <td>
              <h5>Remove</h5>
            </td>
            <td>
              <h4>Contact Name</h4>
            </td>
            <td>
              <h4>Phone Number</h4>
            </td>
            <td>
              <h4>Date of Birth</h4>
            </td>
            <td>
              <h5>Update</h5>
            </td>
          </tr>
          {/* <div className='ContactItems'> */}
            {this.state.contacts.map((contact) =>
              <tr className="ContactItems">
              <td>
                <button style={{margin: 5}} className="btn btn-danger glyphicon glyphicon-remove"></button>
              </td>
              <td>
                {contact.name}
              </td>
              <td>
                {contact.number}
              </td>
              <td>
                {contact.dob}
              </td>
              <td>
                <button style={{margin: 5}} className="btn btn-success glyphicon glyphicon-pencil"></button>
              </td>
            </tr>
            )}
          {/* </div> */}
        </table>
        <NewContact addContact={(contact) => this.getNewContact(contact)}/>
      </div>

    )
  }
}

class NewContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      number: '',
      dob: '',
    }
  }

  componentDidMount() {
    this.setState({
      name: '',
      number: '',
      dob: '',
    })
  }

  newName(e) {
    this.setState({
      name: e.target.value,
    })
  }

  newNumber(e) {
    this.setState({
      number: e.target.value,
    })
  }

  newDob(e) {
    console.log(e.target.value);
    this.setState({
      dob: e.target.value,
    })
  }

  render() {
    return (<div className="NewContact">
      <div>
        <button className='btn btn-primary Button' onClick={(e) => this.props.addContact({name: this.state.name, number: this.state.number, dob: this.state.dob})}>Add New Contact</button>
      </div>
      <div className="InputFields">
        <input type="text" className="ContactInput Input" value={this.state.name} placeholder="Contact name" onChange={(e) => this.newName(e)}/>
        <input type="text" className="NumberInput Input" value={this.state.number} placeholder="Phone number" onChange={(e) => this.newNumber(e)}/>
        <input type="date" className="DobInput Input" value={this.state.dob} onChange={(e) => this.newDob(e)}/>
      </div>
    </div>);
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (<div className="App">
      <header className="App-header">
        <img src='https://upload.wikimedia.org/wikipedia/commons/b/b7/Google_Contacts_logo.png' className="App-logo" alt="logo"/>
        <h1 className="App-title">Contact Organiser</h1>
      </header>
      <p className="App-intro">
        Welcome! Add, remove and search your contacts. It's that easy!
      </p>
      <Contacts />
    </div>);
  }
}

export default App;

import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      number: '',
      email: '',
      contacts: [],
    }
  }

  componentDidMount() {
    const outerThis = this;
    fetch('/db/all', {
      method: 'GET',
      credentials: 'same-origin'
    }).then(res => res.json())
    .then(json => {
      outerThis.setState({
        contacts: json,
      })
    })
    .catch((err) => {
      console.log(err)
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

  newEmail(e) {
    this.setState({
      email: e.target.value,
    })
  }

  getNewContact(e) {
    e.preventDefault();
    const outerThis = this;
    fetch('/db/add', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: outerThis.state.name,
        number: outerThis.state.number,
        email: outerThis.state.email,
      })
      }).then((res)=> {
      if (res.status === 200) {
        let contact = {
          name: outerThis.state.name,
          number: outerThis.state.number,
          email: outerThis.state.email,
        }
        this.setState({
          contacts: outerThis.state.contacts.concat(contact)
        })
      } else {
        console.log('error')
      }
      }).catch((err) => {
      console.log('error')
    })
  }

  removeContact(number) {
    //console.log(number)
    const outerThis = this;
    fetch('/db/remove', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        //name: outerThis.state.name,
        number: number,
        //email: outerThis.state.email,
      })
      }).then((res)=> {
      if (res.status === 200) {
        fetch('/db/all', {
          method: 'GET',
          credentials: 'same-origin'
        }).then(res => res.json())
        .then(json => {
          outerThis.setState({
            contacts: json,
          })
        })
        .catch((err) => {
          console.log(err)
        })
      } else {
        console.log('error')
      }
      }).catch((err) => {
      console.log('error')
    })
  }

  render() {
    return(
      <div className="Container">
        <NewContact name={this.state.name} number={this.state.number} email={this.state.email} updateName={(e) => this.newName(e)} updateNumber={(e) => this.newNumber(e)} updateEmail={(e) => this.newEmail(e)} addContact={(contact) => this.getNewContact(contact)}/>
        <table>{ this.state.contacts[0] ?
          <tr className="TopHeaders">
            <td>
              <h4>Contact Name</h4>
            </td>
            <td>
              <h4>Phone Number</h4>
            </td>
            <td>
              <h4>Email Address</h4>
            </td>
            <td>
            </td>
            <td>
            </td>
          </tr> :
          <tr className="TopHeaders"></tr>
        }
            {this.state.contacts.map((contact) =>
              <tr className="ContactItems">
              <td>
                {contact.name}
              </td>
              <td>
                {contact.number}
              </td>
              <td>
                {contact.email}
              </td>
              <td>
                <button style={{margin: 5}} className="btn btn-success glyphicon glyphicon-pencil"></button>
              </td>
              <td>
                <button style={{margin: 5}} className="btn btn-danger glyphicon glyphicon-remove" onClick={() => this.removeContact(contact.number)}></button>
              </td>
            </tr>
            )}
        </table>
      </div>

    )
  }
}

class NewContact extends Component {

  render() {
    return (<div className="NewContact">
      <div className="InputFields">
        <input type="text" className="ContactInput Input" value={this.props.name} placeholder="Contact name" onChange={(e) => this.props.updateName(e)}/>
        <input type="text" className="NumberInput Input" value={this.props.number} placeholder="Phone number" onChange={(e) => this.props.updateNumber(e)}/>
        <input type="email" className="EmailInput Input" value={this.props.email} placeholder="Email address" onChange={(e) => this.props.updateEmail(e)}/>
      </div>
      <div>
        <button className='btn btn-primary Button' onClick={(e) => this.props.addContact(e)}>Add New Contact</button>
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
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <img src='http://icons.iconarchive.com/icons/graphicloads/100-flat/256/bucket-icon.png' className="App-logo-1" alt="logo"/>
          <img src='http://icons.iconarchive.com/icons/graphicloads/100-flat/256/email-2-icon.png' className="App-logo-2" alt="logo"/>
          <img src='http://icons.iconarchive.com/icons/graphicloads/100-flat/256/phone-icon.png' className="App-logo-3" alt="logo"/>
          <img src='http://icons.iconarchive.com/icons/graphicloads/100-flat/256/zoom-search-2-icon.png' className="App-logo-4" alt="logo"/>
          <img src='http://icons.iconarchive.com/icons/graphicloads/100-flat/256/contact-icon.png' className="App-logo-5" alt="logo"/>
          <img src='http://icons.iconarchive.com/icons/graphicloads/100-flat/256/pencil-icon.png' className="App-logo-6" alt="logo"/>
        </div>
        <div>
          <h1 className="App-title">Contact List Manager</h1>
        </div>
      </header>
      <p className="App-intro">
        Welcome! Add, remove and search your contacts. It's that easy!
      </p>
      <Contacts />
    </div>);
  }
}

export default App;

import React, { Component } from 'react';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import axios from 'axios';



class App extends Component {

  state = {
    opportunities:[]
  }

  componentWillMount(){
    axios.get('https://api-staging.aiesec.org/v2/opportunities?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c').then((response) => {
      let data = response.data
      let opportunities = data.data
      console.log(opportunities)
      this.setState({
        opportunities: opportunities,
        description: ''
      })
    });
  }



  getDescription = (id) => {
    console.log("Reached GetDescription with id", id)
    let data = ''
    axios.get('https://api-staging.aiesec.org/v2/opportunities/'+id+'?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c').then((response) => {
       data = response.data
      console.log(data.description)
      //  this.setState({description:data.description}) 
    });
    return data.description

  }

  render() {
    // console.log(this.state.opportunities[0].title)
    let opportunities = this.state.opportunities.map((opportunity,index) => {
      return (
        <tr key={index}>
          <td>{opportunity.id}</td>
          <td>{opportunity.title}</td>
          <td>{opportunity.applications_close_date}</td>
          <td>{opportunity.earliest_start_date}</td>
          <td>{opportunity.latest_end_date}</td>
          <td>{this.getDescription(opportunity.id)}</td>
          <td>
          <Button color="success" size="sm" className="mr-2">Edit</Button>
          </td>
        </tr>
      )
    });
    return (
      <div className="App container">
          <h1>AISEC Opportunities</h1>
          <Table>
          <thead>
            <tr>
              <th>Opportunities</th>
              <th>Title</th>
              <th>App Close Date</th>
              <th>Earliest start date</th>
              <th>Latest End date</th>
              <th>Description</th>

            </tr>
          </thead>

          <tbody>
            {opportunities}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import axios from 'axios';



class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      opportunities: [],
      description: []
    }
  }

  componentDidMount(){
    axios.get('https://api-staging.aiesec.org/v2/opportunities?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c').then((response) => {
      let data = response.data
      let opportunities = data.data
      console.log("Inside getAllDetails")
      console.log(opportunities)
      let description = []
      opportunities.map((opportunity,index) => {
         axios.get('https://api-staging.aiesec.org/v2/opportunities/'+opportunity.id+'?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c').then((response)=>{
          description[index] = response.data.description
        })
    })
    if(description.length >23){
      console.log("adsedafgsafsa",description)
    }
  })  
  }


  fetch = () => {
    this.getAllDetails().then((data)=>{
      console.log("After fetching values")
      console.log(data)
      let description = this.getDescription(data)
      console.log("Finally got the description values")
      console.log(description)
      return description
      this.setState({opportunities:data,description})

    })
  
  }

  

  getAllDetails = () => {
    let opportunities = []
    return axios.get('https://api-staging.aiesec.org/v2/opportunities?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c').then((response) => {
      let data = response.data
      opportunities = data.data
      console.log("Inside getAllDetails")
      console.log(opportunities)
      return opportunities
    });
    // return opportunities
  }

  getDescription = (opportunities) => {
    // let opportunities = this.getAllDetails()
    console.log("Got inside the getDescription")
    console.log("Opportunities are populated inside getDescription")
    console.log(opportunities)
    let description = []
    opportunities.map((opportunity,index) => {
         axios.get('https://api-staging.aiesec.org/v2/opportunities/'+opportunity.id+'?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c').then((response)=>{
          description[index] = response.data.description
        })
        
    })
    
    // if(s) {
    //   console.log("Inside if condition")
    //   console.log(s)
    //   return s
    // }
     
    

  }

  render() {
    // console.log("Inside render")
    // console.log(this.fetchKaro())
    let opportunities = this.state.opportunities.map((opportunity,index) => {
      return (
        <tr key={index}>
          <td>{opportunity.id}</td>
          <td>{opportunity.title}</td>
          <td>{opportunity.applications_close_date}</td>
          <td>{opportunity.earliest_start_date}</td>
          <td>{opportunity.latest_end_date}</td>
          <td>{this.state.description[index]}</td>
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

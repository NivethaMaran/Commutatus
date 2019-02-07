import React, { Component } from 'react';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import axios from 'axios';



class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      opportunities: [],
      description: [],
      selection_process:[],
      salary:[]
    }
  }

  componentDidMount(){
   this.fetch()
  }


  fetch = () => {
    this.getAllDetails().then((data)=>{
      this.getDescription(data).then((d)=>{
      })
      this.getSelectionProcess(data).then((d)=>{
      })
      this.getSalary(data).then((d)=>{
        this.setState({opportunities:data})
      })
      
    })
  }

  

  getAllDetails = () => {
    let opportunities = []
    return axios.get('https://api-staging.aiesec.org/v2/opportunities?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c').then((response) => {
      let data = response.data
      opportunities = data.data
      return opportunities
    });
  }

  getDescription=async(opportunities)=>{
    let description = []
    await Promise.all(opportunities.map(async (opportunity,index): Promise<description> => {
       return axios.get('https://api-staging.aiesec.org/v2/opportunities/'+opportunity.id+'?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c').then((res)=>{
        description[index] = res.data.description
        return res.data.description
      })

    }))
    this.setState({description})
  }


  getSelectionProcess=async(opportunities)=>{
    let selection_process = []
    await Promise.all(opportunities.map(async (opportunity,index): Promise<description> => {
       return axios.get('https://api-staging.aiesec.org/v2/opportunities/'+opportunity.id+'?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c').then((res)=>{
        selection_process[index] = res.data.role_info.selection_process
        return res.data.role_info.selection_process
      })

    }))
    this.setState({selection_process})
  }

  getSalary=async(opportunities)=>{
    let salary = []
    await Promise.all(opportunities.map(async (opportunity,index): Promise<description> => {
       return axios.get('https://api-staging.aiesec.org/v2/opportunities/'+opportunity.id+'?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c').then((res)=>{
        salary[index] = res.data.specifics_info.salary
        return res.data.specifics_info.salary
      })

    }))
    this.setState({salary})
  }
  

  render() {
    let opportunities = this.state.opportunities.map((opportunity,index) => {
      return (
        <tr key={index}>
          <td>{opportunity.id}</td>
          <td>{opportunity.title}</td>
          <td>{opportunity.applications_close_date}</td>
          <td>{opportunity.earliest_start_date}</td>
          <td>{opportunity.latest_end_date}</td>
          <td>{this.state.description[index]}</td>
          <td>{this.state.selection_process[index]}</td>
          <td>{this.state.salary[index]}</td>
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
              <th>Selection Process</th>
              <th>Salary</th>
            </tr>
          </thead>
          {opportunities.length > 0 ?  (<tbody>
              {opportunities}
          </tbody>): (<tbody>Loading...</tbody>)}
        </Table>
      </div>
    );
  }
}

export default App;

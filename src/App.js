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
      salary:[],
      editOppModal: false,
      editOppData: {
        id: '',
        title: '',
        applications_close_date: '',
        earliest_start_date:'',
        latest_end_date:'',
      },
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

  toggleEditOppModal() {
    this.setState({
      editOppModal: ! this.state.editOppModal
    });
  }

  editOpportunity(id, title, applications_close_date,earliest_start_date,latest_end_date) {
    this.setState({
      editOppData: { id, title, applications_close_date,earliest_start_date,latest_end_date}, editOppModal: ! this.state.editOppModal
    });
  }
  
  updateOpportunity(id) {
    let { title, applications_close_date, earliest_start_date, latest_end_date } = this.state.editOppData;
    console.log("Inside update task")
    console.log(id)
    console.log(applications_close_date)
    axios.patch('https://api-staging.aiesec.org/v2/opportunities/'+id+'?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c&opportunity%5Btitle%5D='
    +title+'&opportunity[applications_close_date]='+applications_close_date+'&opportunity[earliest_start_date]='+earliest_start_date+'&opportunity[latest_end_date]='+latest_end_date
      // title, applications_close_date
    ).then((response) => {
      this._refreshOpportunity();

      this.setState({
        editOppModal: false, editOppData: { id: '', title: '', applications_close_date: '',earliest_start_date: '', latest_end_date:'' }
      })
    });
  }


  _refreshOpportunity() {

    this.getAllDetails().then((data)=>{this.setState({opportunities:data})})
    
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
          <Button color="success" size="sm" className="mr-2" onClick={this.editOpportunity.bind(this, opportunity.id, opportunity.title, opportunity.applications_close_date,opportunity.earliest_start_date, opportunity.latest_end_date)}>Edit</Button>
          </td>
        </tr>
      )
    });
    return (
      <div className="App container">
          <h1>AISEC Opportunities</h1>



    <Modal isOpen={this.state.editOppModal} toggle={this.toggleEditOppModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditOppModal.bind(this)}>Edit this opportunity</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input id="title" value={this.state.editOppData.title} onChange={(e) => {
              let { editOppData } = this.state;

              editOppData.title = e.target.value;

              this.setState({ editOppData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="applications_close_date">Application Close Date</Label>
            <Input id="applications_close_date" value={this.state.editOppData.applications_close_date} onChange={(e) => {
              let { editOppData } = this.state;

              editOppData.applications_close_date = e.target.value;

              this.setState({ editOppData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="earliest_start_date">Earliest start Date</Label>
            <Input id="earliest_start_date" value={this.state.editOppData.earliest_start_date} onChange={(e) => {
              let { editOppData } = this.state;

              editOppData.earliest_start_date = e.target.value;

              this.setState({ editOppData });
            }} />
          </FormGroup>

          <FormGroup>
            <Label for="latest_end_date">Latest End Date</Label>
            <Input id="latest_end_date" value={this.state.editOppData.latest_end_date} onChange={(e) => {
              let { editOppData } = this.state;

              editOppData.latest_end_date = e.target.value;

              this.setState({ editOppData });
            }} />
          </FormGroup>


        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateOpportunity.bind(this,this.state.editOppData.id)}>Update Opportunity</Button>{' '}
          <Button color="secondary" onClick={this.toggleEditOppModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>




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

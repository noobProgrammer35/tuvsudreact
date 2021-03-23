import React, {Component, useState} from "react"
import {
   Form,Modal,Button,Row,Col,FormGroup
} from "react-bootstrap"


class ModalSurveyHeaders extends Component
{
    constructor(props){
        super(props) 
         this.state = {show:false};
         this.handleSubmit = this.handleSubmit.bind(this);
       }

       handleSubmit(e)
       {    
     
           e.preventDefault();
           let data = {survey_name:e.target.survey_name.value,instructions:e.target.instructions.value,other_header_info:e.target.other_header_info.value}
           fetch("https://localhost:44355/api/survey",{
                method:"POST",
                headers:{
                    'Accept':"application/json",
                    'Content-Type':"application/json"
                },
                body:JSON.stringify(data)

           }).then(res => res.json())
           .then((result) =>
           {
                alert(result);
                window.location = "/form/"+result+"/edit";
           },
           (error) =>
           {
            alert(error);
           })
   
       }
    render(){

        return (
            <Modal {...this.props}>
            <Modal.Header closeButton>
              <Modal.Title>Survey Information</Modal.Title>
            </Modal.Header>
          
            <Modal.Body>
              <Row>
                  <Col>
                      <Form onSubmit={this.handleSubmit} >
                          <Form.Group>
                              <Form.Label>Survey Name</Form.Label>
                              <Form.Control placeholder="Survey Name" type="text" name = "survey_name" defaultValue="Untitled Form"></Form.Control> <br></br>
                              <Form.Label>Instructions</Form.Label>

                              <Form.Control placeholder="Instructions" type="text" name = "instructions"></Form.Control><br></br>
                              <Form.Label>Additional Information</Form.Label>

                              <Form.Control placeholder="Additional Information" type="text" name = "other_header_info"></Form.Control>

                          </Form.Group>

                          <Form.Group>
                          <Button variant="secondary" style={{marginRight:"10px"}}onClick={this.props.onHide}>Close</Button>

                          <Button className="float-right" variant="primary" type="submit" >Proceed</Button>

                          </Form.Group>
                      </Form>
                  </Col>
              </Row>
            </Modal.Body>
          
           
          </Modal>
        );
       
    }
}
export default ModalSurveyHeaders;
import React,{Component,Fragment,useRef,useState,useEffect} from "react";
import Footer from "./Footer";
import NavHeader from "./NavHeader";
import {Link, withRouter}  from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import "../App.css";
import {debounce,isEqual} from "lodash";


const p = {
    paddingLeft:"24px",
    paddingTop:"1px",
    paddingBottom:"3px"
}
const container_header ={

    margin:"24px auto",
    width:"50%",
    boxShadow: "0 6px 6px rgba(0,0,0,0.2)",
    borderRadius:"6px"
}
const active = {
    // backgroundColor:"white",
    borderBottom:"4px solid #E94B3CFF",
    fontFamily:"arial",
    color:"white",
    textDecoration:"none"
   

}
const stylesObj = {
    background: "#F8F8F8",
       minHeight:"100vh"
     };

const fixed_bottom ={
    position:"fixed",
    bottom:"0",
    left:"0",
    right:"0",
    margin:"0 auto",
    width:"50%",
    boxShadow: "0px 0 10px rgba(0, 0, 0, 0.4)", 
    minHeight:"6vh",
    borderRadius:"10px",
    zIndex:"101",
}

const fixed_bottom_content = {
    position:"relative",
    minHeight:"14vh",

}

const button_spacing = {
    marginRight:"24px",
    marginTop:"24px"
  
}

const usePreviousValue = value => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

class Question extends Component{
constructor(props){
    super(props);
    this.state = {question:[],section:[],prevQuestionState:[]};
    this.handleAddQuestion = this.handleAddQuestion.bind(this);
    this.handleDeleteQuestion = this.handleDeleteQuestion.bind(this);
    this.handleNameChange = debounce(this.handleNameChange.bind(this),500);
    this.handleRequireChange = debounce(this.handleRequireChange.bind(this),200);
    this.handleInputChange = debounce(this.handleInputChange.bind(this),200);

}





handleNameChange = (e,id) =>{
    //alert(id);
    let data = {question_name:e.target.value}
    fetch("https://localhost:44355/api/questions/"+id,{
        method:"PUT",
        headers:{
            'Accept':"application/json",
            'Content-Type':"application/json"
        },
        body:JSON.stringify(data)
    }).then(res => res.text())
    .then((result) =>
    {
         this.getQuestion();
    },
    (error) =>
    {
     alert(error);
    })
   

}
handleRequireChange = (e,id) =>{
    let data = {required_yn:e.target.checked}
    fetch("https://localhost:44355/api/questions/required/"+id,{
        method:"PUT",
        headers:{
            'Accept':"application/json",
            'Content-Type':"application/json"
        },
        body:JSON.stringify(data)
    }).then(res => res.text())
    .then((result) =>
    {
         this.getQuestion();
    },
    (error) =>
    {
     alert(error);
    })

}

handleInputChange = (e,id) =>{
    let data = {input_type_name:e.target.value}

    fetch("https://localhost:44355/api/questions/updateinput/"+id,{
        method:"PUT",
        headers:{
            'Accept':"application/json",
            'Content-Type':"application/json"
        },
        body:JSON.stringify(data)
    }).then(res => res.text())
    .then((result) =>
    {
         this.getQuestion();
    },
    (error) =>
    {
     alert(error);
    })

}

getQuestion()
{
    var id = this.props.match.params.id;
    fetch("https://localhost:44355/api/questions/"+id)
    .then(response => response.json())
    .then(data=>{
            
            this.setState({question:data})
              console.log(this.state.question);
              
           if(this.state.question.length == 0 )
           {
               window.location.replace("/");
           }
        
    })
}

getSection(){
    var id = this.props.match.params.id;
    fetch("https://localhost:44355/api/surveysection/"+id)
    .then(response => response.json())
    .then(data=>{
            this.setState({section:data})
            console.log(this.state.section);
            // for(var i=0;i<data.length;i++)
            // {
            //     console.log(data[i].survey_sections.id);
            // }
      
        
    })

}
handleAddQuestion(e){
    e.preventDefault();
    var latest_section = this.state.section[this.state.section.length-1];
    let data = {id:latest_section}
    fetch("https://localhost:44355/api/questions",{
                method:"POST",
                headers:{
                    'Accept':"application/json",
                    'Content-Type':"application/json"
                },
                body:JSON.stringify(data)

           }).then(res => res.text())
           .then((result) =>
           {
                this.getQuestion();
           },
           (error) =>
           {
            alert(error);
           })

}
handleDeleteQuestion(e,id,index){
    
    fetch("https://localhost:44355/api/questions/"+id,{
        method:"DELETE",
        headers:{
            'Accept':"application/json",
            'Content-Type':"application/json"
        }
    }).then(res => res.text())
    .then((result) =>
    {
         this.getQuestion();
    },
    (error) =>
    {
     alert(error);
    })

}

componentDidMount()
{
    this.getQuestion();
    this.getSection();

}

// needs to settle ComponentDIdupdate infirnote loop problem
componentDidUpdate(_prevProps,prevState){
 if(prevState.question !== this.state.question)
 {
     
 }
}


    render(){

          
        const {question,questionName} =this.state
        return(


            <Fragment>
            <NavHeader />
            <div style={stylesObj}>           
             <div className="bg-dark"  >
               
                   <center>
                    <a href ="/" style={active}>Question </a>
                   <a to ="/" style={{color:"#FFFFFF",paddingLeft:"30px",fontFamily:"arial"}}>Respond</a>
                   </center>
            </div>
            {question.map((q,index) => (
        
        <Fragment key={q.id}>
            
                    <div  className = " bg-white" style={container_header}>
                <div style={{background:"#4169e1",width:"100%",minHeight:"2vh",border:"1px solid #4169e1",borderRadius:"3px"}}> </div>
                <Form style={{padding:"16px 24px"}}  >
                    <FormGroup>
                    
                        <div  className="input-group">
                  
                        <Label style={{marginTop:"6px"}}for ="question_name">Question: </Label>
                        <div>{'\u00A0'}{'\u00A0'}{'\u00A0'}</div>
                        <Input onChange={e => this.handleNameChange(e,q.id)}  type = "text"  name ="question_name" id="question_name" placeholder="Question Name" defaultValue={q.question_name}    /> <br />
                        <select onChange={e=>this.handleInputChange(e,q.id)} className="browser-default custom-select" defaultValue={q.input_types.input_type_name} aria-label="Default select example">
                            <option value ="TextBox">TextBox</option>
                            <option value ="RadioButton">RadioButton</option>
                            <option value ="CheckBox">CheckBox</option>
                        </select>
                        </div>
                        <div style={{marginTop:"50px",marginBottom:"50px"}}>
                        {(() => {
                        switch (q.input_types.input_type_name) {
                        case "TextBox":  
                         return <Input type="text" disabled></Input>;
                        case "RadioButton": 
                        return <p>RadioButton Selected</p>;
                        case "CheckBox":  
                        return <p>ChecKBox</p>;
                        }
                    })()}
                    </div>
                        
                    </FormGroup>
                    <hr></hr>
                    <FormGroup style={{overflow:"auto"}}>
                        <div style={{float:"right"}}>
                    <Input type="checkbox" onChange={e=>this.handleRequireChange(e,q.id)} defaultChecked={q.required_yn} ></Input>
                    <Label>Required</Label>
                    </div>
                    <div style={{float:"left"}}>
                        <a onClick={()=>this.handleDeleteQuestion(this,q.id,index)}><img  width="20px" height="20px" src="https://icons-for-free.com/iconfiles/png/512/delete+remove+trash+trash+bin+trash+can+icon-1320073117929397588.png" /></a>
                    </div>
                  
                    </FormGroup>
                    <p>{q.id}</p>
                </Form>
            </div>
        </Fragment>
         ))}
         <br /><br /><br /><br/>
           
            </div>
                <center>
                <div style={fixed_bottom} className="bg-white">
                  <div style={fixed_bottom_content}>
                  <input style= {button_spacing} type="button" onClick={this.handleAddQuestion} className="btn btn-outline-primary" value="Add Question"></input>
                        <input style={button_spacing} type="button" value="Add Section" className="btn btn-outline-primary"></input>
                
                  </div>
                        
                   
                 
                </div>

                </center>
            <Footer />
            </Fragment>
          
        );
    }
}

export default Question;
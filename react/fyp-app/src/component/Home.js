import React, {Component, Fragment} from "react"
import NavHeader from "./NavHeader";
import Footer from "./Footer";
import ModalSurveyHeaders from "./surveyHeader"
import Question from "./Question";
import {Link}  from "react-router-dom";
import { Button } from "reactstrap";


const heading_six = {
    padding:"16px 24px",
    color:"#4169e1"
  
  }
class Home extends Component{
  constructor(props){
   super(props) 
    this.state = {showModal:false}
  }
  
    render(){
        let ModalClose = () => this.setState({showModal:false})
        return(
            <Fragment>
                <NavHeader />
                <div className="p-3 mb-2 bg-light text-dark">
          <h6 style={heading_six}>Create New Form</h6>
          <div className = "container">
          <div className ="row text-center">
              <div className="col-sm-4 col-xs-4 col-md-4 col-lg-4">
                <figure>
                <Link onClick={()=>this.setState({showModal:true})} >      
                <img src = "https://icons-for-free.com/iconfiles/png/512/compose+document+empty+page+text+write+icon-1320183952360631845.png" width="150"height="150" ></img>
                <figcaption style = {{marginTop:"10px"}}>Blank Form</figcaption>        
                </Link>  
                <ModalSurveyHeaders show={this.state.showModal} onHide={ModalClose}   aria-labelledby="contained-modal-title-vcenter"
      centered size="lg" />
                </figure>
              </div>
              <div className="col-sm-4 col-xs-4 col-md-4 col-lg-4">
                <figure>
                  <a href = "#">
                <img src = "http://cdn.onlinewebfonts.com/svg/img_263344.png" width="150"height="150" ></img>
                <figcaption style = {{marginTop:"10px"}}>Template Form</figcaption>
                </a>
                </figure>
              </div>
              <div  className="col-sm-4 col-xs-4 col-md-4 col-lg-4">
                <figure>
                <a href = "#">
                <img src = "http://cdn.onlinewebfonts.com/svg/img_263344.png" width="150"height="150" ></img>
                <figcaption style = {{marginTop:"10px"}}>Template Form</figcaption>
                </a>
                </figure>
              </div>
           

          </div>
          </div>
        </div>
        <div className = "p-3 mb-2 bg-white text-dark">
        <h6 style={heading_six}>Recent Forms</h6>

       
      </div>
      <Fragment>
    

      </Fragment>
                <Footer />

            </Fragment>
        );
    }
}

export default Home;
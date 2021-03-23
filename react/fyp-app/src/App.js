import React, {Component, Fragment} from "react"
import Question from "./component/Question";
import Home from "./component/Home";
import { BrowserRouter, Route, Switch } from 'react-router-dom';




class App extends Component{

  render() {
    return (
     <BrowserRouter>
        <Fragment>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/form/:id/edit" component={Question} />

          </Switch>
        </Fragment>
     </BrowserRouter>
    );
    
  }
}



export default App;

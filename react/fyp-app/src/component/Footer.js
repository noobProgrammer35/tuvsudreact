import React, {Component, Fragment} from "react"

class Footer extends Component{

    render() {
        return(
            <Fragment>
                <footer className="navbar fixed-bottom">
                <hr className="featurette-divider"></hr>
                    <p className="float-right">© 2021 TUVSUD</p>
                </footer>
            </Fragment>
        );
    }
}
export default Footer
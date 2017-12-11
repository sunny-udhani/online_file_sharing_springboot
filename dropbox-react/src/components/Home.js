import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import '../App.css';
//import TextField from 'material-ui/TextField';
import * as API from '../api/API';
import List from "./List";





class Home extends Component {

    static propTypes = {
        currentUser: PropTypes.string.isRequired,
        handleLogout: PropTypes.func.isRequired
    };





    listFiles = () => {
        API.getImages()
            .then((data) => {
              console.log(data);
                this.setState({
                    images: data,
                    username: data.objectSession
                });
            });
    };



    constructor(props) {
        super(props);

        this.state = {
            message: '',
            username: this.props.currentUser,
            images: [],
            filename: '',
            newfolder: false,
            newSharedfolder: false,
            groupFlag: false,
            groupNames:[]
        };


    }

    listUserGroups= (payload) =>{
        API.listUserGroups(payload)
            .then((data) => {
                console.log(data);
                this.setState({
                    groupNames: data
                });
            });

    };


    componentWillMount() {
        console.log('inside compnt will mount1', this.state.username);
        document.title = `Welcome, ${this.state.username} !!`;



        API.getImages()
            .then((data) => {
              console.log(data);
                this.setState({
                    images: data,
                    username: data.objectSession
                });
            });
        console.log('inside compnt will mount2', this.state.username);
    }

    componentDidMount() {


        console.log('inside compnt Did mount', this.state.username);


    }

    render() {
        return (

            <div className="bg1 row">
                <div className="col-md-2">
                    <div id="x">
                    <div className="maestro-nav__container" style={{background : "#cbe4fa"}}>
                        <div className="maestro-nav__panel">
                            <a className="maestro-nav__home-button" href="/welcome" data-reactid="11">
                                <img className="maestro-nav__logo"
                                     aria-label="Home" alt="Dropbox"
                                     src="https://cfl.dropboxstatic.com/static/images/index/rebrand/logos/glyphs/glyph_blue.svg"
                                     width="32px" height="32px" data-reactid="12"/>
                            </a>
                            <br/><br/>
                            <div className="maestro-nav__contents" data-reactid="13">
                                <ul className="maestro-nav__products" data-reactid="14">
                                    <li data-reactid="15">
                                        <div className="maestro-nav__product-wrapper" data-reactid="16">
                                    <span className="ue-effect-container" data-reactid="17">
                                        <a href="https://www.dropbox.com/h?role=personal"
                                           className="maestro-nav__product maestro-nav__active-product" id="home"
                                           target="_self" rel="noopener" data-reactid="18">
                                            Home
                                        </a>
                                    </span>
                                        </div>
                                    </li>
                                    <li data-reactid="20">
                                        <div className="maestro-nav__product-wrapper" data-reactid="21">
                                    <span className="ue-effect-container" data-reactid="22">
                                        <a href="https://www.dropbox.com/home" className="maestro-nav__product"
                                           id="files" target="_self" rel="noopener" data-reactid="23">
                                           Files
                                        </a>
                                    </span>
                                        </div>
                                    </li>
                                    <li data-reactid="25">
                                        <div className="maestro-nav__product-wrapper" data-reactid="26">
                                     <span className="ue-effect-container" data-reactid="27">
                                       <a href="https://paper.dropbox.com?_tk=dropbox_web_web_sidebar&amp;role=personal"
                                          className="maestro-nav__product" id="paper" target="_self" rel="noopener"
                                          data-reactid="28">
                                       Paper
                                       </a>
                                     </span>
                                        </div>

                                    </li>

                                    <li data-reactid="25">
                                        <div className="maestro-nav__product-wrapper" data-reactid="26">
                                     <span className="ue-effect-container" data-reactid="27">
                                       <a onClick={()=>{
                                           this.setState({
                                               groupFlag:!this.state.groupFlag
                                           });
                                           this.listUserGroups({dummy:'dummy'});
                                       }} className="maestro-nav__product" id="paper" target="_self" rel="noopener"
                                          data-reactid="28">
                                       Group
                                       </a>
                                     </span>
                                        </div>

                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-10 mainpart ">

                    <List handleStar={this.handleStar} newfolder={this.state.newfolder} images={this.state.images} groupFlag={this.state.groupFlag}
                          groupNames={this.state.groupNames} newSharedfolder={this.state.newSharedfolder} listFiles={this.listFiles} handleLogout={this.props.handleLogout}/>
                </div>
            </div>


        )
    }
}

export default withRouter(Home);

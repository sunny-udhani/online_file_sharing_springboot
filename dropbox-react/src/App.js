import React, {Component} from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Basepage from "./components/Basepage";



    class App extends Component {
        render() {
            return (
                <div className="App">
                    <BrowserRouter>
                        <Basepage/>
                    </BrowserRouter>
                </div>
            );
        }
    }

    export default App;

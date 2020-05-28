import React from 'react'
import store from '../../redux/store'
// import Camera from '../posenet/components/Camera.js'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import io from 'socket.io-client';
import Header from '../Header/Header/header'
import Navbar from '../Header/Navbar/navbar'
// import Grid from '@material-ui/core/Grid';

import CreatePraxSpace from '../Chat/CreatePraxSpace/CreatePraxSpace'
import Admin from '../../Admin';
import Home from '../Home/Home';
import { AuthContext } from "../../context/auth";
import { Provider } from "react-redux";
import PrivateRoute from './PrivateRoute';
import About from '../About/about';
import Login from '../AuthLogin/Login/Login'
import FirstTimeLogin from '../FirstTimeSignIn/firstTimeSignIn';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

require('typeface-overpass')
require('typeface-permanent-marker')

// const socket = io('http://localhost:5001',{transports: ['websocket']});

// // SOCKETS FOR APP --> BRING BACK WHEN FINISHING SIGNALLING
// socket.on('connect', function newConnection(Camera){
//   // console.log('room name: ', futureVariableNameHere)
//   // socket.on('message', function getMessage(message){
//   //   console.log(message);
//   // })
//   // socket.on('message_Users', function getMessageUsers(message_Users){
//   //   console.log(message_Users);
//   // })
//   // socket.on('message_Messages', function getMessageMessages(message_Messages){
//   //   console.log(message_Messages);
//   // })

// });

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#212121',
    },
    secondary: {
        main: '#dadcd7'
      }
    },
    background: {
      backgroundColor: "$offset_black"
    }
  })

const styles = {
  camera : {
    backgroundColor: "#030303",
    color: "#f6f6f6"
  }
}

export default function App(state = { isAuth: false }) {

if (window !== undefined){

  // const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  // const [authTokens, setAuthTokens] = useState(false);

  // const setTokens = (data) => {
  //   localStorage.setItem("tokens", JSON.stringify(data));
  //   setAuthTokens(data);
  // }
}
  return (
    <AuthContext.Provider value={{}} style={styles.background}>
    <Provider store={store}>
    
    <Router>
   
        <div id="outerDiv">

      <Header />
      <MuiThemeProvider theme={theme}>
        <Navbar />
      </MuiThemeProvider>
    <MuiThemeProvider theme={theme}>
      <Switch>            
        <Route exact path="/" component={Login} />

        <PrivateRoute exact path="/login" component={Home} />
      
        <Route exact path="/about" component={About} />
        <Route exact path="/signup" component={FirstTimeLogin} />
        <PrivateRoute exact path="/praxspace/:username/:message" component={CreatePraxSpace}/> 
        <PrivateRoute exact path="/admin" component={Admin} />

    </Switch>
  </MuiThemeProvider>
    </div>
    
    </Router>
  </Provider>
  </AuthContext.Provider>
  )
}

import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import axios from 'axios';
import './firsttimesignin.scss'
import {
    BrowserRouter as Router,
    useHistory,
    Link
  } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

import { makeStyles } from '@material-ui/core/styles';

    const useStyles = makeStyles(theme => ({
        root: {
            flexGrow: 1,
            // backgroundImage: "url(https://laughingsquid.com/wp-content/uploads/2013/10/21.jpg)",
      
            backgroundPosition: 'top',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            overflow: 'auto',
        },
      a: {
            textAlign: 'center'
        }
    }));

    const styles = ({
        input: {
         marginLeft: '10vw',
         marginRight: '10vw',
         backgroundColor: "#aaf",
         color: "#f6f6f6",
        },
        signup: {
        marginTop: 0,
        color: '#f6f6f6'
        },
        button: {
            width: '80%',
            marginRight: '10%',
            marginLeft: '10%',
            height: 80,
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
            borderStyle: "solid",
            borderColor: "#aaf",
            borderRadius: '5%',
            color: '#dadcd7',
            borderWidth: 2,
            // margin: '10vw',
            variant: "outlined",
            // justify: "right",
            align: 'center',
            marginTop: '10vh',
            // marginRight: '10%',
            // marginLeft: '10%',
           
        },
        a: {
            width: 400,
            height: 80,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            
            borderStyle: "solid",
            borderColor: "#9ED1FF",
            color: '#dadcd7',
            borderWidth: 2,
            borderRadius: '5%',
            variant: "outlined",
            // justify: "right",
           
            marginTop: '10vh'
        },
        card: {
        borderStyle: "solid",
        backgroundColor: "#212121",
        borderWidth: 2,
        borderColor: "#85b1d7",
        borderRadius: '5%',
        variant: "outlined",
        marginRight: "12%",
        marginLeft: "12%",
        // paddingRight: '5%',
        // paddingLeft: '5%',
        paddingTop: '8vh',
        paddingBottom: '20vh',
        marginBottom: '60vh',
        marginTop: 20,
        zIndex: 5
        }
    })

export default function FirstTimeLogin(newUser){
  
    const auth = useSelector(state => state.auth)
    console.log(auth.user.id)
    const classes = useStyles();
    const history = useHistory();
    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ bandName, setBandName ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ instrument, setInstrument ] = useState("");

   
    const handleSubmit = (evt) => {

        var user = {
            username: username, 
            email: email,
            firstName : firstName,
            lastName : lastName,
            bandName: bandName,
            password : password,
            instrument : instrument,
    }
    
       console.log(user);
       console.log(user.username);
       history.push("/");
      
    axios({
        method: 'post',
        url: 'http://localhost:5001/api/user',
        data: user
      })
    }

  return (
      <Router>
    <div className={classes.root}>
    <h1 className='signupText'>Sign Up</h1>
    <Card style={styles.card}>
    
    <form onSubmit={handleSubmit} noValidate autoComplete="off">  
        <TextField   
            className="inputPad"  
            type="username"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            autoFocus
            value={username}
            onChange={e => 
                setUsername(e.target.value)
            }
            label="Choose a Username" 
        />
    </form>

    <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField  
         
            className="inputPad"
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            id="password"
            autoFocus
            value={password}
            onChange={e => 
            setPassword(e.target.value)
            }
            label="Choose a Password" 
        />
    </form>

    <form onSubmit={handleSubmit} noValidate autoComplete="off">  
    <TextField  
     
        className="inputPad"     
        type="text"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="firstName"
        name="firstName"
        autoFocus
        value={firstName}
        onChange={e => 
            setFirstName(e.target.value)
        }
        label="Enter Your First Name" 
        />
    </form>

    <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField       
            className="inputPad"
           
            type="text"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="lastName"
            id="lastName"
            autoFocus
            value={lastName}
            onChange={e => 
            setLastName(e.target.value)
            }
            label="Enter Your Last Name" 
        />
    </form>

    <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField       
            
            className="inputPad"
            type="email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            autoFocus
            value={email}
            onChange={e => 
            setEmail(e.target.value)
            }
            label="Enter your Email" 
        />
    </form>
  
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField       
            className="inputPad"
           
            type="text"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="bandName"
            id="bandName"
            autoFocus
            value={bandName}
            onChange={e => 
            setBandName(e.target.value)
            }
            label="Group Affiliation" 
        />
    </form>

    <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField       
            className="inputPad"
      
            type="text"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="instrument"
            id="instrument"
            autoFocus
            value={instrument}
            onChange={e => 
            setInstrument(e.target.value)
            }
            label="Your Primary Instrument" 
        />
    </form>

            <Button 
                // id="register_button"
                style={styles.button}
            >
            <Link 
                to="/" 
                onClick={() => 
                handleSubmit()
            }
                style={{ textDecoration: 'none' }} 
            >
            Start Playing
            </Link>
            </Button> 

            <br/>
                
        </Card>
    </div>
</Router>
)}
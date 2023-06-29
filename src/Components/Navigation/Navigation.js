import React, {useState}from 'react';

function Navigation  ({isSignedIn, onRouteChange, initializeUser}){

const [clearUser, setClearUser]= useState({
                                    id: '',
                                    name: '',
                                    password:'',
                                    entries: '' });
//clearing user data
  const initialize=()=>{
    setClearUser({id:'',
    name: '',
    password: '',
    entries: ''
  })
    onRouteChange('signin');
    initializeUser(clearUser);
    
}

    
if(isSignedIn){
    return(
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick={initialize}
            className='f3 link dim black underline pa3 pointer'>  Sign Out</p>
        </nav>);
}else
 return(<div></div>)
    }

export default Navigation;
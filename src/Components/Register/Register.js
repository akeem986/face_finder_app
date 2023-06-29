import React,{useState} from 'react';

function Register ({onRouteChange, info}){
   
    const[regUser, setRegUser]= useState({
        name: '',
        email: '',
        password:''});


    //keying form inputs
    const onEmailChange = (event) => {
        setRegUser({...regUser, email: event.target.value});
      }
    const onNameChange = (event) => {
        setRegUser({ ...regUser, name: event.target.value})  
    }
    const onPasswordChange = (event) => {
        setRegUser({ ...regUser, password: event.target.value})
    }

    
    //Fetching data from node.js server
    const onsubmitRegister=()=>{
        
       fetch('http://localhost:3000/register', {
            method: 'post',
            headers:{'Content-type': 'application/json'},
            body: JSON.stringify({
                name:regUser.name,
                email:regUser.email,
                password: regUser.password
            })
        })
        .then(response => response.json())
       
        .then(data => {
            if(data.Id){
            info(data)
            onRouteChange('home')}
        }).catch(err => console.log(err)); 
    }

    return(
    <div>
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
            <main className="pa4 black-80">
            <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">Registration</legend>
                
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                    <input
                    value={regUser.name}
                    onChange={onNameChange}
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                    type="text" name="name"  
                    id="name"/>
                </div>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input
                    value={regUser.email}
                    onChange={onEmailChange}
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                    type="email" 
                    name="email-address"  
                    id="email-address"/>
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input 
                    value={regUser.password}
                    onChange={onPasswordChange}
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                    type="password" 
                    name="password"  
                    id="password"/>
                </div>
                </fieldset>
                <div className="">
                <input
                onClick={onsubmitRegister}
                className="b ph4 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                type="submit" value="Register"/>
                </div>
                <input
                    onClick={() => onRouteChange('signin') }
                    className="b ph4 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib mt2" 
                    type="submit" 
                    value="BACK TO SIGIN"/>
                 
             
            </div>
            </main>
        </article>
    </div>

    );
}

export default Register;
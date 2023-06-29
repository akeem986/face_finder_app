import React,{useState} from 'react';


function Signin ({onRouteChange, info}){

    const[user, setUser]= useState({email: '',password:''});

    //keying form inputs
    const onEmailChange = (event) => {
        setUser({...user, email: event.target.value});
        }
    const onPasswordChange = (event) => {
        setUser({ ...user, password: event.target.value})
    }

  //Fetching data from node.js server
  const onsubmitSignin=()=>{

        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers:{'Content-type':'application/json'},
            body: JSON.stringify({
                email:user.email,
                password: user.password
            })
        })
        .then(response => response.json())
        .then(data => {
          if(data.Id){
            info(data);
            onRouteChange('home')}
        }).catch(err => console.log(err));  
        }
       
    return(
        <div className="flex">
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6">
                <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input 
                        value={user.email}
                        onChange={onEmailChange}
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="email"   
                        id="email-address"/>
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input 
                        value={user.password}
                        onChange={onPasswordChange}
                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                        type="password" name="password"  
                        id="password"/>
                    </div>
                    </fieldset>
                    <div className="">
                    <input
                    onClick={onsubmitSignin}
                    className="b ph4 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                    type="submit" 
                    value="Sign in"/>
                    </div>
                    <div className="lh-copy mt3">
                    <p onClick={() => onRouteChange('register') }  
                    href="#0" 
                    className="f6 link dim black db pointer">Sign up</p>
                    </div>
                </div>
                </main>
            </article>
        </div>
    );
}

export default Signin;
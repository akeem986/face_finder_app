import React,{useState} from 'react';
import Navigation from './Components/Navigation/Navigation';
import Particles from 'react-particles-js';
import Logo from './Components/Logo/Logo';
import FaceRecognition from './Components/faceRecognition/FaceRecognition';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank'
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import './App.css';


//Webpage Background effect
const particlesOptions= 
  {
    particles: {
     number:{
       value:120,
       density:{
         enable: true, value_area: 700}
     }
    }
}

function App() {

 
  const[isSignedIn, setIsSignedIn]= useState(false);
  const[ImageUrl, setImageUrl]= useState('');
  const[square, setSquare]= useState('');
  const[path, setPath]= useState('');
  const[img, setImg]=useState('');
  const[errorOccured, setErrorOccured]=useState(false)
 
 
  const[user, setUser]= useState({
                        id: '',
                        name: '',
                        password:'',
                        entries: '' });

  const info =(data)=>{
    setUser({id:data.Id,
            name: data.FullName,
            password: data.Password,
            entries: data.entries
          })
  }
  const imgErrorCheck=()=>{
          setErrorOccured(true)
            }

  //check if an images was entered  
 async function dimensions(){
 const image = document.getElementById('inputimage');
 document.getElementById('inputimage').addEventListener('error',imgErrorCheck())
    setImg(Number(image.height))
    setTimeout(console.log(img), 7000)
    console.log(errorOccured);
  
  //Increament entries if face is detected
  if(img!==0){
    if(errorOccured){ 
    setTimeout(entryCounter(), 9000);
    }
  }
}

  const initializeUser =(data)=>{
    setUser({ 
      id:data.Id,
      name: data.FullName,
      password: data.Password,
      entries: data.entries
          });
    setImageUrl('#');
  }

  const calcFaceLocation= (data)=>{
    const boxParam =data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
  
   //using the width and height to calculate face position
   //search the image alway starts from lett and top hence the cal for rightCol and bottomRow
   return{
      leftCol: boxParam.left_col* width,
      topRow: boxParam.top_row * height,
      rightCol: width - (boxParam.right_col * width),
      bottomRow: height -(boxParam.bottom_row * height)
    }
  }

  //Navigation controls
  const onRouteChange = (route)=>{
    if(route=== 'signout'){
    setIsSignedIn(false);
    }else 
    setIsSignedIn(true)
    setPath(route);
  }

  const highlightFace=(box)=>{
    setSquare(box);
  }

  const onInputChange = (event)=>{
   setImageUrl(event.target.value);
  }


  async function onSubmit (){
    fetch('http://localhost:3000/imageurl',{
        method: 'post',
        headers:{'Content-type': 'application/json'},
        body: JSON.stringify({
        input: ImageUrl
      })
    }).then(response => response.json()) 
    .then(response=>{highlightFace( calcFaceLocation(response))
    
      //entryCounter()
    }).catch(err => console.log(err));
    dimensions();
  }

const entryCounter=()=>{
  fetch('http://localhost:3000/entries', {
    method: 'put',
    headers:{'Content-type': 'application/json'},
    body: JSON.stringify({
    id: user.id
    })
  })
    .then(response => response.json()) 
    .then(count=>{
     setUser(Object.assign(user,{entries:count}))
  }).catch(console.log)
}

return ( 

    <div className="App">
    <Particles className='particles' params={particlesOptions} />
    {path==='home'
     ?(<div>
      <Navigation onRouteChange={onRouteChange}
                 isSignedIn={isSignedIn}
                 initializeUser={initializeUser} />
        <Logo/>
        <Rank name={user.name} entries={user.entries}/>
        <ImageLinkForm 
            onInputChange={onInputChange} 
            onSubmit={onSubmit}/> 
        <FaceRecognition
            square= {square}
            ImageUrl= {ImageUrl}
            imgErrorCheck={imgErrorCheck}
            />
        </div>)

      :path === 'signin'
      ? (<div> <Signin onRouteChange={onRouteChange} info={info} dimensions={dimensions}/> </div>)
      
      :path === 'register'
      ?<Register  onRouteChange={onRouteChange} info={info}/>
       :<Signin onRouteChange={onRouteChange} info={info}/>
      }
    </div>
    
 
  );
}

export default App;

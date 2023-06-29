import React from 'react';
import './FaceRecognition.css'


const FaceRcongnition = ({ImageUrl, square})=>{
    return(
    <div className='center ma'>
        <div className='absolute mt2'>
        <img id='inputimage' alt='' src={ImageUrl}  height="400px" width="auto" />
        <div className='bounding-box' 
             style={{top: square.topRow, 
                    right: square.rightCol, 
                    bottom: square.bottomRow, 
                    left: square.leftCol}}>
            </div>
        </div>
    </div>
    );
}

export default FaceRcongnition;
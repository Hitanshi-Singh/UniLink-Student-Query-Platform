import logo from '../../assets/logo.png';
import {Link} from 'react-router-dom'

import "./login.css"

const Login=()=>{
    return (
        <div className="log">
            <img src={logo} alt="" className="logo" />
            <i className="fa-solid fa-pencil"></i>
            <h1 className='h1'>WELCOME BACK!</h1>
            <h3 className='h3'>Please enter your details to Sign-in</h3>
         <div className="details-card">
             <div className="detail"> 
              <div className="Username">
                <h5 className="h5">Username</h5>
                <input type="text" placeholder='Enter your name' className='input'/>
              </div>
              <div className="password">
                <h5 className="h5">Password</h5>
                <input type="password" placeholder='Enter your password here' className='input' />
              </div> </div>
              <div className="click">
                <button className='button'>SIGN-IN</button>
                <h5 className="h5">New to Unilink? <Link to="/signup">Create an Account</Link></h5>
                
              </div>
         </div>
        </div>
    )
}
export default Login;
import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../src/assets/images/logo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import gamelogo from '../assets/images/logo.png'
import axios from 'axios'
import {useNavigate} from 'react-router-dom' 
import Cookies from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Header = ({ category }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropDown,setDropDown] = useState(false)
  console.log(dropDown,"drop")

  const navigate = useNavigate()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const number = Cookies.get('gameofyy_user')
  

   const checkUser=async()=>{
    if(!number || number == undefined || number == null || number == " "){
      navigate('/login')
    }

    // console.log('checkuser')
    try{
      const res = await axios.get('https://slcallback.gameofyy.com/checkuser',{
        params:{
          msisdn:number,
          service:"Gameofyy"
        }
      })

      if(res.data.status == 0){
        // Cookies.remove('user')
        Cookies.remove('gameofyy_user')
        navigate('/login')
      }
      else{
        navigate('/home')
      }
      
    }
    catch(err){
      console.log(err)
    }
  }

  // useEffect(() => {
  //   checkUser()
  // }, [])

  useEffect(()=>{
    const new_user = Cookies.get('new_user_without_login')
    if(new_user == "" || !new_user || new_user == 'undefined' || new_user == null){
      navigate('/login')
    }
  },[])

  const handleDeactivate=async()=>{
    let msisdn = Cookies.get('gameofyy_user');
    const data = {
      msisdn : msisdn,
      serviceName : "Gameofyy"
    }

    

    try{

      const res = await axios.post('https://slcallback.gameofyy.com/deactivate-user',data)
    console.log(res)
    setDropDown(false)
    if(res.data.code == 0){
      Cookies.remove('gameofyy_user')
      Cookies.remove('user')
      Cookies.remove('new_user_without_login');
      window.location.replace('http://consent.hutch.lk/register-service/VA%3D%3DCQ%3D%3Dew%3D%3D')
      // navigate('/login')
    }
    else{
      toast.error("Something Went Wrong")
      navigate('/home')
    }

    }catch(err){
      toast.error("Something Went Wrong")
      navigate('/home')
    }
    


  }


  const handleAccount=(e)=>{
    // e.preventDefault()
    setDropDown(!dropDown)
  }

 
  return (
    <div className="bg-gradient-to-r from-emerald-500 to-amber-500 text-white border-b border-white ">
      <div className="flex items-center justify-between uppercase mb-2">
      
        <Link to="/" className="flex gap-[1rem] ">
          <img className="w-full h-16 mx-3 py-1"
   
            src={gamelogo}
            alt="logo"
          />
<div className="flex flex-col justify-center">
<div onClick={handleAccount}  type="button" class="text-[16px] ml-4 bg-gray-300/20 skew-y-1  hover:scale-110 shadow-lg hover:shadow-amber-300 hover:text-white font-bold rounded-lg px-2 py-2 " >Account 
</div>

{
  dropDown &&
  <div id="dropdown" class="mt-24 absolute z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
      <li>
        <Link class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleDeactivate}>Deactivate </Link>
      </li>
      
    </ul>
</div>
}

</div>

        </Link>


        {/* Categories in header for lg screens */}
        <div className="hidden lg:flex justify-between items-center gap-4 mr-12 lg:mt-2">
       
          {category.map((e) => (
            // <Link
            //   key={e.cat_name}
            //   to={`/category/${e.cat_name}`}
            //   className={` text-[16px] ml-4 bg-amber-300 hover:text-white font-bold rounded-lg px-2 py-2 ${
            //     e.cat_name === "Kids" ? "text-yellow-400" : "text-black "
            //   }`}
            // >
            <Link
              key={e.cat_name}
              to={`/category/${e.cat_name}`}
              className={` text-[16px] ml-4 bg-gray-300/20 skew-y-1  hover:scale-110 shadow-lg hover:shadow-amber-300 hover:text-white font-bold rounded-lg px-2 py-2 `}
            >
              {e.cat_name}
            </Link>
          ))}
        </div>

        {/* Hamburger Icon (visible on smaller screens) */}
        <div className="lg:hidden ml-auto mr-8 mb-1 mt-4 ">
       
          <button onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <FaTimes className="h-8 w-8 text-white" />
            ) : (
              <FaBars className="h-8 w-8 text-white" />
            )}
          </button>
        </div>

        {/* Categories in mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute left-0 top-16 h-auto z-10 bg-emerald-500/60 px-2 py-4">
            {category.map((e) => (
              <Link
                key={e.cat_name}
                to={`/category/${e.cat_name}`}
                onClick={toggleMobileMenu}
                className="font-serif hover:bg-emerald-700 px-1 py-1 rounded-lg block mb-2"
              >
                {e.cat_name}
              </Link>
            ))}
          </div>
        )}
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Header;
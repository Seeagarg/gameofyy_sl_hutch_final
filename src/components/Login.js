import React,{useState,useEffect} from 'react'
import logo from '../assets/images/gamelogo.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import {useSelector} from 'react-redux'
import { toast } from "react-toastify";
import Layout from '../Layouts/Layout'
import Cookies from 'js-cookie'

const Login = () => {

    let {lang} = useSelector((state)=>state.LanguageSlice)
    console.log(lang)
    // lang = lang.langSlice.lang

    const [msisdn, setMsisdn] = useState('');
    const navigate=useNavigate()

    const handleMsisdnChange = (e) => {
        setMsisdn(e.target.value);
    };

    

    const checkUser=async()=>{
      let number = msisdn;
      
      if (typeof number !== 'string') {
        number = String(number);
      }
  
     
      if (number.substring(0, 2) !== '94') {
        
        if (number[0] === '0') {
          number = number.slice(1);
        }
       
        number = '94' + number;
      }
  
      console.log(number, "Formatted Number");

      console.log(number,"Number-------------------")



        try{
          const res = await axios.get('https://slcallback.gameofyy.com/checkuser',{
            params:{
              msisdn:number,
              service:"Gameofyy"
            }
          })
    
          if(res.data.status == 0){
            Cookies.remove('gameofyy_user')
            toast.warn("Subscription Expired!!");
            // Cookies.remove('user')
            // window.location.replace('http://consent.hutch.lk/register-service/VA%3D%3DCQ%3D%3Dew%3D%3D')
          }
          else{
            Cookies.set('gameofyy_user', number,{expires:1})
            Cookies.set('new_user_without_login','no_login',{expires:1});
           setTimeout(()=>{
            navigate('/home')
           },2000)
          }
          
        }
        catch(err){
          console.log(err)

        }
      }
    


    const handleSubmit = (e) => {
        console.log('clicked');
        e.preventDefault(); 
        checkUser()
    };


    const handleSubscribe=()=>{
      window.location.replace('http://consent.hutch.lk/register-service/VA%3D%3DCQ%3D%3Dew%3D%3D')
    }



    return (
        <Layout className='bg-[#623193] h-screen'>

            <div className='container mx-auto flex flex-col justify-center py-[70px] '>
                {/* <div className=' mx-auto'>
                    <img class="rounded-t-lg h-10" src="/images/gamelogo.png" alt="" />
                </div> */}
                <div className='flex justify-center py-3'>
                    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow  ">

                        <div class="p-5 shadow-xl shadow-purple-600 ">


                            <div class="w-full max-w-sm p-2  bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8  ">
                                <form class="space-y-4" action="#" onSubmit={handleSubmit}>
                                    <h5 class="text-2xl  text-[#6B57EF] font-bold text-center capitalize dark:text-white">{lang == 'en' ?'SIGN IN TO ENJOY !': lang == 'sin'?'විනෝද වීමට පුරන්න!':lang == 'ta'?"ரசிக்க உள்நுழைக!" :""}</h5>
                                    <div>
                                        <label for="number" class="block mb-2 text-sm font-medium text-gray-700 ">{lang=='en'?"Enter Number": lang =='sin'? "අංකය ඇතුලත් කරන්න":lang =='ta' ?'எண்ணை உள்ளிடவும்' :""}</label>
                                        <input type="number" name="number" id="number" value={msisdn} onChange={handleMsisdnChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    " placeholder="9478*******" required />
                                    </div>



                                    <button type="button" class="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleSubmit}>{lang=='en' ? 'Login': lang == 'sin' ? 'ඇතුල් වන්න' : lang == 'ta' ? 'உள்நுழைய':'Ingia'}</button>
                                    <p className="text-sm font-medium ">{lang == 'en' ? 'If not subscribed Click to Subscribe:' : lang == 'ta' ? 'குழுசேரவில்லை என்றால், குழுசேர கிளிக் செய்யவும்:': lang == 'sin' ? 'දායක වී නොමැති නම් දායක වීමට ක්ලික් කරන්න:':''}</p>
                                    <button type="button" class="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleSubscribe}>{lang=='en' ? 'Subscribe': lang == 'sin' ? 'දායක වන්න' : lang == 'ta' ? 'பதிவு':'Ingia'}</button>



                                </form>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </Layout>
    )
}

export default Login

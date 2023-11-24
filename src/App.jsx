import { useState ,useCallback,useRef,useEffect} from 'react'

import './App.css'

function App() {
  const [length,setlength] = useState(6);
  const [number,setnumber] = useState(false);
  const [char,setchar] = useState(false);
  const [password,setpassword] = useState("");
  const [copy,setcopy] = useState(false);
    //useref variable
    const passwordRef = useRef(null) ;


const copypassword=useCallback(()=>{
      passwordRef.current?.select()
        window.navigator.clipboard.writeText(password)
        document.getElementById('copy').innerHTML='copied' ;
        document.getElementById('copy').style.backgroundColor="gray";
     },[password])

  // usecallback(function,[dependencies])


  const passgenerator = useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" ;

    if(number) str +="0123456789" ;
    if(char) str+="!@#$%&*-_+=~[]{}" ;

    for(let i=0;i<length;i++){
      let n = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(n) ;
    }
    setpassword(pass);
    document.getElementById('copy').innerHTML='copy' ;
    document.getElementById('copy').style.backgroundColor="blue";
    // setcopy(copy);

},[length,number,char,setpassword,copypassword])


useEffect(()=>{passgenerator()},[length,number,char,setpassword])
  return (
    
       <div className='w-full max-w-md mx-auto  shadow-md rounded-lg  my-6 text-white bg-gray-700 text-center' id='head'>
        <h1 className='text-white text-center '>password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4 my-4 mx-3'>
           <input type="text" value={password} 
           className='outline-none w-full py-1 px-3 rounded-lg text-black'
           placeholder='password'
           readOnly
           ref={passwordRef}/>

           <button className=' text-white bg-blue-700 
           outline-none px-3 py-1 shrink-0 
           mx-0.1 rounded-lg' id='copy'
           onClick={copypassword} 
           >Copy</button>

         </div>
          <div className='flex text-sm gap-x-2 mx-8'>
            <div className='flex items-center gap-x-1'>
            <input className='cursor-pointer'
            type="range"min={6} max={15}value={length} 
            onChange={(e)=>{setlength(e.target.value)}
               }
            />
            <label >Length : ({length})</label>
           </div>
          
           <div className='flex items-center gap-x-1'>
            <input className=''
            type="checkbox" defaultChecked={number} id='numberinput' 
            onChange={()=>{setnumber((prev)=> !prev)}
               }
            />
            <label >Number</label>
           </div>

           <div className='flex items-center gap-x-1'>
            <input className=''
            type="checkbox" defaultChecked={char} id='numberinput' 
            onChange={()=>{setchar((prev)=> !prev)}
               }
            />
            <label ><h1 >Character</h1></label>
           </div>
          </div>
       </div>
    
  )
}

export default App

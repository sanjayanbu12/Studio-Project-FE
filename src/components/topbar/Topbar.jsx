import React, { useEffect, useState } from 'react'
import './Topbar.css'
import Report from '../reportgen/Report';
import Cards from '../cards/Cards';
import Form from '../form/Form';

const Topbar = () => {
    const [activeText, setActiveText] = useState('Text-1');
    const [userid,setUserid]=useState('');

   useEffect(()=>{
    const userid = localStorage.getItem("userid");
    setUserid(userid);
   })

    return (
        <div>
            <div class="topbar">

                <div className='animate-charcter'> Studi0 </div>
                <div className='threeroot'>
                    <div className={activeText === 'Text-1' ? 'active-text' : ''} onClick={() => setActiveText('Text-1')} style={{padding:"0 10px 5px 10px"}}>Text-1</div>
                    <div className={activeText === 'Text-2' ? 'active-text' : ''} onClick={() => setActiveText('Text-2')} style={{padding:"0 10px 5px 10px"}}>Text-2</div>
                    <div className={activeText === 'Text-3' ? 'active-text' : ''} onClick={() => setActiveText('Text-3')} style={{padding:"0 10px 5px 10px"}}>Text-3</div>
                </div>
            </div>
            {activeText === 'Text-1' && (
                <Cards userid={userid}/>
            )}
            {activeText === 'Text-2' && (
                <Form userid={userid}/>
            )}
            {activeText === 'Text-3' && (
                <Report />
            )}
        </div>
    )
}

export default Topbar
import React, { useState } from 'react'
import './Topbar.css'
import Report from '../reportgen/Report';
import Cards from '../cards/Cards';
import Form from '../form/Form';

const Topbar = () => {
    const [activeText, setActiveText] = useState('Text-1');
    return (
        <div>
            <div class="topbar">

                <div className='stdname'>STUDIO PURPLE</div>
                <div className='threeroot'>
                    <div className={activeText === 'Text-1' ? 'active-text' : ''} onClick={() => setActiveText('Text-1')} style={{padding:"0 10px 5px 10px"}}>Text-1</div>
                    <div className={activeText === 'Text-2' ? 'active-text' : ''} onClick={() => setActiveText('Text-2')} style={{padding:"0 10px 5px 10px"}}>Text-2</div>
                    <div className={activeText === 'Text-3' ? 'active-text' : ''} onClick={() => setActiveText('Text-3')} style={{padding:"0 10px 5px 10px"}}>Text-3</div>
                </div>
            </div>
            {activeText === 'Text-1' && (
                <Cards />
            )}
            {activeText === 'Text-2' && (
                <Form />
            )}
            {activeText === 'Text-3' && (
                <Report />
            )}
        </div>
    )
}

export default Topbar
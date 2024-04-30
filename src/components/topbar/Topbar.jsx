import React, { useEffect, useState } from 'react'
import './Topbar.css'
import Report from '../reportgen/Report';
import Cards from '../cards/Cards';
import Form from '../form/Form';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
    const [activeText, setActiveText] = useState('Plans');
    const [userid, setUserid] = useState('');
    const [role, setRole] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const userid = localStorage.getItem("userid");
        const role = localStorage.getItem("role");
        const name = localStorage.getItem("name");
        const email = localStorage.getItem("email");
        setUserid(userid);
        setRole(role);
        setName(name);
        setEmail(email);
    })
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
     navigate('/');
    }

    return (
        <div>
            <div class="topbar">
                <div className='menubar'>
                    <div className='animate-charcter'> Studi0 Purple</div>
                    <MenuIcon
                    style={{width:"50px",height:"50px",marginTop:"10px"}}
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick} />
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem >{name}</MenuItem>
                        <MenuItem >{email}</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </div>

                <div className='threeroot'>
                    <div className={activeText === 'Plans' ? 'active-text' : ''} onClick={() => setActiveText('Plans')} style={{ padding: "0 10px 5px 10px" }}>Plans</div>
                    {role === 'Admin' ? <div className={activeText === 'Form' ? 'active-text' : ''} onClick={() => setActiveText('Form')} style={{ padding: "0 10px 5px 10px" }}>Form</div> : null}
                    {role === 'Admin' ? <div className={activeText === 'Report' ? 'active-text' : ''} onClick={() => setActiveText('Report')} style={{ padding: "0 10px 5px 10px" }}>Report</div> : null}
                </div>
            </div>
            {activeText === 'Plans' && (
                <Cards userid={userid}/>
            )}
            {activeText === 'Form' && (
                <Form userid={userid} />
            )}
            {activeText === 'Report' && (
                <Report />
            )}
        </div>
    )
}

export default Topbar
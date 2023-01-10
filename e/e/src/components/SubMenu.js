import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import "./UserPage.css";
import { Link, useNavigate } from 'react-router-dom';



const SubMenu = ({ item }) => {

    const [subnav, setSubnav] = useState(false);

    const showSubnav = () => {

        setSubnav(!subnav);
    }

    return (

        <Stack direction="column" >
            <Stack className="nav-text" >
            <Link   to={item.path} onClick={item.subNav && showSubnav}>
                <div>{item.icon}
                    <span>{item.title} {item.subNav && subnav ? item.iconOpened : item.subNav ? item.iconClosed : null}</span>
                </div>
               
                </Link>
            </Stack>

            {subnav && item.subNav.map((item, index) => {


                return (


                    <Link className="submenu" to={item.path} key={index}>
                        <span>{item.title}</span>
                    </Link>
                 
                )
            })}



        </Stack>

    );

}

export default SubMenu;
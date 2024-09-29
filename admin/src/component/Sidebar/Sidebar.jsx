import React from 'react'
import './Sidebar.css'
import{ NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to='./add' className="sidebar-option">
                <img src="./image/add_icon_green.png" alt="" />
                <p>Add Items</p>
            </NavLink>
            <NavLink to='/list' className="sidebar-option">
                <img src="./image/add_icon_green.png"  alt="" />
                <p>List Items</p>
            </NavLink>
            <NavLink to='/orders' className="sidebar-option">
                <img src="./image/add_icon_green.png"  alt="" />
                <p>Orders</p>
            </NavLink>
        </div>
        
        </div>
  )
}

export default Sidebar



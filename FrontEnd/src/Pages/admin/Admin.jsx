import React from 'react'
import NavBar from '../../Components/admin/NavBar'
import { Outlet } from 'react-router-dom'

export default function Admin() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}

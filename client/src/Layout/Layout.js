import React from 'react'
import Header from '../Components/Header'
import { Outlet } from 'react-router'


export default function Layout(){
  return (
    <main>
        <Header />
        <Outlet />
    </main>
  )
}


import React from 'react'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout ? Component.Layout : React.Fragment
  const SidebarActive = Component.SidebarActive ? Component.SidebarActive : "Dashboard";
  return <Layout sidebar_active_name={SidebarActive}>
    <Component {...pageProps} />
  </Layout>
}

export default MyApp

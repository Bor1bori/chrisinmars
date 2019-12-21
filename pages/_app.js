import React from 'react';
import Head from 'next/head';
import { createGlobalStyle } from 'styled-components'


const Layout = ({ Component }) => {
  return (<>
    <Head>
      <title>Chris in Mars</title>
      <link rel="icon" type="image/x-icon" href="/static/favi_chris.jpg" />
      <link href="https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=swap" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/css?family=Dynalight" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/css?family=Inconsolata"
          rel="stylesheet" type="text/css" />
    </Head>
    <Component />
    <GlobalStyle />
  </>)
}

export default Layout;
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0px;
  }
`

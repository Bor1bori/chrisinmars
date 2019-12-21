import * as React from 'react';
import styled from 'styled-components';
import {Terminal} from '../components'
const Mission = () => {
  return (<Main>
    <img className='manwha' src='/static/manwha.png'/>
    <button onClick={() => window.location.href = '/main'} class="snip1535">Next</button>
    <Terminal noInitial={true}/>
  </Main>);
}

const Main = styled.div`
.manwha {
  position: absolute;
  left: 125px;
  top: 60px;
}

@import url(https://fonts.googleapis.com/css?family=BenchNine:700);
.snip1535 {
  position: absolute;
  left: 410px;
  top: 560px;

  background-color: rgba(44, 109, 76, 0.9);
  border: none;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: 'BenchNine', Arial, sans-serif;
  font-size: 1em;
  font-size: 22px;
  line-height: 1em;
  margin: 15px 40px;
  outline: none;
  padding: 12px 40px 10px;
  position: relative;
  text-transform: uppercase;
  font-weight: 700;
}
.snip1535:before,
.snip1535:after {
  border-color: transparent;
  -webkit-transition: all 0.25s;
  transition: all 0.25s;
  border-style: solid;
  border-width: 0;
  content: "";
  height: 24px;
  position: absolute;
  width: 24px;
}
.snip1535:before {
  border-color: rgba(44, 109, 76, 0.9);
  border-right-width: 2px;
  border-top-width: 2px;
  right: -5px;
  top: -5px;
}
.snip1535:after {
  border-bottom-width: 2px;
  border-color: rgba(44, 109, 76, 0.9);
  border-left-width: 2px;
  bottom: -5px;
  left: -5px;
}
.snip1535:hover,
.snip1535.hover {
  background-color: rgba(44, 109, 76, 0.9);
}
.snip1535:hover:before,
.snip1535.hover:before,
.snip1535:hover:after,
.snip1535.hover:after {
  height: 100%;
  width: 100%;
}
`
export default Mission;
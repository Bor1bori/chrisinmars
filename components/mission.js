import * as React from 'react';
import styled from 'styled-components';

const Mission = ({missions, step}) => {
  return (<Main>
    <div className='mission'>
    <div className='mission-line'>
          <input readOnly checked={missions[step].complete} type='checkBox'/>
          <span>{missions[step].content}</span>
        </div>
    </div>
  </Main>);
}

const Main = styled.div`
.mission {
  position: absolute;
  top: 70px;
  left: 720px;
  width: 300px;
  height: 80px;
  background-color: rgba(80, 80, 80, 0.4);
  border-radius: 10px;
  padding: 10px 5px 10px 5px;
  .mission-line {
    position: relative;
    span {
      position: absolute;
      left: 25px;
      top: 1.5px;
      font-size: 11px;
      color: white;
    }
  }
}
`
export default Mission;
import * as React from 'react';
import styled from 'styled-components';

const Terminal = ({inputManage}) => {
  const [cliInput, setCliInput] = React.useState('');
  const [outputs, setOutputs] = React.useState([{input: 'chris = new Person()', output: 'Done.'}, {input: 'map = new Map()', output: 'Done.'}]);
  const inputRef = React.useRef(null);
  const historyIndex = React.useRef(0);
  const mainRef = React.useRef(null);
  React.useEffect(() => {
    mainRef.current.scrollTop = mainRef.current.scrollHeight;
  }, [outputs])
  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (cliInput === '') {
        return;
      }
      historyIndex.current = 0;
      const result = inputManage(cliInput);
      let output = '';
      if (result) {
        if (cliInput === 'help') {
          output = result;
        } else {
          output = `${result}: ${cliInput}`;
        }
      } else {
        output = 'Done.'
      }
      setOutputs([...outputs, {input: cliInput, output}]);
      setCliInput(''); 
      return;
    }
    if (e.key === 'ArrowUp') {
      if (outputs.length - historyIndex.current === 0) {
        return;
      }
      historyIndex.current = historyIndex.current + 1;
      setCliInput(outputs[outputs.length - historyIndex.current].input);
    }
    if (e.key === 'ArrowDown') {
      if (historyIndex.current === 0) {
        return;
      }
      historyIndex.current = historyIndex.current - 1;
      if (historyIndex.current === 0) {
        setCliInput('');
        return;
      }
      setCliInput(outputs[outputs.length -  historyIndex.current].input);
    }
  }
  return (
    <Main ref={mainRef} onClick={() => inputRef.current.focus()}>
      <div id='cli' >
        <output>{outputs.map((outLine, idx) => {
          return (<div key={idx}>
            <div id="input-line" className="input-line">
              <div className="prompt">> </div><div><input value={outLine.input} readOnly className="cmdline"/></div>
            </div>
            <p><pre>{outLine.output}</pre></p>
          </div>)
        })}</output>
        <div id="input-line" className="input-line">
          <div className="prompt">> </div>
          <div>
            <input ref={inputRef} value={cliInput} onChange={(e) => setCliInput(e.target.value)} onKeyDown={onKeyDown} className="cmdline" autoFocus />
          </div>
        </div>
      </div>
    </Main>
  )
}

const Main = styled.div`
position: absolute;
width: 320px;
height: 625px;
bottom: 50px;
right: 50px;
padding: 0.5em 1.5em 1em 1em;
font-size: 11pt;
font-family: Inconsolata, monospace;
color: white;
background-color: black;
overflow-y: auto;
output {
  clear: both;
  width: 100%;
  h3 {
    margin: 0;
  }
  pre {
    margin: 0;

  }
}
.input-line {
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: horizontal;
  -moz-box-align: stretch;
  display: box;
  box-orient: horizontal;
  box-align: stretch;
  clear: both;
}
.input-line > div:nth-child(2) {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  box-flex: 1;
}
.prompt {
  white-space: nowrap;
  color: #96b38a;
  margin-right: 7px;
  display: -webkit-box;
  -webkit-box-pack: center;
  -webkit-box-orient: vertical;
  display: -moz-box;
  -moz-box-pack: center;
  -moz-box-orient: vertical;
  display: box;
  box-pack: center;
  box-orient: vertical;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
.cmdline {
  left: 5px;
  outline: none;
  background-color: transparent;
  margin: 0;
  width: 100%;
  font: inherit;
  border: none;
  color: inherit;
}
`
export default Terminal;
import * as React from 'react';
import styled from 'styled-components';
import {Terminal, Mission} from '../components'
import {Map, Person, House } from '../classess'

const getQuoteRemovedStr = (quotedString) => {
  let flag;
  if ((quotedString[0] === "'" && quotedString[quotedString.length-1] === "'") || (quotedString[0] === '"' && quotedString[quotedString.length-1] === '"')) {
    flag = true;
  }
  if (!flag) {
    return false;
  }
  return quotedString.slice(1, quotedString.length - 1);
}

const newClassParser = (str) => {
  let left = ''
  let idx = 0;
  idx = str.indexOf('=')
  const varName = str.slice(0, idx).trim();
  left = str.slice(idx);
  idx = left.indexOf('new ') + 4;
  left = left.slice(idx);
  idx = left.indexOf('(') + 1;
  const className = left.slice(0,idx-1).trim();
  const params = left.slice(idx, left.lastIndexOf(')')).trim().split(',');
  return [varName, className, params];
}
const methodCallParser = (str) => {
  let left = ''
  let idx = 0;
  idx = str.indexOf('.');
  const varName = str.slice(0, idx);
  left = str.slice(idx);
  idx = left.indexOf('(');
  const method = left.slice(1, idx);
  left = left.slice(idx);
  const params = left.slice(1, left.lastIndexOf(')')).trim().split(',');
  return [varName, method, params];
}
const constMissions = [
  {content: '제 여자친구 Merry가 사라졌어요..! Merry를 찾아주세요.',
  complete: false},
  {content: '음... 왜 제 도플갱어가 있는거죠? 도플갱어와 마주치기 전에 성별을 여자로 바꿔버려요!',
  complete: false},
  {content: '친구가 이쪽을 바라보게 해볼까요? 이제 마주쳐도 될 것 같아요.',
  complete: false},
  {content: '고마워요, 저희 방금 눈빛 교환을 했는데 집을 짓기로 했어요!.',
  complete: false},
  {content: '집에 크리스마스 장식을 하면 기분이 좀 나아질 것 같아요.',
  complete: false},
  {content: '화성에도 눈이 올까요? 눈이 오게 해주세요!',
  complete: false},
  {content: '와아 눈이다! 앗 집에는 눈이 쌓이지 않았네요. 버그인가? 집에도 눈이 오게 해볼까요?',
  complete: false},
  {content: '기분이 울적할 땐, 친구와 대화하는게 최고죠!, 친구와의 상호작용을 만들어볼까요?',
  complete: false},
  {content: '이제 가까이에 가서 E를 눌러 말을 걸어보세요!',
  complete: false}
]
const Index = () => {

  const mapCanvas =  React.useRef(null);
  const chrisCanvas = React.useRef(null);
  const houseCanvas = React.useRef(null);
  const personCanvas = React.useRef(null);
  const [mapping, setMapping] = React.useState({});
  const [triger, setTriger] = React.useState(true);
  const [step, setStep] = React.useState(0);
  const [missions, setMissions] = React.useState(constMissions);
  const [friendName, setFriendName] = React.useState('');
  const [houseName, setHouseName] = React.useState('');

  const mission0Check = (varName, className) => {
    if (step !== 0) {
      return;
    }
    if (className !== 'Person') {
      return;
    }
    mapping.chris.add1Happiness();
    setStep(step + 1);
    if (varName.toUpperCase() !== 'merry'.toUpperCase()) {
      setMissions(missions.map((mission, idx) => {
        if (idx === 1) {
          return {...mission, content: '음... 제 여자친구랑 이름은 다르지만 뭐 어때요! 근데 왜 제 도플갱어가 있는거죠? 도플갱어와 마주치기 전에 제 \'여자\'친구를 데려와주세요!'}
        }
        return mission;
      }))
    }
    setFriendName(varName);
  }
  const mission1Check = (varName, method, param) => {
    if (step !== 1) {
      return;
    }
    const unQuoted = getQuoteRemovedStr(param);
    if (varName === friendName && method === 'setGender' && unQuoted === 'female') {
      mapping.chris.add1Happiness();
      setStep(step + 1);
    }
  }
  const mission2Check = () => {
    if (step !== 2) {
      return;
    }
    if (!mapping[friendName]) {
      return;
    }
    let flag = false;
    const chrisX = mapping.chris.location.x;
    const friendX = mapping[friendName].location.x;
    if (chrisX > friendX) {
      if (mapping.chris.direction < 0 && mapping[friendName].direction > 0) {
        flag = true
        setMissions(missions.map((mission, idx) => {
          if (idx === 3) {
            return {...mission, content: '음 친구가 보는 방향을 바꾸라는 소리였는데 이것도 괜찮죠 뭐. ' + mission.content}
          }
          return mission;
        }))
      }
    } else if (chrisX < friendX) {
      if (mapping.chris.direction > 0 && mapping[friendName].direction < 0) {
        flag = true
      }
    }
    if (flag) {
      mapping.chris.add1Happiness();
      setStep(step + 1);
    }
  }

  const mission3Check = (varName, className) => {
    if (step !== 3) {
      return;
    }
    if (className === 'House') {
      mapping.chris.add1Happiness();
      mapping.chris.draw(true);
      setStep(step + 1);
      setHouseName(varName)
    }
  }
  const mission4Check = (varName, method, param) => {
    console.log(varName, method, param);
    console.log(step, houseName);
    if (step !== 4) {
      return;
    }
    if (varName === houseName && method === 'setDecoration' && param === 'true') {
      mapping.chris.add1Happiness();
      setStep(step + 1);
    }
  }
  const mission5Check = (varName, method, param) => {
    if (step !== 5) {
      return;
    }
    if (varName === 'map' && method === 'setSnow' && param === 'true') {
      mapping.chris.add1Happiness();
      mapping.chris.draw(true);
      setStep(step + 1);
    }
  }
  const mission6Check = (varName, method, param) => {
    if (step !== 6) {
      return;
    }
    if (varName === houseName && method === 'setSnow' && param === 'true') {
      mapping.chris.add1Happiness();
      setStep(step + 1);
    }
  }

  React.useEffect(() => {
    chrisCanvas.current.focus();
    setMapping({
      map: new Map(mapCanvas),
      chris: new Person(chrisCanvas, 'male', {x: 100, y: 450}, 0)
    })
  }, [])

  const onChrisMove = (key) => {
    const newLocation = mapping.chris.location;
    console.log(mapping);
    if (key==='ArrowLeft') {
      if (newLocation.x > -120) {
        newLocation.x = newLocation.x - 10
        mapping.chris.setLocation(newLocation.x, newLocation.y);
      }
      mapping.chris.setDirection(-1);
    } else if (key==='ArrowRight') {
      if (newLocation.x < 820) {
        newLocation.x = newLocation.x + 10
        mapping.chris.setLocation(newLocation.x, newLocation.y);
      }
      mapping.chris.setDirection(1);
    } else if (key==='e') {
      //
    }
    mission2Check();
    mapping.chris.draw(true);
  }
  const addMapping = (varName, className, params) => {
    console.log(params);
    if (className === 'Person') {
      setMapping({...mapping, [varName]: new Person(personCanvas)})
    } else if (className === 'House') {
      setMapping({...mapping, [varName]: new House(houseCanvas)})
    } else {
      return -1;
    }
  }

  const inputManage = (input) => {
    methodCallParser(input);
    const classReg = new RegExp('^[a-zA-Z][a-zA-Z0-9_]{0,20} *= *new *((Person|House) *\\(.*\\));?$');
    const methodReg = new RegExp('^[a-zA-Z][a-zA-Z0-9_]{0,20}\\.[a-zA-Z0-9_]{0,20}\\(.*\\);?$')
    const helpReg = new RegExp('^help *$')
    if (classReg.test(input)) {
      const [varName, className, params] = newClassParser(input);
      const result = addMapping(varName, className, params)
      if (result === -1) {
        return 'Undefined Class';
      }
      mission0Check(varName, className);
      mission3Check(varName, className);
    } else if (methodReg.test(input)) {
      const [varName, method, params] = methodCallParser(input);
      if (Object.keys(mapping).indexOf(varName) === -1) {
        return 'Undefined var';
      }
      const result = mapping[varName].methodRun(method, params)
      if (params.length === 1) {
        mission1Check(varName, method, params[0]);
        mission4Check(varName, method, params[0]);
        mission5Check(varName, method, params[0]);
        mission6Check(varName, method, params[0]);
      }
      mission2Check();
      if (result === -1) {
        return 'Undefined method';
      } else if (result === -2) {
        return 'Wrong params';
      }
      if (varName !== 'chris' && varName !== 'map') { // otherCanvas clear후 draw
        mapping[varName].clear();
        Object.keys(mapping).map((key) => {
          if (key !== 'chris' && key !== 'map') {
            console.log(`${key} draw 실행~~`)
            mapping[varName].draw();
          }
        })
      } else {
        mapping[varName].draw(true);
      }
    } else if (helpReg.test(input)) {
      return help;
    } else {
      return 'Unknown Command';
    }
    return;
  }

  return (<Main >
    <div style={{idth: '100vw', height: '100vh', overflow: 'hidden'}}>
      <img className='back' src='/static/realback.png'/>
    </div>
    <img className='logo' src='/static/logo.png'/>
    <canvas ref={mapCanvas} id='map-canvas' height='650px' width='1000px'></canvas>
    <canvas ref={houseCanvas} id='other-canvas' height='650px' width='1000px'></canvas>
    <canvas ref={personCanvas} id='other-canvas' height='650px' width='1000px'></canvas>
    <canvas
      tabIndex={0}
      ref={chrisCanvas}
      height='650px'
      width='1000px'
      onKeyDown={e => {
        onChrisMove(e.key, [triger, setTriger]);
      }}>
        <span>지원하지 않는 브라우저입니다.</span>
    </canvas>

    <Terminal inputManage={inputManage} />
    <Mission missions={missions} step={step}/>
  </Main>);
}

const Main = styled.div`
.back {
  width: 100%;
}
.logo {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: calc(20vh + 555px);
  height: 40px;
}
canvas {
  position: absolute;
  bottom: 50px;
  left: 50px;
}

.doc {
  position: absolute;
  width: 300px;
  height: 650px;
  top: 50px;
  right: 50px;
  background-color: grey;
}
`;

const help = "\n\
Class Person\n\
  constructor: varname = new Person()\n\
  Method:\n\
  setLocation(param): set location of\n\
  chracter\n\
    param form: {x: number, y: number}\n\
    ex) chulsu.setLocation({x: 200, y: 500})\n\
  setDirection(param): set Direction of\n\
  chracter\n\
    param form: number which is bigger than 0\n\
    if (right side) else less or equal than 0\n\
    ex) chulsu.setDirection(-1)\n\
  setGender(param): set Gender of chracter\n\
    param form: 'female' | 'male'\n\
    ex) chulsu.setGender('male')\n\
  getEmotion() : get emotion of chracter\n\
    return: 'happy' | 'soso' | 'sad'\n\
\n\
Class Map\n\
  can construct only one Map\n\
  constructor: varname = new Map()\n\
  Method\n\
  setSnow(param): set snow in map\n\
    param form: boolean\n\
    ex) map.setSnow(true)\n\
Class House\n\
  constructor: varname = new House()\n\
  Method\n\
  setSnow(param): set snow on house\n\
    param form: boolean\n\
    ex) map.setSnow(true)\n\
  setDecoration(param): decorate house\n\
    param form: boolean\n\
    ex) map.setDecoration(true)\n\
";
export default Index;
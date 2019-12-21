function loadImage(urls, idx) {
  if (idx === -1) {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => loadImage(urls, idx-1).then(imgs => resolve([...imgs, img])) ;
    img.onerror = () => reject(new Error(`load ${urls[idx]} fail`));
    img.src = urls[idx];
  }); 
}
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
export class Map {
  constructor(canvas) {
    this.canvas = canvas.current;
    this.snow = false;
    this.location = {x: 0, y: 0};
    this.ctx = this.canvas.getContext('2d');
    this.draw();
  }
  setSnow(param) {
    if (param === 'true') {
      this.snow = true;
    } else if (param === 'false') {
      this.snow = false;
    } else {
      return -2;
    }
  }
  getImages() {
    const ret = [];
    ret.push({
      src: `/static/background/background.png`,
      ...this.location
    });
    if (this.snow) {
      ret.push({
        src: `/static/background/background_snow.png`,
        ...this.location
      });
      ret.push({
        src: `/static/background/snow.png`,
        ...this.location
      });
    }
    return ret;
  }
  methodRun(method, params) {
    if (method === 'setSnow') {
      return this.setSnow(...params);
    } else {
      return -1;
    }
  }
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  draw(clear) {
    const getImgs = this.getImages();
    loadImage(getImgs.map((infos => infos.src)), this.getImages().length - 1).then(imgs => {
      if (clear) {
        this.clear();
      }
      for (let i = 0 ; i < getImgs.length ; i++) {
        this.ctx.drawImage(imgs[i], getImgs[i].x, getImgs[i].y, 1000, 650);
      }      
    })
  }
}
export class Person {
  constructor(canvas, gender, location, happiness) {
    this.canvas = canvas.current;
    this.ctx = this.canvas.getContext('2d');
    this.gender = gender || 'male';
    this.location = location || {x: 400, y: 450};
    this.happiness = happiness !== undefined ? happiness : 5;
    this.direction = 1;
    this.draw();
  }
  setLocation(x, y) {
    this.location = {x, y};
  }
  setDirection(num) {
    this.direction = parseInt(num);
  }
  setGender(gender) {
    console.log(gender);
    if (gender === 'male' || gender === 'female') {
      this.gender = gender;
    } else {
      return -2;
    }
  }
  add1Happiness() {
    this.happiness = this.happiness + 1;
  }
  getEmotion() {
    if (this.happiness > 5) {
      return 'happy';
    } else if (this.happiness > 3) {
      return 'soso';
    } else {
      return 'sad';
    }
  }
  getGender() {
    return this.gender
  }
  getImages() {
    const ret = [];
    ret.push({
      src: `/static/character/body/body${this.direction > 0 ? '_reverse' : ''}.png`,
      ...this.location
    });
    ret.push({
      src: `/static/character/face/${this.getEmotion()}${this.direction > 0 ? '_reverse' : ''}.png`,
      ...this.location
    });
    ret.push({
      src: `/static/character/hair/${this.getGender()}${this.direction > 0 ? '_reverse' : ''}.png`,
      ...this.location
    })
    return ret;
  }
  methodRun(method, params) {
    if (method === 'setLocation') {
      return this.setLocation(...params);
    } else if (method === 'setDirection') {
      return this.setDirection(...params);
    } else if (method === 'setGender') {
      if (params.lengt > 1) {
        return -2;
      }
      return this.setGender(getQuoteRemovedStr(params[0]));
    } else {
      return -1;
    }
  }
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  draw(clear) {
    const getImgs = this.getImages();
    loadImage(getImgs.map((infos => infos.src)), this.getImages().length - 1).then(imgs => {
      if (clear) {
        this.clear();
      }
      for (let i = 0 ; i < getImgs.length ; i++) {
        this.ctx.drawImage(imgs[i], getImgs[i].x, getImgs[i].y, 300, 220);
      }      
    })
  }
}

export class House {
  constructor(canvas) {
    this.canvas = canvas.current;
    this.snow = false;
    this.location = {x: 300, y: 300};
    this.decoration = false;
    this.ctx = this.canvas.getContext('2d');
    this.draw();
  }
  setSnow(param) {
    if (param === 'true') {
      this.snow = true;
    } else if (param === 'false') {
      this.snow = false;
    } else {
      return -2;
    }
  } 
  setDecoration(param) {
    if (param === 'true') {
      this.decoration = true;
    } else if (param === 'false') {
      this.decoration = false;
    } else {
      return -2;
    }
  }
  getImages() {
    const ret = [];
    ret.push({
      src: `/static/house/house.png`,
      ...this.location
    });
    if (this.snow) {
      ret.push({
        src: `/static/house/house_snow.png`,
        ...this.location
      });
    }
    if (this.decoration) {
      ret.push({
        src: `/static/house/house_christmas.png`,
        ...this.location
      });
    }
    return ret;
  }
  methodRun(method, params) {
    if (method === 'setSnow') {
      return this.setSnow(...params);
    } else if (method === 'setDecoration') {
      return this.setDecoration(...params);
    } else {
      return -1;
    }
  }
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  draw(clear) {
    console.log(this.getImages());
    const getImgs = this.getImages();
    loadImage(getImgs.map((infos => infos.src)), this.getImages().length - 1).then(imgs => {
      if (clear) {
        this.clear();
      }
      for (let i = 0 ; i < getImgs.length ; i++) {
        this.ctx.drawImage(imgs[i], getImgs[i].x, getImgs[i].y, 500, 325);
      }      
    })
  }
}
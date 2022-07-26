import './index.less';
import imgA from '../public/asset/a.jpg'

class Test{
    constructor(){
        console.log(7)
        this.renderDiv();
        this.renderImg();
    }

    renderDiv(){
        let div = document.createElement('div');
        div.className = 'test';
        div.innerHTML = 'hello less';
        document.body.appendChild(div);
    }

    renderImg(){
        let img = document.createElement('img');
        img.src = imgA;
        document.body.appendChild(img);
    }
}

new Test();
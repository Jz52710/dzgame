//面向对象
window.onload = function () {
    class Game{
        constructor(screenClassName,btnClassName,jxClassName,keyClassName,hpClassName,jfClassName,tcClassName,tczClassName,cxksClassName){
            this.screen = document.querySelector(screenClassName)
            this.btn = document.querySelector(btnClassName)
            this.jx = document.querySelector(jxClassName)
            this.key = document.querySelector(keyClassName)
            this.hp = document.querySelector(hpClassName)
            this.jf = document.querySelector(jfClassName)
            this.tc = document.querySelector(tcClassName)
            this.tcz = document.querySelector(tczClassName)
            this.cxks = document.querySelector(cxksClassName)
            this.letters = []
            // this.createLetter()
            this.runtz()
            this.killLetter()
            this.restart()
            this.isKill = false
        }
        //创建字母
        createLetter(num=5){
            for (let i = 0; i < num; i++) {
                 let div = document.createElement("div")
                div.classList.add("zm")
                //随机字母
                let letter = String.fromCharCode(parseInt(Math.random()*26+65))
                // //判断字母重复
                while (this.isRepeat(letter)){
                     letter = String.fromCharCode(parseInt(Math.random()*26+65))
                }
                // 判断距离重合
                let left = Math.random()*4
                while (this.isOverlap(left)) {//满足返回不运行，不满足运行
                     left = Math.random()*4
                }
                let top = Math.random()*2
                //判断重叠，只要返回不是-1 就确认是重叠了
                div.setAttribute("style",`background:url(./img/A-Z/${letter}.png);background-size:cover;top:${top}rem;left:${left}rem`)
                //随机位置

                this.screen.appendChild(div)

                //添加字母属性letters中
                let obj = {}
                obj["title"] = letter
                obj["top"] = top
                obj["left"] = left
                obj["node"] = div
                this.letters.unshift(obj)
            }
        }
        //判断是否去重
        isOverlap(left){
            let status = this.letters.findIndex((item)=>{
                if (Math.abs(left - item.left) < 0.53) {
                    return item
                }
            })
            if (status != -1) {
                return true
            }else {
                return false
            }
        }
        // //判断字母重复
        isRepeat(letter){
            let status = this.letters.findIndex((item)=>{
                if (item.title == letter) {
                    return item
                }
            })
            if (status == -1) {
                return false
            }else{
                return true
            }
        }
        //动起来
        run(){
            this.t = setInterval(()=>{
                this.letters.forEach((item,index)=>{
                    item.top +=0.3
                    item.node.style.top = item.top+"rem"
                    //超出屏幕删除
                    if (item.top > 8.9) {
                        this.removeChild(index)
                        // this.screen.removeChild(item.node)
                        // this.letters.splice(index,1)
                        // this.createLetter(1)
                        this.hp.innerText -=1
                        if (this.hp.innerText == 0) {
                            clearInterval(this.t)
                            this.hp.innerText = 10
                            this.jf.innerText = 0
                            this.jx.style.zIndex = "4"
                            this.btn.style.zIndex = "2"
                            this.tc.style.display = "block"
                        }
                    }
                })

            },500)
            //暂停
            // let zt = document.querySelector(".zt")
            // let jx = document.querySelector(".jx")
            // zt.onclick =function () {
            //     clearInterval(time)
            //     jx.style.zIndex = "4"
            //     zt.style.zIndex = "2"
            // }
            // jx.onclick = function () {
            //     game.run()
            //     zt.style.zIndex = "4"
            //     jx.style.zIndex = "2"
            // }

        }
        //暂停
        runtz(){
            let flag = true
            this.jx.ontouchstart =  ()=> {
                if (flag) {
                    flag = false
                    this.run()
                    this.isKill = true
                    this.jx.style.zIndex = "2"
                    this.btn.style.zIndex = "4"
                }else {
                    flag = true
                    clearInterval(this.t)
                    this.isKill = false
                    this.jx.style.zIndex = "4"
                    this.btn.style.zIndex = "2"
                }

            }
            this.btn.ontouchstart =  ()=> {
                if (flag) {
                    flag = false
                    this.run()
                    this.isKill = true
                    this.jx.style.zIndex = "2"
                    this.btn.style.zIndex = "4"
                }else {
                    flag = true
                    clearInterval(this.t)
                    this.isKill = false
                    this.jx.style.zIndex = "4"
                    this.btn.style.zIndex = "2"
                }
            }
        }
        //消除字母
        killLetter(){

                this.key.ontouchstart = (event)=>{
                    if(!this.isKill){
                        return
                    }
                    let target = event.target
                    if (target.nodeName == "SPAN") {
                        let lettteer = target.innerText
                        let index = this.letters.findIndex((item)=>{
                            if (item.title==lettteer){
                                return item
                            }
                        })
                        if (index != -1) {
                            this.removeChild(index)
                        }
                    //积分
                        let num = parseInt(this.jf.innerText)
                        num +=1
                        this.jf.innerText = num
                        this.tcz.innerText = num
                        if (num == 10) {
                            clearInterval(this.t)
                            this.jf.innerText = 0
                            this.hp.innerText = 10
                            this.jx.style.zIndex = "4"
                            this.btn.style.zIndex = "2"
                            this.tc.style.display = "block"
                        }
                    }
                }

        }
        //移除
        removeChild(index){
            this.screen.removeChild(this.letters[index].node)
            this.letters.splice(index,1)
            this.createLetter(1)

        }
        //重新开始
        restart(){
            this.cxks.ontouchstart = ()=>{
                this.tc.style.display = "none"
                this.tcz.innerText = 0
            }
        }


    }


    let game = new Game(".screen",".zt",".jx",".key",".hp",".iq",".tcbox",".tcz",".tccxks")
    game.createLetter()
    // console.log(Game.letters)
    // game.run()

}
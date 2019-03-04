/*
 	方法
 		画线、虚线、实线、矩形、多边形、多角形、圆、铅笔、文字、
 		橡皮
 		撤销
 		裁切
 		新建
 		保存
 	属性
 		线宽、线的颜色、线端点的样式、填充样式、描边
 		边数、角数
 * */


class Palette{
	constructor(canvas,ctx,opacity){
		this.canvas = canvas;
		this.ctx = ctx;
		this.cw = this.canvas.width;
		this.ch = this.canvas.height;
		this.opacity = opacity;
		this.xpc = document.querySelector('.xpc');
		//样式
		this.lineWidth = 1;
		//this.lineWidth = kuan();console.log(this.lineWidth)
		this.lineCap = 'butt';
		//描边	填充
		this.style = 'stroke';
		//颜色
		this.fillStyle = '#000';
		this.strokeStyle = '#000';
		//历史记录
		this.history = [];
		//裁切
		this.temp = null;
	}
	//初始化方法
	init(){
		this.ctx.lineWidth = this.lineWidth;
		this.ctx.lineCap = this.lineCap;
		this.ctx.fillStyle = this.fillStyle;
		this.ctx.strokeStyle = this.strokeStyle;
	}
	
	draw(type,n){
		this.opacity.onmousedown = function(e){
			let cx = e.offsetX , cy = e.offsetY;
			this.opacity.onmousemove = function(e){
				this.init();
				let ox = e.offsetX , oy = e.offsetY;
				let r = Math.sqrt(Math.pow(ox-cx,2) + Math.pow(oy-cy,2));
				this.ctx.clearRect(0,0,this.cw,this.ch);
				if (this.history.length) {
					this.ctx.putImageData(this.history[this.history.length-1],0,0)
				}
				this.ctx.setLineDash([0,0]);
				this[type](cx,cy,ox,oy,n);
			}.bind(this)
			this.opacity.onmouseup = function(){
				this.history.push(this.ctx.getImageData(0,0,this.cw,this.ch));
				this.opacity.onmousemove = null;
				this.opacity.onmouseup = null;
			}.bind(this)
		}.bind(this)
	}
	//直线
	line(cx,cy,ox,oy){
		this.ctx.setLineDash([0,0]);
		this.ctx.beginPath();
		this.ctx.moveTo(cx,cy);
		this.ctx.lineTo(ox,oy);
		this.ctx.stroke();
	}
	//虚线
	dash(cx,cy,ox,oy){
				this.ctx.beginPath();
				this.ctx.setLineDash([3,5]);
				this.ctx.moveTo(cx,cy);
				this.ctx.lineTo(ox,oy);
				this.ctx.stroke();
	}
	//铅笔
	pencil(){
		this.opacity.onmousedown = function(e){
			let cx = e.offsetX , cy = e.offsetY;
			this.ctx.setLineDash([0,0]);
			this.ctx.beginPath();
			this.ctx.moveTo(cx,cy);
			this.opacity.onmousemove = function(e){
				let ox = e.offsetX , oy = e.offsetY;
				this.ctx.lineTo(ox,oy);
				this.ctx.stroke();
			}.bind(this)
			this.opacity.onmouseup = function(){
				this.history.push(this.ctx.getImageData(0,0,this.cw,this.ch));
				this.opacity.onmousemove = null;
				this.opacity.onmouseup = null;
			}.bind(this)
		}.bind(this)
	}
	//矩形
	rect(cx,cy,ox,oy){
				this.ctx.setLineDash([0,0]);				
				this.ctx.beginPath();
				if (this.style == 'stroke') {
					this.ctx.strokeRect(cx,cy,Math.abs(ox-cx),Math.abs(oy-cy));
				}else{
					this.ctx.fillRect(cx,cy,Math.abs(ox-cx),Math.abs(oy-cy));
				}
				
	}
	
	//圆
	circle(cx,cy,ox,oy){
				let r = Math.sqrt(Math.pow(ox-cx,2) + Math.pow(oy-cy,2));
				this.ctx.setLineDash([0,0]);
				this.ctx.beginPath();
				this.ctx.arc(cx,cy,r,0,Math.PI*2);
				this.ctx[this.style]();	
	}
	//多边形
	poly(cx,cy,ox,oy,n){
		let rad = Math.PI*2 / n;
		let r = Math.sqrt(Math.pow(ox-cx,2) + Math.pow(oy-cy,2));
			this.ctx.beginPath();
			this.ctx.moveTo(cx+r,cy);
			for (let i=0;i<n;i++) {
					let x = cx + r* Math.cos(rad*i);
				let y = cy + r* Math.sin(rad*i);
				this.ctx.lineTo(x,y);
			}
			this.ctx.closePath();
				this.ctx[this.style]();
		}
	
	//多角形
	polyJ(cx,cy,ox,oy,n){
		let rad = Math.PI / n;
		let r = Math.sqrt(Math.pow(ox-cx,2) + Math.pow(oy-cy,2));
				this.ctx.beginPath();
				this.ctx.moveTo(cx+r,cy);
				for (let i=0;i<2*n;i++) {
					let r1 = i%2==0 ? r : r/2;
					let x = cx + r1* Math.cos(rad*i);
					let y = cy + r1* Math.sin(rad*i);
					this.ctx.lineTo(x,y);
				}
				this.ctx.closePath();
				this.ctx[this.style]();
		}
	//撤销
	cancel(){
		if (!this.history.length) {
				return;
			}
		this.history.pop();
		this.ctx.clearRect(0,0,this.cw,this.ch);
		this.ctx.putImageData(this.history[this.history.length-1],0,0);
	}
	//橡皮
	eraser(){
		this.opacity.onmousedown = function(e){
			let cx = e.offsetX - 25, cy = e.offsetY - 25;
			this.xpc.style.display = 'block';
			this.xpc.style.left = `${cx}px`;
			this.xpc.style.top = `${cy}px`;
			this.opacity.onmousemove = function(e){
				let ox = e.offsetX - 25, oy = e.offsetY - 25;
				//边界
				
				this.ctx.clearRect(ox,oy,50,50);
				
				this.xpc.style.left = `${ox}px`;
				this.xpc.style.top = `${oy}px`;
				/*if (ox <= this.cw-25) {
					ox = this.cw-25;
				}*/
			}.bind(this)
			this.opacity.onmouseup = function(){
				this.xpc.style.display = 'none';
				this.history.push(this.ctx.getImageData(0,0,this.cw,this.ch));
				this.opacity.onmousemove = null;
				this.opacity.onmouseup = null;
			}.bind(this)					
		}.bind(this)
	}
	font(sizes){
		let that = this;
		let lefts = 0 , tops = 0; 
		this.opacity.onmousedown = function(e){
			that.opacity.onmousedown = null;
			let cx = e.offsetX , cy = e.offsetY;
			let divs = document.createElement('div');
			divs.contentEditable = true;
			divs.style.cssText = `
				width:100px;
				height:30px;
				border:1px dashed #ccc;
				position:absolute;
				left:${cx}px;
				top:${cy}px;	
				cursor:move;
			`;
			this.appendChild(divs);
			
			/*divs.onblur = function(){
				let value = this.innerText;
				that.opacity.removeChild(divs);
				divs = null;
				that.ctx.font = 'bold 20px sans-serif';
				that.ctx.textAlign = 'center';
				that.ctx.textBaseline = 'middle';
				that.ctx.fillText(value,lefts,tops);
				that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
				
			}*/
			/*拖拽*/
			divs.onmousedown = function(e){
				let cx = e.clientX , cy = e.clientY;
				let left = divs.offsetLeft,top = divs.offsetTop;
				that.opacity.onmousemove = function(e){
					let ox = e.clientX , oy = e.clientY;
					    lefts = left + ox-cx,
						tops = top + oy-cy;
						if (lefts <= 0) {
							lefts = 0;
						}
						if (lefts >= that.cw - 100) {
							lefts = that.cw - 100;
						}
						if (tops <= 0) {
							tops = 0;
						}
						if (tops >= that.ch - 30) {
							tops = that.ch - 30;
						}
					divs.style.left = `${lefts}px`;
					divs.style.top = `${tops}px`;
				}
				divs.onmouseup = function(){
					that.opacity.onmousemove = null;
					this.onmouseup = null;
				}
				
			}
			
			
			divs.onblur = function(){
				let value = this.innerText;
				that.opacity.removeChild(divs);
				that.ctx.font = `bold ${sizes}px sans-serif`;
				that.ctx.textAlign = 'center';
				that.ctx.textBaseline = 'middle';
				that.ctx.fillText(value,lefts,tops);
				that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
			}
		}
		
	}
	
	//裁切
	clip(obj){
		let that = this;
		let minX , minY , w , h;
		this.opacity.onmousedown = function(e){
			let cx = e.offsetX , cy = e.offsetY;
			obj.style.display = 'block';
			obj.style.width = 0;
			obj.style.height = 0;
			
			that.opacity.onmousemove = function(e){
				let ox = e.offsetX , oy = e.offsetY;
				w = Math.abs(cx-ox) , h = Math.abs(cy-oy);
				minX = ox >=cx ? cx : ox;
				minY = oy >=cy ? cy : oy;
				
				obj.style.left = `${minX}px`;
				obj.style.top = `${minY}px`;
				obj.style.width = `${w}px`;
				obj.style.height = `${h}px`;								
			}
			that.opacity.onmouseup = function(){
				that.temp = that.ctx.getImageData(minX,minY,w,h);
				that.ctx.clearRect(minX,minY,w,h);
				that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
				that.ctx.putImageData(that.temp,minX,minY);
				obj.style.display = 'none';
				that.opacity.onmousemove = null;
				that.opacity.onmouseup = null;
				that.drag(minX,minY,obj);
			}
		}		
	}
	drag(x,y,obj){
		let that = this;
		this.opacity.onmousedown = function(e){
			let cx = e.offsetX , cy = e.offsetY;			
			that.opacity.onmousemove = function(e){
				let ox = e.offsetX , oy = e.offsetY;
				let lefts = x + ox - cx,
					tops = y + oy - cy;
				obj.style.left = `${lefts}px`;
				obj.style.top = `${tops}px`; 
				that.ctx.clearRect(0,0,that.cw,that.ch);
				if (that.history.length) {
					that.ctx.putImageData(that.history[that.history.length-1],0,0);
				}
				that.ctx.putImageData(that.temp,lefts,tops);
				
			}
			that.opacity.onmouseup = function(){
				that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
				that.temp = null;
				obj.style.display = 'none';
				that.opacity.onmousemove = null;
				that.opacity.onmouseup = null;
			}
		}
		
	}
	//清除
	clearAll(){
		this.ctx.clearRect(0,0,this.cw,this.ch);
		this.history.push(this.ctx.getImageData(0,0,this.cw,this.ch));
	}
	//反向
	reverse(){
		let imagedata = this.ctx.getImageData(0,0,this.cw,this.ch);
		for (let i=0;i<imagedata.data.length;i+=4) {
			imagedata.data[i] = 255-imagedata.data[i];
			imagedata.data[i+1] = 255-imagedata.data[i+1];
			imagedata.data[i+2] = 255-imagedata.data[i+2];
			
		}
		this.ctx.putImageData(imagedata,0,0);
	}
	//线宽
	
/////////	
}
/*function kuan(){
		let select = $('select.xiankuan');
		select[0].onchange = function(){
			let index = select[0].selectedIndex;
			return select[0].options[index].value;
		}
	}
console.log(kuan())*/
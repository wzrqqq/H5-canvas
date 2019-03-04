window.onload = function(){
	let line = document.querySelector('#line');
	let dash = document.querySelector('#dash');
	let pencil = document.querySelector('#pencil');
	let canvas  = document.querySelector('canvas');
	let rect = document.querySelector('#rect');
	let poly = document.querySelector('#poly');
	let circle = document.querySelector('#circle');
	let polyJ = document.querySelector('#polyJ');
	let cancel = document.querySelector('#cancel');
	let xiangpi = document.querySelector('#eraser');
	let fill = document.querySelector('#paint');
	let stroke = document.querySelector('#stroke');
	let aa = document.querySelector('#fill input');
	let bb = document.querySelector('#Color input');
	let text = document.querySelector('#text');
	//let eraser = document.querySelector('.eraser');
	let opacity = document.querySelector('.opacity');
	let cutting = document.querySelector('#cutting');
	let reverse = document.querySelector('.reverse');
	let newfile = document.querySelector('.newfile');
	let clearAll = document.querySelector('.clearAll');
	let clean = document.querySelector('.clean');
	let save = document.querySelector('.save');
	//let GG = document.querySelectorAll('.GG');
	let tool = document.querySelectorAll('.tool');
	let ctx = canvas.getContext('2d');
	let pal = new Palette(canvas,ctx,opacity);
	/*pal.line();*/
	//console.log(tool)
	
	line.onclick = function(){
		pal.draw('line');
	}
	dash.onclick = function(){
		pal.draw('dash');
	}
	pencil.onclick = function(){
		pal.pencil();
	}
	rect.onclick = function(){
		pal.draw('rect');
	}
	circle.onclick = function(){
		pal.draw('circle');
	}
	poly.onclick = function(){
		let num = prompt('请输入边数',5);
		pal.draw('poly',num);
	}
	polyJ.onclick = function(){
		let num = prompt('请输入角数',5);
		pal.draw('polyJ',num);
	}
	cancel.onclick = function(){
		pal.cancel();
	}
	xiangpi.onclick = function(){
		pal.eraser();
	}
	stroke.onclick = function(){
		pal.style = 'stroke';
	}
	fill.onclick = function(){
		pal.style = 'fill';
	}
	aa.onclick = function(){
		aa.onblur = function(){
			let value = aa.value;
			pal.fillStyle = value;
		}
	}
	bb.onclick = function(){
		bb.onblur = function(){
			let value = bb.value;
			pal.strokeStyle = value;
		}
	}
	text.onclick = function(){
		let sizes = prompt('请输入字体大小',20)
		pal.font(sizes);
	}
	cutting.onclick = function(){
		pal.clip(clean);
	}
	
	//保存
	save.onclick = function(){
		let data = canvas.toDataURL('image/png');
		save.href = data;
		save.download = 'tu.png';
	}
	
	//清除
	clearAll.onclick = function(){
		pal.clearAll();
	}
	//新建
	newfile.onclick = function(){
		let flag = confirm('是否保存');
		if (flag) {
			save.onclick();
		}
		clearAll.onclick();
	}
	//反向
	reverse.onclick = function(){
		pal.reverse();
	}
	
	//加边框
	for (let i=0;i<tool.length;i++) {
		tool[i].addEventListener('click',function(){
			for (let j=0;j<tool.length;j++) {
				tool[j].style.border = '1px solid white';
			}
			tool[i].style.border = '1px solid black';
		})
	}
	
	/*tool.forEach(element=>{
		element.onclick = function(){
			let num = 0;
			if (element.id == 'pencil') {
				pal.pencil();
				return;				
			}
			if (element.id == 'poly' || element.id == 'polyJ') {
				num = prompt('输入',5);
			}
			pal.draw(element.id,num);
		}
	})
	GG.forEach(element =>{
		element.onblur = function(){
			pal[element.id] = element.value;
		}
	})*/
	
	
	
}

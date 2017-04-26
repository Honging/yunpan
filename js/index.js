// index.js

//初始化
var orgin = [
	{
		name: "小小云",
	    type: "folder",
	    _id: "_id" + 0,
	    fileClass: "folder",
	    time: +new Date(),
	    child: data
	}
];

// 获取元素
var leftList = document.getElementById('leftList');
var menu = document.getElementById('menu');
var sorts = menu.getElementsByTagName('li');
var paths = document.getElementById('paths');
var folders = document.getElementById('folders');
var others = document.getElementById('others');
var view = document.getElementById('view');
var listView = document.getElementById('listView');
var imgView = document.getElementById('imgView');
var order = document.getElementById('order');
var add = document.getElementById('add');
var addList = document.getElementById('addList');
var createFolder = document.getElementById('createFolder');
var selectorAll = document.getElementById('selectorAll');
var content = document.getElementById('content');
var inner = document.getElementById('inner');
var right = document.getElementById('right');
var contextmenu = document.getElementById('contextmenu');
var contextmenuBtn = contextmenu.getElementsByTagName('li');
var messageBar = document.getElementById('messageBar');
var cancelSelectBtn = document.getElementById('cancelSelectBtn');
var number = document.getElementById('number');
var removes = document.getElementById('removes');
var renames = document.getElementById('renames');
var moveto = document.getElementById('moveto');
var talkBar = document.getElementById('talkBar');
var introText = document.getElementById('introText');
var movePaths = document.getElementById('movePaths');
var placeInner = document.getElementById('placeInner');
var movetoConfirm = document.getElementById('movetoConfirm');
var movetoConcel = document.getElementById('movetoConcel');
var movetoReminder = document.getElementById('movetoReminder');
var talkClose = document.getElementById('talkClose');
var recycle = document.getElementById('recycle');
var commonBar = document.getElementById('commonBar');
var allBar = document.getElementById('allBar');
var recycleBar = document.getElementById('recycleBar');
var revert = document.getElementById('revert');
var removesForever = document.getElementById('removesForever');







// 头部工具条的功能实现
// 全部文档下视图切换
listView.onclick = function () {
	all.onOff = view.onOff = false;
	listView.className = 'listView active';
	imgView.className = cutClass(imgView.className);
	nextLevel(paths.path[paths.path.length-1].child);
};
imgView.onclick = function () {
	all.onOff = view.onOff = true;
	imgView.className = 'imgView active';
	listView.className = cutClass(listView.className);
	nextLevel(paths.path[paths.path.length-1].child);
};



// 添加按钮的功能实现
// 滑出添加按钮窗
var addTimer;
add.onmouseover = function () {
	clearTimeout(addTimer);
	addList.style.display = 'block';
	setTimeout(function () {
		addList.style.opacity = 1;
		addList.style.transform = 'translate3d(0px,0px,0px)';
	}, 100);
};
add.onmouseout = function () {
	clearTimeout(addTimer);
	addTimer = setTimeout(function () {
		addList.style.opacity = '';
		addList.style.transform = '';
		setTimeout(function () {
			addList.style.display = '';
		}, 50);
	}, 200);
};
addList.onmouseover = function () {
	clearTimeout(addTimer);
};
addList.onmouseout = function () {
	clearTimeout(addTimer);
	addTimer = setTimeout(function () {
		addList.style.opacity = '';
		addList.style.transform = '';
		setTimeout(function () {
			addList.style.display = '';
		}, 50);
	}, 200);
};
// 新建文件夹
createFolder.onclick = function () {
	if (all.className == cutClass(all.className)) {
		all.onclick();
	}
	var newFolder = {
			name: "newFolder",
		    type: "folder",
		    _id: "_id" + Math.random(),
		    fileClass: "folder",
		    time: +new Date(),
		    child: []
	};
	var node = falseFolder(newFolder);
	var name = node.getElementsByClassName('name')[0];
	var setname = node.getElementsByTagName('input')[0];
	name.style.display = 'none';
	setname.style.display = 'block';
	setname.focus();

	document.addEventListener('mousedown', createFolder);

	function createFolder () {
		if (setname.value) {
			newFolder.name = setname.value;
			paths.path[paths.path.length-1].child.unshift(newFolder);
			folders.removeChild(node);
			var trueFolder = render(newFolder);
			folders.insertBefore(trueFolder, folders.children[0]);
		}else {
			folders.removeChild(node);
		}
		document.removeEventListener('mousedown', createFolder);
	};

};







// 信息条功能实现
// 取消选择
cancelSelectBtn.onclick = function () {
	clearSelect();
	selectorAll.onOff = true;
	selectorAll.className = cutClass(selectorAll.className);
	messageBar.style.display = '';
};
// 删除
removes.onclick = function () {
	reMoves();
};
// 重命名
renames.onclick = function () {
	reNames();
};
// 移动到
moveto.onclick = function () {
	moveTo();
};
// 回收站功能
revert.onclick = function () {
	handleGarbage(this.id);
};
removesForever.onclick = function () {
	handleGarbage(this.id);
};







// 左边列表的实现
//最近和文件列表
for (var i = 0; i < sorts.length; i++) {
	sorts[i].onclick = function () {
		for (var j = 0; j < sorts.length; j++) {
			sorts[j].className = sorts[j].id;
		}
		this.className = this.id + ' active';
		
		if (this.id=='all') {
			selectorAll.style.display = '';
			inner.style.borderWidth = '1px';
			view.style.display = '';
			order.style.display = '';
			view.onOff = all.onOff;
			if (all.orgin) {
				paths.path = orgin.slice(0);
			}
			paths.innerHTML = '';
			path(paths.path);
			nextLevel(paths.path[paths.path.length-1].child);
			all.orgin = true;
			commonBar.style.display = '';
			allBar.style.display = '';
			recycleBar.style.display = '';
		}else if (this.id=='recycle') {
			all.orgin = false;
			paths.innerHTML = '';
			selectorAll.style.display = 'none';
			inner.style.borderWidth = 0;
			view.style.display = 'none';
			order.style.display = 'none';
			view.onOff = true;
			folders.innerHTML = '';
			others.innerHTML = '';
			recycle.garbage.forEach(function (ele) {
				renderRecycle(ele);
			});
			commonBar.style.display = 'none';
			allBar.style.display = '';
			recycleBar.style.display = 'block';
		}else{
			all.orgin = false;
			if (this.id=='recent') {
				var array = recent.ele;
			}else {
				var array = sort(data,this.id);
			}
			paths.innerHTML = '';
			selectorAll.style.display = 'none';
			inner.style.borderWidth = 0;
			view.style.display = 'none';
			order.style.display = 'none';
			view.onOff = true;
			nextLevel (array);
			commonBar.style.display = '';
			allBar.style.display = 'none';
			recycleBar.style.display = '';
		}
		changeSelectAll();
		numSelected();
		return false;
	};
}
// 初始化
paths.path = orgin.slice(0);
all.onOff = true;
recycle.garbage = [];
sorts[1].onclick();





// 全选功能
selectorAll.onOff = true;
selectorAll.onmousedown = function (ev) {
	ev.cancelBubble = true;
}
selectorAll.onclick = function () {
	var selectorFolders = folders.getElementsByClassName('selector');
	var selectorOthers = others.getElementsByClassName('selector');
	if (selectorFolders.length==0 && selectorOthers.length==0) {
		return;
	}
	if (selectorAll.onOff) {
		selectorAll.className = selectorAll.className + ' active';
		for (var i = 0; i < selectorFolders.length; i++) {
			selectorFolders[i].className = selectorFolders[i].className + ' active';
			if (view.onOff) {
				selectorFolders[i].parentNode.style.outline = '2px solid #c9dd22';
			} else {
				selectorFolders[i].parentNode.style.background = 'rgba(201,221,34,.5)';
			}
			
		}
		for (var i = 0; i < selectorOthers.length; i++) {
			selectorOthers[i].className = selectorOthers[i].className + ' active';
			if (view.onOff) {
				selectorOthers[i].parentNode.style.outline = '2px solid #c9dd22';
			} else {
				selectorOthers[i].parentNode.style.background = 'rgba(201,221,34,.5)';
			}
		}
	}else {
		selectorAll.className = cutClass(selectorAll.className);
		for (var i = 0; i < selectorFolders.length; i++) {
			selectorFolders[i].className = cutClass(selectorFolders[i].className);
			selectorFolders[i].parentNode.style.outline = '';
			selectorFolders[i].parentNode.style.background = '';
			selectorFolders[i].style.display = '';
		}
		for (var i = 0; i < selectorOthers.length; i++) {
			selectorOthers[i].className = cutClass(selectorOthers[i].className);
			selectorOthers[i].parentNode.style.outline = '';
			selectorOthers[i].parentNode.style.background = '';
			selectorOthers[i].style.display = '';
		}
	}
	selectorAll.onOff = !selectorAll.onOff;
	for (var i = 0; i < selectorFolders.length; i++) {
		selectorFolders[i].onOff = selectorAll.onOff;
	}
	for (var i = 0; i < selectorOthers.length; i++) {
		selectorOthers[i].onOff = selectorAll.onOff;
	}
	numSelected();
};

// 框选
var body = document.getElementsByTagName('body')[0];
right.onmousedown = function (ev) {
	// 生成框元素
	var square = document.createElement('div');
	square.className = 'square';
	square.style.display = 'none';
	body.appendChild(square);
	// 实现框选
	var disx = ev.clientX;
	var disy = ev.clientY;
	square.style.left = disx + 'px';
	square.style.top = disy+'px';
	// 清除已选中
	clearSelect();
	changeSelectAll();

	document.onmousemove = function (ev) {
		square.style.display = 'block';
		var width = ev.clientX - disx;
		var height = ev.clientY - disy;
		if(width<0){
			square.style.left = ev.clientX+'px';
		}
		if(height<0){
			square.style.top = ev.clientY+'px';
		}
		square.style.width = Math.abs(width)+'px';
		square.style.height = Math.abs(height)+'px';
	
		var selectorFolders = folders.getElementsByClassName('selector');
		var selectorOthers = others.getElementsByClassName('selector');
		for (var i = 0; i < selectorFolders.length; i++) {
			if (collision(selectorFolders[i].parentNode,square)) {
				selectorFolders[i].className = selectorFolders[i].className + ' active';
				if (view.onOff) {
					selectorFolders[i].parentNode.style.outline = '2px solid #c9dd22';
				} else {
					selectorFolders[i].parentNode.style.background = 'rgba(201,221,34,.5)';
				}
				selectorFolders[i].onOff = false;
			}else {
				selectorFolders[i].className = cutClass(selectorFolders[i].className);
				selectorFolders[i].parentNode.style.outline = '';
				selectorFolders[i].parentNode.style.background = '';
				selectorFolders[i].style.display = '';
				selectorFolders[i].onOff = true;
			}
		}
		for (var i = 0; i < selectorOthers.length; i++) {
			if (collision(selectorOthers[i].parentNode,square)) {
				selectorOthers[i].className = selectorOthers[i].className + ' active';
				if (view.onOff) {
					selectorOthers[i].parentNode.style.outline = '2px solid #c9dd22';
				} else {
					selectorOthers[i].parentNode.style.background = 'rgba(201,221,34,.5)';
				}
				selectorOthers[i].onOff = false;
			}else {
				selectorOthers[i].className = cutClass(selectorOthers[i].className);
				selectorOthers[i].parentNode.style.outline = '';
				selectorOthers[i].parentNode.style.background = '';
				selectorOthers[i].style.display = '';
				selectorOthers[i].onOff = true;
			}
		}
		changeSelectAll();
		return false;
	};

	document.onmouseup = function () {
		if (square) {
			body.removeChild(square);
		}
		numSelected();
		document.onmousemove = null;
		document.onmouseup = null;
	};

};



// 右键菜单
body.oncontextmenu = function () {
	return false;
};
body.onmousedown = function () {
	contextmenu.style.display = '';
	contextmenu.style.opacity = '';
	contextmenu.style.transform = '';
};
contextmenu.onmousedown = function (ev) {
	ev.cancelBubble = true;
};
for (var i = 0; i < contextmenuBtn.length; i++) {
	contextmenuBtn[i].onclick = function (ev) {
		ev.cancelBubble = true;
		contextmenu.style.display = '';
		contextmenu.style.opacity = '';
		contextmenu.style.transform = '';
		switch (this.id) {
			case 'down':
				
				break;
			case 'remove':
				reMoves();
				break;
			case 'move':
				moveTo();
				break;
			case 'rename':
				reNames();
				numSelected();
				break;
			default:
				break;
		}
	};
}







//渲染路径
function path (obj) {
	for (var i = 0; i < obj.length-1; i++) {
		renderPath(obj[i]);
	}
	var current = document.createElement('span');
	current.innerHTML = obj[obj.length-1].name;
	current.className = 'current';
	paths.appendChild(current);
}
//渲染路径
function renderPath (obj) {
	var a = document.createElement('a');
	a.ele = obj;
	a.href = 'javascript:;';
	a.innerHTML = obj.name;
	//点击路径标签，渲染内容，更新路径
	a.onmousedown = function (ev) {
		ev.cancelBubble = true;
	};
	a.onclick = function () {
		//更新路径
		if (paths.path.length>1) {
			for (var i = paths.path.length-1; i >= 0; i--) {
				var ele = paths.path.pop();
				if (ele._id==this.ele._id) {
					break;
				}
			}
		}
		paths.path.push(this.ele);
		//渲染路径
		paths.innerHTML = '';
		path(paths.path);
		//渲染相应内容
		nextLevel (a.ele.child);
	}
	paths.appendChild(a);
	var imgDir = document.createElement('span');
	imgDir.innerHTML = '>';
	imgDir.className = 'imgDir';
	paths.appendChild(imgDir);
}


//渲染文件夹下一级内容
function nextLevel (arr) {
	folders.innerHTML = '';
	others.innerHTML = '';
	arr.forEach( function(ele) {
		render(ele);
	});
};
// 渲染内容
function render (obj) {
	var node = document.createElement('div');
	node.ele = obj;
	if (view.onOff) {
		if (obj.type=='folder') {
			node.className = 'folder';
			node.innerHTML = '<span class="icon imgFolder"></span><span class="name">'
						   +  obj.name
						   +  '</span><input type="text"><span class="selector"></span>';
			//写入
			folders.appendChild(node);
		}else {
			node.className = 'other';
			node.innerHTML = '<div class="imgWrapper"><span class="icon imgOther img'
						   + upper(obj.fileClass)
						   + '"></span></div><div class="textWrapper"><span class="icon imgOtherSmall img'
						   + upper(obj.fileClass)
						   + 'Small"></span><span class="name">'
						   + obj.name
						   + '</span><input type="text"></div><span class="selector"></span>';
			//写入
			others.appendChild(node);
		}
	} else {
		if (obj.type=='folder') {
			node.className = 'onListView folder';
			node.innerHTML = '<span class="icon imgFolder"></span><span class="name">'
						   +  obj.name
						   +  '</span><input type="text"><div class="tools"><span class="tool icon" title="下载"></span><span class="tool icon" title="移动到"></span><span class="tool icon" title="删除"></span><span class="tool icon" title="重命名"></span></div><span class="time"></span><span class="selector"></span>';
			//写入
			folders.appendChild(node);
		}else {
			node.className = 'onListView other';
			node.innerHTML = '<div class="imgWrapper"><span class="icon imgOther img'
						   + upper(obj.fileClass)
						   + '"></span></div><div class="textWrapper"><span class="icon imgOtherSmall img'
						   + upper(obj.fileClass)
						   + 'Small"></span><span class="name">'
						   + obj.name
						   + '</span><input type="text"><div class="tools"><span class="tool icon" title="下载"></span><span class="tool icon" title="移动到"></span><span class="tool icon" title="删除"></span><span class="tool icon" title="重命名"></span></div><span class="size"></span><span class="time"></span></div><span class="selector"></span>';
			//写入
			others.appendChild(node);
		}
	}
		
	var name = node.getElementsByClassName('name')[0];
	var rename = node.getElementsByTagName('input')[0];
	var selector = node.getElementsByClassName('selector')[0];
	selector.onOff = true;
	if (!view.onOff) {
		if (obj.type!='folder') {
			var size = node.getElementsByClassName('size')[0];
			size.innerHTML = '5.4K';
		}
		var tools = node.getElementsByClassName('tools')[0];
		var tool = node.getElementsByClassName('tool');
		var time = node.getElementsByClassName('time')[0];
		var date = new Date(node.ele.time);
		time.innerHTML = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes();
		// 下载
		
		// 移动到
		tool[1].onclick = function (ev) {
			ev.cancelBubble = true;
			number.ele = [];
			number.ele.push(node);
			moveTo();
		};
		// 删除
		tool[2].onclick = function (ev) {
			ev.cancelBubble = true;
			remove(node);
		}
		// 重命名
		tool[3].onclick = function (ev) {
			ev.cancelBubble = true;
			number.ele = [];
			number.ele.push(node);
			reNames();
		}
	}
	// 移动到
	node.onmousedown = function (ev) {
		contextmenu.style.display = '';
		contextmenu.style.opacity = '';
		contextmenu.style.transform = '';
		if (!selector.onOff) {
			ev.cancelBubble = true;
			var numMove = document.createElement('span');
			numMove.className = 'numMove';
			right.appendChild(numMove);
			document.onmousemove = function (ev) {
				var disx = ev.clientX - right.offsetLeft;
				var disy = ev.clientY - right.offsetTop;
				numMove.style.display = 'block';
				numMove.innerHTML = number.innerHTML;
				numMove.style.left = disx+10+'px';
				numMove.style.top = disy+10+'px';
				return false;
			};

			document.onmouseup = function (ev) {
				var disx = ev.clientX;
				var disy = ev.clientY;
				var selectorFolders = folders.querySelectorAll('.selector');
				var selectorOthers = others.querySelectorAll('.selector');
				for (var i = 0; i < selectorFolders.length; i++) {
					if (disx>selectorFolders[i].parentNode.getBoundingClientRect().left&&disx<selectorFolders[i].parentNode.getBoundingClientRect().right  &&  disy>selectorFolders[i].parentNode.getBoundingClientRect().top&&disy<selectorFolders[i].parentNode.getBoundingClientRect().bottom) {
						if (selectorFolders[i].onOff) {
							for (var j = 0; j < selectorFolders.length; j++) {
								if (!selectorFolders[j].onOff) {
									move(selectorFolders[j].parentNode,selectorFolders[i].parentNode);
								}
							}
							for (var j = 0; j < selectorOthers.length; j++) {
								if (!selectorOthers[j].onOff) {
									move(selectorOthers[j].parentNode,selectorFolders[i].parentNode);
								}
							}
						}
						break;
					}
				}
				numMove.style.display = '';
				right.removeChild(numMove);
				numMove = null;
				document.onmousemove = null;
				document.onmouseup = null;
			}
		}
	};
	// 单击进入下一级
	node.onclick = function () {
		// 若是文件夹，单击进入文件夹下级
		if (this.ele.type=='folder') {
			//渲染内容
			nextLevel (node.ele.child);
			// 更改path
			paths.path.push(node.ele);
			paths.innerHTML = '';
			path(paths.path);
		}
		changeSelectAll();
		numSelected();
		return false;
	};
	node.onmouseover = function () {
		selector.style.display = 'block';
		selector.style.borderColor = '#c9dd22';
		selector.style.borderWidth = '2px';
		if (view.onOff) {
			this.style.outline = '2px solid #c9dd22';
		} else {
			this.style.background = 'rgba(201,221,34,.5)';
			tools.style.visibility = 'visible';
		}
	};
	node.onmouseout = function () {
		if (!view.onOff) {
			tools.style.visibility = '';
			selector.style.borderColor = '';
			selector.style.borderWidth = '';
		}
		if (!selector.onOff) {return;}
		selector.style.display = '';
		selector.style.borderColor = '';
		selector.style.borderWidth = '';
		this.style.outline = '';
		this.style.background = '';
	};
	// 单选
	selector.onclick = function (ev) {
		ev.cancelBubble = true;
		if (this.onOff) {
			this.className = this.className + ' active';
		}else {
			this.className = cutClass(this.className);
		}
		this.onOff = !this.onOff;
		changeSelectAll();
		numSelected();
	};
	selector.onmousedown = function (ev) {
		ev.cancelBubble = true;
	};
	// 右键菜单
	node.oncontextmenu = function (ev) {
		if (selector.onOff) {
			clearSelect();
		}
		selector.className = selector.className + ' active';
		if (view.onOff) {
			selector.parentNode.style.outline = '2px solid #c9dd22';
		} else {
			node.style.background = 'rgba(201,221,34,.5)';
		}
		selector.onOff = false;
		changeSelectAll();
		numSelected();
		var disx = ev.clientX - right.offsetLeft - content.offsetLeft;
		var disy = ev.clientY - right.offsetTop - content.offsetTop;
		contextmenu.style.left = disx + 'px';
		contextmenu.style.top = disy+'px';
		contextmenu.style.display = 'block';
		setTimeout(function () {
			contextmenu.style.opacity = 1;
			contextmenu.style.transform = 'translate3d(0px,0px,0px)';
		}, 100);
	};

	return node;
}


// 新文件夹
function falseFolder (obj) {
	var node = document.createElement('div');
	node.ele = obj;
	if (view.onOff) {
		node.className = 'folder';
	} else {
		node.className = 'onListView folder';
	}
	node.innerHTML = '<span class="icon imgFolder"></span><span class="name">'
				   +  obj.name
				   +  '</span><input type="text"><span class="selector"></span>';
	//写入
	folders.insertBefore(node, folders.children[0]);
	return node;
}


// 渲染回收站
function renderRecycle (obj) {
	var node = document.createElement('div');
	node.ele = obj[0];
	node.father = obj[1];
	if (obj[0].type=='folder') {
		node.className = 'folder';
		node.innerHTML = '<span class="icon imgFolder"></span><span class="name">'
					   +  obj[0].name
					   +  '</span><input type="text"><span class="selector"></span>';
		//写入
		folders.appendChild(node);
	}else {
		node.className = 'other';
		node.innerHTML = '<div class="imgWrapper"><span class="icon imgOther img'
					   + upper(obj[0].fileClass)
					   + '"></span></div><div class="textWrapper"><span class="icon imgOtherSmall img'
					   + upper(obj[0].fileClass)
					   + 'Small"></span><span class="name">'
					   + obj[0].name
					   + '</span><input type="text"></div><span class="selector"></span>';
		//写入
		others.appendChild(node);
	}
	var name = node.getElementsByClassName('name')[0];
	var rename = node.getElementsByTagName('input')[0];
	var selector = node.getElementsByClassName('selector')[0];
	selector.onOff = true;
	node.onmousedown = function (ev) {
		ev.cancelBubble = true;
	}
	node.onmouseover = function () {
		selector.style.display = 'block';
		if (view.onOff) {
			selector.style.borderColor = '#c9dd22';
			selector.style.borderWidth = '2px';
		}
		this.style.outline = '2px solid #c9dd22';
	};
	node.onmouseout = function () {
		if (!selector.onOff) {return;}
		selector.style.display = '';
		selector.style.borderColor = '';
		selector.style.borderWidth = '';
		this.style.outline = '';
	};
	// 单选
	selector.onclick = function (ev) {
		ev.cancelBubble = true;
		if (this.onOff) {
			this.className = this.className + ' active';
		}else {
			this.className = cutClass(this.className);
		}
		this.onOff = !this.onOff;
		changeSelectAll();
		numSelected();
	};
	return node;
}



// 全选检测
function checkSelect () {
	var selectorFolders = folders.getElementsByClassName('selector');
	var selectorOthers = others.getElementsByClassName('selector');
	if (selectorFolders.length==0 && selectorOthers.length==0) {
		// 空
		return true;
	}
	for (var i = 0; i < selectorFolders.length; i++) {
		if (selectorFolders[i].onOff == true) {
			//未全选中
			return true;
		}
	}
	for (var i = 0; i < selectorOthers.length; i++) {
		if (selectorOthers[i].onOff == true) {
			//未全选中
			return true;
		}
	}
	// 已全选中
	return false;
}


// 更改全选状态
function changeSelectAll () {
	selectorAll.onOff = checkSelect();
	if (!selectorAll.onOff) {
		selectorAll.className = selectorAll.className + ' active';
	}else {
		selectorAll.className = cutClass(selectorAll.className);
	}
}


// 清空所有选中
function clearSelect () {
	var selectorFolders = folders.getElementsByClassName('selector');
	var selectorOthers = others.getElementsByClassName('selector');
	for (var i = 0; i < selectorFolders.length; i++) {
		selectorFolders[i].className = cutClass(selectorFolders[i].className);
		selectorFolders[i].parentNode.style.outline = '';
		selectorFolders[i].parentNode.style.background = '';
		selectorFolders[i].style.display = '';
		selectorFolders[i].style.borderColor = '';
		selectorFolders[i].style.borderWidth = '';
		selectorFolders[i].onOff = true;
	}
	for (var i = 0; i < selectorOthers.length; i++) {
		selectorOthers[i].className = cutClass(selectorOthers[i].className);
		selectorOthers[i].parentNode.style.outline = '';
		selectorOthers[i].parentNode.style.background = '';
		selectorOthers[i].style.display = '';
		selectorOthers[i].style.borderColor = '';
		selectorOthers[i].style.borderWidth = '';
		selectorOthers[i].onOff = true;
	}
}


// data分类   data---数据矩阵   str---fileClass
function sort (data,str) {
	var arr = [];
	(function fn (data,str) {
		for (var i = 0; i < data.length; i++) {
			if (data[i].fileClass==str) {
				arr.push(data[i]);
			}
			if (data[i].fileClass=='folder') {
				fn(data[i].child,str);
			}
		}
	})(data,str);
	return arr;
}


// 获取父级对象
function getFather (data,obj) {
	var father = null;
	(function fn (data,obj) {
		var find = false;
		for (var i = 0; i < data.length; i++) {
			if (data[i].fileClass=='folder') {
				data[i].child.forEach(function (ele,index) {
					if (ele._id==obj._id) {
						find = true;
					}
				})
				if (find) {
					// 找到父级对象，赋值并直接返回
					father = data[i];
					return;
				}
				fn(data[i].child,obj);
				// 若下一级找到则本级直接返回
				if (father!=null) {
					return;
				}
			}
		}
	})(data,obj);
	return father;
}

// 获取所有上级对象
function getFathers (obj) {
	var fathers = [];
	(function fn (obj) {
		var father = getFather(orgin,obj);
		fathers.unshift(father);
		if (father!=orgin[0]) {
			fn(father);
		}
	})(obj);
	return fathers;
}


// 首字母转大写
function upper (str) {
	return str[0].toUpperCase()+str.slice(1);
}


// 剪切类名
function cutClass (str) {
	var arr = str.split(' ');
	arr.forEach( function(ele,index) {
		if (ele=='active') {
			arr[index] = '';
		}
	});
	return arr.join(' ');
}


// 检测碰撞
function collision(obj1,obj2){
	return !(getPos(obj1).bottom<getPos(obj2).top||getPos(obj1).left>getPos(obj2).right||getPos(obj1).top>getPos(obj2).bottom||getPos(obj1).right<getPos(obj2).left);
}


// 获取位置
function getPos(obj){
	return obj.getBoundingClientRect();
}


// 重命名   obj---node
function rename (obj) {
	var input = obj.getElementsByTagName('input')[0];
	var name = obj.getElementsByClassName('name')[0];
	name.style.display = 'none';
	input.value = '';
	input.style.display = 'block';
	input.focus();
	document.addEventListener('mousedown', changeName);
	function changeName () {
		if (input.value) {
			obj.ele.name = input.value;
			name.innerHTML = input.value;
		}
		name.style.display = '';
		input.style.display = '';
		document.removeEventListener('mousedown',changeName);
	}
}
// 重命名
function reNames () {
	if (number.ele.length>0) {
		if (number.ele.length>1) {
			alert('请分别进行重命名操作');
			return;
		}
		rename(number.ele[0]);
	}
}


// 删除   obj---node
function remove (obj) {
	var father = getFather(orgin,obj.ele);
	father.child.forEach(function (ele,index) {
		if (ele._id == obj.ele._id) {
			father.child.splice(index, 1);
		}
	});
	obj.parentNode.removeChild(obj);
	return [obj.ele,father];
}
// 删除
function reMoves () {
	for (var i = 0; i < number.ele.length; i++) {
		var newGarbage = remove(number.ele[i]);
		recycle.garbage.unshift(newGarbage);
	}
	changeSelectAll();
	numSelected();
}


// 更新选择数量
function numSelected () {
	number.ele = [];
	var num = 0;
	var selectorFolders = folders.getElementsByClassName('selector');
	var selectorOthers = others.getElementsByClassName('selector');
	for (var i = 0; i < selectorFolders.length; i++) {
		if (!selectorFolders[i].onOff) {
			num++;
			number.ele.push(selectorFolders[i].parentNode);
		}
	}
	for (var i = 0; i < selectorOthers.length; i++) {
		if (!selectorOthers[i].onOff) {
			num++;
			number.ele.push(selectorOthers[i].parentNode);
		}
	}
	number.innerHTML = num;
	if (num>0) {
		messageBar.style.display = 'block';
	}else {
		messageBar.style.display = '';
	}
}


// 渲染移动到对话框
function renderMoveto (obj,place) {
	var node = document.createElement('ul');
	for (var i = 0; i < obj.child.length; i++) {
		if (obj.child[i].type=='folder') {
			node.innerHTML += '<li><a href="javascript:;"><span class="more"></span><span class="iconFolders"></span><span>'
						   +  obj.child[i].name
						   +  '</span></a></li>';
		}
	}
	var a = node.getElementsByTagName('a');
	var j = 0;
	for (var i = 0; i < obj.child.length; i++) {
		if (obj.child[i].type=='folder') {
			if (place==placeInner) {
				a[j].level = 1;
			}else {
				a[j].level = place.level+1;
			}
			a[j].style.paddingLeft = a[j].level*10 + 'px';
			a[j].ele = obj.child[i];
			a[j].onOff = true;
			if (sort(obj.child[i].child,'folder').length>0) {
				a[j].more = true;
			}else {
				a[j].more = false;
				var noMore = a[j].getElementsByClassName('more')[0];
				noMore.style.backgroundPosition = '-9999px -9999px';
			}
			a[j].onclick = function () {
				var tri = this.getElementsByClassName('more')[0];
				clearActive();
				this.className = 'active';
				movePaths.path = getFathers(this.ele);
				movePaths.path.push(this.ele);
				renderMovePath();
				if (!isRightPath()) {
					movetoReminder.style.display = 'block';
					timer = setTimeout(function () {
						movetoReminder.style.display = '';
					}, 500);
					return;
				}
				if (this.more) {
					tri.style.backgroundPosition = '-295px -34px';
					renderMoveto(this.ele,this);
					this.more = false;
					this.onOff = false;
				}else {
					if (this.onOff) {
						// 显示下级文件夹
						if (this.nextElementSibling) {
							this.nextElementSibling.style.display = '';
							tri.style.backgroundPosition = '-295px -34px';
						}
					}else {
						// 关闭下级文件夹
						if (this.nextElementSibling) {
							this.nextElementSibling.style.display = 'none';
							tri.style.backgroundPosition = '-295px -85px';	
						}
					}
					this.onOff = !this.onOff;
				}
				if (this.ele.child.length==0) {
					tri.style.backgroundPosition = '-9999px -9999px';
				}
			}
			j++;
		}
	}
	if (place == placeInner) {
		place.appendChild(node);
	}else {
		place.parentNode.appendChild(node);
	}
}


// 清除移动到已选中路径
function clearActive () {
	var ass = placeInner.getElementsByTagName('a');
	for (var i = 0; i < ass.length; i++) {
		ass[i].className = '';
	}
}


// 渲染移动到路径
function renderMovePath () {
	var str = '';
	var arr = [];
	for (var i = 0; i < movePaths.path.length; i++) {
		str += movePaths.path[i].name + '/';
	}
	str = str.slice(0, str.length-1);
	if (str.length>20) {
		arr = str.split('/');
		str = '';
		str += arr[0]+'/.../'+arr[arr.length-2]+'/'+arr[arr.length-1];
	}
	movePaths.innerHTML = str;
}


// 判断是否是正确的移动到路径
function isRightPath () {
	var isRight = true;
	if (movePaths.path.length<=0) {
		movetoReminder.innerHTML = '请选择路径';
		return isRight = false;
	}
	for (var i = 0; i < number.ele.length; i++) {
		for (var j = 0; j < movePaths.path.length; j++) {
			if (movePaths.path[j]==number.ele[i].ele) {
				if (j==movePaths.path.length-1) {
					movetoReminder.innerHTML = '文件已存在于该文件夹下';
				}else {
					movetoReminder.innerHTML = '不能将文件移动到自身或其子文件夹下';
				}
				return isRight = false;
			}
		}
	}
	return isRight;
}

// 拖拽移动到   son---node   father---node
function move (son,father) {
	remove(son);
	father.ele.child.unshift(son.ele);
}


// 批量移动到
function moveTo () {
	talkBar.style.display = 'block';
	introText.innerHTML = number.ele[0].ele.name;
	if (number.ele.length>1) {
		introText.innerHTML += ' 等';
	}
	placeInner.innerHTML = '';
	renderMoveto(orgin[0],placeInner);
	var timer = null;
	movetoConfirm.onclick = function () {
		if (isRightPath()) {
			for (var i = 0; i < number.ele.length; i++) {
				remove(number.ele[i]);
				movePaths.path[movePaths.path.length-1].child.unshift(number.ele[i].ele);
			}
			talkBar.style.display = '';
			numSelected();
		}else {
			clearTimeout(timer);
			movetoReminder.style.display = 'block';
			timer = setTimeout(function () {
				movetoReminder.style.display = '';
			}, 500);
		}
	};

	talkClose.onclick = movetoConcel.onclick = function () {
		movetoConfirm.onclick = null;
		talkClose.onclick = null;
		movetoConcel.onclick = null;
		talkBar.style.display = '';
		numSelected();
	};

}


// 回收站还原或永久删除
function handleGarbage (str) {
	for (var i = 0; i < number.ele.length; i++) {
		number.ele[i].parentNode.removeChild(number.ele[i]);
		recycle.garbage.forEach(function (ele,index) {
			if (ele[0]==number.ele[i].ele) {
				recycle.garbage.splice(index, 1);
			}
		});
		if (str=='revert') {
			number.ele[i].father.child.unshift(number.ele[i].ele);
		}
	}
	changeSelectAll();
	numSelected();
}

// 自定义滚动条
function defRoller (father) {
	var roller = father.querySelector('.roller');
	var rollerBlock = father.querySelector('.rollerBlock');
	var mover = roller.previousElementSibling;
	var box = father.getBoundingClientRect();
	var mBox = mover.getBoundingClientRect();
	window.addEventListener('resize', bindMover);
	bindMover();
	function bindMover () {
		if (box.bottom>window.innerHeight) {
			// init
			father.style.height = window.innerHeight - box.top + 'px';
			father.style.overflow = 'hidden';
			roller.style.display = 'block';
			rollerBlock.style.height = father.offsetHeight*father.offsetHeight/mover.offsetHeight + 'px';
			father.onmouseover = function () {

				// 拖动实现
				rollerBlock.onmousedown = function (ev) {
					ev.cancelBubble = true;
					var disy = ev.clientY - this.getBoundingClientRect().top;
					//最大可以移动距离
					var maxH = roller.clientHeight - this.offsetHeight;
					document.onmousemove = function(ev){
						var y = ev.clientY - disy - box.top;
						//范围限制
						if(y<0) y = 0;
						if(y>maxH) y = maxH;
						//计算滚蛋条移动的比例。
						var scaleY = y/maxH;

						rollerBlock.style.top = y+'px';

						var value = (father.clientHeight - mover.offsetHeight)*scaleY;
						mover.style.top = value+'px';
						return false;
					};
					document.onmouseup = function(){
						document.onmousemove = null;
						document.onmouseup = null;
					};
				};

				// 滚轮实现
				father.onmousewheel = function (ev) {
					var detail;
					console.log(ev)
					if(ev.wheelDelta){
						detail = ev.wheelDelta;
					}else{
						detail = -ev.detail;
					}
					var y = rollerBlock.offsetTop;
					var num = 10;
					//最大可以移动距离
					var maxH = roller.clientHeight - rollerBlock.offsetHeight;
					if(detail<0){//负数向下，每次加一点
						y+=num;
					}else{
						y-=num;
					}
					//范围限制
					if(y<0) y = 0;
					if(y>maxH) y = maxH;
					//计算滚蛋条移动的比例。
					var scaleY = y/maxH;
					rollerBlock.style.top = y+'px';
					//根据滚蛋条比例计算内容显示的位置。
					var value = (father.clientHeight - mover.offsetHeight)*scaleY;
					mover.style.top = value+'px';
					//阻止默认行为
					ev.preventDefault();
					return false;
				};
				father.onmouseout = function () {
					father.onmousewheel = null;
					father.onmouseout = null;
				};
			};
		} else {
			father.style.height = '';
			father.style.overflow = '';
			roller.style.display = '';
			rollerBlock.style.top = '';
			mover.style.top = '';
			father.onmouseover = null;
		}
	}
}

defRoller(leftBanner);
defRoller(content);
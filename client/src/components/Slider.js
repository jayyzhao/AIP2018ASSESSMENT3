import React, { Component } from 'react';
import "./css/Slider.css";
const imgUrl = [
	{ "url": require("../images/restaurant1.png"), "alt": "1", "title": " " },
	{ "url": require("../images/restaurant2.png"), "alt": "2", "title": " " },
	{ "url": require("../images/restaurant3.png"), "alt": "3", "title": " " },
	{ "url": require("../images/restaurant4.png"), "alt": "4", "title": " " },
	{ "url": require("../images/restaurant5.png"), "alt": "5", "title": " " }
];
function callBack() {

}
//Carousel configration
const slideConfig = {
	width: 1109,
	height: 450,
	speed: 3000,
	curritem: 0,
	isShowTitle: true,
	callback: callBack
}

//return length of images set
function retAllLen(imgArr) {
	return imgArr.length;
}
//return total length
function retAllWidth(imgArr) {
	var len = imgArr.length;
	var width = slideConfig.width;
	return len * width
}

class Slider extends Component {
	Timer = "";
	constructor(props) {
		super(props);
		var allWidth = retAllWidth(imgUrl);
		var liwidth = slideConfig.width;
		var allLen = retAllLen(imgUrl);
		var curritem = slideConfig.curritem;
		var height = slideConfig.height;
		this.state = { width: allWidth, liwidth: liwidth, liheight: height, allLen: allLen, curritem: curritem, isShowTitle: false };

	}
	doCallback() {
		var call = slideConfig.callback;
		if (typeof call == "function") {
			call();
		}
	}
	removeClass(domArr) {
		for (var i = 0; i < domArr.length; i++) {
			domArr[i].classList.remove("curritem");
		}
	}

	slidefun() {
		var currItem = document.querySelector(".curritem");
		var index = currItem.getAttribute("index");
		const itemWidth = this.state.liwidth;
		const slideWid = index * itemWidth;
		var slider = document.querySelector(".sliderul");
		currItem.classList.remove("curritem");
		var nextslide = currItem.nextSibling;
		if (nextslide == null) {
			slider.style.transition = "all .3s";
			slider.style.left = 0;
			currItem.parentNode.firstElementChild.classList.add("curritem");
			this.isShowTitle();
			return false;
		}
		nextslide.classList.add("curritem");
		this.isShowTitle();
		slider.style.transition = "all .8s";
		slider.style.left = -slideWid + "px";
		this.doCallback();

	}
	componentDidMount() {//after loading this function will be executed
		this.isShowTitle();
		this.Timer = setInterval(() => this.slidefun(), slideConfig.speed);
	}
	isShowTitle() {//It used to have a title but now it has been deleted
		const isShow = slideConfig.isShowTitle;
		if (isShow) {
			this.setState({ "isShowTitle": true });
			this.chanageTitle();
		} else {
			this.setState({ "isShowTitle": false });
		}

	}

	chanageTitle() {
		var currItem = document.querySelector(".curritem");
		var title = currItem.getAttribute("title");
		var slideTitle = document.querySelector(".slidetitle");

	}
	navMouseOver(e) {//if mouse is placed on the round button the picture currently showing will be moved
		const _target = e.target;
		var Nodes = _target.parentNode.childNodes;
		this.removeClass(Nodes);
		e.target.classList.add("curritem");
		var index = _target.getAttribute("index") - 1;
		const itemWidth = this.state.liwidth;
		const slideWid = index * itemWidth;
		var slider = document.querySelector(".sliderul");
		slider.style.transition = "all .5s";
		slider.style.left = -slideWid + "px";
		this.isShowTitle();
		this.doCallback();
	}
	startTimer(e) {
		this.Timer = setInterval(() => this.slidefun(), slideConfig.speed);
	}
	stopTimer(e) {
		clearInterval(this.Timer);
	}
	render() {
		const _this = this;
		return (

			<div className="sliderwrap"  onMouseOver={(e) => _this.stopTimer(e)} onMouseLeave={(e) => _this.startTimer(e)}>
				<div className="slidernavbar">
					{
						imgUrl.map(function (val, index) {
							if (index == _this.state.curritem) {
								return (
									<span className="slidernavbaritem curritem" index={index + 1} onMouseOver={(e) => _this.navMouseOver(e)} key={index} title={val.title}></span>
								)
							}
							return (
								<span className="slidernavbaritem" index={index + 1} onMouseOver={(e) => _this.navMouseOver(e)} key={index} title={val.title}></span>
							)
						})
					}
				</div>
				<ul className="sliderul" style={{ width: _this.state.width }}>
					{
						imgUrl.map(function (val, index) {
							var url = val.url;
							return (
								<li key={index} index={index} style={{ width: 1109, height: 500 }}>
									<img src={val.url} alt={val.alt} />
								</li>
							)
						})
					}
				</ul>
			</div>
		)
	}
}
export default Slider;
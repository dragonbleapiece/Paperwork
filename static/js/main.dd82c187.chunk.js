(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{309:function(e,t,a){e.exports=a.p+"static/media/save_alt.3ccde972.svg"},310:function(e,t,a){e.exports=a.p+"static/media/code.74f0e940.svg"},311:function(e,t,a){e.exports=a.p+"static/media/info.b08ccdbe.svg"},313:function(e,t,a){e.exports=a.p+"static/media/cancel.4afab8b8.svg"},314:function(e,t,a){e.exports=a.p+"static/media/arrow_right.79443cdd.svg"},315:function(e,t,a){e.exports=a.p+"static/media/scale.08ae3836.svg"},319:function(e,t,a){e.exports=a.p+"static/media/square.5b5b5ce7.svg"},320:function(e,t,a){e.exports=a.p+"static/media/triangle.3963bd74.svg"},321:function(e,t,a){e.exports=a.p+"static/media/ellipse.37dda89e.svg"},322:function(e,t,a){e.exports=a.p+"static/media/HHatching.f3da2da9.svg"},323:function(e,t,a){e.exports=a.p+"static/media/VHatching.c8766020.svg"},324:function(e,t,a){e.exports=a.p+"static/media/LOHatching.186b393d.svg"},325:function(e,t,a){e.exports=a.p+"static/media/ROHatching.8c0092fd.svg"},326:function(e,t,a){e.exports=a.p+"static/media/grid_on.8ace643b.svg"},327:function(e,t,a){e.exports=a.p+"static/media/next.0f510805.svg"},328:function(e,t,a){e.exports=a.p+"static/media/unknown.3f5bae44.svg"},329:function(e,t,a){e.exports=a.p+"static/media/translate.aaf3d874.svg"},330:function(e,t,a){e.exports=a.p+"static/media/rotate.5d1fc53d.svg"},331:function(e,t,a){e.exports=a.p+"static/media/void.a2a55d7b.svg"},333:function(e,t,a){e.exports=a(749)},338:function(e,t,a){},340:function(e,t,a){},342:function(e,t,a){},356:function(e,t,a){},358:function(e,t,a){},444:function(e,t,a){},454:function(e,t,a){},456:function(e,t,a){},458:function(e,t,a){},513:function(e,t,a){},515:function(e,t,a){},527:function(e,t){},549:function(e,t){},551:function(e,t){},679:function(e,t){},698:function(e,t,a){},700:function(e,t,a){},702:function(e,t,a){},704:function(e,t,a){},706:function(e,t,a){},708:function(e,t,a){},710:function(e,t,a){},712:function(e,t,a){},714:function(e,t,a){},716:function(e,t,a){},718:function(e,t,a){},721:function(e,t,a){},723:function(e,t,a){},725:function(e,t,a){},727:function(e,t,a){},729:function(e,t,a){},731:function(e,t,a){},733:function(e,t,a){},749:function(e,t,a){"use strict";a.r(t);var n=a(1),s=a.n(n),r=a(11),i=a.n(r),c=(a(338),a(3)),o=a(6),l=a(4),u=a(2),h=a(5),d=(a(340),a(28)),m=(a(342),a(126));a(344)(m);var p=function(e){function t(e){var a;return Object(c.a)(this,t),void 0!=t._instance?Object(l.a)(a,t._instance):((a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={function:void 0,width:0,height:0},a.strokeWeight=1,t._instance=Object(d.a)(Object(d.a)(a)),a)}return Object(h.a)(t,e),Object(o.a)(t,null,[{key:"savePaper",value:function(e,a){void 0!==t._P5&&t._P5.savePaper(e,a)}}]),Object(o.a)(t,[{key:"setfilename",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;this.filename=e,void 0!==t&&(this.extension=t)}},{key:"CalcCanvasSize",value:function(){var e=.5*window.innerWidth-60,t=window.innerHeight-180,a=e<t?e:t;this.setState({width:a,height:a})}},{key:"initP5",value:function(){var e=this;t._P5=new m(function(t){t.setup=e.setup.bind(e,t),t.draw=e.draw.bind(e,t),t.windowResized=e.windowResized.bind(e,t),t.savePaper=e.savePaper.bind(e,t),t.strokeScale=e.strokeScale.bind(e,t)},"renderer")}},{key:"sendDraw",value:function(e){this.setState({function:e})}},{key:"resetDraw",value:function(){this.setState({function:void 0})}},{key:"windowResized",value:function(e){this.CalcCanvasSize(),e.resizeCanvas(this.state.width,this.state.height)}},{key:"savePaper",value:function(e,t,a){void 0===t&&void 0===a||e.saveSVG(t+"."+a)}},{key:"setup",value:function(e){var t=this.state,a=t.width,n=t.height;e.createCanvas(a,n,e.SVG),e.noLoop(),window.updateWorkspace()}},{key:"strokeScale",value:function(e,t){this.strokeWeight*=t,e.strokeWeight(this.strokeWeight)}},{key:"draw",value:function(e){e.pixelDensity(1);var t=this.state.function;void 0!==t&&t(e)}},{key:"componentDidMount",value:function(){this.CalcCanvasSize(),this.initP5()}},{key:"componentDidUpdate",value:function(){t._P5.draw()}},{key:"render",value:function(){return s.a.createElement("div",{className:"canvasContainer"},s.a.createElement("div",{id:"renderer"}))}}]),t}(n.Component);p._instance=void 0,p._P5=void 0;var f=p,v=a(19),b=a(309),g=a.n(b),O=a(310),y=a.n(O),j=a(311),w=a.n(j),N=a(38),k=(a(356),a(358),a(126),"box"),x=a(61);var E={canDrop:function(e,t){t.getItem();return!0},hover:function(e,t,a){},drop:function(e,t,a){if(!t.didDrop()){var n=t.getItem(),s=t.getClientOffset(),i=Object(r.findDOMNode)(a).getBoundingClientRect();if(!(s.x>i.right||s.y>i.bottom||s.x<i.left||s.y<i.top))return n.x=s.x-n.x,n.y=s.y-n.y,{moved:!0}}}},C=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={},a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props;e.isOver,e.canDrop;return(0,e.connectDropTarget)(s.a.createElement("div",{className:this.constructor.className},this.props.children))}}]),t}(n.Component);C.className="DropBox";var _=Object(x.DropTarget)(k,E,function(e,t){return{connectDropTarget:e.dropTarget(),isOver:t.isOver(),isOverCurrent:t.isOver({shallow:!0}),canDrop:t.canDrop(),itemType:t.getItemType()}})(C),M=a(313),S=a.n(M),D={beginDrag:function(e,t,a){Object(r.findDOMNode)(a).getBoundingClientRect();return t.getClientOffset()},endDrag:function(e,t,a){var n=t.getItem(),s=t.getDropResult();return null!==s&&s.moved&&a.setPosition(n),{}}};var B=function(e){function t(e){return Object(c.a)(this,t),Object(l.a)(this,Object(u.a)(t).call(this,e))}return Object(h.a)(t,e),Object(o.a)(t,[{key:"setPosition",value:function(e){if(e){var t={x:Number.isNaN(parseInt(this.props.el.state.style.left))?0:parseInt(this.props.el.state.style.left),y:Number.isNaN(parseInt(this.props.el.state.style.top))?0:parseInt(this.props.el.state.style.top)};console.log(t);var a={position:"absolute",top:e.y+t.y+"px",left:e.x+t.x+"px"};this.props.el.setStyle(a)}}},{key:"onClose",value:function(){void 0!==this.props.onClose&&this.props.onClose(),le.forceUpdate()}},{key:"render",value:function(){var e=this.props,t=(e.isDragging,e.connectDragSource);return(0,e.connectDragPreview)(s.a.createElement("div",{className:"Box__wrapper"},s.a.createElement("span",{className:"Box__titleClose",onClick:this.onClose.bind(this)},s.a.createElement(v.a,{src:S.a})),t(s.a.createElement("span",{className:"Box__title"},this.props.icon&&s.a.createElement(v.a,{className:"Box__titleIcon",src:this.props.icon,style:{fill:this.props.color}}),s.a.createElement("span",{className:"Box__titleText",style:{color:this.props.color}},this.props.name))),this.props.children))}}]),t}(n.Component),P=Object(x.DragSource)(k,D,function(e,t){return{connectDragPreview:e.dragPreview(),connectDragSource:e.dragSource(),isDragging:t.isDragging()}})(B),T=(a(444),a(29)),R=a(62),I=a.n(R),F=a(314),z=a.n(F),H=[{type:"Placement",elements:[{type:"Grid"}]},{type:"Elements",elements:[{type:"Rectangle"},{type:"Triangle"},{type:"Ellipse"},{type:"HHatching"},{type:"VHatching"},{type:"LOHatching"},{type:"ROHatching"},{type:"Void"}]},{type:"Markov"}],L=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={},a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"handleClick",value:function(e,t){void 0!==t.type&&window.addClassToElement(t.type,t.el)}},{key:"getMenu",value:function(e,t){var a=this;return e.map(function(e,n){if(-1===a.props.el.unauthorized.indexOf(e.type)){var r=window.getIconClassFromName(e.type);return e.elements?s.a.createElement(T.d,{key:I.a.generate(),title:s.a.createElement(s.a.Fragment,null,s.a.createElement("span",{className:"react-contextmenu-itemLabel"},r&&s.a.createElement("span",{className:"react-contextmenu-itemIcon"},s.a.createElement(v.a,{src:r})),s.a.createElement("span",{className:"react-contextmenu-itemText"},e.type)),s.a.createElement("span",{className:"react-contextmenu-itemIcon"},s.a.createElement(v.a,{src:z.a})))},a.getMenu(e.elements,t)):s.a.createElement(T.c,{onClick:t,data:{type:e.type,el:a.props.el},key:I.a.generate()},r&&s.a.createElement("span",{className:"react-contextmenu-itemIcon"},s.a.createElement(v.a,{src:r})),s.a.createElement("span",{className:"react-contextmenu-itemText"},e.type))}})}},{key:"render",value:function(){var e=[];for(var t in-1===this.props.el.unauthorized.indexOf("*")&&(e=this.getMenu(H,this.handleClick.bind(this))),this.props.suppMenu){var a=this.props.suppMenu[t];a.menu&&a.handleClick&&(e=e.concat(this.getMenu(a.menu,a.handleClick)))}return console.log(this.props.el.constructor.className,e,e.length),s.a.createElement(s.a.Fragment,null,s.a.createElement(T.b,{id:this.props.id,holdToDisplay:-1},this.props.children),e.length>0&&s.a.createElement(T.a,{id:this.props.id},e))}}]),t}(n.Component),W=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:255;Object(c.a)(this,e),this.r=t,this.g=a,this.b=n,this.a=s}return Object(o.a)(e,[{key:"getP5Color",value:function(e){return e.color(this.r,this.g,this.b,this.a)}}]),e}();W.className="Color";var V=W,U=(a(454),function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={},a.className=t.className,a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return null}}]),t}(n.Component));U.className="Transform",U.icon=void 0;var G=U,A=(a(456),a(315)),Y=a.n(A),X=(a(458),function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),t}(n.Component)),J=a(124),q=(a(513),function(e){function t(e){return Object(c.a)(this,t),Object(l.a)(this,Object(u.a)(t).call(this,e))}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this;return s.a.createElement(J.b,{min:this.props.min,max:this.props.max,defaultValue:this.props.defaultValue,marks:this.props.marks,step:this.props.steps,className:"Box__slider",style:{padding:"3px 0"},trackStyle:{height:"8px",backgroundColor:"black",borderRadius:"unset"},railStyle:{height:"8px",backgroundColor:"black",borderRadius:"unset"},handleStyle:{marginTop:"-3px",borderColor:"black"},dotStyle:{bottom:"-4px",borderColor:"black"},onChange:function(t){e.props.onChange&&(e.props.onChange(t),le.forceUpdate())}})}}]),t}(X)),Q=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).className+=" "+t.className,a.scale={x:1,y:1},a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this;return s.a.createElement(q,{min:1,max:50,defaultValue:10,marks:{1:.1,50:5},step:1,onChange:function(t){e.scale={x:t/10,y:t/10},e.props.onChange&&e.props.onChange(e.scale)}})}}]),t}(G);Q.className="Scale",Q.icon=Y.a;var $=Q,K=[{type:"Color",elements:[{type:"Blue"},{type:"Cyan"},{type:"Magenta"},{type:"Yellow"},{type:"Black"},{type:"White"}]}],Z=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={children:[],style:{}},a.className=t.className,a.name=t.className,a.next=void 0,a.nextType=void 0,a.unauthorized=[],a.state.scale={x:1,y:1},a.drawBeforeType={},a.suppMenu=[{menu:K,handleClick:function(e,t){if(t.type){var n=window.getClassFromName(t.type);n&&a.setState({color:new n}),window.updateWorkspace()}}}],a.state.color=new V(255,255,255),a}return Object(h.a)(t,e),Object(o.a)(t,null,[{key:"id",get:function(){return t._id++}}]),Object(o.a)(t,[{key:"addDrawBeforeType",value:function(e,t){t instanceof Function&&(this.drawBeforeType[e]?this.drawBeforeType[e].push(t):this.drawBeforeType[e]=[t])}},{key:"callDrawBeforeType",value:function(e,t){for(var a=0;a<this.drawBeforeType[t].length;++a)this.drawBeforeType[t][a](e)}},{key:"addChild",value:function(e){if(e){var a=new e;window.isAuthorized(e,this.unauthorized)&&a instanceof t&&this.setState({children:[{type:e,id:t.id}]})}}},{key:"setChildren",value:function(e){this.setState({children:e})}},{key:"removeFromParent",value:function(){var e=this,t=this.props.parent.state.children;t=t.filter(function(t){return t.id!==e.props.id}),this.props.parent.setChildren(t)}},{key:"addNext",value:function(e){void 0!==e&&e instanceof t&&(this.next=e,this.nextType=e.constructor.name)}},{key:"setStyle",value:function(e){this.setState({style:e})}},{key:"drawBeforeChild",value:function(e,t){if(t)for(var a in this.drawBeforeType)console.log(a),t instanceof window.getClassFromName(a)&&this.callDrawBeforeType(e,a)}},{key:"draw",value:function(e){}},{key:"getChildren",value:function(){var e=this;this.next=void 0;var t=[];if(this.state.children.length>0){var a=this.state.children[0];t.push(s.a.createElement(a.type,{key:a.id,parent:this,id:a.id,ref:function(t){e.next=t}}))}return t}},{key:"renderBox",value:function(){return null}},{key:"getTransforms",value:function(){var e=this;return s.a.createElement($,{onChange:function(t){e.setState({scale:t})}})}},{key:"render",value:function(){var e=this.state.color,t=e.r+e.g+e.b!==0?"rgba("+e.r+", "+e.g+", "+e.b+", "+e.a/255+")":"rgba(255, 255, 255, 1)";return console.log(this.state.color),s.a.createElement("div",{className:this.className,style:this.state.style},s.a.createElement(L,{id:this.constructor.className+this.props.id,unauthorized:this.unauthorized,suppMenu:this.suppMenu,el:this},s.a.createElement(P,{icon:this.constructor.icon,color:t,name:this.constructor.className,onClose:this.removeFromParent.bind(this),el:this},s.a.createElement("span",{className:"Box__content"},s.a.createElement(T.b,{id:""},this.renderBox(),this.getTransforms()),s.a.createElement(_,null,s.a.createElement(T.b,{id:this.constructor.className+this.props.id},-1===this.unauthorized.indexOf("*")&&s.a.createElement("div",{className:"Box__container"},!this.state.children.length&&s.a.createElement("span",{className:"Box__placeholder"},"Right click to add"),this.getChildren())))))))}}]),t}(n.Component);Z._id=0,Z.className="Box",Z.icon=void 0;var ee=Z,te=(a(515),a(83)),ae=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).className=t.className,a.elements=[],a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"addChild",value:function(e){if(e){var t=new e;if(-1===this.unauthorized.indexOf(e.name)&&t instanceof ee){var a=this.state.children;a.push({type:e,id:ee.id}),this.setState({children:a})}}}},{key:"setChildren",value:function(e){this.elements=[],Object(N.a)(Object(u.a)(t.prototype),"setChildren",this).call(this,e)}},{key:"draw",value:function(e){for(var t=this.elements,a=0;a<t.length;++a){var n=t[a];e.push(),this.drawBeforeChild(e,n),n&&n.draw(e),e.pop()}}},{key:"initElements",value:function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0],arguments.length>1&&void 0!==arguments[1]&&arguments[1];var e=[];s.a.Children.map(this.props.children,function(t,a){e.push(t)})}},{key:"componentDidMount",value:function(){}},{key:"getChildren",value:function(){var e=this;return this.elements=[],this.state.children.map(function(t,a){return s.a.createElement(t.type,{key:t.id,id:t.id,parent:e,ref:function(t){return e.elements[a]=t}})})}},{key:"renderBox",value:function(){}},{key:"render",value:function(){return s.a.createElement("div",{className:this.className,style:this.state.style},s.a.createElement(L,{id:this.constructor.className+this.props.id,suppMenu:this.suppMenu,unauthorized:this.unauthorized,el:this},s.a.createElement(P,{icon:this.constructor.icon,name:this.constructor.className,onClose:this.removeFromParent.bind(this),className:this.className,el:this},s.a.createElement("span",{className:"Box__content"},s.a.createElement(T.b,{id:""},this.renderBox()),s.a.createElement(_,null,s.a.createElement(T.b,{id:this.constructor.className+this.props.id},-1===this.unauthorized.indexOf("*")&&s.a.createElement("div",{className:"Box__container"},!this.state.children.length&&s.a.createElement("span",{className:"Box__placeholder"},"Right click to add"),this.getChildren())))))))}}]),t}(ee);ae.className="BoxGroup",ae.icon=void 0;var ne=ae,se=a(318),re=a.n(se),ie=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(u.a)(t).call(this,0,0,0,255))}return Object(h.a)(t,e),t}(V);ie.className="Black";var ce=ie,oe=function(e){function t(e){var a;return Object(c.a)(this,t),void 0!==t._instance?Object(l.a)(a,t._instance):((a=Object(l.a)(this,Object(u.a)(t).call(this,e))).className=a.constructor.className,a.state.children=[],a.state.color=new ce,a.elements=[],a.unauthorized=["Markov"],a.addDrawBeforeType("Figure",function(e){e.translate(e.width/2,e.height/2),e.scale(e.width,e.height),e.strokeWeight(1/e.width)}),t._instance=Object(d.a)(Object(d.a)(a)),a)}return Object(h.a)(t,e),Object(o.a)(t,null,[{key:"addChild",value:function(e){void 0!==t._instance&&t._instance.addChild(e)}},{key:"forceUpdate",value:function(){void 0!==t._instance&&t._instance.forceUpdate()}}]),Object(o.a)(t,[{key:"draw",value:function(e){e.background(this.state.color.getP5Color(e)),e.noStroke(),Object(N.a)(Object(u.a)(t.prototype),"draw",this).call(this,e)}},{key:"componentDidUpdate",value:function(){(new f).sendDraw(this.draw.bind(this))}},{key:"render",value:function(){return s.a.createElement("div",{className:this.className},s.a.createElement(L,{id:this.constructor.className,unauthorized:this.unauthorized,suppMenu:this.suppMenu,el:this},s.a.createElement(_,null,!this.state.children.length&&s.a.createElement("span",{className:"Workspace__placeholder"},"Right click here"),this.getChildren())))}}]),t}(ne);oe.className="Workspace",oe._instance=void 0;var le=Object(x.DragDropContext)(re.a)(oe),ue=(a(698),function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).className+=" "+t.className,a.x=0,a.y=0,a.width=0,a.height=0,a.unauthorized=["*"],a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"drawFigure",value:function(e){}},{key:"draw",value:function(e){e.push(),e.fill(this.state.color.getP5Color(e)),e.scale(this.state.scale.x,this.state.scale.y),e.translate(-this.width/2,-this.height/2),this.drawFigure(e),e.pop()}}]),t}(ee));ue.className="Figure",ue.icon=void 0;var he=ue,de=(a(700),a(319)),me=a.n(de),pe=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).className+=" "+t.className,a.x=0,a.y=0,a.width=1,a.height=1,a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"drawFigure",value:function(e){e.rect(this.x,this.y,this.width,this.height)}}]),t}(he);pe.className="Rectangle",pe.icon=me.a;var fe=pe,ve=(a(702),a(320)),be=a.n(ve),ge=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).className+=" "+t.className,a.x=0,a.y=0,a.width=1,a.height=1,a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"drawFigure",value:function(e){e.triangle(this.x,this.y+this.height,this.x+this.width,this.y+this.height,(this.x+this.width)/2,this.y)}}]),t}(he);ge.className="Triangle",ge.icon=be.a;var Oe=ge,ye=(a(704),a(321)),je=a.n(ye),we=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).className+=" "+t.className,a.width=1,a.height=1,a.x=a.width/2,a.y=a.height/2,a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"drawFigure",value:function(e){e.ellipse(this.x,this.y,this.width,this.height)}}]),t}(he);we.className="Ellipse",we.icon=je.a;var Ne=we,ke=(a(706),a(708),function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).className+=" "+t.className,a.density=10,a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"draw",value:function(e){e.stroke(this.state.color.getP5Color(e)),Object(N.a)(Object(u.a)(t.prototype),"draw",this).call(this,e),e.noStroke()}}]),t}(he));ke.className="Hatching",ke.icon=void 0;var xe=ke,Ee=a(322),Ce=a.n(Ee),_e=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).className+=" "+t.className,a.x=0,a.y=0,a.width=1,a.height=1,a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"drawFigure",value:function(e){for(var t=this.height/this.density,a=0;a<=this.density;a++)e.line(this.x,this.y+a*t,this.x+this.width,this.y+a*t)}}]),t}(xe);_e.className="HHatching",_e.icon=Ce.a;var Me=_e,Se=(a(710),a(323)),De=a.n(Se),Be=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).className+=" "+t.className,a.x=0,a.y=0,a.width=1,a.height=1,a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"drawFigure",value:function(e){for(var t=this.width/this.density,a=0;a<=this.density;a++)e.line(this.x+a*t,this.y,this.x+a*t,this.y+this.height)}}]),t}(xe);Be.className="VHatching",Be.icon=De.a;var Pe=Be,Te=(a(712),a(324)),Re=a.n(Te),Ie=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).className+=" "+t.className,a.x=0,a.y=0,a.width=1,a.height=1,a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"drawFigure",value:function(e){for(var t=this.x,a=this.y+this.height,n=this.width/this.density,s=this.height/this.density;t<this.x+this.width;)e.line(t,this.y,this.x+this.width,a),t+=n,a-=s;for(t=this.x+this.width,a=this.y;a<this.y+this.height;)e.line(this.x,a,t,this.y+this.height),t-=n,a+=s}}]),t}(xe);Ie.className="LOHatching",Ie.icon=Re.a;var Fe=Ie,ze=(a(714),a(325)),He=a.n(ze),Le=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).className+=" "+t.className,a.x=0,a.y=0,a.width=1,a.height=1,a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"drawFigure",value:function(e){for(var t=this.x+this.width,a=this.y+this.height,n=this.width/this.density,s=this.height/this.density;a>this.y;)e.line(this.x,a,t,this.y),t-=n,a-=s;for(t=this.x,a=this.y;a<this.y+this.height;)e.line(t,this.y+this.height,this.x+this.width,a),t+=n,a+=s}}]),t}(xe);Le.className="ROHatching",Le.icon=He.a;var We=Le,Ve=(a(716),function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).className+=" "+t.className,a.state.currentMode=void 0,a.state.mode=null,a.suppMenu.push({menu:void 0,handleClick:function(e,t){t.type&&(a.setState({mode:window.getClassFromName(t.type)}),le.forceUpdate())}}),a.suppMenu[a.suppMenu.length-1].handleClick.bind(Object(d.a)(Object(d.a)(a))),a.unauthorized.push("Placement"),a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"getTransforms",value:function(){return null}},{key:"renderMode",value:function(){var e=this;return this.state.mode?s.a.createElement(this.state.mode,{key:this.constructor.className+this.state.mode.className,ref:function(t){e.state.currentMode=t}}):null}},{key:"draw",value:function(e){}}]),t}(ee));Ve.className="Placement",Ve.icon=void 0;var Ue=Ve,Ge=(a(718),a(305),a(326)),Ae=a.n(Ge),Ye=(a(721),a(723),function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={},a.className=t.className,a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"mode",value:function(e,t){}},{key:"render",value:function(){return s.a.createElement("div",{className:"gridMode"},s.a.createElement("span",{className:"gridMode__label"},"Grid Distribution "),s.a.createElement("span",{className:"gridMode__text"},this.constructor.className))}}]),t}(n.Component));Ye.className="Mode";var Xe=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={},a.className+=" "+t.className,a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"mode",value:function(e,t){}}]),t}(Ye);Xe.className="GridMode";var Je=Xe,qe=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={},a.className+=" "+t.className,a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"mode",value:function(e,t){for(var a=t.rows,n=t.columns,s=t.callback,r=e.width/n,i=e.height/a,c=0;c<n;c++){e.push(),e.translate(r*c,0);for(var o=0;o<a;o++)e.push(),e.translate(0,o*i),s&&s(),e.pop();e.pop()}}}]),t}(Je);qe.className="LinearY";var Qe=qe,$e=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={},a.className+=" "+t.className,a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"mode",value:function(e,t){for(var a=t.rows,n=t.columns,s=t.callback,r=t.lines,i=e.width/n,c=e.height/a,o=0;o<a;o++){e.push(),e.translate(0,c*o),r&&e.line(0,0,e.width,0);for(var l=0;l<n;l++)e.push(),e.translate(l*i,0),r&&e.line(0,0,0,e.height),s&&s(),e.pop();e.pop()}}}]),t}(Je);$e.className="LinearX";var Ke=$e,Ze=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={},a.className+=" "+t.className,a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"mode",value:function(e,t){for(var a=t.rows,n=t.columns,s=t.callback,r=e.width/n,i=e.height/a,c=0;c<n;c++)for(var o=n-1,l=c;l>=0;)e.push(),e.translate(r*o,l*i),s&&s(),e.pop(),o-=1,l-=1;for(var u=n-1;u>0;u--)for(var h=u-1,d=a-1;h>=0;)e.push(),e.translate(r*h,d*i),s&&s(),e.pop(),h-=1,d-=1}}]),t}(Je);Ze.className="DiagonalLeft";var et=Ze,tt=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={},a.className+=" "+t.className,a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"mode",value:function(e,t){for(var a=t.rows,n=t.columns,s=t.callback,r=e.width/n,i=e.height/a,c=0;c<n;c++)for(var o=0;o<=c;o++)e.push(),e.translate(r*o,(c-o)*i),s&&s(),e.pop();for(c=n-1;c>0;c--){o=n-c;for(var l=a-1;o<n;)e.push(),e.translate(r*o,l*i),s&&s(),e.pop(),o+=1,l-=1}}}]),t}(Je);tt.className="DiagonalRight";var at=tt,nt=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={},a.className+=" "+t.className,a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"mode",value:function(e,t){for(var a=t.rows,n=t.columns,s=t.callback,r=e.width/n,i=e.height/a,c=0;c<=n;c++){var o=void 0,l=void 0;for(o=0;o<=c;o++)e.push(),e.translate(o*r,c*i),s&&s(),e.pop();for(l=c-1;l>=0;l--)e.push(),e.translate(r*c,l*i),s&&s(),e.pop()}}}]),t}(Je);nt.className="Orthogonal";var st=nt,rt=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={},a.className+=" "+t.className,a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"mode",value:function(e,t){for(var a=t.rows,n=t.columns,s=t.callback,r=e.width/n,i=e.height/a,c=Math.round(n/2)-1,o=Math.round(a/2)-1,l=1,u=-1;l<=n;){u*=-1;for(var h=0;h<l&&c>=0&&c<n;h++)e.push(),e.translate(c*r,o*i),s&&s(),e.pop(),c+=u;if(c<0||c>=n)break;for(var d=0;d<l&&o>=0&&o<a;d++)console.log(c,o),e.push(),e.translate(c*r,o*i),s&&s(),e.pop(),o+=u;l++}}}]),t}(Je);rt.className="SnailRight";var it=rt,ct=[{type:"Modes",elements:[{type:"DiagonalLeft"},{type:"DiagonalRight"},{type:"LinearX"},{type:"LinearY"},{type:"Orthogonal"},{type:"SnailRight"}]}],ot=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).className+=" "+t.className,a.state.columns=8,a.state.rows=8,a.suppMenu[a.suppMenu.length-1].menu=ct,a.state.mode=Ke,a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"draw",value:function(e){var t=e.width/this.state.columns,a=e.height/this.state.rows,n=this.next,s=this.state.currentMode;n||e.stroke(this.state.color.getP5Color(e)),s&&s.mode(e,{columns:this.state.columns,rows:this.state.rows,lines:!n,callback:function(){n&&(e.noStroke(),e.push(),e.translate(t/2,a/2),e.scale(t,a),e.strokeWeight(1/t),n.draw(e),e.strokeWeight(1),e.pop())}})}},{key:"renderBox",value:function(){var e=this;return s.a.createElement(s.a.Fragment,null,s.a.createElement(q,{min:1,max:50,defaultValue:this.state.columns,marks:{1:1,50:50},step:1,onChange:function(t){e.setState({columns:t,rows:t})}}),this.renderMode())}}]),t}(Ue);ot.className="Grid",ot.icon=Ae.a;var lt=ot,ut=(a(725),a(727),function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this,t=new Array(this.props.count);t.fill({height:"8px",backgroundColor:"black",borderRadius:"unset"});var a=new Array(this.props.count);return a.fill({marginTop:"-3px",borderColor:"black"}),s.a.createElement(J.a,Object.assign({},this.props,{className:"Box__slider",style:{padding:"3px 0"},trackStyle:t,railStyle:{height:"8px",backgroundColor:"black",borderRadius:"unset"},handleStyle:a,dotStyle:{bottom:"-4px",borderColor:"black"},onChange:function(t){e.props.onChange(t),le.forceUpdate()},ref:function(t){e.props.innerRef&&e.props.innerRef(t)}}))}}]),t}(X)),ht=a(327),dt=a.n(ht),mt=a(328),pt=a.n(mt);function ft(e,t,a){return function(e,t){return e<t?t:e}(function(e,t){return e>t?t:e}(e,a),t)}function vt(e,t,a){t<0||e<=a[t]&&(a[t]=e,vt(e,--t,a))}function bt(e,t,a){t>=a.length||e>=a[t]&&(a[t]=e,bt(e,++t,a))}var gt=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).className+=" "+t.className,a.suppMenu=[],a.state.proba=[],a.elementsLength=a.state.children.length,a.currentState=parseInt(Math.random()*a.elementsLength),a.idElement=[],a.unauthorized.push("Placement"),a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"setChildren",value:function(e){Object(N.a)(Object(u.a)(t.prototype),"setChildren",this).call(this,e),this.currentState=parseInt(Math.random()*this.elementsLength)}},{key:"draw",value:function(e){var t=this.state.children.length;if(0!==t){var a=this.elements[this.currentState];if(1!==t){var n,s=0,r=parseInt(100*Math.random());for(n=0;n<t&&r>=s;++n)s=this.state.proba[this.currentState][n];this.elements[n-1].draw(e),this.currentState=n-1}else a&&a.draw(e)}}},{key:"renderBox",value:function(){for(var e,t=this,a=this.state.children.length,n=[],r=1;r<=a-1;++r)r==a-1?n.push(10*Math.floor(100/a/10)*r+100%(10*a)):n.push(10*Math.floor(100/a/10)*r);if(a-1>0){var i={min:0,max:100,defaultValue:n,marks:{0:0,100:100},step:5,count:a-1,pushable:0};e=this.state.children.map(function(e,r){var c,o=[];c=s.a.createElement("span",{className:"Markov__RangeIcon"},s.a.createElement(v.a,{src:e.type.icon}),s.a.createElement(v.a,{src:dt.a}),s.a.createElement(v.a,{src:pt.a})),t.elementsLength!==a&&(t.state.proba[r]=[].concat(n),t.idElement[r]=I.a.generate(),i.innerRef=function(e){e&&(t.state.proba[r]=e.state.bounds)},i.innerRef.bind(t)),i.key=t.idElement[r],i.onChange=function(e){t.state.proba[r]=e,le.forceUpdate()};for(var l=function(e){var n={type:"number",key:t.idElement[r]+e,min:0,max:100,step:5};0==e?(n.value=t.state.proba[r][e],n.onChange=function(a){var s=t.state.proba,i=ft(parseInt(a.target.value),n.min,n.max);vt(i,e,s[r]),bt(i,e,s[r]),t.setState({proba:s})}):e==a-1?(n.value=100-t.state.proba[r][e-1],n.onChange=function(a){var s=t.state.proba,i=ft(parseInt(a.target.value),n.min,n.max);vt(100-i,e-1,s[r]),bt(100-i,e-1,s[r]),t.setState({proba:s})}):(n.max=100-t.state.proba[r][e-1],n.value=t.state.proba[r][e]-t.state.proba[r][e-1],n.onChange=function(a){var s=t.state.proba,i=ft(parseInt(a.target.value),n.min,n.max);vt(i+t.state.proba[r][e-1],e,s[r]),bt(i+t.state.proba[r][e-1],e,s[r]),t.setState({proba:s})}),o.push(s.a.createElement("div",{className:"Markov__InputContainer"},s.a.createElement("span",{className:"Markov__InputIcon"},s.a.createElement(v.a,{src:t.state.children[e].type.icon})),s.a.createElement("input",Object.assign({className:"Markov__Input"},n))))},u=0;u<a;u++)l(u);return s.a.createElement("div",{className:"Markov__Containers"},s.a.createElement("div",{className:"Markov__RangeContainer"},c,s.a.createElement(ut,i)),s.a.createElement("div",{className:"Markov__InputsContainer"},o))})}return this.elementsLength=a,s.a.createElement("div",{className:"Markov__Parameters"},e)}}]),t}(ne);gt.className="Markov",gt.icon=void 0;var Ot=gt,yt=(a(729),a(329)),jt=a.n(yt),wt=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).className+=" "+t.className,a.destX=10,a.destY=10,a}return Object(h.a)(t,e),t}(G);wt.className="Translate",wt.icon=jt.a;var Nt=wt,kt=(a(731),a(330)),xt=a.n(kt),Et=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).className+=" "+t.className,a.rotate=20,a}return Object(h.a)(t,e),t}(G);Et.className="Rotate",Et.icon=xt.a;var Ct=Et,_t=(a(733),a(331)),Mt=a.n(_t),St=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).className+=" "+t.className,a.unauthorized=["*"],a.suppMenu=[],a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"getTransforms",value:function(){return null}}]),t}(ee);St.className="Void",St.icon=Mt.a;var Dt=St,Bt=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(u.a)(t).call(this,0,0,255,255))}return Object(h.a)(t,e),t}(V);Bt.className="Blue";var Pt=Bt,Tt=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(u.a)(t).call(this,0,255,255,255))}return Object(h.a)(t,e),t}(V);Tt.className="Cyan";var Rt=Tt,It=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(u.a)(t).call(this,255,0,255,255))}return Object(h.a)(t,e),t}(V);It.className="Magenta";var Ft=It,zt=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(u.a)(t).call(this,255,255,0,255))}return Object(h.a)(t,e),t}(V);zt.className="Yellow";var Ht=zt,Lt=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(u.a)(t).call(this,255,255,255,255))}return Object(h.a)(t,e),t}(V);Lt.className="White";var Wt=Lt;function Vt(e){switch(e){case"Figure":return he;case"Rectangle":return fe;case"Triangle":return Oe;case"Ellipse":return Ne;case"HHatching":return Me;case"VHatching":return Pe;case"LOHatching":return Fe;case"ROHatching":return We;case"Placement":return Ue;case"Grid":return lt;case"Markov":return Ot;case"Transform":return G;case"Color":return V;case"Blue":return Pt;case"Cyan":return Rt;case"Magenta":return Ft;case"Black":return ce;case"Yellow":return Ht;case"White":return Wt;case"Translate":return Nt;case"Scale":return $;case"Rotate":return Ct;case"Void":return Dt;case"LinearX":return Ke;case"LinearY":return Qe;case"DiagonalLeft":return et;case"DiagonalRight":return at;case"Orthogonal":return st;case"SnailRight":return it;default:return null}}window.getClassFromName=Vt,window.updateWorkspace=le.forceUpdate,window.addClassToElement=function(e,t){var a=Vt(e);t.addChild(a),t instanceof le||le.forceUpdate()},window.getIconClassFromName=function(e){var t=Vt(e);return t?t.icon:void 0},window.isAuthorized=function(e,t){var a=!0;if(!e)return!1;if(t instanceof Array){var n;if("string"===typeof e)n=new(Vt(e));else n=new e;for(var s=0;s<t.length&&a;++s){console.log(t);var r=Vt(t[s]);null!==r?a=a&&!(n instanceof r):console.error(t[s]+" : Invalid unauthorized Class")}}return a};var Ut=!1,Gt=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={DownloadName:"Untitled",DownloadFormat:"svg"},a.downloadImage=function(e){f.savePaper(this.state.DownloadName,this.state.DownloadFormat)},a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"aboutClick",value:function(){var e;Ut?(Ut=!Ut,e={display:"none"}):(Ut=!Ut,e={display:"flex"}),this.setState({aboutDisplay:e})}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"App"},s.a.createElement("header",{className:"App-header border-bottom"},s.a.createElement("div",{className:"App-logo"},"Paper\xa0{\xa0\xa0\xa0}"),s.a.createElement("div",{className:"about",onClick:this.aboutClick.bind(this)},s.a.createElement(v.a,{src:w.a}))),s.a.createElement("main",null,s.a.createElement("div",{className:"leftSide"},s.a.createElement("div",{className:"aboutContainer",style:this.state.aboutDisplay},s.a.createElement("span",{className:"aboutTitle"},"Paper\xa0{\xa0\xa0\xa0}",s.a.createElement("br",null),s.a.createElement("br",null),s.a.createElement("br",null),s.a.createElement("br",null)),s.a.createElement("span",null,"Ga\xebtan Robillard avec Nicolas Cusumano, C\xe9cile Rousset, Vincent Schmid, Quentin Sedmi.",s.a.createElement("br",null),s.a.createElement("br",null),s.a.createElement("br",null),s.a.createElement("br",null),"Paper is a sandbox for researching algorithmic processes in art. It should help producing drawings in the philosophy of generative processes.",s.a.createElement("br",null),"Our effort takes place in a dialectic with connectionism which currently has an upperhand in the sciences.",s.a.createElement("br",null),s.a.createElement("br",null),s.a.createElement("br",null),"Paper is a process developped by a group of people : ingineers, artists, students, researchers, ...",s.a.createElement("br",null),"Paper is based on the Experiment Generic Images 2018.",s.a.createElement("br",null),s.a.createElement("br",null),"Paper is research. Paper enables creating new artworks.",s.a.createElement("br",null),s.a.createElement("br",null),"Paper is algorithmic. Paper is intuitive. Paper works as an archive.",s.a.createElement("br",null),s.a.createElement("br",null),"Papers' first algorithm is Markov Chain, an algorithm that was used in early computer art and now heavily used in our digital environment.",s.a.createElement("br",null))),s.a.createElement(le,null)),s.a.createElement("div",{className:"rightSide border-left"},s.a.createElement("div",{className:"editionMenu border-bottom"},s.a.createElement("div",{className:"button displayCode border-right"},s.a.createElement(v.a,{src:y.a})),s.a.createElement("div",{className:"save"},s.a.createElement("input",{className:"save__name",type:"text",value:this.state.DownloadName,onChange:function(t){e.setState({DownloadName:t.target.value})}}),s.a.createElement("div",{className:"save__format"},s.a.createElement("input",{id:"save__svg",type:"radio",value:"svg",name:"saveFormat",defaultChecked:!0,onChange:function(t){t.target.checked&&e.setState({DownloadFormat:t.target.value})}}),s.a.createElement("label",{htmlFor:"save__svg",className:"save__formatItem button border-left"},".svg"),s.a.createElement("input",{id:"save__jpg",type:"radio",value:"jpg",name:"saveFormat",onChange:function(t){t.target.checked&&e.setState({DownloadFormat:t.target.value})}}),s.a.createElement("label",{htmlFor:"save__jpg",className:"save__formatItem button border-left"},".jpg")),s.a.createElement("a",{className:"button save__button border-left",onClick:function(t){return e.downloadImage(t.target)}},s.a.createElement(v.a,{src:g.a})))),s.a.createElement(f,null))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var At=a(332),Yt=a.n(At);Object(te.configure)({adapter:new Yt.a}),i.a.render(s.a.createElement(Gt,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[333,2,1]]]);
//# sourceMappingURL=main.dd82c187.chunk.js.map
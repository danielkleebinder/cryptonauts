(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{kSU2:function(t,e,n){"use strict";n.r(e),n.d(e,"AstronautModule",function(){return g});var o=n("ofXK"),a=n("fXoL"),r=n("XhcP"),i=n("32Cx"),c=n("0IaG"),s=n("f0Cb"),b=n("A5z7"),l=n("bTqV"),p=n("tyNb"),u=n("NFeN");const m=function(){return["/planets"]};let d=(()=>{class t{constructor(t){this.dialog=t}increaseLevel(){this.dialog.open(i.a,{width:"400px",data:{title:"Increase Level",message:"Are you sure that you want to increase your level? This will cost you 7 Things.",cancelText:"Not now",confirmationText:"Make me stronger now!"}})}}return t.\u0275fac=function(e){return new(e||t)(a.Mb(c.b))},t.\u0275cmp=a.Gb({type:t,selectors:[["app-astronaut-info"]],inputs:{me:"me"},decls:29,vars:3,consts:[[1,"title"],[1,"no-margin"],[1,"sub-header"],[1,"astronaut-properties"],["color","primary","selected",""],["mat-flat-button","","color","primary",3,"routerLink"],["mat-flat-button","","color","primary"],["mat-flat-button","","color","primary",3,"click"]],template:function(t,e){1&t&&(a.Sb(0,"header",0),a.Sb(1,"h1",1),a.vc(2,"Hey there"),a.Rb(),a.Sb(3,"small"),a.vc(4,"I am you, but in space ... huiii"),a.Rb(),a.Rb(),a.Sb(5,"header",2),a.Nb(6,"mat-divider"),a.Sb(7,"div",3),a.Sb(8,"mat-chip-list"),a.Sb(9,"mat-chip",4),a.vc(10),a.Rb(),a.Rb(),a.Rb(),a.Nb(11,"mat-divider"),a.Rb(),a.Sb(12,"main"),a.Sb(13,"section"),a.Sb(14,"p"),a.vc(15," Try to build an empire by constantly exploring planets and mining their resources. Some of those uncanny and newly explored planets really seem to be quite lucrative according to our most recent scans... "),a.Rb(),a.Sb(16,"button",5),a.vc(17," Let's explore some untouched planets! "),a.Rb(),a.Rb(),a.Sb(18,"section"),a.Sb(19,"p"),a.vc(20," ... or become one of those filthy space pirates that attack other astronauts and engineers to steal their money. This might seem a bit unfair, but hey, it's not your fault that they don't protect their space stones better. "),a.Rb(),a.Sb(21,"button",6),a.vc(22," Arrr ... or something like that, I am ready! "),a.Rb(),a.Rb(),a.Rb(),a.Sb(23,"footer"),a.Nb(24,"mat-divider"),a.Sb(25,"button",7),a.Zb("click",function(){return e.increaseLevel()}),a.Sb(26,"mat-icon"),a.vc(27,"arrow_upward"),a.Rb(),a.vc(28," Increase Level "),a.Rb(),a.Rb()),2&t&&(a.Cb(10),a.xc("Level ",null==e.me?null:e.me.level,""),a.Cb(6),a.hc("routerLink",a.ic(2,m)))},directives:[s.a,b.b,b.a,l.a,p.b,u.a],styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;height:100%;justify-content:space-between;overflow-x:hidden;text-align:justify}header[_ngcontent-%COMP%]{margin-bottom:46px}.astronaut-properties[_ngcontent-%COMP%]{margin-bottom:24px;margin-top:24px}main[_ngcontent-%COMP%]{height:100%;overflow-y:scroll}main[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{width:100%}section[_ngcontent-%COMP%]{margin-bottom:48px}footer[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{width:100%}footer[_ngcontent-%COMP%]   mat-divider[_ngcontent-%COMP%]{margin-bottom:32px}"],changeDetection:0}),t})();var h=n("Qu3c");const f=[{path:"",component:(()=>{class t{constructor(t){this.cdRef=t,this.me={id:0,level:12},this.drawerOpen=!1}ngAfterViewInit(){setTimeout(()=>{this.drawerOpen=!0,this.cdRef.markForCheck()},600)}}return t.\u0275fac=function(e){return new(e||t)(a.Mb(a.h))},t.\u0275cmp=a.Gb({type:t,selectors:[["app-astronaut"]],decls:6,vars:2,consts:[["mode","side",3,"opened"],[3,"me","click"],["matTooltip","Me","matTooltipPosition","above",1,"astronaut"],["src","assets/astronaut.png"]],template:function(t,e){1&t&&(a.Sb(0,"mat-sidenav-container"),a.Sb(1,"mat-sidenav",0),a.Sb(2,"app-astronaut-info",1),a.Zb("click",function(){return e.drawerOpen=!0}),a.Rb(),a.Rb(),a.Sb(3,"mat-sidenav-content"),a.Sb(4,"div",2),a.Nb(5,"img",3),a.Rb(),a.Rb(),a.Rb()),2&t&&(a.Cb(1),a.hc("opened",e.drawerOpen),a.Cb(1),a.hc("me",e.me))},directives:[r.b,r.a,d,r.c,h.a],styles:["[_nghost-%COMP%]{display:block;height:100%;overflow:hidden;width:100%}mat-sidenav-content[_ngcontent-%COMP%]{align-items:center;justify-content:center}.astronaut[_ngcontent-%COMP%]{animation:float-through-space 45s ease-in-out infinite;animation-direction:alternate;cursor:pointer}.astronaut[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{height:300px}@keyframes float-through-space{0%{transform:rotate(20deg) translate(20px,40px)}33%{transform:rotate(-10deg) translate(-60px,30px)}66%{transform:rotate(-30deg) translate(-50px)}to{transform:rotate(-20deg) translate(80px,-30px)}}"],changeDetection:0}),t})()}];let g=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=a.Kb({type:t}),t.\u0275inj=a.Jb({imports:[[o.c,p.c.forChild(f),r.d,u.b,l.b,h.b,s.b,b.c]]}),t})()}}]);
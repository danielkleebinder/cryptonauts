(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{Yj9t:function(t,e,i){"use strict";i.r(e),i.d(e,"AuthModule",function(){return k});var n=i("ofXK"),s=i("fXoL"),r=i("tyNb"),a=i("kmnG"),o=i("nLfN"),l=i("8LU1"),c=i("EY2u"),d=i("XNiG");i("xgIS"),i("3UWI"),i("1G5W");const u=Object(o.f)({passive:!0});let h=(()=>{class t{constructor(t,e){this._platform=t,this._ngZone=e,this._monitoredElements=new Map}monitor(t){if(!this._platform.isBrowser)return c.a;const e=Object(l.d)(t),i=this._monitoredElements.get(e);if(i)return i.subject;const n=new d.a,s="cdk-text-field-autofilled",r=t=>{"cdk-text-field-autofill-start"!==t.animationName||e.classList.contains(s)?"cdk-text-field-autofill-end"===t.animationName&&e.classList.contains(s)&&(e.classList.remove(s),this._ngZone.run(()=>n.next({target:t.target,isAutofilled:!1}))):(e.classList.add(s),this._ngZone.run(()=>n.next({target:t.target,isAutofilled:!0})))};return this._ngZone.runOutsideAngular(()=>{e.addEventListener("animationstart",r,u),e.classList.add("cdk-text-field-autofill-monitored")}),this._monitoredElements.set(e,{subject:n,unlisten:()=>{e.removeEventListener("animationstart",r,u)}}),n}stopMonitoring(t){const e=Object(l.d)(t),i=this._monitoredElements.get(e);i&&(i.unlisten(),i.subject.complete(),e.classList.remove("cdk-text-field-autofill-monitored"),e.classList.remove("cdk-text-field-autofilled"),this._monitoredElements.delete(e))}ngOnDestroy(){this._monitoredElements.forEach((t,e)=>this.stopMonitoring(e))}}return t.\u0275fac=function(e){return new(e||t)(s.Ub(o.a),s.Ub(s.A))},t.\u0275prov=Object(s.Hb)({factory:function(){return new t(Object(s.Ub)(o.a),Object(s.Ub)(s.A))},token:t,providedIn:"root"}),t})(),m=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=s.Jb({type:t}),t.\u0275inj=s.Ib({imports:[[o.b]]}),t})();var p=i("FKr1"),f=i("3Pt+");const b=new s.r("MAT_INPUT_VALUE_ACCESSOR"),_=["button","checkbox","file","hidden","image","radio","range","reset","submit"];let g=0;class v{constructor(t,e,i,n){this._defaultErrorStateMatcher=t,this._parentForm=e,this._parentFormGroup=i,this.ngControl=n}}const y=Object(p.j)(v);let C=(()=>{class t extends y{constructor(t,e,i,n,s,r,a,l,c,u){super(r,n,s,i),this._elementRef=t,this._platform=e,this.ngControl=i,this._autofillMonitor=l,this._formField=u,this._uid="mat-input-"+g++,this.focused=!1,this.stateChanges=new d.a,this.controlType="mat-input",this.autofilled=!1,this._disabled=!1,this._required=!1,this._type="text",this._readonly=!1,this._neverEmptyInputTypes=["date","datetime","datetime-local","month","time","week"].filter(t=>Object(o.e)().has(t));const h=this._elementRef.nativeElement,m=h.nodeName.toLowerCase();this._inputValueAccessor=a||h,this._previousNativeValue=this.value,this.id=this.id,e.IOS&&c.runOutsideAngular(()=>{t.nativeElement.addEventListener("keyup",t=>{let e=t.target;e.value||e.selectionStart||e.selectionEnd||(e.setSelectionRange(1,1),e.setSelectionRange(0,0))})}),this._isServer=!this._platform.isBrowser,this._isNativeSelect="select"===m,this._isTextarea="textarea"===m,this._isNativeSelect&&(this.controlType=h.multiple?"mat-native-select-multiple":"mat-native-select")}get disabled(){return this.ngControl&&null!==this.ngControl.disabled?this.ngControl.disabled:this._disabled}set disabled(t){this._disabled=Object(l.b)(t),this.focused&&(this.focused=!1,this.stateChanges.next())}get id(){return this._id}set id(t){this._id=t||this._uid}get required(){return this._required}set required(t){this._required=Object(l.b)(t)}get type(){return this._type}set type(t){this._type=t||"text",this._validateType(),!this._isTextarea&&Object(o.e)().has(this._type)&&(this._elementRef.nativeElement.type=this._type)}get value(){return this._inputValueAccessor.value}set value(t){t!==this.value&&(this._inputValueAccessor.value=t,this.stateChanges.next())}get readonly(){return this._readonly}set readonly(t){this._readonly=Object(l.b)(t)}ngAfterViewInit(){this._platform.isBrowser&&this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe(t=>{this.autofilled=t.isAutofilled,this.stateChanges.next()})}ngOnChanges(){this.stateChanges.next()}ngOnDestroy(){this.stateChanges.complete(),this._platform.isBrowser&&this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement)}ngDoCheck(){this.ngControl&&this.updateErrorState(),this._dirtyCheckNativeValue(),this._dirtyCheckPlaceholder()}focus(t){this._elementRef.nativeElement.focus(t)}_focusChanged(t){t===this.focused||this.readonly&&t||(this.focused=t,this.stateChanges.next())}_onInput(){}_dirtyCheckPlaceholder(){var t,e;const i=(null===(e=null===(t=this._formField)||void 0===t?void 0:t._hideControlPlaceholder)||void 0===e?void 0:e.call(t))?null:this.placeholder;if(i!==this._previousPlaceholder){const t=this._elementRef.nativeElement;this._previousPlaceholder=i,i?t.setAttribute("placeholder",i):t.removeAttribute("placeholder")}}_dirtyCheckNativeValue(){const t=this._elementRef.nativeElement.value;this._previousNativeValue!==t&&(this._previousNativeValue=t,this.stateChanges.next())}_validateType(){_.indexOf(this._type)}_isNeverEmpty(){return this._neverEmptyInputTypes.indexOf(this._type)>-1}_isBadInput(){let t=this._elementRef.nativeElement.validity;return t&&t.badInput}get empty(){return!(this._isNeverEmpty()||this._elementRef.nativeElement.value||this._isBadInput()||this.autofilled)}get shouldLabelFloat(){if(this._isNativeSelect){const t=this._elementRef.nativeElement,e=t.options[0];return this.focused||t.multiple||!this.empty||!!(t.selectedIndex>-1&&e&&e.label)}return this.focused||!this.empty}setDescribedByIds(t){t.length?this._elementRef.nativeElement.setAttribute("aria-describedby",t.join(" ")):this._elementRef.nativeElement.removeAttribute("aria-describedby")}onContainerClick(){this.focused||this.focus()}}return t.\u0275fac=function(e){return new(e||t)(s.Lb(s.l),s.Lb(o.a),s.Lb(f.b,10),s.Lb(f.c,8),s.Lb(f.a,8),s.Lb(p.a),s.Lb(b,10),s.Lb(h),s.Lb(s.A),s.Lb(a.a,8))},t.\u0275dir=s.Gb({type:t,selectors:[["input","matInput",""],["textarea","matInput",""],["select","matNativeControl",""],["input","matNativeControl",""],["textarea","matNativeControl",""]],hostAttrs:[1,"mat-input-element","mat-form-field-autofill-control"],hostVars:9,hostBindings:function(t,e){1&t&&s.Xb("focus",function(){return e._focusChanged(!0)})("blur",function(){return e._focusChanged(!1)})("input",function(){return e._onInput()}),2&t&&(s.Tb("disabled",e.disabled)("required",e.required),s.Cb("id",e.id)("data-placeholder",e.placeholder)("readonly",e.readonly&&!e._isNativeSelect||null)("aria-invalid",e.errorState&&!e.empty)("aria-required",e.required),s.Db("mat-input-server",e._isServer))},inputs:{id:"id",disabled:"disabled",required:"required",type:"type",value:"value",readonly:"readonly",placeholder:"placeholder",errorStateMatcher:"errorStateMatcher",userAriaDescribedBy:["aria-describedby","userAriaDescribedBy"]},exportAs:["matInput"],features:[s.Ab([{provide:a.c,useExisting:t}]),s.yb,s.zb]}),t})(),x=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=s.Jb({type:t}),t.\u0275inj=s.Ib({providers:[p.a],imports:[[m,a.d,p.c],m,a.d]}),t})();var E=i("bTqV"),O=i("NFeN");const w=[{path:"",component:(()=>{class t{constructor(t){this.router=t}ngOnInit(){}letsGo(){this.router.navigate(["/planets"])}}return t.\u0275fac=function(e){return new(e||t)(s.Lb(r.a))},t.\u0275cmp=s.Fb({type:t,selectors:[["app-auth"]],decls:14,vars:0,consts:[["appearance","fill",1,"contract-address"],["matInput",""],["mat-flat-button","","color","primary",3,"click"]],template:function(t,e){1&t&&(s.Qb(0,"header"),s.Qb(1,"h1"),s.qc(2,"Cryptoverse"),s.Pb(),s.Qb(3,"h2"),s.qc(4,"Build your own Blockchain Space Force"),s.Pb(),s.Pb(),s.Qb(5,"main"),s.Qb(6,"mat-form-field",0),s.Qb(7,"mat-label"),s.qc(8,"Contract Address"),s.Pb(),s.Mb(9,"input",1),s.Pb(),s.Qb(10,"button",2),s.Xb("click",function(){return e.letsGo()}),s.qc(11," Take me to Space "),s.Qb(12,"mat-icon"),s.qc(13,"chevron_right"),s.Pb(),s.Pb(),s.Pb())},directives:[a.b,a.e,C,E.a,O.a],styles:["[_nghost-%COMP%]{background:radial-gradient(ellipse at bottom,#1b2735,rgba(9,10,15,0));height:100%;width:100%}[_nghost-%COMP%], header[_ngcontent-%COMP%]{align-items:center;display:flex;flex-direction:column;justify-content:center}header[_ngcontent-%COMP%]{margin-bottom:32px}header[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{-webkit-text-fill-color:transparent;align-items:center;background:linear-gradient(#fff,#38495a);-webkit-background-clip:text;color:#fff;display:flex;font-family:lato,sans-serif!important;font-size:62px;font-weight:300;height:72px;letter-spacing:10px;margin-bottom:0}header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:32px;margin-top:0}main[_ngcontent-%COMP%]{align-items:center;display:flex;flex-direction:column;justify-content:center;margin-top:64px}.contract-address[_ngcontent-%COMP%]{width:600px}"],changeDetection:0}),t})()}];let k=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=s.Jb({type:t}),t.\u0275inj=s.Ib({imports:[[n.c,r.c.forChild(w),a.d,x,E.b,O.b]]}),t})()}}]);
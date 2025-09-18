import{p as U}from"./chunk-K2ZEYYM2-Bb25mkUl.js";import{p as Q}from"./treemap-KMMF4GRG-5JCI3IDA-BjMhdxFS.js";import{_ as s,g as V,s as Z,a as j,b as q,v as H,t as J,l as D,c as K,G as X,aN as Y,aP as ee,aQ as G,aR as te,e as ae,A as re,aS as ie,I as se}from"./mermaid.esm-eBsgQD2W.js";import"./chunk-TGZYFRKZ-DguDv0AC.js";import"./index-DwkGyXRE.js";var le=se.pie,C={sections:new Map,showData:!1},f=C.sections,$=C.showData,ne=structuredClone(le),oe=s(()=>structuredClone(ne),"getConfig"),ce=s(()=>{f=new Map,$=C.showData,re()},"clear"),pe=s(({label:e,value:a})=>{if(a<0)throw new Error(`"${e}" has invalid value: ${a}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);f.has(e)||(f.set(e,a),D.debug(`added new section: ${e}, with value: ${a}`))},"addSection"),de=s(()=>f,"getSections"),ge=s(e=>{$=e},"setShowData"),ue=s(()=>$,"getShowData"),P={getConfig:oe,clear:ce,setDiagramTitle:J,getDiagramTitle:H,setAccTitle:q,getAccTitle:j,setAccDescription:Z,getAccDescription:V,addSection:pe,getSections:de,setShowData:ge,getShowData:ue},fe=s((e,a)=>{U(e,a),a.setShowData(e.showData),e.sections.map(a.addSection)},"populateDb"),he={parse:s(async e=>{const a=await Q("pie",e);D.debug(a),fe(a,P)},"parse")},me=s(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,"getStyles"),ve=me,Se=s(e=>{const a=[...e.values()].reduce((r,l)=>r+l,0),y=[...e.entries()].map(([r,l])=>({label:r,value:l})).filter(r=>r.value/a*100>=1).sort((r,l)=>l.value-r.value);return ie().value(r=>r.value)(y)},"createPieArcs"),xe=s((e,a,y,T)=>{D.debug(`rendering pie chart
`+e);const r=T.db,l=K(),A=X(r.getConfig(),l.pie),_=40,n=18,d=4,p=450,h=p,m=Y(a),o=m.append("g");o.attr("transform","translate("+h/2+","+p/2+")");const{themeVariables:i}=l;let[g]=ee(i.pieOuterStrokeWidth);g!=null||(g=2);const b=A.textPosition,u=Math.min(h,p)/2-_,R=G().innerRadius(0).outerRadius(u),I=G().innerRadius(u*b).outerRadius(u*b);o.append("circle").attr("cx",0).attr("cy",0).attr("r",u+g/2).attr("class","pieOuterCircle");const v=r.getSections(),M=Se(v),N=[i.pie1,i.pie2,i.pie3,i.pie4,i.pie5,i.pie6,i.pie7,i.pie8,i.pie9,i.pie10,i.pie11,i.pie12];let S=0;v.forEach(t=>{S+=t});const E=M.filter(t=>(t.data.value/S*100).toFixed(0)!=="0"),x=te(N);o.selectAll("mySlices").data(E).enter().append("path").attr("d",R).attr("fill",t=>x(t.data.label)).attr("class","pieCircle"),o.selectAll("mySlices").data(E).enter().append("text").text(t=>(t.data.value/S*100).toFixed(0)+"%").attr("transform",t=>"translate("+I.centroid(t)+")").style("text-anchor","middle").attr("class","slice"),o.append("text").text(r.getDiagramTitle()).attr("x",0).attr("y",-400/2).attr("class","pieTitleText");const k=[...v.entries()].map(([t,c])=>({label:t,value:c})),w=o.selectAll(".legend").data(k).enter().append("g").attr("class","legend").attr("transform",(t,c)=>{const F=n+d,L=F*k.length/2,W=12*n,B=c*F-L;return"translate("+W+","+B+")"});w.append("rect").attr("width",n).attr("height",n).style("fill",t=>x(t.label)).style("stroke",t=>x(t.label)),w.append("text").attr("x",n+d).attr("y",n-d).text(t=>r.getShowData()?`${t.label} [${t.value}]`:t.label);const O=Math.max(...w.selectAll("text").nodes().map(t=>{var c;return(c=t==null?void 0:t.getBoundingClientRect().width)!=null?c:0})),z=h+_+n+d+O;m.attr("viewBox",`0 0 ${z} ${p}`),ae(m,p,z,A.useMaxWidth)},"draw"),we={draw:xe},Ae={parser:he,db:P,renderer:we,styles:ve};export{Ae as diagram};

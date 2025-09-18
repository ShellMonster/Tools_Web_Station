import{r as x,j as a}from"./vendor-E1qkQgBK.js";import{B as w}from"./Button-S8-yJkDU.js";import{I as f}from"./Input-dBmVsq4B.js";import{S as R}from"./Select-BKMIeGih.js";import{T as N}from"./TextArea-BoVf9nms.js";import{T as F}from"./ToolSection-D3WFVMtC.js";import{c as W}from"./clipboard-4Xj0hnU0.js";import{u as O}from"./index-T0krPfu9.js";import"./format-parsers-Cy82sy8R.js";import"./mermaid-qV9g4jTJ.js";const j={zh:{name:"张三",title:"品牌营销经理",company:"星云互动科技有限公司",phone:"138-0000-0000",email:"zhangsan@example.com",website:"https://example.com",address:"上海市浦东新区世纪大道 100 号",tagline:"以创意点亮品牌未来"},en:{name:"Alex Johnson",title:"Brand Marketing Manager",company:"Nebula Interactive Ltd.",phone:"+1 (415) 555-1234",email:"alex.johnson@example.com",website:"https://example.com",address:"100 Market Street, San Francisco, CA 94105",tagline:"Lighting up brands with creativity"}},z=t=>{var e;return{...(e=j[t])!=null?e:j.zh}},A=(t,e)=>["name","title","company","phone","email","website","address","tagline"].every(n=>((t==null?void 0:t[n])||"")===((e==null?void 0:e[n])||"")),v=[{id:"modern-blue",label:"现代蓝带",accent:"#2563eb",secondary:"#1e3a8a",background:"#f8fafc",border:"4px solid #2563eb",layout:"left-border",labelColor:"#1e3a8a",valueColor:"#0f172a",taglineColor:"#1e3a8a"},{id:"elegant-gold",label:"优雅金饰",accent:"#b45309",secondary:"#92400e",background:"#fffbeb",border:"2px solid #fcd34d",layout:"top-border",labelColor:"#b45309",valueColor:"#7c2d12",taglineColor:"#92400e"},{id:"minimal-dark",label:"极简黑白",accent:"#0f172a",secondary:"#334155",background:"#ffffff",border:"1px solid #1e293b",layout:"inline",labelColor:"#334155",valueColor:"#111827",taglineColor:"#4b5563"},{id:"split-card",label:"双色分栏",accent:"#0ea5e9",secondary:"#0369a1",background:"#ffffff",border:"1px solid #e2e8f0",layout:"split-card",labelColor:"#0ea5e9",valueColor:"#0f172a",taglineColor:"#0f172a"},{id:"badge-accent",label:"徽章红",accent:"#dc2626",secondary:"#991b1b",background:"#fff5f5",border:"1px solid #fecaca",layout:"badge",labelColor:"#dc2626",valueColor:"#7f1d1d",taglineColor:"#9f1239"},{id:"gradient-night",label:"霓虹夜光",accent:"#38bdf8",secondary:"#bae6fd",background:"linear-gradient(135deg, #0f172a 0%, #1e3a8a 48%, #312e81 100%)",border:"1px solid rgba(148, 163, 184, 0.45)",layout:"gradient",labelColor:"#38bdf8",valueColor:"#e2e8f0",taglineColor:"rgba(226, 232, 240, 0.85)",linkColor:"#7dd3fc",taglineStyle:"font-style:normal; letter-spacing:0.08em; text-transform:uppercase;",previewShadow:"0 22px 48px -24px rgba(56, 189, 248, 0.75)"},{id:"inline-highlight",label:"柔合彩块",accent:"#f97316",secondary:"#fb923c",background:"#fffaf5",border:"1px solid #fed7aa",layout:"inline-highlight",labelColor:"#f97316",valueColor:"#4b5563",taglineColor:"#fb923c",taglineStyle:"font-style:normal;"}],E=(t="")=>t.trim().split(/\s+/).filter(Boolean).slice(0,2).map(e=>e.charAt(0).toUpperCase()).join("")||"ID",$=(t,e,n,o,s=o)=>e?`
    <tr>
      <td style="padding:2px 0; color:${n}; font-weight:600; white-space:nowrap;">${t}</td>
      <td style="padding:2px 0; color:${o};">
        ${e.startsWith("http")?`<a href="${e}" style="color:${s}; text-decoration:none;">${e}</a>`:e}
      </td>
    </tr>`:"",U=(t,e,n)=>{var k,S,T,B,M,I,L;const o="'Helvetica Neue', 'Segoe UI', Arial, sans-serif'",s=[t.title,t.company].filter(Boolean).join(" · "),b=(S=(k=e.labelColor)!=null?k:e.secondary)!=null?S:"#334155",i=(T=e.valueColor)!=null?T:"#1f2937",p=(B=e.linkColor)!=null?B:i,r=(I=(M=e.taglineColor)!=null?M:e.secondary)!=null?I:i,h=(L=e.taglineStyle)!=null?L:"font-style:italic;",m=[$(n("手机号"),t.phone,b,i,p),$(n("邮箱"),t.email,b,i,p),$(n("公司"),t.company,b,i,p),$(n("办公室地址"),t.address,b,i,p),$(n("网站"),t.website,b,i,p)].filter(Boolean).join(""),C=t.tagline?`<tr><td colspan="2" style="padding-top:12px; color:${r}; ${h}">${t.tagline}</td></tr>`:"",g=(d=!0,y="")=>{const H=`${m}${d?C:""}`;return H?`<table cellpadding="0" cellspacing="0" style="border-collapse:collapse; ${y}">${H}</table>`:""},u=g(!0),l=g(!1);if(e.layout==="left-border")return`
      <table cellpadding="0" cellspacing="0" style="font-family:${o}; color:${i}; font-size:14px; border-collapse:collapse;">
        <tr>
          <td style="padding:14px 20px; border-left:${e.border}; background:${e.background};">
            <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              <tr>
                <td style="font-size:20px; font-weight:700; color:${e.accent};">${t.name||""}</td>
              </tr>
              ${s?`<tr><td style="padding-top:4px; color:${e.secondary}; font-weight:600;">${s}</td></tr>`:""}
              ${u?`<tr><td style="padding-top:12px;">${u}</td></tr>`:""}
            </table>
          </td>
        </tr>
      </table>`;if(e.layout==="top-border")return`
      <table cellpadding="0" cellspacing="0" style="font-family:${o}; color:${i}; font-size:14px; border-collapse:collapse; border:${e.border}; background:${e.background};">
        <tr>
          <td style="padding:18px 26px;">
            <div style="font-size:22px; color:${e.secondary}; font-weight:700;">${t.name||""}</div>
            ${s?`<div style="margin-top:4px; font-size:15px; color:${e.accent}; font-weight:600;">${s}</div>`:""}
            ${u?`<div style="margin-top:18px;">${u}</div>`:""}
          </td>
        </tr>
      </table>`;if(e.layout==="split-card"){const d=E(t.name||t.company),y=t.tagline?`<div style="margin-top:16px; font-size:12px; line-height:1.6; opacity:0.85;">${t.tagline}</div>`:"";return`
      <table cellpadding="0" cellspacing="0" style="font-family:${o}; font-size:14px; border-collapse:collapse; border:${e.border}; background:${e.background};">
        <tr>
          <td style="background:${e.accent}; color:#ffffff; padding:24px 20px; text-align:center; width:120px;">
            <div style="font-size:30px; font-weight:700; letter-spacing:1px;">${d}</div>
            ${t.company?`<div style="margin-top:10px; font-size:13px; font-weight:600;">${t.company}</div>`:""}
            ${y}
          </td>
          <td style="padding:22px 28px; color:${i};">
            <div style="font-size:20px; font-weight:700; color:${e.accent};">${t.name||""}</div>
            ${t.title?`<div style="margin-top:4px; color:${e.secondary}; font-weight:500;">${t.title}</div>`:""}
            ${l?`<div style="margin-top:16px;">${l}</div>`:""}
          </td>
        </tr>
      </table>`}if(e.layout==="badge"){const d=E(t.name),y=g(!0);return`
      <table cellpadding="0" cellspacing="0" style="font-family:${o}; color:${i}; font-size:14px; border-collapse:collapse; border:${e.border}; background:${e.background};">
        <tr>
          <td style="padding:20px 26px;">
            <div style="display:flex; align-items:center; gap:16px;">
              <span style="display:inline-flex; align-items:center; justify-content:center; padding:10px 16px; border-radius:999px; background:${e.accent}; color:#ffffff; font-weight:700; letter-spacing:1px;">${d}</span>
              <div>
                <div style="font-size:20px; font-weight:700; color:${e.secondary};">${t.name||""}</div>
                ${s?`<div style="margin-top:4px; color:${e.valueColor}; font-size:14px;">${s}</div>`:""}
              </div>
            </div>
            ${y?`<div style="margin-top:18px;">${y}</div>`:""}
          </td>
        </tr>
      </table>`}if(e.layout==="gradient"){const d=g(!0,`color:${i};`);return`
      <table cellpadding="0" cellspacing="0" style="font-family:${o}; color:${i}; font-size:14px; border-collapse:collapse; border:${e.border}; background:${e.background};">
        <tr>
          <td style="padding:24px 32px;">
            <div style="font-size:24px; font-weight:700; color:${e.secondary};">${t.name||""}</div>
            ${s?`<div style="margin-top:8px; color:${e.labelColor}; font-size:12px; letter-spacing:0.08em; text-transform:uppercase;">${s}</div>`:""}
            ${d?`<div style="margin-top:22px;">${d}</div>`:""}
          </td>
        </tr>
      </table>`}if(e.layout==="inline-highlight"){const d=g(!0);return`
      <table cellpadding="0" cellspacing="0" style="font-family:${o}; color:${i}; font-size:14px; border-collapse:collapse; border:${e.border}; background:${e.background};">
        <tr>
          <td style="padding:20px 26px;">
            <div style="display:inline-flex; align-items:center; gap:10px; background:${e.accent}; color:#ffffff; padding:6px 16px; border-radius:999px; font-weight:600;">
              <span>${t.name||""}</span>
            </div>
            ${s?`<div style="margin-top:10px; color:${e.secondary}; font-weight:500;">${s}</div>`:""}
            ${d?`<div style="margin-top:18px;">${d}</div>`:""}
          </td>
        </tr>
      </table>`}const c=g(!0);return`
    <table cellpadding="0" cellspacing="0" style="font-family:${o}; color:${i}; font-size:14px; border-collapse:collapse;">
      <tr>
        <td style="padding:6px 0; border-bottom:${e.border};">
          <span style="font-size:20px; font-weight:700; color:${e.accent};">${t.name||""}</span>
          ${s?`<span style="margin-left:12px; color:${e.secondary}; font-weight:500;">${s}</span>`:""}
        </td>
      </tr>
      ${c?`<tr><td style="padding-top:12px;">${c}</td></tr>`:""}
    </table>`},_=(t,e)=>[`${t.name||""} | ${t.title||""}`.trim(),t.company,t.phone?`${e("手机号")}: ${t.phone}`:"",t.email?`${e("邮箱")}: ${t.email}`:"",t.website?`${e("网站")}: ${t.website}`:"",t.address?`${e("办公室地址")}: ${t.address}`:"",t.tagline?`—— ${t.tagline}`:""].filter(Boolean).join(`
`),Z=()=>{const{t,locale:e}=O(),[n,o]=x.useState(()=>z(e)),[s,b]=x.useState(v[0].id),[i,p]=x.useState(""),r=x.useMemo(()=>{var l;return(l=v.find(c=>c.id===s))!=null?l:v[0]},[s]),h=x.useMemo(()=>U(n,r,t),[n,r,t]),m=x.useMemo(()=>_(n,t),[n,t]),C=x.useMemo(()=>{var c;const l={};return(r.previewBackground||r.background)&&(l.background=(c=r.previewBackground)!=null?c:r.background),r.wrapperBorder&&(l.border=r.wrapperBorder),r.previewShadow&&(l.boxShadow=r.previewShadow),l},[r]);x.useEffect(()=>{o(l=>A(l,j.zh)||A(l,j.en)?z(e):l)},[e]);const g=async l=>{const c=l==="html"?h:m;if(!c)return;await W(c)&&(p(l),setTimeout(()=>p(""),1500))},u=()=>{o(z(e)),p("")};return a.jsxs("div",{className:"space-y-6",children:[a.jsxs(F,{title:"邮箱签名生成",description:"填写个人与公司信息，选择模板即可生成精美邮箱签名。",actions:a.jsx(w,{variant:"secondary",onClick:u,children:"恢复示例"}),children:[a.jsxs("div",{className:"grid gap-4 md:grid-cols-2",children:[a.jsxs("div",{children:[a.jsx("label",{className:"text-sm text-slate-500 dark:text-slate-300",children:t("姓名")}),a.jsx(f,{value:n.name,onChange:l=>o({...n,name:l.target.value})})]}),a.jsxs("div",{children:[a.jsx("label",{className:"text-sm text-slate-500 dark:text-slate-300",children:t("职位")}),a.jsx(f,{value:n.title,onChange:l=>o({...n,title:l.target.value})})]}),a.jsxs("div",{children:[a.jsx("label",{className:"text-sm text-slate-500 dark:text-slate-300",children:t("公司")}),a.jsx(f,{value:n.company,onChange:l=>o({...n,company:l.target.value})})]}),a.jsxs("div",{children:[a.jsx("label",{className:"text-sm text-slate-500 dark:text-slate-300",children:t("手机号")}),a.jsx(f,{value:n.phone,onChange:l=>o({...n,phone:l.target.value})})]}),a.jsxs("div",{children:[a.jsx("label",{className:"text-sm text-slate-500 dark:text-slate-300",children:t("邮箱")}),a.jsx(f,{type:"email",value:n.email,onChange:l=>o({...n,email:l.target.value})})]}),a.jsxs("div",{children:[a.jsx("label",{className:"text-sm text-slate-500 dark:text-slate-300",children:t("网站")}),a.jsx(f,{value:n.website,onChange:l=>o({...n,website:l.target.value})})]}),a.jsxs("div",{className:"md:col-span-2",children:[a.jsx("label",{className:"text-sm text-slate-500 dark:text-slate-300",children:t("办公室地址")}),a.jsx(f,{value:n.address,onChange:l=>o({...n,address:l.target.value})})]}),a.jsxs("div",{className:"md:col-span-2",children:[a.jsx("label",{className:"text-sm text-slate-500 dark:text-slate-300",children:t("宣传语 / 签名寄语")}),a.jsx(N,{className:"min-h-[88px]",value:n.tagline,onChange:l=>o({...n,tagline:l.target.value})})]})]}),a.jsxs("div",{className:"mt-4 flex flex-col gap-3 md:flex-row md:items-center",children:[a.jsx("span",{className:"text-sm text-slate-500 dark:text-slate-300",children:t("模板风格")}),a.jsx(R,{value:s,onChange:l=>b(l.target.value),className:"w-full md:w-64",children:v.map(l=>a.jsx("option",{value:l.id,children:t(l.label)},l.id))})]})]}),a.jsxs(F,{title:"签名预览",description:"复制 HTML 嵌入邮箱设置，或复制纯文本用于 IM 签名。",actions:a.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[a.jsx(w,{onClick:()=>g("html"),children:i==="html"?"已复制 HTML":"复制 HTML"}),a.jsx(w,{variant:"secondary",onClick:()=>g("plain"),children:i==="plain"?"已复制文本":"复制纯文本"})]}),children:[a.jsx("div",{className:"rounded-2xl border border-slate-200 p-6 shadow-sm dark:border-slate-800",style:C,children:a.jsx("div",{dangerouslySetInnerHTML:{__html:h}})}),a.jsxs("div",{className:"mt-6",children:[a.jsx("label",{className:"text-sm text-slate-500 dark:text-slate-300",children:t("HTML 代码")}),a.jsx(N,{value:h,readOnly:!0,className:"mt-2 h-48 font-mono"})]}),a.jsxs("div",{className:"mt-4",children:[a.jsx("label",{className:"text-sm text-slate-500 dark:text-slate-300",children:t("纯文本")}),a.jsx(N,{value:m,readOnly:!0,className:"mt-2 h-32 font-mono"})]})]})]})};export{Z as default};

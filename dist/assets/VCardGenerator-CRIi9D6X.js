import{r as d,j as a}from"./index-DwkGyXRE.js";import{I as o}from"./Input-BRbRfnvk.js";import{T as c}from"./ToolSection-DOJU4p5W.js";import{Q as i}from"./index-mBLW8HHK.js";const p=({name:r,phone:s,email:l,company:t,title:e})=>`BEGIN:VCARD
VERSION:3.0
FN:${r}
${t?`ORG:${t}
`:""}${e?`TITLE:${e}
`:""}${s?`TEL;TYPE=CELL:${s}
`:""}${l?`EMAIL:${l}
`:""}END:VCARD`,v=()=>{const[r,s]=d.useState({name:"张三",phone:"13800000000",email:"demo@example.com",company:"示例公司",title:"前端开发"}),l=d.useMemo(()=>p(r),[r]),t=(e,n)=>{s(m=>({...m,[e]:n}))};return a.jsxs(c,{title:"二维码名片生成",description:"填写基本信息，生成 vCard 二维码。",children:[a.jsxs("div",{className:"grid gap-4 md:grid-cols-2",children:[a.jsx(o,{value:r.name,onChange:e=>t("name",e.target.value),placeholder:"姓名"}),a.jsx(o,{value:r.phone,onChange:e=>t("phone",e.target.value),placeholder:"电话"}),a.jsx(o,{value:r.email,onChange:e=>t("email",e.target.value),placeholder:"邮箱"}),a.jsx(o,{value:r.company,onChange:e=>t("company",e.target.value),placeholder:"公司"}),a.jsx(o,{value:r.title,onChange:e=>t("title",e.target.value),placeholder:"职位"})]}),a.jsxs("div",{className:"mt-6 flex flex-col items-start gap-4 md:flex-row md:items-center",children:[a.jsx("div",{className:"rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900",children:a.jsx(i,{value:l,size:180,level:"H"})}),a.jsx("textarea",{className:"h-40 w-full rounded-md border border-slate-200 bg-white p-3 text-sm font-mono dark:border-slate-800 dark:bg-slate-900",value:l,readOnly:!0})]})]})};export{v as default};

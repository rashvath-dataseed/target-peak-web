import{c as j,j as e,C as m,a as f,u as g,b as v,d as y,r as i,U as C,I as N,e as w,f as k,g as A,h as b,i as L}from"./index-RykzsKLZ.js";import{g as S}from"./admins.mock-DkMhum7R.js";import{f as l,a as U,A as c}from"./constants-BtSNH3GW.js";import{B as E}from"./book-open-BJj_vz5j.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=j("UserCog",[["circle",{cx:"18",cy:"15",r:"3",key:"gjjjvw"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M10 15H6a4 4 0 0 0-4 4v2",key:"1nfge6"}],["path",{d:"m21.7 16.4-.9-.3",key:"12j9ji"}],["path",{d:"m15.2 13.9-.9-.3",key:"1fdjdi"}],["path",{d:"m16.6 18.7.3-.9",key:"heedtr"}],["path",{d:"m19.1 12.2.3-.9",key:"1af3ki"}],["path",{d:"m19.6 18.7-.4-1",key:"1x9vze"}],["path",{d:"m16.8 12.3-.4-1",key:"vqeiwj"}],["path",{d:"m14.3 16.6 1-.4",key:"1qlj63"}],["path",{d:"m20.7 13.8 1-.4",key:"1v5t8k"}]]),o=({title:t,value:r,icon:n,variant:a,trend:p})=>{const d={users:"text-teal bg-teal/10",admins:"text-primary bg-primary/10",courses:"text-success bg-success/10",revenue:"text-warning bg-warning/10"};return e.jsx(m,{className:f("analytics-card",a),children:e.jsxs("div",{className:"flex items-start justify-between",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx("p",{className:"text-sm font-medium text-muted-foreground",children:t}),e.jsx("p",{className:"text-2xl font-bold text-foreground",children:r})]}),e.jsx("div",{className:f("flex h-12 w-12 items-center justify-center rounded-lg",d[a]),children:e.jsx(n,{className:"h-6 w-6"})})]})})},M=({title:t,path:r,icon:n})=>{const a=g();return e.jsxs(m,{onClick:()=>a(r),className:`\r
        cursor-pointer \r
        hover:shadow-md \r
        transition-all \r
        flex \r
        flex-col \r
        items-center \r
        justify-center \r
        h-[120px]\r
        text-center\r
      `,children:[e.jsx(n,{className:"h-7 w-7 text-muted-foreground mb-2"}),e.jsx("span",{className:"text-sm font-medium text-muted-foreground",children:t})]})},_=()=>{var x;const{user:t}=v();g();const{toast:r}=y(),[n,a]=i.useState([]),[p,d]=i.useState(!0),[u,T]=i.useState("");return i.useEffect(()=>{(async()=>{try{const h=await S();a(h)}catch{r({variant:"destructive",title:"Error",description:"Failed to fetch admins"})}finally{d(!1)}})()},[r]),n.filter(s=>s.name.toLowerCase().includes(u.toLowerCase())||s.email.toLowerCase().includes(u.toLowerCase())),e.jsxs("div",{className:"space-y-6",children:[e.jsx("div",{className:"flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",children:e.jsxs("div",{children:[e.jsxs("h2",{className:"text-2xl font-bold text-foreground",children:["Welcome back, ",(x=t==null?void 0:t.name)==null?void 0:x.split(" ")[0],"!"]}),e.jsx("p",{className:"text-muted-foreground",children:"Here's what's happening with your platform today."})]})}),e.jsxs("div",{className:"grid gap-4 sm:grid-cols-2 lg:grid-cols-4",children:[e.jsx(o,{title:"Total Users",value:l(c.totalUsers),icon:C,variant:"users",trend:{value:12.5,isPositive:!0}}),e.jsx(o,{title:"Total Admins",value:l(c.totalAdmins),icon:I,variant:"admins",trend:{value:4.2,isPositive:!0}}),e.jsx(o,{title:"Active Courses",value:l(c.activeCourses),icon:E,variant:"courses",trend:{value:8.1,isPositive:!0}}),e.jsx(o,{title:"Revenue",value:U(c.revenue),icon:N,variant:"revenue",trend:{value:15.3,isPositive:!0}})]}),e.jsxs(m,{children:[e.jsxs(w,{children:[e.jsx(k,{className:"text-lg",children:"Modules"}),e.jsx(A,{children:"Manage master data, reports, and configurations"})]}),e.jsx(b,{children:e.jsx("div",{className:`\r
        grid \r
        gap-6 \r
        grid-cols-1\r
        sm:grid-cols-2\r
        md:grid-cols-3\r
        lg:grid-cols-4\r
        xl:grid-cols-6\r
      `,children:L.map(s=>e.jsx(M,{title:s.title,path:s.path,icon:s.icon},s.title))})})]})]})};export{_ as default};

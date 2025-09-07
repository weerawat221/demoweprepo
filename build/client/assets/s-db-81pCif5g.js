import{w as e,p as t}from"./chunk-PVWAREVJ-BKTQPsXo.js";import{N as o,m as a}from"./Nav-CpNU6Ajp.js";import{C as s}from"./CodeBlock-BN9FJjQ-.js";import{F as r}from"./Footer-DS8jGZNM.js";function x({}){return[{title:"Database"},{name:"description",content:"Database connection example."}]}const n=`import mysql from 'mysql2/promise';

// Connection Pool
const pool = mysql.createPool({
    host: 'localhost',
    port: '', // xampp port
    user: 'root',
    password: '',
    database: '', // database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;`,d=e(function(){return t.jsxs("div",{className:"min-h-screen bg-gray-900 text-white p-8 font-sans",children:[t.jsx(o,{}),t.jsxs("div",{className:"container mx-auto max-w-4xl pt-20",children:[t.jsx("h1",{className:"text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text",children:"การเชื่อมต่อฐานข้อมูล"}),t.jsx("p",{className:"text-center text-gray-400 mb-10 text-lg",children:"ตัวอย่างโค้ดสำหรับสร้าง Connection Pool ไปยังฐานข้อมูล MySQL ด้วย Node.js และไลบรารี mysql2"}),t.jsxs(a.div,{className:"p-6 rounded-xl border-t-4 border-b-4 border-purple-500",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},children:[t.jsx("h2",{className:"text-2xl font-bold mb-4 text-white",children:"db.js (หรือ db.ts)"}),t.jsx("p",{className:"text-gray-400 mb-4",children:"ไฟล์นี้จะทำหน้าที่เป็นโมดูลสำหรับจัดการการเชื่อมต่อฐานข้อมูล เพื่อให้สามารถเรียกใช้งานได้จากส่วนอื่น ๆ ของแอปพลิเคชันได้อย่างสะดวก"}),t.jsx(s,{code:n,language:"javascript"})]}),t.jsx(r,{})]})]})});export{d as default,x as meta};

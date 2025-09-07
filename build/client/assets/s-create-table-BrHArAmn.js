import{w as t,p as e}from"./chunk-PVWAREVJ-BKTQPsXo.js";import{N as s,m as a}from"./Nav-CpNU6Ajp.js";import{C as i}from"./CodeBlock-BN9FJjQ-.js";import{F as o}from"./Footer-DS8jGZNM.js";function x({}){return[{title:"Create Tables"},{name:"description",content:"SQL code to create 'positions' and 'teachers' tables."}]}const n=`CREATE TABLE positions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE teachers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    telephone VARCHAR(12),
    img VARCHAR(255),
    position_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_teacher_position FOREIGN KEY (position_id)
    REFERENCES positions(id) ON DELETE SET NULL ON UPDATE CASCADE
);`,m=t(function(){return e.jsxs("div",{className:"min-h-screen bg-gray-900 text-white p-8 font-sans",children:[e.jsx(s,{}),e.jsxs("div",{className:"container mx-auto max-w-4xl pt-20",children:[e.jsx("h1",{className:"text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text",children:"สร้างตาราง"}),e.jsxs("p",{className:"text-center text-gray-400 mb-10 text-lg",children:["คำสั่ง SQL สำหรับการสร้างตาราง"," ",e.jsx("code",{className:"text-sm font-mono text-pink-400",children:"positions"})," และ"," ",e.jsx("code",{className:"text-sm font-mono text-pink-400",children:"teachers"})," ","ที่จำเป็นสำหรับแอปพลิเคชัน"]}),e.jsxs(a.div,{className:"p-6 rounded-xl border-t-4 border-b-4 border-purple-500",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},children:[e.jsx("h2",{className:"text-2xl font-bold mb-4 text-white",children:"คำสั่ง SQL"}),e.jsx("p",{className:"text-gray-400 mb-4",children:"โค้ดนี้สร้างสองตาราง:"}),e.jsxs("ul",{className:"text-gray-400 mb-6 space-y-2 list-disc list-inside",children:[e.jsxs("li",{children:[e.jsx("b",{className:"text-pink-400",children:"ตาราง positions"}),": ใช้เก็บข้อมูลตำแหน่งงาน เช่น ครูใหญ่, หัวหน้าแผนก"]}),e.jsxs("li",{children:[e.jsx("b",{className:"text-pink-400",children:"ตาราง teachers"}),": ใช้เก็บข้อมูลคุณครู แต่ละคนจะเชื่อมโยงกับตำแหน่งงานในตาราง"," ",e.jsx("code",{className:"text-sm font-mono text-pink-400",children:"positions"})," ","ผ่าน"," ",e.jsx("code",{className:"text-sm font-mono text-yellow-300",children:"position_id"})]})]}),e.jsx(i,{code:n,language:"sql"})]}),e.jsx(o,{})]})]})});export{m as default,x as meta};

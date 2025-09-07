import{w as e,p as t}from"./chunk-PVWAREVJ-BKTQPsXo.js";import{N as s,m as o}from"./Nav-CpNU6Ajp.js";import{C as a}from"./CodeBlock-BN9FJjQ-.js";import{F as n}from"./Footer-DS8jGZNM.js";function d({}){return[{title:"Insert Demo Data"},{name:"description",content:"SQL code to insert demo data for 'positions' and 'teachers' tables."}]}const r=`/* Demo Data for 'positions' table */
INSERT INTO positions (name) VALUES
('ครูใหญ่'),
('รองครูใหญ่'),
('หัวหน้าฝ่ายวิชาการ'),
('หัวหน้าฝ่ายปกครอง'),
('ครูประจำชั้น'),
('ครูสอนภาษา');

/* Demo Data for 'teachers' table */
INSERT INTO teachers (name, address, telephone, position_id) VALUES
('นายสมชาย ใจดี', '123 ถนนสุขุมวิท กรุงเทพฯ', '081-123-4567', 1),
('นางสาวสุภาภรณ์ รักเรียน', '456 ถนนพหลโยธิน กรุงเทพฯ', '082-234-5678', 2),
('นายวิชาญ ช่างสอน', '789 ถนนลาดพร้าว กรุงเทพฯ', '083-345-6789', 3),
('นางสาวลัดดาวัลย์ สุขเกษม', '101 ถนนพระราม 9 กรุงเทพฯ', '084-456-7890', 4),
('นายประเสริฐ ศรีสุข', '202 ถนนสาทร กรุงเทพฯ', '085-567-8901', 5),
('นางสาวศิริพร งามสง่า', '303 ถนนสุขุมวิท กรุงเทพฯ', '086-678-9012', 5),
('นายเอกชัย ฉลาดคิด', '404 ถนนรัชดาภิเษก กรุงเทพฯ', '087-789-0123', 5),
('นางสาวกมลรัตน์ เก่งกาจ', '505 ถนนรามอินทรา กรุงเทพฯ', '088-890-1234', 6),
('นายธนวัฒน์ พลเยี่ยม', '606 ถนนเพชรบุรี กรุงเทพฯ', '089-901-2345', 5),
('นางปรีดา พัฒนา', '707 ถนนวิภาวดีรังสิต กรุงเทพฯ', '090-012-3456', 5);`,p=e(function(){return t.jsxs("div",{className:"min-h-screen bg-gray-900 text-white p-8 font-sans",children:[t.jsx(s,{}),t.jsxs("div",{className:"container mx-auto max-w-4xl pt-20",children:[t.jsx("h1",{className:"text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text",children:"แทรกข้อมูลตัวอย่าง"}),t.jsxs("p",{className:"text-center text-gray-400 mb-10 text-lg",children:["คำสั่ง SQL สำหรับการแทรกข้อมูล (insert data) จำนวน 6 รายการสำหรับตาราง"," ",t.jsx("code",{className:"text-sm font-mono text-pink-400",children:"positions"})," และ 10 รายการสำหรับตาราง"," ",t.jsx("code",{className:"text-sm font-mono text-pink-400",children:"teachers"})]}),t.jsxs(o.div,{className:"p-6 rounded-xl border-t-4 border-b-4 border-purple-500",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},children:[t.jsx("h2",{className:"text-2xl font-bold mb-4 text-white",children:"คำสั่ง SQL"}),t.jsxs("p",{className:"text-gray-400 mb-4",children:["คำสั่ง"," ",t.jsx("code",{className:"text-sm font-mono text-yellow-300",children:"INSERT INTO"})," ","นี้จะเพิ่มข้อมูลเริ่มต้นลงในฐานข้อมูล ทำให้สามารถทดสอบฟังก์ชันต่างๆ ของแอปพลิเคชันได้ทันที"]}),t.jsx(a,{code:r,language:"sql"})]}),t.jsx(n,{})]})]})});export{p as default,d as meta};

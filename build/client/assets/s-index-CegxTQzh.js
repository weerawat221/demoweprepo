import{w as e,p as t}from"./chunk-PVWAREVJ-BKTQPsXo.js";import{N as r,m as s}from"./Nav-CpNU6Ajp.js";import{C as o}from"./CodeBlock-BN9FJjQ-.js";import{F as a}from"./Footer-DS8jGZNM.js";function u({}){return[{title:"Main Router"},{name:"description",content:"Main Express router setup."}]}const i=`import express from 'express';
import positionRoutes from './positionRoutes.js';
import teacherRoutes from './teacherRoutes.js';

const router = express.Router();

// Main routes
router.use('/positions', positionRoutes);
router.use('/teachers', teacherRoutes);

export default router;`,l=e(function(){return t.jsxs("div",{className:"min-h-screen bg-gray-900 text-white p-8 font-sans",children:[t.jsx(r,{}),t.jsxs("div",{className:"container mx-auto max-w-4xl pt-20",children:[t.jsx("h1",{className:"text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text",children:"การจัดการเราเตอร์หลัก"}),t.jsx("p",{className:"text-center text-gray-400 mb-10 text-lg",children:"ตัวอย่างโค้ดสำหรับสร้างเราเตอร์หลักใน Express.js เพื่อแยกการจัดการเส้นทางตามแต่ละส่วนของแอปพลิเคชัน"}),t.jsxs(s.div,{className:"p-6 rounded-xl border-t-4 border-b-4 border-purple-500",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},children:[t.jsx("h2",{className:"text-2xl font-bold mb-4 text-white",children:"index.js (หรือ index.ts)"}),t.jsx("p",{className:"text-gray-400 mb-4",children:"โค้ดนี้จะช่วยให้คุณสามารถเพิ่มเส้นทางใหม่ ๆ ได้อย่างง่ายดายและเป็นระบบมากขึ้น"}),t.jsx(o,{code:i,language:"javascript"})]}),t.jsx(a,{})]})]})});export{l as default,u as meta};

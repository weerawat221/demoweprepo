import{w as e,p as t}from"./chunk-PVWAREVJ-BKTQPsXo.js";import{N as o,m as s}from"./Nav-CpNU6Ajp.js";import{C as r}from"./CodeBlock-BN9FJjQ-.js";import{F as i}from"./Footer-DS8jGZNM.js";function c({}){return[{title:"Position Routes"},{name:"description",content:"Express.js routes for positions."}]}const n=`import express from 'express';
import {
    getPositions,
    createPosition,
    updatePosition,
    deletePosition
} from '../controllers/positionController.js';

const router = express.Router();

router.get('/', getPositions);
router.post('/', createPosition);
router.put('/:id', updatePosition);
router.delete('/:id', deletePosition);

export default router;`,d=e(function(){return t.jsxs("div",{className:"min-h-screen bg-gray-900 text-white p-8 font-sans",children:[t.jsx(o,{}),t.jsxs("div",{className:"container mx-auto max-w-4xl pt-20",children:[t.jsx("h1",{className:"text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text",children:"การจัดการเส้นทาง (Routes)"}),t.jsxs("p",{className:"text-center text-gray-400 mb-10 text-lg",children:["โค้ดสำหรับไฟล์"," ",t.jsx("code",{className:"text-sm font-mono text-pink-400",children:"positionRoutes.js"})," ","ที่ใช้กำหนดเส้นทาง API สำหรับการจัดการข้อมูลตำแหน่ง"]}),t.jsxs(s.div,{className:"p-6 rounded-xl border-t-4 border-b-4 border-purple-500",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},children:[t.jsx("h2",{className:"text-2xl font-bold mb-4 text-white",children:"ตำแหน่งของไฟล์"}),t.jsxs("p",{className:"text-gray-400 mb-4",children:["ไฟล์นี้จะอยู่ในโฟลเดอร์"," ",t.jsx("code",{className:"text-sm font-mono text-yellow-300",children:"routes/"})," ","และจะถูกเรียกใช้ในเราเตอร์หลักของแอปพลิเคชัน"]}),t.jsx(r,{code:n,language:"javascript"})]}),t.jsx(i,{})]})]})});export{d as default,c as meta};

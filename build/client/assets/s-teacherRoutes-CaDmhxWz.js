import{w as t,p as e}from"./chunk-PVWAREVJ-BKTQPsXo.js";import{N as r,m as o}from"./Nav-CpNU6Ajp.js";import{C as s}from"./CodeBlock-BN9FJjQ-.js";import{F as a}from"./Footer-DS8jGZNM.js";function p({}){return[{title:"Teacher Routes"},{name:"description",content:"Express.js routes for teachers, including file uploads."}]}const l=`// teacherRoutes.js
import express from 'express';
import {
    getTeachers,
    createTeacher,
    updateTeacher,
    deleteTeacher
} from '../controllers/teacherController.js';
import { upload } from '../middleware/upload.js'; // สมมติว่าไฟล์นี้มี multer middleware ที่ถูกต้อง

const router = express.Router();

router.get('/', getTeachers);
router.post('/', upload.single('img'), createTeacher);
router.put('/:id', upload.single('img'), updateTeacher);
router.delete('/:id', deleteTeacher);

export default router;`,x=t(function(){return e.jsxs("div",{className:"min-h-screen bg-gray-900 text-white p-8 font-sans",children:[e.jsx(r,{}),e.jsxs("div",{className:"container mx-auto max-w-4xl pt-20",children:[e.jsx("h1",{className:"text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text",children:"การจัดการเส้นทาง (Routes) สำหรับครู"}),e.jsxs("p",{className:"text-center text-gray-400 mb-10 text-lg",children:["โค้ดสำหรับไฟล์"," ",e.jsx("code",{className:"text-sm font-mono text-pink-400",children:"teacherRoutes.js"})," ","ที่ใช้กำหนดเส้นทาง API สำหรับการจัดการข้อมูลครู"]}),e.jsxs(o.div,{className:"p-6 rounded-xl border-t-4 border-b-4 border-purple-500",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},children:[e.jsx("h2",{className:"text-2xl font-bold mb-4 text-white",children:"การรวม Middleware"}),e.jsxs("p",{className:"text-gray-400 mb-4",children:["ไฟล์นี้จะใช้"," ",e.jsx("code",{className:"text-sm font-mono text-yellow-300",children:"upload.single('img')"})," ","เป็น middleware เพื่อจัดการไฟล์รูปภาพที่อัปโหลดก่อนจะส่งต่อไปยัง controller"]}),e.jsx(s,{code:l,language:"javascript"})]}),e.jsx(a,{})]})]})});export{x as default,p as meta};

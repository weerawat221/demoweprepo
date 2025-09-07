import{w as t,p as e}from"./chunk-PVWAREVJ-BKTQPsXo.js";import{N as r,m as s}from"./Nav-CpNU6Ajp.js";import{C as a}from"./CodeBlock-BN9FJjQ-.js";import{F as o}from"./Footer-DS8jGZNM.js";function h({}){return[{title:"Teacher Controller"},{name:"description",content:"CRUD operations for the teachers table, including file uploads."}]}const i=`// teacherController.js
import pool from '../db.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// GET all teachers
export const getTeachers = async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT * FROM teachers');
        res.json({ success: true, data: rows });
    } catch (err) {
        next(err);
    }
};

// CREATE teacher
export const createTeacher = async (req, res, next) => {
    try {
        const { name, address, telephone, position_id } = req.body;
        // แก้ไข: เก็บ Path เป็น /uploads/filename.jpg
        const img = req.file ? \`/uploads/\${req.file.filename}\` : null;

        if (!name || !address || !telephone || !position_id) {
            throw { status: 400, message: 'Name, address, telephone, and position_id are required' };
        }

        const [result] = await pool.query(
            'INSERT INTO teachers (name, address, telephone, position_id, img) VALUES (?, ?, ?, ?, ?)',
            [name, address, telephone, position_id, img]
        );
        res.json({ success: true, id: result.insertId });
    } catch (err) {
        next(err);
    }
};

// UPDATE teacher
export const updateTeacher = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, address, telephone, position_id } = req.body;
        // แก้ไข: เก็บ Path เป็น /uploads/filename.jpg
        const newImgPath = req.file ? \`/uploads/\${req.file.filename}\` : null;

        const [rows] = await pool.query('SELECT img FROM teachers WHERE id = ?', [id]);
        const oldImgPath = rows.length > 0 ? rows[0].img : null;
        
        let query;
        let params;

        if (newImgPath) {
            query = 'UPDATE teachers SET name=?, address=?, telephone=?, position_id=?, img=? WHERE id=?';
            params = [name, address, telephone, position_id, newImgPath, id];
        } else {
            query = 'UPDATE teachers SET name=?, address=?, telephone=?, position_id=? WHERE id=?';
            params = [name, address, telephone, position_id, id];
        }

        await pool.query(query, params);

        if (newImgPath && oldImgPath && oldImgPath !== '/uploads/default.svg') {
            // แก้ไข: ปรับเส้นทางลบไฟล์ให้ชี้ไปที่โฟลเดอร์ uploads ของ backend
            const oldServerFilePath = path.join(__dirname, '..', oldImgPath);
            try {
                await fs.access(oldServerFilePath);
                await fs.unlink(oldServerFilePath);
                console.log(\`Successfully deleted old image file: \${oldServerFilePath}\`);
            } catch (fileErr) {
                console.error(\`Error deleting old image file (might not exist): \${oldServerFilePath}\`, fileErr);
            }
        }

        res.json({ success: true, message: 'Updated successfully' });
    } catch (err) {
        next(err);
    }
};

// DELETE teacher
export const deleteTeacher = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [rows] = await pool.query('SELECT img FROM teachers WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Teacher not found' });
        }
        
        const imgPath = rows[0].img;

        await pool.query('DELETE FROM teachers WHERE id = ?', [id]);

        // แก้ไข: ปรับเส้นทางลบไฟล์ให้ชี้ไปที่โฟลเดอร์ uploads ของ backend
        if (imgPath && imgPath !== '/uploads/default.svg') {
            const serverFilePath = path.join(__dirname, '..', imgPath);
            
            try {
                await fs.access(serverFilePath);
                await fs.unlink(serverFilePath);
                console.log(\`Successfully deleted image file: \${serverFilePath}\`);
            } catch (fileErr) {
                console.error(\`Error deleting image file (might not exist): \${serverFilePath}\`, fileErr);
            }
        }

        res.json({ success: true, message: 'Teacher and associated image deleted successfully' });
    } catch (err) {
        console.error('Error during teacher deletion:', err);
        next(err);
    }
};`,p=t(function(){return e.jsxs("div",{className:"min-h-screen bg-gray-900 text-white p-8 font-sans",children:[e.jsx(r,{}),e.jsxs("div",{className:"container mx-auto max-w-4xl pt-20",children:[e.jsx("h1",{className:"text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text",children:"Teacher Controller"}),e.jsxs("p",{className:"text-center text-gray-400 mb-10 text-lg",children:["ตัวอย่างโค้ดสำหรับสร้าง"," ",e.jsx("code",{className:"text-sm font-mono text-pink-400",children:"Controller"})," ","เพื่อจัดการข้อมูลครู (teachers) ซึ่งมีการจัดการรูปภาพประกอบด้วย"]}),e.jsxs(s.div,{className:"p-6 rounded-xl border-t-4 border-b-4 border-purple-500",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},children:[e.jsx("h2",{className:"text-2xl font-bold mb-4 text-white",children:"โครงสร้างและ Logic"}),e.jsxs("p",{className:"text-gray-400 mb-4",children:["ไฟล์นี้ประกอบด้วยฟังก์ชันสำหรับดำเนินการ CRUD (Create, Read, Update, Delete) กับตาราง"," ",e.jsx("code",{className:"text-sm font-mono text-yellow-300",children:"teachers"})," ","และยังรวมถึงการจัดการไฟล์รูปภาพที่อัปโหลด"]}),e.jsx(a,{code:i,language:"javascript"})]}),e.jsx(o,{})]})]})});export{p as default,h as meta};

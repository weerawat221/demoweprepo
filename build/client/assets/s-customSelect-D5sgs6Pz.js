import{w as t,p as e}from"./chunk-PVWAREVJ-BKTQPsXo.js";import{N as o,m as n}from"./Nav-CpNU6Ajp.js";import{C as s}from"./CodeBlock-BN9FJjQ-.js";import{F as i}from"./Footer-DS8jGZNM.js";function p({}){return[{title:"Code: CustomSelect"},{name:"description",content:"Complete source code for CustomSelect.tsx"}]}const a=`
// CustomSelect.tsx

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Interface กำหนดโครงสร้างของข้อมูลแต่ละตัวเลือก
interface Option {
  id: number;
  name: string;
}

// Interface กำหนด Props ที่ Component นี้จะรับเข้ามา
interface CustomSelectProps {
  options: Option[];         // รายการตัวเลือกทั้งหมด
  value: number;             // ค่า (id) ของตัวเลือกที่ถูกเลือกอยู่
  onChange: (value: number) => void; // ฟังก์ชันที่จะทำงานเมื่อมีการเลือก option ใหม่
  placeholder: string;       // ข้อความที่จะแสดงเมื่อยังไม่มีการเลือก
}

// --- Animation Variants ---

// Animation สำหรับกล่องรายการตัวเลือก (ul)
const listVariants = {
  hidden: { opacity: 0, height: 0 }, // สถานะเริ่มต้น: ซ่อนและไม่มีความสูง
  visible: { 
    opacity: 1, 
    height: 'auto', // สถานะแสดงผล: แสดงและปรับความสูงอัตโนมัติ
    transition: {
      when: "beforeChildren",      // ให้ animation ของแม่เสร็จก่อน
      staggerChildren: 0.05,     // ให้ animation ของลูกๆ (li) ทยอยแสดงผลห่างกัน 0.05 วินาที
    }
  },
  exit: { opacity: 0, height: 0 }, // สถานะตอนหายไป: ซ่อนและไม่มีความสูง
};

// Animation สำหรับแต่ละรายการ (li)
const itemVariants = {
  hidden: { opacity: 0, y: 10 }, // สถานะเริ่มต้น: ซ่อนและอยู่ต่ำกว่าตำแหน่งจริง 10px (เพื่อสไลด์ขึ้น)
  visible: { opacity: 1, y: 0 }, // สถานะแสดงผล: แสดงผลที่ตำแหน่งจริง
};


export default function CustomSelect({ options, value, onChange, placeholder }: CustomSelectProps) {
  // State สำหรับตรวจสอบว่ากล่องตัวเลือกกำลังเปิดอยู่หรือไม่
  const [isOpen, setIsOpen] = useState(false);
  
  // ค้นหาข้อมูลของ option ที่ถูกเลือกจาก id ที่รับมาใน value
  const selectedOption = options.find(opt => opt.id === value);

  // ฟังก์ชันที่จะทำงานเมื่อคลิกเลือก option
  const handleSelect = (optionId: number) => {
    onChange(optionId); // เรียกฟังก์ชัน onChange ที่ส่งมาจาก Parent พร้อมกับ id ของ option ใหม่
    setIsOpen(false);   // ปิดกล่องตัวเลือก
  };

  return (
    <div className="relative w-full">
      {/* ปุ่มหลักที่ใช้แสดงค่าที่เลือกและใช้เปิด/ปิดกล่องตัวเลือก */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left bg-gray-800/50 border border-gray-700 rounded-md flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-cyan-500"
      >
        <span className={selectedOption ? 'text-white' : 'text-gray-400'}>
          {selectedOption ? selectedOption.name : placeholder}
        </span>
        {/* ไอคอนลูกศรที่หมุนตามสถานะ isOpen */}
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
        </motion.span>
      </button>

      {/* AnimatePresence ใช้เพื่อจัดการ animation ตอนที่ component หายไป */}
      <AnimatePresence>
        {isOpen && (
          // กล่องรายการตัวเลือก (ul)
          <motion.ul
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            // CSS Classes: ทำให้เปิดขึ้นด้านบน (bottom-full mb-2), มี scrollbar เมื่อข้อมูลเยอะ (max-h-60 overflow-y-auto)
            className="absolute z-10 w-full bottom-full mb-2 bg-slate-800 border border-slate-700 rounded-md shadow-lg overflow-hidden max-h-60 overflow-y-auto"
          >
            {/* วนลูปแสดงรายการตัวเลือกแต่ละอัน */}
            {options.map(option => (
              <motion.li
                key={option.id}
                variants={itemVariants}
                onClick={() => handleSelect(option.id)}
                className="px-4 py-2 text-white hover:bg-cyan-600/50 cursor-pointer"
                whileHover={{ x: 5 }} // เพิ่ม animation ตอน hover
              >
                {option.name}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
`,x=t(function(){return e.jsxs("div",{className:"min-h-screen bg-gray-900 text-white p-8 font-sans",children:[e.jsx(o,{}),e.jsxs("div",{className:"container mx-auto max-w-4xl pt-20",children:[e.jsx("h1",{className:"text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-teal-400 via-cyan-500 to-sky-600 text-transparent bg-clip-text",children:"CustomSelect.tsx"}),e.jsxs("p",{className:"text-center text-gray-400 mb-10 text-lg",children:["Component ที่สร้างขึ้นมาเพื่อทดแทน"," ",e.jsx("code",{className:"text-sm font-mono text-pink-400",children:"<select>"})," ","แบบดั้งเดิม ทำให้สามารถปรับแต่ง Style และเพิ่ม Animation ได้อย่างเต็มที่"]}),e.jsxs(n.div,{className:"p-6 rounded-xl border-t-4 border-b-4 border-cyan-500",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},children:[e.jsx("h2",{className:"text-2xl font-bold mb-4 text-white",children:"ฟีเจอร์และส่วนประกอบหลัก"}),e.jsx("p",{className:"text-gray-400 mb-4",children:"โค้ดนี้ถูกออกแบบมาให้เป็น Component ที่นำกลับมาใช้ใหม่ได้ (Reusable) โดยรับค่าต่างๆ ผ่าน Props ทำให้มีความยืดหยุ่นสูง"}),e.jsxs("ul",{className:"text-gray-400 mb-6 space-y-2 list-disc list-inside",children:[e.jsxs("li",{children:[e.jsx("strong",{className:"text-white",children:"Fully Customizable:"})," สร้างจาก"," ",e.jsx("code",{className:"text-sm font-mono text-yellow-300",children:"div"})," ","และ"," ",e.jsx("code",{className:"text-sm font-mono text-yellow-300",children:"button"})," ","ทำให้สามารถใช้ Tailwind CSS ปรับแต่งหน้าตาได้ทุกส่วน"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-white",children:"Staggered Animation:"})," ","รายการตัวเลือกจะทยอยปรากฏขึ้นทีละรายการอย่างสวยงามโดยใช้"," ",e.jsx("code",{className:"text-sm font-mono text-pink-400",children:"staggerChildren"})]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-white",children:"Upward Opening:"})," ","ถูกตั้งค่าให้เปิดรายการขึ้นด้านบน (",e.jsx("code",{className:"text-sm font-mono text-yellow-300",children:"bottom-full"}),") เพื่อป้องกันไม่ให้รายการล้นออกนอกหน้าจอ Modal"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-white",children:"Auto Scrollbar:"})," ","เมื่อมีข้อมูลจำนวนมาก จะมีแถบเลื่อน (Scrollbar) ปรากฏขึ้นโดยอัตโนมัติ (",e.jsx("code",{className:"text-sm font-mono text-yellow-300",children:"max-h-60 overflow-y-auto"}),")"]})]}),e.jsx(s,{code:a,language:"tsx"})]}),e.jsx(i,{})]})]})});export{x as default,p as meta};

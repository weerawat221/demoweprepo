import React from 'react';
import { motion } from 'framer-motion';
import Nav from '~/components/Nav';
import CodeBlock from '~/components/CodeBlock';

// ข้อมูลสำหรับขั้นตอนการติดตั้งและลิงก์
const installSteps = [
    {
        name: 'Step 1: สร้างโครงสร้าง Server',
        description: 'เริ่มต้นด้วยการสร้างไฟล์ package.json เพื่อจัดการ Dependencies ของโปรเจกต์',
        code: `npm init -y`,
    },
    {
        name: 'Step 2: ติดตั้ง Dependencies',
        description: 'ติดตั้งไลบรารีที่จำเป็นสำหรับ Express.js backend และ nodemon สำหรับการรีสตาร์ทเซิร์ฟเวอร์อัตโนมัติ',
        code: `npm install express cors mysql2 multer morgan dotenv\nnpm install --save-dev nodemon`,
    },
    {
        name: 'สำหรับการติดตั้ง React-Router v7',
        description: 'มี 2 แบบสำหรับการติดตั้ง React-Router v7',
        options: [
            {
                type: 'แบบที่ 1: ติดตั้งผ่าน Vite',
                code: `npm create vite@latest`,
                link: 'https://vitejs.dev/guide/',
                note: 'รายละเอียดเพิ่มเติม',
            },
            {
                type: 'แบบที่ 2: ติดตั้งผ่าน React-Router',
                code: `npx create-react-router@latest`,
                link: 'https://reactrouter.com/start/framework/installation',
                note: 'รายละเอียดเพิ่มเติม',
            },
        ],
        note: 'หมายเหตุ: การติดตั้งผ่าน Framework ทั้ง 2 แบบนี้มีการติดตั้ง Tailwind CSS มาให้เลย',
    },
    {
        name: 'สำหรับการติดตั้ง Tailwind CSS',
        description: 'หากไม่ได้ติดตั้งผ่าน Framework ในขั้นตอนก่อนหน้า คุณสามารถติดตั้ง Tailwind CSS แยกได้',
        code: `npm install tailwindcss @tailwindcss/vite`,
        link: 'https://tailwindcss.com/docs/installation/framework-guides/react',
    },
    {
        name: 'สำหรับการติดตั้ง Framer-Motion',
        description: 'ติดตั้ง Framer-Motion สำหรับการสร้างแอนิเมชันที่สวยงามและใช้งานง่าย',
        code: `npm install framer-motion`,
        link: 'https://www.framer.com/motion/tutorials/getting-started/',
    },
];

export default function InstallPage() {
    return (
        <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
            <Nav />
            <div className="container mx-auto max-w-4xl pt-20">
                <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
                    คำแนะนำการติดตั้ง
                </h1>
                <p className="text-center text-gray-400 mb-10 text-lg">
                    ขั้นตอนและคำสั่งที่จำเป็นสำหรับการติดตั้งเครื่องมือและไลบรารีต่างๆ
                    ในโปรเจกต์
                </p>
                <div className="grid gap-8">
                    {installSteps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="p-6 rounded-xl border-t-4 border-b-4 border-purple-500"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <h2 className="text-2xl font-bold mb-4 text-white">{step.name}</h2>
                            <p className="text-gray-400 mb-4">{step.description}</p>

                            {step.options ? (
                                <div className="space-y-4">
                                    {step.options.map((option, idx) => (
                                        <div key={idx} className="bg-gray-800 p-4 rounded-lg">
                                            <p className="text-sm text-gray-300 font-bold mb-2">{option.type}</p>
                                            <CodeBlock code={option.code} language="cmd" />
                                            <div className="mt-2 text-right">
                                                <a href={option.link} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline text-sm font-light">
                                                    {option.note}
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                    {step.note && (
                                        <p className="text-yellow-400 font-medium text-sm mt-4">{step.note}</p>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <CodeBlock code={step.code} language="cmd" />
                                    {step.link && (
                                        <div className="mt-4 text-right">
                                            <a href={step.link} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline text-sm font-light">
                                                รายละเอียดเพิ่มเติม
                                            </a>
                                        </div>
                                    )}
                                </>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
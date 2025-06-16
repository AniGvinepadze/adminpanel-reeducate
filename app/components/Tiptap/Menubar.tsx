// // components/MenuBar.tsx
// import React from 'react'
// import { useCurrentEditor } from '@tiptap/react'

// const MenuBar: React.FC = () => {
//   const { editor } = useCurrentEditor()

//   if (!editor) {
//     return null
//   }

//   return (
//     <div className="flex flex-wrap gap-2 mb-4">
//       <button
//         onClick={() => editor.chain().focus().toggleBold().run()}
//         disabled={!editor.can().chain().focus().toggleBold().run()}
//         className={`px-4 py-2 border rounded ${editor.isActive('bold') ? 'bg-blue-500 text-white' : 'bg-white'}`}
//       >
//         Bold
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleItalic().run()}
//         disabled={!editor.can().chain().focus().toggleItalic().run()}
//         className={`px-4 py-2 border rounded ${editor.isActive('italic') ? 'bg-blue-500 text-white' : 'bg-white'}`}
//       >
//         Italic
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleStrike().run()}
//         disabled={!editor.can().chain().focus().toggleStrike().run()}
//         className={`px-4 py-2 border rounded ${editor.isActive('strike') ? 'bg-blue-500 text-white' : 'bg-white'}`}
//       >
//         Strike
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleCode().run()}
//         disabled={!editor.can().chain().focus().toggleCode().run()}
//         className={`px-4 py-2 border rounded ${editor.isActive('code') ? 'bg-blue-500 text-white' : 'bg-white'}`}
//       >
//         Code
//       </button>
//       <button onClick={() => editor.chain().focus().unsetAllMarks().run()} className="px-4 py-2 border rounded bg-white">
//         Clear marks
//       </button>
//       <button onClick={() => editor.chain().focus().clearNodes().run()} className="px-4 py-2 border rounded bg-white">
//         Clear nodes
//       </button>
//       <button
//         onClick={() => editor.chain().focus().setParagraph().run()}
//         className={`px-4 py-2 border rounded ${editor.isActive('paragraph') ? 'bg-blue-500 text-white' : 'bg-white'}`}
//       >
//         Paragraph
//       </button>
//       <button
//           onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
//           className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
//       >
//         H1
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
//         className={`px-4 py-2 border rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-500 text-white' : 'bg-white'}`}
//       >
//         H2
//       </button>
//       <button onClick={() => editor.chain().focus().setColor('#958DF1').run()} className="px-4 py-2 border rounded bg-white">
//         Purple
//       </button>
//     </div>
//   )
// }

// export default MenuBar

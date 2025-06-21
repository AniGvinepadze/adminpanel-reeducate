"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListOl,
  FaListUl,
  FaHeading,
} from "react-icons/fa";
import { useState } from "react";
import { getCookie } from "cookies-next";
import { axiosInstance } from "@/app/lib/axiosIntance";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const TiptapComponent = ({
  initialComponent,
  onSave,
  courseId,
}: {
  initialComponent: string;
  onSave: (content: string) => void;
  courseId: string;
}) => {
  const [headingLevel, setHeadingLevel] = useState<HeadingLevel>(1);

  const editor = useEditor({
    extensions: [
      StarterKit,

      
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: initialComponent,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none min-h-[250px]",
      },
    },
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

  const saveContent = async () => {
    if (editor) {
      const updatedContent = editor.getHTML();
      try {
        const token = getCookie("accessToken") as string;
        await axiosInstance.patch(
          `/courses/${courseId}`,
          { courseDetailedSyllabus: updatedContent },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Content saved successfully!");
        onSave(updatedContent);
      } catch (error) {
        console.error("Error saving content:", error);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="w-full p-2">
          <h2>Editor</h2>
          <div className="flex space-x-2 mb-2">
            <div className="relative">
              <button
                className={`p-2`}
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .toggleHeading({ level: headingLevel })
                    .run()
                }
              >
                <FaHeading />
              </button>
              <select
                value={headingLevel}
                onChange={(e) => {
                  const level = Number(e.target.value) as HeadingLevel;
                  setHeadingLevel(level);
                  editor.chain().focus().toggleHeading({ level }).run();
                }}
                className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6].map((level) => (
                  <option key={level} value={level}>
                    H{level}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-2 ${editor.isActive("bold") ? "bg-gray-300" : ""}`}
            >
              <FaBold />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-2 ${
                editor.isActive("italic") ? "bg-gray-300" : ""
              }`}
            >
              <FaItalic />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`p-2 ${
                editor.isActive("underline") ? "bg-gray-300" : ""
              }`}
            >
              <FaUnderline />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`p-2 ${
                editor.isActive("bulletList") ? "bg-gray-300" : ""
              }`}
            >
              <FaListUl />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`p-2 ${
                editor.isActive("orderedList") ? "bg-gray-300" : ""
              }`}
            >
              <FaListOl />
            </button>

            <button
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              className={`p-2 ${
                editor.isActive("textAlign", "left") ? "bg-gray-300" : ""
              }`}
            >
              Left
            </button>
            <button
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              className={`p-2 ${
                editor.isActive("textAlign", "center") ? "bg-gray-300" : ""
              }`}
            >
              Center
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              className={`p-2 ${
                editor.isActive("textAlign", "right") ? "bg-gray-300" : ""
              }`}
            >
              Right
            </button>
            <button
              onClick={() =>
                editor.chain().focus().setTextAlign("justify").run()
              }
              className={`p-2 ${
                editor.isActive("textAlign", "justify") ? "bg-gray-300" : ""
              }`}
            >
              Justify
            </button>

            <input
              type="color"
              onChange={(e) => {
                editor
                  .chain()
                  .focus()
                  .setMark("textStyle", { color: e.target.value })
                  .run();
              }}
              className="p-2"
              title="Font Color"
            />
            <input
              type="color"
              onChange={(e) => {
                editor
                  .chain()
                  .focus()
                  .setMark("highlight", { backgroundColor: e.target.value })
                  .run();
              }}
              className="p-2"
              title="Highlight Color"
            />
          </div>
          <EditorContent editor={editor} className="border rounded-lg p-2" />
          <button
            onClick={saveContent}
            className="mt-2 p-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default TiptapComponent;

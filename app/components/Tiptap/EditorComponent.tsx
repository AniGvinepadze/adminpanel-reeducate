// import { Color } from "@tiptap/extension-color";
// import ListItem from "@tiptap/extension-list-item";
// import TextStyle from "@tiptap/extension-text-style";
// import StarterKit from "@tiptap/starter-kit";
// import { useEditor, EditorContent, EditorProvider } from "@tiptap/react";
// import MenuBar from "./Menubar";

// const extensions = [
//   Color.configure({
//     // Color doesn't require specific `types` configuration anymore
//   }),
//   TextStyle, // Use the TextStyle extension without `types`
//   ListItem, // Use the ListItem extension directly
//   StarterKit.configure({
//     bulletList: { keepMarks: true, keepAttributes: false },
//     orderedList: { keepMarks: true, keepAttributes: false },
//   }),
// ];

// const content = `
// <h2>
//   Hi there,
// </h2>
// <p>
//   This is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kinds of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
// </p>
// <ul>
//   <li>
//     That’s a bullet list with one item…
//   </li>
//   <li>
//     … or two list items.
//   </li>
// </ul>
// <p>
//   Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
// </p>
// <pre><code class="language-css">body {
//   display: none;
// }</code></pre>
// <p>
//   I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around.
// </p>
// <blockquote>
//   Wow, that’s amazing. Good work, boy! 👏
//   <br />
//   — Mom
// </blockquote>
// `;

// const EditorComponent = () => {
//   const editor = useEditor({
//     extensions,
//     content,
//   });

//   return (
//     <div>
//       <EditorProvider
//         slotBefore={<MenuBar />}
//         extensions={extensions}
//         content={content}
//       >
//         <EditorContent editor={editor} />
//       </EditorProvider>
//     </div>
//   );
// };

// export default EditorComponent;

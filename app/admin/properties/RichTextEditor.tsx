'use client'

import { useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

interface Props {
  name: string
  defaultValue?: string
}

const btn = (active: boolean) =>
  [
    'px-2.5 py-1 text-xs font-medium border transition-colors',
    active
      ? 'bg-gray-900 text-white border-gray-900'
      : 'border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900 bg-white',
  ].join(' ')

export default function RichTextEditor({ name, defaultValue = '' }: Props) {
  const [html, setHtml] = useState(defaultValue)

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit],
    content: defaultValue,
    onUpdate: ({ editor }) => setHtml(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'min-h-[160px] w-full px-3 py-2.5 text-sm text-gray-900 focus:outline-none prose-content',
      },
    },
  })

  return (
    <div className="border border-gray-300 focus-within:ring-2 focus-within:ring-gray-900 focus-within:border-gray-900 transition-shadow">
      {/* Toolbar */}
      <div className="flex items-center gap-1 border-b border-gray-200 px-2 py-1.5 bg-gray-50">
        <button type="button" onClick={() => editor?.chain().focus().toggleBold().run()}
          className={btn(!!editor?.isActive('bold'))} title="Bold">
          <strong>B</strong>
        </button>
        <button type="button" onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={btn(!!editor?.isActive('italic'))} title="Italic">
          <em>I</em>
        </button>

        <span className="w-px h-4 bg-gray-200 mx-1" />

        <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          className={btn(!!editor?.isActive('heading', { level: 2 }))} title="Heading 2">
          H2
        </button>
        <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
          className={btn(!!editor?.isActive('heading', { level: 3 }))} title="Heading 3">
          H3
        </button>

        <span className="w-px h-4 bg-gray-200 mx-1" />

        <button type="button" onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={btn(!!editor?.isActive('bulletList'))} title="Bullet list">
          • List
        </button>
        <button type="button" onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={btn(!!editor?.isActive('orderedList'))} title="Numbered list">
          1. List
        </button>
      </div>

      <EditorContent editor={editor} />
      <input type="hidden" name={name} value={html} />
    </div>
  )
}

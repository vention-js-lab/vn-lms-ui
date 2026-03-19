import { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import { Markdown } from '@tiptap/markdown';
import EditorBubbleMenu from './editor-bubble-menu';

type RichTextEditableProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  ariaInvalid?: boolean;
};

export default function RichTextEditable({ id, value, onChange, disabled = false, ariaInvalid = false }: RichTextEditableProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Markdown,
    ],
    content: value || '',
    contentType: 'markdown',
    editable: !disabled,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        id: id ?? '',
        class: `tiptap min-h-[180px] rounded-xl border bg-background px-4 py-3 text-sm outline-none ${
          ariaInvalid ? 'border-destructive' : 'border-input'
        }`,
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getMarkdown());
    },
  });

  useEffect(() => {
    if (!editor) return;

    const currentMarkdown = editor.getMarkdown();
    if (currentMarkdown !== value) {
      editor.commands.setContent(value || '', {
        contentType: 'markdown',
        emitUpdate: false,
      });
    }
  }, [editor, value]);

  if (!editor) return null;

  return (
    <div className="space-y-3">
      <EditorContent editor={editor} />
      {!disabled && <EditorBubbleMenu editor={editor} />}
    </div>
  );
}

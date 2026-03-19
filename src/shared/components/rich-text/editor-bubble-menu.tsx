import { Editor, useEditorState } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import { Bold, Code2, Heading1, Heading2, Italic, Link2, Strikethrough } from 'lucide-react';

import { Toggle } from '#/shared/components/ui/toggle';
import { Button } from '#/shared/components/ui/button';

export default function EditorBubbleMenu({ editor }: { editor: Editor }) {
  const state = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isBold: editor.isActive('bold'),
      isItalic: editor.isActive('italic'),
      isStrike: editor.isActive('strike'),
      isCode: editor.isActive('code'),
      isLink: editor.isActive('link'),
      isH1: editor.isActive('heading', { level: 1 }),
      isH2: editor.isActive('heading', { level: 2 }),
      isH3: editor.isActive('heading', { level: 3 }),
      isParagraph: editor.isActive('paragraph'),
    }),
  });

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter URL', previousUrl);

    if (url === null) return;

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const promoteHeading = () => {
    if (state.isParagraph) {
      editor.chain().focus().setHeading({ level: 1 }).run();
      return;
    }

    if (state.isH3) {
      editor.chain().focus().setHeading({ level: 2 }).run();
      return;
    }

    if (state.isH2) {
      editor.chain().focus().setHeading({ level: 1 }).run();
      return;
    }

    editor.chain().focus().setHeading({ level: 1 }).run();
  };

  const demoteHeading = () => {
    if (state.isParagraph) {
      editor.chain().focus().setHeading({ level: 3 }).run();
      return;
    }

    if (state.isH1) {
      editor.chain().focus().setHeading({ level: 2 }).run();
      return;
    }

    if (state.isH2) {
      editor.chain().focus().setHeading({ level: 3 }).run();
      return;
    }

    if (state.isH3) {
      editor.chain().focus().setParagraph().run();
    }
  };

  const baseItemClass =
    'h-7 w-7 rounded-md p-0 text-popover-foreground shadow-none transition-none hover:bg-transparent hover:text-popover-foreground focus-visible:ring-1 focus-visible:ring-ring';

  const activeItemClass = 'bg-accent text-accent-foreground shadow-sm';

  return (
    <BubbleMenu
      editor={editor}
      updateDelay={0}
      className="border-border bg-popover text-popover-foreground flex items-center gap-0.5 rounded-lg border p-1 shadow-md"
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={promoteHeading}
        className={`${baseItemClass} ${state.isH1 ? activeItemClass : ''}`}
      >
        <Heading1 className="h-3.5 w-3.5" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={demoteHeading}
        className={`${baseItemClass} ${state.isH2 || state.isH3 ? activeItemClass : ''}`}
      >
        <Heading2 className="h-3.5 w-3.5" />
      </Button>

      <Toggle
        type="button"
        size="sm"
        pressed={state.isBold}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        className={`${baseItemClass} data-[state=on]:bg-accent data-[state=on]:text-accent-foreground data-[state=on]:shadow-sm`}
      >
        <Bold className="h-3.5 w-3.5" />
      </Toggle>

      <Toggle
        type="button"
        size="sm"
        pressed={state.isItalic}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        className={`${baseItemClass} data-[state=on]:bg-accent data-[state=on]:text-accent-foreground data-[state=on]:shadow-sm`}
      >
        <Italic className="h-3.5 w-3.5" />
      </Toggle>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={setLink}
        className={`${baseItemClass} ${state.isLink ? activeItemClass : ''}`}
      >
        <Link2 className="h-3.5 w-3.5" />
      </Button>

      <Toggle
        type="button"
        size="sm"
        pressed={state.isStrike}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        className={`${baseItemClass} data-[state=on]:bg-accent data-[state=on]:text-accent-foreground data-[state=on]:shadow-sm`}
      >
        <Strikethrough className="h-3.5 w-3.5" />
      </Toggle>

      <Toggle
        type="button"
        size="sm"
        pressed={state.isCode}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
        className={`${baseItemClass} data-[state=on]:bg-accent data-[state=on]:text-accent-foreground data-[state=on]:shadow-sm`}
      >
        <Code2 className="h-3.5 w-3.5" />
      </Toggle>
    </BubbleMenu>
  );
}

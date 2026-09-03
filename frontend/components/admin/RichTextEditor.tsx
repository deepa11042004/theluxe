import React, { useRef } from "react";
import {
  Heading2,
  Heading3,
  Bold,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Minus,
  Image as ImageIcon,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  onOpenMediaPicker?: () => void;
}

export default function RichTextEditor({
  value,
  onChange,
  onOpenMediaPicker,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  const formatDoc = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      // Prevent H1 tags
      const h1s = editorRef.current.querySelectorAll("h1");
      h1s.forEach((h1) => {
        const h2 = document.createElement("h2");
        h2.innerHTML = h1.innerHTML;
        h1.parentNode?.replaceChild(h2, h1);
      });

      onChange(editorRef.current.innerHTML);
    }
  };

  const addLink = () => {
    const url = prompt("Enter link URL:");
    if (url) formatDoc("createLink", url);
  };

  return (
    <div className="border border-gray-300 rounded-xl overflow-hidden bg-white shadow-sm">
      {/* TOOLBAR */}
      <div className="bg-gray-50 border-b border-gray-200 p-2 flex flex-wrap gap-1 items-center">
        <button
          type="button"
          onClick={() => formatDoc("formatBlock", "<h2>")}
          className="p-1.5 rounded hover:bg-gray-200 text-gray-700 text-xs font-semibold flex items-center gap-1"
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" /> H2
        </button>
        <button
          type="button"
          onClick={() => formatDoc("formatBlock", "<h3>")}
          className="p-1.5 rounded hover:bg-gray-200 text-gray-700 text-xs font-semibold flex items-center gap-1"
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" /> H3
        </button>

        <div className="w-px h-5 bg-gray-300 mx-1"></div>

        <button
          type="button"
          onClick={() => formatDoc("bold")}
          className="p-1.5 rounded hover:bg-gray-200 text-gray-700"
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => formatDoc("italic")}
          className="p-1.5 rounded hover:bg-gray-200 text-gray-700"
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={addLink}
          className="p-1.5 rounded hover:bg-gray-200 text-gray-700"
          title="Insert Link"
        >
          <LinkIcon className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-gray-300 mx-1"></div>

        <button
          type="button"
          onClick={() => formatDoc("insertUnorderedList")}
          className="p-1.5 rounded hover:bg-gray-200 text-gray-700"
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => formatDoc("insertOrderedList")}
          className="p-1.5 rounded hover:bg-gray-200 text-gray-700"
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => formatDoc("formatBlock", "<blockquote>")}
          className="p-1.5 rounded hover:bg-gray-200 text-gray-700"
          title="Quote"
        >
          <Quote className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => formatDoc("insertHorizontalRule")}
          className="p-1.5 rounded hover:bg-gray-200 text-gray-700"
          title="Divider"
        >
          <Minus className="w-4 h-4" />
        </button>

        {onOpenMediaPicker && (
          <button
            type="button"
            onClick={onOpenMediaPicker}
            className="p-1.5 rounded hover:bg-gray-200 text-gray-700 ml-auto flex items-center gap-1 text-xs font-medium"
            title="Insert Image from Media Library"
          >
            <ImageIcon className="w-4 h-4 text-[#B38E46]" /> Insert Image
          </button>
        )}
      </div>

      {/* EDITABLE AREA */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        dangerouslySetInnerHTML={{ __html: value }}
        className="p-4 min-h-[300px] max-h-[600px] overflow-y-auto text-sm text-gray-800 focus:outline-none prose max-w-none"
      />
    </div>
  );
}

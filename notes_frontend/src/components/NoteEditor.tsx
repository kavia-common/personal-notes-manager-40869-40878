"use client";

import React, { useEffect, useState } from "react";
import type { Note } from "@/lib/api";

// PUBLIC_INTERFACE
export function NoteEditor(props: {
  note: Note;
  onChange: (updates: { title?: string; content?: string }) => void;
}) {
  /** Editor for the note with debounced local state updates. */
  const { note, onChange } = props;
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
  }, [note.id, note.title, note.content]); // reset when switching notes

  // simple debounced propagation
  useEffect(() => {
    const id = setTimeout(() => onChange({ title }), 250);
    return () => clearTimeout(id);
  }, [title, onChange]);

  useEffect(() => {
    const id = setTimeout(() => onChange({ content }), 300);
    return () => clearTimeout(id);
  }, [content, onChange]);

  return (
    <div className="flex flex-col gap-4">
      <input
        className="editor-title"
        value={title}
        aria-label="Note title"
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Untitled"
      />
      <div className="op-surface p-4">
        <label className="sr-only" htmlFor="content">
          Note content
        </label>
        <textarea
          id="content"
          className="editor-textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note here..."
        />
      </div>
    </div>
  );
}

export default NoteEditor;

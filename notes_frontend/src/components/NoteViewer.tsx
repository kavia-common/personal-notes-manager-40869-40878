"use client";

import React from "react";
import type { Note } from "@/lib/api";

// PUBLIC_INTERFACE
export function NoteViewer({ note }: { note: Note }) {
  /** Read-only rendering of a note. For simplicity, plain text rendering. */
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">{note.title || "Untitled"}</h2>
      <div className="op-surface p-4 whitespace-pre-wrap text-[15px] leading-7">
        {note.content || "No content"}
      </div>
    </div>
  );
}

export default NoteViewer;

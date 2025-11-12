"use client";

import React from "react";

// PUBLIC_INTERFACE
export function Toolbar(props: {
  onNewNote: () => void;
  onDelete?: () => void;
  canDelete?: boolean;
}) {
  /** Top toolbar with app title and key actions. */
  const { onNewNote, onDelete, canDelete } = props;

  return (
    <div className="op-toolbar">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            aria-hidden
            className="h-9 w-9 rounded-xl"
            style={{
              background:
                "conic-gradient(from 140deg at 50% 50%, rgba(37,99,235,0.9), rgba(245,158,11,0.9), rgba(37,99,235,0.9))",
              boxShadow: "var(--shadow-md)",
            }}
          />
          <div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--op-text)]">
              Ocean Notes
            </h1>
            <p className="text-xs text-gray-600">Personal Notes Manager</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="btn btn-primary"
            onClick={onNewNote}
            aria-label="Create new note"
          >
            <span aria-hidden>＋</span>
            <span className="hidden sm:inline">New Note</span>
          </button>
          <button
            className="btn btn-secondary"
            onClick={onDelete}
            aria-label="Delete selected note"
            disabled={!canDelete}
            style={{
              opacity: canDelete ? 1 : 0.5,
              cursor: canDelete ? "pointer" : "not-allowed",
            }}
          >
            🗑️
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Toolbar;

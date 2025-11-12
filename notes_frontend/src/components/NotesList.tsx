"use client";

import React, { useMemo, useState } from "react";
import type { Note } from "@/lib/api";

type SortKey = "updatedAt" | "title";

// PUBLIC_INTERFACE
export function NotesList(props: {
  notes: Note[];
  activeId?: string | null;
  onSelect: (id: string) => void;
}) {
  /** Sidebar notes list with search and sort. */
  const { notes, activeId, onSelect } = props;
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("updatedAt");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? notes.filter(
          (n) =>
            n.title.toLowerCase().includes(q) ||
            n.content.toLowerCase().includes(q)
        )
      : notes.slice();

    list.sort((a, b) => {
      if (sortKey === "title") {
        return a.title.localeCompare(b.title);
      }
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
    return list;
  }, [notes, query, sortKey]);

  return (
    <aside
      className="op-surface h-full flex flex-col"
      aria-label="Notes list sidebar"
    >
      <div className="p-3 border-b border-gray-100">
        <label className="sr-only" htmlFor="search">
          Search notes
        </label>
        <input
          id="search"
          className="input"
          placeholder="Search notes…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-gray-600">Showing {filtered.length}</span>
          <select
            aria-label="Sort notes"
            className="input w-auto"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
          >
            <option value="updatedAt">Recent</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>

      <div className="p-2 scroll-y" style={{ flex: 1, minHeight: 0 }}>
        {filtered.length === 0 ? (
          <div className="text-sm text-gray-600 px-2 py-3">
            No notes found. Try creating one.
          </div>
        ) : (
          <ul role="list" aria-label="Notes">
            {filtered.map((n) => (
              <li key={n.id} className="px-1">
                <button
                  onClick={() => onSelect(n.id)}
                  className={
                    "note-item w-full text-left " +
                    (n.id === activeId ? "active" : "")
                  }
                  aria-current={n.id === activeId ? "true" : undefined}
                >
                  <div className="flex-1">
                    <div className="font-semibold truncate">{n.title || "Untitled"}</div>
                    <div className="text-xs text-gray-600 truncate">
                      {new Date(n.updatedAt).toLocaleString()}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}

export default NotesList;

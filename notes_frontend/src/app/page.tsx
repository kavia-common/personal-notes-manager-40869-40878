"use client";

import React, { useEffect, useMemo, useState } from "react";
import Toolbar from "@/components/Toolbar";
import NotesList from "@/components/NotesList";
import NoteEditor from "@/components/NoteEditor";
import NoteViewer from "@/components/NoteViewer";
import { createNote, deleteNote, listNotes, updateNote, type Note } from "@/lib/api";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"edit" | "view">("edit");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await listNotes();
        if (!mounted) return;
        setNotes(data);
        if (data.length > 0) {
          setActiveId(data[0].id);
        }
      } catch {
        if (!mounted) return;
        // graceful fallback handled inside API; set generic message
        setErrorMsg("Working in local preview mode.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const activeNote = useMemo(
    () => notes.find((n) => n.id === activeId) || null,
    [notes, activeId]
  );

  async function handleCreate() {
    const created = await createNote("Untitled");
    setNotes((prev) => [created, ...prev]);
    setActiveId(created.id);
    setViewMode("edit");
  }

  async function handleDelete() {
    if (!activeId) return;
    const ok = await deleteNote(activeId);
    if (ok) {
      setNotes((prev) => prev.filter((n) => n.id !== activeId));
      setActiveId((prev) => {
        const remaining = notes.filter((n) => n.id !== prev);
        return remaining.length ? remaining[0].id : null;
      });
    }
  }

  async function handleUpdate(updates: { title?: string; content?: string }) {
    if (!activeNote) return;
    // optimistic UI
    setNotes((prev) =>
      prev.map((n) => (n.id === activeNote.id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n))
    );
    const saved = await updateNote(activeNote.id, updates);
    if (saved) {
      setNotes((prev) => prev.map((n) => (n.id === saved.id ? saved : n)));
    }
  }

  return (
    <main className="min-h-screen">
      <Toolbar onNewNote={handleCreate} onDelete={handleDelete} canDelete={Boolean(activeId)} />

      <div className="container-max px-4 sm:px-6 lg:px-8 py-6">
        {errorMsg ? (
          <div
            role="status"
            className="mb-4 rounded-lg border border-yellow-200 bg-yellow-50 text-yellow-900 px-3 py-2 text-sm"
          >
            {errorMsg}
          </div>
        ) : null}

        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "minmax(240px, 320px) 1fr",
          }}
        >
          {/* Sidebar */}
          <div className="h-[70vh]">
            <NotesList
              notes={notes}
              activeId={activeId}
              onSelect={(id) => {
                setActiveId(id);
              }}
            />
          </div>

          {/* Main content */}
          <section className="op-surface p-4 sm:p-6 h-[70vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <button
                  className={"btn " + (viewMode === "edit" ? "btn-primary" : "btn-secondary")}
                  onClick={() => setViewMode("edit")}
                  aria-pressed={viewMode === "edit"}
                >
                  Edit
                </button>
                <button
                  className={"btn " + (viewMode === "view" ? "btn-primary" : "btn-secondary")}
                  onClick={() => setViewMode("view")}
                  aria-pressed={viewMode === "view"}
                >
                  View
                </button>
              </div>
              <div className="text-xs text-gray-600">
                {activeNote ? `Updated ${new Date(activeNote.updatedAt).toLocaleString()}` : ""}
              </div>
            </div>

            <div className="scroll-y mt-4" style={{ flex: 1, minHeight: 0 }}>
              {loading ? (
                <div className="text-gray-600">Loading…</div>
              ) : !activeNote ? (
                <div className="text-gray-600">
                  No note selected. Create a new note or choose one from the sidebar.
                </div>
              ) : viewMode === "edit" ? (
                <NoteEditor note={activeNote} onChange={handleUpdate} />
              ) : (
                <NoteViewer note={activeNote} />
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

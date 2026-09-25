"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { kycIdTypeLabel, kycStatusLabel } from "@/lib/kyc";
import { createClient } from "@/lib/supabase/client";
import type { KycStatus, KycSubmission } from "@/lib/supabase/types";

type Filter = "all" | KycStatus;

const statusFilterOptions: { value: Filter; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Verified" },
  { value: "rejected", label: "Rejected" },
  { value: "all", label: "All" },
];

export default function AdminKycPage() {
  const [submissions, setSubmissions] = useState<KycSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<Filter>("pending");
  const [query, setQuery] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [noteId, setNoteId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");
  const [docUrl, setDocUrl] = useState<{ id: string; url: string } | null>(null);
  const [docLoading, setDocLoading] = useState(false);

  const load = useCallback(async function load() {
    setLoading(true);
    const supabase = createClient();
    const { data, error: loadError } = await supabase
      .from("kyc_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (loadError) setError(loadError.message);
    else {
      setSubmissions(data ?? []);
      setError("");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const counts = useMemo(
    () => ({
      pending: submissions.filter((item) => item.status === "pending").length,
      approved: submissions.filter((item) => item.status === "approved").length,
      rejected: submissions.filter((item) => item.status === "rejected").length,
    }),
    [submissions]
  );

  const filtered = submissions.filter((item) => {
    if (filter !== "all" && item.status !== filter) return false;
    const haystack =
      `${item.guest_name} ${item.guest_email} ${item.id_type} ${item.id_number}`.toLowerCase();
    return haystack.includes(query.toLowerCase());
  });

  async function review(id: string, status: Exclude<KycStatus, "pending">) {
    setBusyId(id);
    setError("");
    const response = await fetch("/api/admin/kyc", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status, reviewNote: noteId === id ? noteText : undefined }),
    });
    const payload = (await response.json()) as { error?: string };
    setBusyId(null);
    setNoteId(null);
    setNoteText("");
    if (!response.ok) {
      setError(payload.error ?? "Could not update the submission.");
      return;
    }
    await load();
  }

  async function viewDocument(submission: KycSubmission) {
    if (!submission.id_document_path) return;
    setDocLoading(true);
    setError("");
    const response = await fetch(
      `/api/admin/kyc?path=${encodeURIComponent(submission.id_document_path)}`
    );
    const payload = (await response.json()) as { signedUrl?: string; error?: string };
    setDocLoading(false);
    if (!response.ok || !payload.signedUrl) {
      setError(payload.error ?? "Could not open the document.");
      return;
    }
    setDocUrl({ id: submission.id, url: payload.signedUrl });
  }

  return (
    <div>
      <div className="admin-page-head">
        <h1>KYC submissions</h1>
        <input
          className="input admin-search"
          placeholder="Search name, email, ID number…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <div className="flex gap-sm" style={{ marginBottom: "var(--spacing-md)", flexWrap: "wrap" }}>
        {statusFilterOptions.map((option) => {
          const count =
            option.value === "all"
              ? submissions.length
              : counts[option.value as keyof typeof counts];
          return (
            <button
              key={option.value}
              type="button"
              className={filter === option.value ? "btn btn-primary btn-compact" : "btn btn-outline btn-compact"}
              onClick={() => setFilter(option.value)}
            >
              {option.label} ({count})
            </button>
          );
        })}
      </div>

      {error ? <p className="form-error">{error}</p> : null}

      <div className="card admin-panel">
        {loading ? (
          <p>Loading submissions…</p>
        ) : filtered.length === 0 ? (
          <p>No KYC submissions here yet. Guests submit an ID during checkout.</p>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Guest</th>
                  <th>ID type</th>
                  <th>ID number</th>
                  <th>Document</th>
                  <th>Submitted</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((submission) => (
                  <tr key={submission.id}>
                    <td>
                      <strong>{submission.guest_name}</strong>
                      <br />
                      <small>{submission.guest_email}</small>
                      <br />
                      <small>{submission.guest_phone}</small>
                    </td>
                    <td>{kycIdTypeLabel(submission.id_type)}</td>
                    <td>
                      <code>{submission.id_number}</code>
                    </td>
                    <td>
                      {submission.id_document_path ? (
                        <>
                          <button
                            type="button"
                            className="btn btn-outline btn-compact"
                            disabled={docLoading}
                            onClick={() => void viewDocument(submission)}
                          >
                            {docUrl?.id === submission.id ? "Refresh" : "View document"}
                          </button>
                          <br />
                          <small>
                            {submission.id_document_name} ·{" "}
                            {submission.id_document_size
                              ? `${Math.max(1, Math.round(submission.id_document_size / 1024))} KB`
                              : "—"}
                          </small>
                        </>
                      ) : (
                        <small>No document</small>
                      )}
                    </td>
                    <td>
                      {new Date(submission.created_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                      <br />
                      <small>
                        {new Date(submission.created_at).toLocaleTimeString("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </small>
                    </td>
                    <td>
                      <span
                        className={`status-pill status-${
                          submission.status === "approved"
                            ? "confirmed"
                            : submission.status === "rejected"
                              ? "cancelled"
                              : "pending"
                        }`}
                      >
                        {kycStatusLabel(submission.status)}
                      </span>
                      {submission.review_note ? (
                        <>
                          <br />
                          <small>Note: {submission.review_note}</small>
                        </>
                      ) : null}
                    </td>
                    <td>
                      {noteId === submission.id ? (
                        <div style={{ minWidth: "14rem" }}>
                          <textarea
                            className="input"
                            rows={2}
                            placeholder="Optional note to the guest…"
                            value={noteText}
                            onChange={(event) => setNoteText(event.target.value)}
                          />
                          <div className="flex gap-sm" style={{ marginTop: "var(--spacing-sm)" }}>
                            <button
                              type="button"
                              className="btn btn-primary btn-compact"
                              disabled={busyId === submission.id}
                              onClick={() => void review(submission.id, "approved")}
                            >
                              Save & approve
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline btn-compact"
                              onClick={() => setNoteId(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-sm" style={{ flexWrap: "wrap" }}>
                          {submission.status !== "approved" ? (
                            <button
                              type="button"
                              className="btn btn-primary btn-compact"
                              disabled={busyId === submission.id}
                              onClick={() => void review(submission.id, "approved")}
                            >
                              Approve
                            </button>
                          ) : null}
                          {submission.status !== "rejected" ? (
                            <button
                              type="button"
                              className="btn btn-outline btn-compact"
                              disabled={busyId === submission.id}
                              onClick={() => {
                                setNoteId(submission.id);
                                setNoteText(submission.review_note ?? "");
                              }}
                            >
                              Reject…
                            </button>
                          ) : null}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {docUrl ? (
        <div
          role="presentation"
          onClick={() => setDocUrl(null)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.65)",
            display: "grid",
            placeItems: "center",
            zIndex: 50,
            padding: "1rem",
          }}
        >
          <div
            role="dialog"
            aria-label="ID document"
            onClick={(event) => event.stopPropagation()}
            style={{
              background: "var(--color-surface, #fff)",
              borderRadius: "var(--radius-md, 12px)",
              padding: "var(--spacing-md, 1rem)",
              maxWidth: "min(90vw, 60rem)",
              maxHeight: "90vh",
              overflow: "auto",
            }}
          >
            <div className="flex justify-between items-center" style={{ marginBottom: "var(--spacing-sm)" }}>
              <strong>ID document</strong>
              <a className="btn btn-outline btn-compact" href={docUrl.url} target="_blank" rel="noopener noreferrer">
                Open in new tab
              </a>
            </div>
            <iframe
              src={docUrl.url}
              title="ID document"
              style={{ width: "min(85vw, 55rem)", height: "70vh", border: 0 }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

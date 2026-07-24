"use client";

import { useEffect, useRef } from "react";
import { AlertTriangle, CheckCircle2, Loader2, XCircle } from "lucide-react";

/**
 * The console's one modal.
 *
 * Every publish, edit and deletion ends in this dialog — asking first when the
 * action cannot be undone, then reporting whether it actually landed. It
 * replaces `window.confirm`, which could say nothing about the outcome and is
 * suppressible by the browser.
 */

export type DialogTone = "success" | "error" | "danger";

const TONES: Record<
  DialogTone,
  { accent: string; icon: typeof CheckCircle2; iconClass: string; confirm: string }
> = {
  success: {
    accent: "bg-gold",
    icon: CheckCircle2,
    iconClass: "text-gold",
    confirm:
      "bg-navy text-paper hover:bg-gold hover:text-ink",
  },
  error: {
    accent: "bg-red-600",
    icon: XCircle,
    iconClass: "text-red-600",
    confirm:
      "bg-navy text-paper hover:bg-gold hover:text-ink",
  },
  danger: {
    accent: "bg-red-600",
    icon: AlertTriangle,
    iconClass: "text-red-600",
    confirm:
      "bg-red-700 text-paper hover:bg-red-800",
  },
};

export default function ActionDialog({
  open,
  tone,
  title,
  message,
  children,
  confirmLabel = "Close",
  onConfirm,
  cancelLabel,
  onCancel,
  busy = false,
}: {
  open: boolean;
  tone: DialogTone;
  title: string;
  message: string;
  /** Anything extra under the message — a link to the published article, say. */
  children?: React.ReactNode;
  confirmLabel?: string;
  onConfirm: () => void;
  /** Present only on a question; its absence makes this a report with one button. */
  cancelLabel?: string;
  onCancel?: () => void;
  busy?: boolean;
}) {
  const confirmRef = useRef<HTMLButtonElement>(null);

  // Escape dismisses, and the page behind must not scroll while the dialog is up.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !busy) (onCancel ?? onConfirm)();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, busy, onCancel, onConfirm]);

  // Focus lands on the primary button, so Enter answers the dialog rather than
  // whatever was focused on the page behind it.
  useEffect(() => {
    if (open) confirmRef.current?.focus();
  }, [open]);

  if (!open) return null;

  const { accent, icon: Icon, iconClass, confirm } = TONES[tone];
  const dismiss = onCancel ?? onConfirm;

  return (
    <div
      className="console-dialog-backdrop fixed inset-0 z-[100] flex items-center justify-center bg-navy/55 px-5 py-10 backdrop-blur-[3px]"
      onMouseDown={(event) => {
        // Only a click on the backdrop itself, and never mid-action.
        if (event.target === event.currentTarget && !busy) dismiss();
      }}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="console-dialog-title"
        aria-describedby="console-dialog-message"
        className="console-dialog-panel w-full max-w-[460px] border border-silver/50 bg-paper shadow-[0_30px_80px_-20px_rgba(12,24,42,0.45)]"
      >
        <span className={`block h-[3px] w-full ${accent}`} aria-hidden />

        <div className="px-7 pb-7 pt-8 sm:px-9 sm:pb-8">
          <Icon size={26} strokeWidth={1.8} className={`mb-5 ${iconClass}`} aria-hidden />

          <h2
            id="console-dialog-title"
            className="font-display text-[1.4rem] font-semibold leading-tight text-navy"
          >
            {title}
          </h2>

          <p
            id="console-dialog-message"
            className="mt-3 font-sans text-[13.5px] leading-[1.75] text-slate/85"
          >
            {message}
          </p>

          {children && <div className="mt-5">{children}</div>}

          <div className="mt-8 flex flex-wrap items-center justify-end gap-3">
            {cancelLabel && (
              <button
                type="button"
                onClick={onCancel}
                disabled={busy}
                className="inline-flex items-center gap-2 border border-line-strong px-6 py-3 font-sans text-[10.5px] font-semibold uppercase tracking-[0.18em] text-navy transition-colors hover:border-navy hover:bg-navy hover:text-paper disabled:cursor-not-allowed disabled:opacity-50"
              >
                {cancelLabel}
              </button>
            )}
            <button
              ref={confirmRef}
              type="button"
              onClick={onConfirm}
              disabled={busy}
              className={`inline-flex items-center gap-2 px-6 py-3 font-sans text-[10.5px] font-semibold uppercase tracking-[0.18em] transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${confirm}`}
            >
              {busy && <Loader2 size={13} strokeWidth={2} className="animate-spin" />}
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

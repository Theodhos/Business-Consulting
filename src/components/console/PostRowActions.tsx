"use client";

import { unstable_rethrow, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Loader2, Trash2 } from "lucide-react";

import {
  deletePostAction,
  togglePublishAction,
  type ActionResult,
} from "@/app/admin/actions";

import ActionDialog from "./ActionDialog";
import { useConsoleNotice } from "./ConsoleFeedback";

/**
 * The publish and delete controls for one article.
 *
 * Both run their server action, report the outcome into the dashboard dialog,
 * and then refresh the list — so what the dialog says and what the page shows
 * can never disagree. Deleting asks first, in the same dialog rather than a
 * browser `confirm`, and names the article it is about to remove.
 */

const buttonClass =
  "inline-flex items-center gap-2 border border-line px-3.5 py-2.5 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors disabled:cursor-not-allowed disabled:opacity-45";

export default function PostRowActions({
  slug,
  title,
  published,
}: {
  slug: string;
  title: string;
  published: boolean;
}) {
  const notify = useConsoleNotice();
  const router = useRouter();

  const [pending, startTransition] = useTransition();
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  function run(action: (formData: FormData) => Promise<ActionResult>, publish?: boolean) {
    const body = new FormData();
    body.set("slug", slug);
    if (publish !== undefined) body.set("publish", String(publish));

    startTransition(async () => {
      let outcome: ActionResult;
      try {
        outcome = await action(body);
      } catch (error) {
        // A redirect out of the action — an expired session — is Next's to handle.
        unstable_rethrow(error);
        console.error("[console] The action did not complete.", error);
        notify({
          ok: false,
          title: "Nothing happened",
          message:
            "The server could not be reached, so nothing was changed. Check your connection and try again.",
          at: Date.now(),
        });
        return;
      }

      setConfirmingDelete(false);

      // An expired session sends the router to the login page instead of
      // returning an outcome; there is nothing to announce on the way out.
      if (!outcome?.title) return;

      notify(outcome);
      // Pull the list again so a deleted row disappears and a publish state flips
      // without waiting for the next navigation.
      router.refresh();
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => run(togglePublishAction, !published)}
        disabled={pending}
        className={`${buttonClass} text-navy hover:border-gold hover:bg-gold hover:text-ink`}
      >
        {pending && <Loader2 size={12} strokeWidth={2} className="animate-spin" />}
        {published ? "Unpublish" : "Publish"}
      </button>

      <button
        type="button"
        onClick={() => setConfirmingDelete(true)}
        disabled={pending}
        title={`Delete ${title}`}
        className={`${buttonClass} text-red-700 hover:border-red-700 hover:bg-red-700 hover:text-paper`}
      >
        <Trash2 size={12} strokeWidth={2} />
        <span className="sr-only">Delete {title}</span>
      </button>

      <ActionDialog
        open={confirmingDelete}
        tone="danger"
        title="Delete this article?"
        message={`“${title}” will be removed from the articles page and from the store. There is no undo, and it will not come back.`}
        confirmLabel={pending ? "Deleting…" : "Delete it"}
        onConfirm={() => run(deletePostAction)}
        cancelLabel="Keep it"
        onCancel={() => setConfirmingDelete(false)}
        busy={pending}
      />
    </>
  );
}

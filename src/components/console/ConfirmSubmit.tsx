"use client";

/**
 * A submit button that asks first. Used for deletions, which are not
 * recoverable — the article store keeps no history.
 */
export default function ConfirmSubmit({
  message,
  className = "",
  children,
}: {
  message: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(event) => {
        if (!window.confirm(message)) event.preventDefault();
      }}
    >
      {children}
    </button>
  );
}

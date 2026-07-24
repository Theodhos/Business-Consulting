import React from "react";

/**
 * One field treatment for every form on the site — contact, booking, newsletter.
 * Square, hairline, transparent ground; the border goes gold on focus.
 */

const labelClass = "mb-2 block font-sans text-[10px] font-semibold uppercase tracking-[0.16em]";
/**
 * 16px on phones is deliberate: iOS Safari zooms the whole page whenever a
 * focused control renders below that, and the zoom is never undone.
 */
const controlClass =
  "w-full min-w-0 border bg-transparent px-4 py-3.5 font-sans text-[16px] sm:text-sm transition-colors focus:outline-none";

function tone(invert: boolean) {
  return {
    label: invert ? `${labelClass} text-paper/50` : `${labelClass} text-navy/50`,
    control: invert
      ? `${controlClass} border-line-invert text-paper placeholder:text-paper/25 focus:border-gold`
      : `${controlClass} border-line text-navy placeholder:text-navy/30 focus:border-gold`,
  };
}

type Common = { label: string; name: string; invert?: boolean; required?: boolean };

export function Field({
  label,
  name,
  type = "text",
  placeholder,
  invert = false,
  required,
  autoComplete,
}: Common & { type?: string; placeholder?: string; autoComplete?: string }) {
  const t = tone(invert);
  return (
    <div>
      <label htmlFor={name} className={t.label}>
        {label}
        {!required && <span className="ml-1 normal-case tracking-normal opacity-60">(optional)</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={t.control}
      />
    </div>
  );
}

export function TextareaField({
  label,
  name,
  placeholder,
  rows = 5,
  invert = false,
  required,
}: Common & { placeholder?: string; rows?: number }) {
  const t = tone(invert);
  return (
    <div>
      <label htmlFor={name} className={t.label}>
        {label}
        {!required && <span className="ml-1 normal-case tracking-normal opacity-60">(optional)</span>}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
        className={`${t.control} resize-none`}
      />
    </div>
  );
}

export function SelectField({
  label,
  name,
  options,
  invert = false,
  required,
}: Common & { options: readonly string[] }) {
  const t = tone(invert);
  return (
    <div>
      <label htmlFor={name} className={t.label}>
        {label}
        {!required && <span className="ml-1 normal-case tracking-normal opacity-60">(optional)</span>}
      </label>
      <select id={name} name={name} required={required} defaultValue="" className={t.control}>
        <option value="" disabled>
          Please select
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-paper text-navy">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

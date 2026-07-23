/**
 * Where the editorial console lives.
 *
 * Kept in one place so the path can be changed in a single edit, and so
 * `proxy.ts` can import it without pulling in `lib/auth` — and with it
 * `next/headers`, `node:crypto` and the MongoDB driver, none of which belong in
 * the proxy layer.
 *
 * The console is linked from nowhere on the site and served `noindex, nofollow`,
 * so it stays out of search results. `/admin` is a guessable path, though — the
 * password is what protects it, not the address.
 *
 * Changing this constant requires renaming `src/app/admin` and
 * `src/app/api/admin` to match, and updating the matcher in `proxy.ts`: the
 * directory name is the route, and the matcher cannot read a variable.
 */
export const CONSOLE_PATH = "/admin";
export const CONSOLE_LOGIN_PATH = `${CONSOLE_PATH}/login`;

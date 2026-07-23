import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    /**
     * Turbopack keeps a ~400 MB resolution cache under `.next/dev/cache` and
     * restores it between dev sessions — on by default since 16.1. When a dev
     * server dies without flushing it (a `taskkill /F`, a crash, a reboot), the
     * restored cache can come back missing the entry for the `next` package
     * itself. Every app route then fails to build with "Next.js package not
     * found" and the server aborts with a Turbopack FATAL, which no amount of
     * restarting clears — only deleting `.next` does.
     *
     * This site compiles cold in well under a second, so the cache buys very
     * little and costs a class of unrecoverable dev-server failure. Delete this
     * block to take the cache back; if the FATAL returns, `rm -rf .next`.
     */
    turbopackFileSystemCacheForDev: false,
  },
};

export default nextConfig;

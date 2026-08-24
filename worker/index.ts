/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  RESEND_API_KEY?: string;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Preserve the search value and usefulness of the former WordPress URLs.
// Trailing slashes and capitalization are normalized before this lookup.
const LEGACY_REDIRECTS: Record<string, string> = {
  "/products-and-services": "/#services",
  "/products-services": "/#services",
  "/natural-turf": "/#sod-gallery-title",
  "/synthetic-turf": "/#synthetic-gallery-title",
  "/grass-seeding-seed-products": "/#seeding",
  "/grading-services": "/#grading",
  "/seasoned-firewood": "/#firewood",
  "/firewood": "/#firewood",
  "/about-us": "/#story",
  "/contact": "/#quote",
  "/contact-us": "/#quote",
  "/request-a-quote": "/#quote",
  "/blog": "/#services",
  "/watering-your-new-sod": "/#sod-gallery-title",
  "/frequently-asked-questions-synthetic-turf": "/#synthetic-gallery-title",
  "/tips-successful-grass-seeding": "/#seeding",
  "/sports-field-renovation": "/#sod-gallery-title",
};

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    (globalThis as typeof globalThis & { __MOTZ_RESEND_API_KEY__?: string }).__MOTZ_RESEND_API_KEY__ = env?.RESEND_API_KEY;
    const url = new URL(request.url);

    if (request.method === "GET" || request.method === "HEAD") {
      const normalizedPath = url.pathname.toLowerCase().replace(/\/+$/, "") || "/";
      const destination = LEGACY_REDIRECTS[normalizedPath];

      if (destination) {
        const redirectUrl = new URL(destination, url.origin);
        redirectUrl.search = url.search;
        return Response.redirect(redirectUrl, 301);
      }
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;

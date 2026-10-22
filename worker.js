export default {
  async fetch(request, env) {
    const userAgent =
      request.headers.get("User-Agent") || "";

    const isGooglebot =
      /Googlebot/i.test(userAgent);

    // Sajikan website yang sama untuk semua pengunjung
    return env.ASSETS.fetch(request);
  }
};

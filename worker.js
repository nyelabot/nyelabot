export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);

    const type = response.headers.get("content-type") || "";
    const id = env.GA_MEASUREMENT_ID;

    // Hanya sisipkan Analytics pada halaman HTML
    if (!type.includes("text/html") ||
        !/^G-[A-Z0-9]+$/.test(id || "") ||
        response.status !== 200) {
      return response;
    }
    conts isGooglebot =
      /Googlebot/
    i.test(userAgent);

    const tag = `
<script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${id}');
</script>`;

    return new HTMLRewriter()
      .on("head", {
        element(element) {
          element.append(tag, { html: true });
        }
      })
      .transform(response);
  }
};

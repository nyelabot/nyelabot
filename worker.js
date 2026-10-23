export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const id = env.GA_MEASUREMENT_ID;

    const contentType =
      response.headers.get("content-type") || "";

    if (
      response.status !== 200 ||
      !contentType.includes("text/html") ||
      !/^G-[A-Z0-9]+$/.test(id || "")
    ) {
      return response;
    }

    return new HTMLRewriter()
      .on("head", {
        element(element) {
          element.append(`
<script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');
</script>
`, { html: true });
        }
      })
      .transform(response);
  }
};

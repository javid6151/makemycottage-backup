/**
 * Collects stylesheets currently attached to document and returns
 * a single CSS string to inject into the SVG <foreignObject>.
 */
export async function collectDocumentCss() {
  try {
    const chunks = await Promise.all(
      Array.from(document.styleSheets).map((sheet) => readSheet(sheet))
    );
    return chunks.filter(Boolean).join("\n");
  } catch (e) {
    console.warn("Failed collecting CSS:", e);
    return "";
  }
}

async function readSheet(sheet) {
  try {
    const rules = sheet.cssRules;
    if (rules) {
      return Array.from(rules)
        .map((r) => r.cssText)
        .join("\n");
    }
  } catch {
    // Cross-origin sheets fall through to network fetch or return empty
  }

  if (!sheet.href) return "";

  try {
    const res = await fetch(sheet.href);
    const css = await res.text();
    return css;
  } catch {
    return "";
  }
}

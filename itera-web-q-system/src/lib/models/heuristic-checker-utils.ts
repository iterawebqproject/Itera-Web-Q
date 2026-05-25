import type { Cheerio, CheerioAPI } from "cheerio";
import type { Element } from "domhandler";

function normalizeText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function truncateText(value: string, maxLength = 40): string {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 1).trimEnd()}…`;
}

function getOwnText($el: Cheerio<Element>): string {
  const ownText = $el.clone().children().remove().end().text();

  return normalizeText(ownText);
}

function getPrimaryElementText($: CheerioAPI, element: Element): string {
  const $el = $(element);

  const ariaLabel = normalizeText($el.attr("aria-label") || "");
  if (ariaLabel) return truncateText(ariaLabel);

  const titleAttr = normalizeText($el.attr("title") || "");
  if (titleAttr) return truncateText(titleAttr);

  const altAttr = normalizeText($el.attr("alt") || "");
  if (altAttr) return truncateText(altAttr);

  const placeholder = normalizeText($el.attr("placeholder") || "");
  if (placeholder) return truncateText(placeholder);

  const valueAttr = normalizeText($el.attr("value") || "");
  if (valueAttr) return truncateText(valueAttr);

  const descendantHeading = normalizeText(
    $el.find("h1, h2, h3, h4, h5, h6").first().text(),
  );
  if (descendantHeading) return truncateText(descendantHeading);

  const ownText = getOwnText($el);
  if (ownText) return truncateText(ownText);

  const primaryChildText = normalizeText(
    $el.find("label, span, strong, b, em, p").first().text(),
  );
  if (primaryChildText) return truncateText(primaryChildText);

  const fullText = normalizeText($el.text());
  return truncateText(fullText);
}

export function getFullSelectorPath($: CheerioAPI, element: Element): string {
  const path: string[] = [];
  let current = $(element);

  while (current.length > 0 && current.get(0)?.tagName !== "html") {
    const el = current.get(0);
    if (!el) break;

    let selector = el.tagName.toLowerCase();

    if (el.attribs?.id) {
      selector += `#${el.attribs.id}`;
    }

    else if (el.attribs?.class) {
      const firstClass = el.attribs.class.trim().split(/\s+/)[0];
      if (firstClass) {
        selector += `.${firstClass}`;
      }
    }

    const parent = current.parent();
    if (parent.length > 0) {
      const siblings = parent.children(el.tagName.toLowerCase());
      if (siblings.length > 1) {
        const index = siblings.index(current) + 1;
        selector += `:nth-child(${index})`;
      }
    }

    path.unshift(selector);
    current = parent;
  }

  return path.join(" > ");
}

export function getElementContext($: CheerioAPI, element: Element): string {
  const $el = $(element);
  const contexts: string[] = [];

  if ($el.closest("header").length > 0) {
    contexts.push("in the header section");
  }
  if ($el.closest("nav").length > 0) {
    contexts.push("in the navigation menu");
  }
  if ($el.closest("main").length > 0) {
    contexts.push("in the main content area");
  }
  if ($el.closest("footer").length > 0) {
    contexts.push("in the footer section");
  }
  if ($el.closest("form").length > 0) {
    const formId = $el.closest("form").attr("id");
    contexts.push(formId ? `in form#${formId}` : "in a form");
  }
  if ($el.closest("aside").length > 0) {
    contexts.push("in the sidebar");
  }

  return contexts.length > 0 ? contexts.join(", ") : "in the page body";
}

export function describeElement($: CheerioAPI, element: Element): string {
  const $el = $(element);
  const tag = element.tagName.toLowerCase();
  const id = $el.attr("id");
  const name = $el.attr("name");
  const type = $el.attr("type");
  const text = getPrimaryElementText($, element);
  const href = $el.attr("href");

  let description = `The ${tag} element`;

  if (tag === "input") {
    description = "The input field";
    if (name) description += ` '${name}'`;
    else if (id) description += ` with id '${id}'`;
    if (type) description += ` (type="${type}")`;
  } else if (tag === "a") {
    description = "The link";
    if (text) description += ` "${text}"`;
    else if (href) description += ` to "${href}"`;
  } else if (tag === "button") {
    description = "The button";
    if (text) description += ` "${text}"`;
  } else if (id) {
    description += ` #${id}`;
  } else if (text && text.length > 0) {
    description += ` "${text}"`;
  }

  return description;
}

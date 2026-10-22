export type SeoMeta = {
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: string;
  ogImage?: string;
  jsonLd?: object[];
};

const SITE_URL = 'https://orthocare.example.com';

export function getCanonicalUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

export function updateDocumentMeta(meta: SeoMeta) {
  document.title = meta.title;

  setMetaTag('description', meta.description);
  setMetaTag('canonical', getCanonicalUrl(meta.canonicalPath));
  setMetaProperty('og:title', meta.title);
  setMetaProperty('og:description', meta.description);
  setMetaProperty('og:url', getCanonicalUrl(meta.canonicalPath));
  setMetaProperty('og:type', meta.ogType || 'website');
  setMetaProperty('og:image', meta.ogImage || `${SITE_URL}/og-image.jpg`);
  setMetaName('twitter:card', 'summary_large_image');
  setMetaName('twitter:title', meta.title);
  setMetaName('twitter:description', meta.description);

  const existing = document.getElementById('json-ld-structured-data');
  if (existing) existing.remove();

  if (meta.jsonLd && meta.jsonLd.length > 0) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'json-ld-structured-data';
    script.textContent = JSON.stringify(meta.jsonLd);
    document.head.appendChild(script);
  }
}

function setMetaTag(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setMetaProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setMetaName(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export { SITE_URL };

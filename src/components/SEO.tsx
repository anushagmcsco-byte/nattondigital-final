import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
}

export default function SEO({ title, description, image }: SEOProps) {
  useEffect(() => {
    // 1. Update document title
    document.title = title;

    // Helper function to find or create meta elements
    const updateMetaTag = (selector: string, attrName: string, attrValue: string, contentValue: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentValue);
    };

    // 2. Update meta description
    updateMetaTag('meta[name="description"]', 'name', 'description', description);

    // 3. Update Open Graph (og:) tags
    updateMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    updateMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    if (image) {
      updateMetaTag('meta[property="og:image"]', 'property', 'og:image', image);
    }

    // 4. Update Twitter Card tags
    updateMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    updateMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    updateMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    if (image) {
      updateMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', image);
    }
  }, [title, description, image]);

  return null;
}

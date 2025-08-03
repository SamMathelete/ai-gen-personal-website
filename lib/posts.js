import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'posts');

/**
 * Reads all Markdown files in the posts directory, extracts simple
 * front‑matter metadata (title and date) from the top of the file,
 * returns an array of post objects sorted by date in descending order.
 */
export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Simple front matter parsing: look for YAML-like block at top of file
      let title = slug;
      let date = '';
      let content = fileContents;
      const fmMatch = fileContents.match(/^---\n([\s\S]*?)\n---\n/);
      if (fmMatch) {
        const fmContent = fmMatch[1];
        content = fileContents.slice(fmMatch[0].length);
        fmContent.split('\n').forEach((line) => {
          const [key, ...rest] = line.split(':');
          if (!key) return;
          const value = rest.join(':').trim();
          if (key.trim() === 'title') title = value;
          if (key.trim() === 'date') date = value;
        });
      }

      return { slug, title, date, content };
    });

  // Sort posts by date descending. Fallback to lexical if no date.
  return allPostsData.sort((a, b) => {
    if (a.date && b.date) return a.date < b.date ? 1 : -1;
    return a.title > b.title ? 1 : -1;
  });
}

/**
 * Given a slug, return the post data including its HTML body.
 * A simple Markdown parser is used to convert Markdown to HTML.
 */
export function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const fmMatch = fileContents.match(/^---\n([\s\S]*?)\n---\n/);
  let title = slug;
  let date = '';
  let markdownBody = fileContents;
  if (fmMatch) {
    const fmContent = fmMatch[1];
    markdownBody = fileContents.slice(fmMatch[0].length);
    fmContent.split('\n').forEach((line) => {
      const [key, ...rest] = line.split(':');
      const value = rest.join(':').trim();
      if (key.trim() === 'title') title = value;
      if (key.trim() === 'date') date = value;
    });
  }
  const html = markdownToHtml(markdownBody);
  return {
    slug,
    title,
    date,
    html,
  };
}

/**
 * Lists all post slugs to generate static paths for dynamic routes.
 */
export function getAllPostSlugs() {
  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
}

/**
 * A lightweight Markdown to HTML converter. This parser supports
 * headings (levels 1–3), unordered lists and paragraphs. Additional
 * Markdown features can be added later if needed.
 */
export function markdownToHtml(markdown) {
  const lines = markdown.split(/\r?\n/);
  let html = '';
  let inList = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (/^\-\s+/.test(trimmed)) {
      if (!inList) {
        html += '<ul class="list-disc list-inside mb-4">';
        inList = true;
      }
      const itemText = trimmed.replace(/^\-\s+/, '');
      html += `<li class="mb-1">${escapeHtml(itemText)}</li>`;
    } else {
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      if (/^###\s+/.test(trimmed)) {
        html += `<h3 class="text-lg font-semibold mt-4 mb-2">${escapeHtml(trimmed.replace(/^###\s+/, ''))}</h3>`;
      } else if (/^##\s+/.test(trimmed)) {
        html += `<h2 class="text-xl font-semibold mt-6 mb-3">${escapeHtml(trimmed.replace(/^##\s+/, ''))}</h2>`;
      } else if (/^#\s+/.test(trimmed)) {
        html += `<h1 class="text-2xl font-bold mt-8 mb-4">${escapeHtml(trimmed.replace(/^#\s+/, ''))}</h1>`;
      } else if (trimmed === '') {
        // skip empty lines to avoid generating empty paragraphs
      } else {
        html += `<p class="mb-3">${escapeHtml(trimmed)}</p>`;
      }
    }
  }
  if (inList) {
    html += '</ul>';
  }
  return html;
}

/**
 * Escape HTML special characters in text to prevent injection. Only
 * basic characters are escaped here since our input comes from
 * trusted Markdown files authored by the site owner.
 */
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
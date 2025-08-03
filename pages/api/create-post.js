import fs from 'fs';
import path from 'path';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session || session.user.email !== process.env.AUTHORIZED_EMAIL) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const { title, content, date } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const frontMatter = `---\ntitle: ${title}\n${date ? `date: ${date}\n` : ''}---\n\n${content}\n`;
  const filePath = path.join(process.cwd(), 'posts', `${slug}.md`);
  fs.writeFileSync(filePath, frontMatter);

  res.status(200).json({ message: 'Post created', slug });
}

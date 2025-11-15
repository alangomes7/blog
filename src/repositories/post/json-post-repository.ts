import { PostModel } from '@/models/post/post-model';
import { PostRepository } from './post-repository';
import { dirname, resolve } from 'path';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const JSON_POSTS_FILE_PATH = resolve(__dirname, '../../db/seed/posts.json');

const SIMULATE_WAIT_IN_MS = 1000;

export class JsonPostRepository implements PostRepository {
  private async readFromDisk(): Promise<PostModel[]> {
    const jsonContent = await readFile(JSON_POSTS_FILE_PATH, 'utf-8');
    return JSON.parse(jsonContent).posts;
  }

  private async simulateWait() {
    if (SIMULATE_WAIT_IN_MS <= 0) return;
    await new Promise(r => setTimeout(r, SIMULATE_WAIT_IN_MS));
  }

  async findAllPublic() {
    await this.simulateWait();
    return (await this.readFromDisk()).filter(p => p.published);
  }

  async findById(id: string) {
    await this.simulateWait();
    const post = (await this.readFromDisk()).find(p => p.id === id);
    if (!post) throw new Error('post not found id');
    return post;
  }

  async findBySlug(slug: string) {
    await this.simulateWait();
    const post = (await this.readFromDisk()).find(p => p.slug === slug);
    if (!post) throw new Error('post not found slug');
    return post;
  }
}

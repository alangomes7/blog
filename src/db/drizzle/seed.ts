import { JsonPostRepository } from '@/repositories/post/json-post-repository';
import { drizzleDb } from '.';
import { postsTable } from './schemas';

(async () => {
  const jsonPostRepository = new JsonPostRepository();
  await drizzleDb.delete(postsTable);
  const posts = await jsonPostRepository.findAll();
  try {
    await drizzleDb.insert(postsTable).values(posts);
    console.log();
    console.log('Database wiped');
    console.log('Seeding...');
    console.log(`Posts added: ${posts.length}`);
    console.log('Seeding finished.');
    console.log();
  } catch (e) {
    console.log();
    console.log('Error at seeding...');
    console.log();
    console.log(e);
    console.log();
  }
})();

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export const metadata = {
  title: "Munggit Posts",
  description: "Mung Community Blog Posts",
};

export default async function Posts({ searchParams }) {
  const posts = await sql`
      SELECT 
       posts.id, 
        posts.username, 
        posts.title, 
        posts.content, 
        ARRAY_AGG(categories.category) AS categories
      FROM 
        posts
      LEFT JOIN 
        posts_categories ON posts_categories.post_id = posts.id
      LEFT JOIN 
        categories ON posts_categories.category_id = categories.id
      WHERE 
        posts.id IS NOT NULL
        AND posts.username IS NOT NULL
        AND posts.title IS NOT NULL
        AND posts.content IS NOT NULL
      GROUP BY 
        posts.id, posts.username, posts.title, posts.content
      ORDER BY 
        posts.id ASC; 
    `;
  revalidatePath("/posts");

  if (searchParams.sort === "desc") {
    posts.rows.reverse();
  }

  return (
    <div>
      <div
        style={{
          backgroundColor: "#f0f0f0",
          padding: "20px",
          display: "flex",
        }}
      >
        <Link href="/posts">Posts in order.</Link>
        <Link href="/posts?sort=desc">New posts first.</Link>
      </div>
      <h1>Posts</h1>
      <ul>
        {posts.rows.map((post, index) => (
          <li
            key={index}
            style={{
              border: "1px solid #000",
              marginBottom: "10px",
              padding: "10px",
            }}
          >
            <Link href={`/posts/${post.id}`} key={post.id}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textDecoration: "underline",
                }}
              >
                <div style={{ fontSize: "20px" }}>{post.username}:</div>
                <div style={{ fontSize: "30px" }}>{post.title}</div>
              </div>
            </Link>
            <div>
              <ul>
                {post.categories.map((category, index) => (
                  <Link href={`/posts?sort=${category}`} key={category}>
                    <li
                      key={index}
                      style={{
                        display: "inline",
                        marginRight: "10px",
                        fontSize: "13px",
                        color: "#535353",
                      }}
                    >
                      {category}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

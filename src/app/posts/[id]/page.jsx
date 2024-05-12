import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";

export async function generateMetadata({ params }) {
  const post = await sql`
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
   AND posts.id = ${params.id}
 GROUP BY 
   posts.id, posts.username, posts.title, posts.content
 ORDER BY 
   posts.id ASC; 
`;
  revalidatePath("/");
  return {
    title: `${post.rows[0].title}: Munggit`,
    description: `Post by ${post.rows[0].username} with title ${post.rows[0].title}`,
  };
}

export default async function SinglePost({ params }) {
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
        AND posts.id = ${params.id}
      GROUP BY 
        posts.id, posts.username, posts.title, posts.content
      ORDER BY 
        posts.id ASC; 
    `;
  revalidatePath("/posts");
  async function handleAddComment(formData) {
    "use server";

    const username = formData.get("username");
    const content = formData.get("content");

    const result = await sql`INSERT INTO comments (post_id, username, content)
        VALUES (${params.id}, ${username}, ${content})`;

    revalidatePath("/");
    SinglePost();
  }

  revalidatePath("/");

  const comment =
    await sql`SELECT comments.username, comments.content FROM comments WHERE post_id = ${params.id}`;

  return (
    <div>
      <ul>
        {posts.rows.map((post, index) => (
          <li
            key={index}
            style={{
              borderBottom: "1px solid #000",
              marginBottom: "10px",
              padding: "10px",
            }}
          >
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
            <div>{post.content}</div>
            <div>
              <ul>
                {post.categories.map((category, index) => (
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
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
      <form action={handleAddComment}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{ display: "flex", flexDirection: "column", width: "150px" }}
          >
            <label htmlFor="username">Username</label>
            <input name="username" id="username" placeholder="Username" />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", width: "150px" }}
          >
            <label htmlFor="content">Content</label>
            <input name="content" id="content" placeholder="Content" />
          </div>
        </div>
        <button
          type="submit"
          style={{
            border: "1px solid #41ac3d",
            borderRadius: "5px",
            fontSize: "20px",
          }}
        >
          Add Comment
        </button>
      </form>
      <ul>
        {comment.rows.map((comment, index) => (
          <li
            key={index}
            style={{
              border: "1px solid #000",
              marginBottom: "10px",
              padding: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textDecoration: "underline",
              }}
            >
              <div style={{ fontSize: "20px" }}>{comment.username}:</div>
            </div>
            <div>{comment.content}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

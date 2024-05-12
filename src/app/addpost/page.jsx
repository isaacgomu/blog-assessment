import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function addpost() {
  const categoryResult = await sql`SELECT * FROM categories`;

  async function handleAddPost(formData) {
    "use server";

    const username = formData.get("username");
    const title = formData.get("title");
    const content = formData.get("content");
    const category = formData.get("category");
    const category2 = formData.get("category2");
    const category3 = formData.get("category3");

    const result = await sql`INSERT INTO posts (username, title, content)
        VALUES (${username}, ${title}, ${content})
        RETURNING *`;
    const awaitedResult = await result.rows[0].id;
    if (category !== "0") {
      await sql`INSERT INTO posts_categories (post_id, category_id)
          VALUES (${awaitedResult}, ${category})`;
    }
    if (category2 !== "0") {
      await sql`INSERT INTO posts_categories (post_id, category_id)
            VALUES (${awaitedResult}, ${category2})`;
    }
    if (category3 !== "0") {
      await sql`INSERT INTO posts_categories (post_id, category_id)
            VALUES (${awaitedResult}, ${category3})`;
    }

    revalidatePath("/");

    redirect("/posts");
  }

  return (
    <div className="addPostContainer">
      <h2>Add a post!</h2>
      <form action={handleAddPost}>
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
            <label htmlFor="title">Title</label>
            <input name="title" id="title" placeholder="Title" />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", width: "150px" }}
          >
            <label htmlFor="content">Content</label>
            <input name="content" id="content" placeholder="Content" />
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "150px",
              }}
            >
              <label htmlFor="category" style={{ width: "300px" }}>
                Select Categories (Optional)
              </label>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <select id="category" name="category">
                  <option value="0">Select a category</option>
                  {categoryResult.rows.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.category}
                    </option>
                  ))}
                </select>
                <select id="category2" name="category2">
                  <option value="0">Select a category</option>
                  {categoryResult.rows.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.category}
                    </option>
                  ))}
                </select>
                <select id="category3" name="category3">
                  <option value="0">Select a category</option>
                  {categoryResult.rows.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
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
          Add Post
        </button>
      </form>
    </div>
  );
}

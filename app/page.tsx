import { sql } from "@vercel/postgres";

export default async function Home() {
  const { rows } = await sql`select * from user`;

  return (
    <main>
      <h1>Home</h1>
      {rows.map((row) => (
        <div key={row.id}>
          {row.id} - {row.email}
        </div>
      ))}
    </main>
  );
}

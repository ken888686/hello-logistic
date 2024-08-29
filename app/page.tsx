import { sql } from "@vercel/postgres";

export default async function Home() {
  const { rows } = await sql`select * from User`;
  rows.forEach((x) => console.log(x.username));

  return (
    <main>
      <h1>Home</h1>
    </main>
  );
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { name } = req.body || {};
  const who = name ? `*${name}* が` : " ";

  const response = await fetch(process.env.WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: `🚪 ${who}ドアを開けて下さい`,
    }),
  });

  if (!response.ok) {
    return res.status(500).json({ ok: false });
  }

  return res.status(200).json({ ok: true });
}

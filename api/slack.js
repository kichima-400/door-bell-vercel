export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).send("DoorBell");
  }

  const contentType = req.headers["content-type"] || "";

  // --- Slack Events API (app_home_opened / URL検証) ---
  if (contentType.includes("application/json")) {
    const body = req.body;

    if (body.type === "url_verification") {
      return res.status(200).send(body.challenge);
    }

    if (body.event?.type === "app_home_opened") {
      await publishHome(body.event.user, process.env.BOT_TOKEN);
    }

    return res.status(200).send("OK");
  }

  // --- Slack Interactivity (ボタン押下) ---
  if (contentType.includes("application/x-www-form-urlencoded")) {
    const payload = JSON.parse(req.body.payload);

    if (
      payload.type === "block_actions" &&
      payload.actions[0]?.action_id === "open_door"
    ) {
      const user = payload.user.name;
      await fetch(process.env.WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `🚪 *${user}* ドアを開けて下さい (Please open the door)`,
        }),
      });
    }

    return res.status(200).send("OK");
  }

  return res.status(200).send("OK");
}

async function publishHome(userId, token) {
  await fetch("https://slack.com/api/views.publish", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      user_id: userId,
      view: {
        type: "home",
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "*オフィスのドアを開けてもらう*\n\nボタンを押すと #please-open-the-door に通知が送られます。",
            },
          },
          { type: "divider" },
          {
            type: "actions",
            elements: [
              {
                type: "button",
                text: { type: "plain_text", text: "🚪  ドア開けて！", emoji: true },
                style: "danger",
                action_id: "open_door",
              },
            ],
          },
        ],
      },
    }),
  });
}

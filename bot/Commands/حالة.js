function formatUptime(totalSeconds) {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${days}D • ${hours}H • ${minutes}M • ${remainingSeconds}S`;
}

function formatRam() {
  const m = process.memoryUsage();
  const toMB = (bytes) => (bytes / 1024 / 1024).toFixed(1);
  return `${toMB(m.rss)} MB / ${toMB(m.heapTotal)} MB`;
}

module.exports = {
  name: "حالة",

  async execute(api, event) {
    const threadID = String(event.threadID);
    const requestedAt = new Intl.DateTimeFormat("en-US", {
      timeZone: "Africa/Cairo",
      dateStyle: "full",
      timeStyle: "short",
    }).format(new Date());
    const uptime = formatUptime(process.uptime());
    const ram = formatRam();

    const message = [
      "| ━━━━━━━ 𖤐 ━━━━━━━ |",
      "       𓆩 𝑭𝑨𝑹𝑨𝑯 𓆪",
      "        𝑲𝑨𝒀𝑫𝑶 𝑺𝒀𝑺𝑻𝑬𝑴",
      "| ━━━━━━━━━━━━━━━━━ |",
      "",
      "╭━━━━━━━━━━━━━━━━━━╮",
      " ┊ 𝑪𝒐𝒏𝒏𝒆𝒄𝒕𝒊𝒐𝒏 : ONLINE",
      "⛧ ┊ 𝑺𝒚𝒔𝒕𝒆𝒎 : FULLY ACTIVE",
      ` ┊ 𝑼𝒑𝒕𝒊𝒎𝒆 : ${uptime}`,
      " ┊ 𝑺𝒆𝒓𝒗𝒊𝒄𝒆 : FACEBOOK MESSENGER",
      ` ┊ 𝑹𝑨𝑴 : ${ram}`,
      ` ┊ 𝑪𝒉𝒆𝒄𝒌 𝑻𝒊𝒎𝒆 : ${requestedAt}`,
      "╰━━━━━━━━━━━━━━━━━━╯",
      "",
      "    ⛧ 𝑭𝑨𝑹𝑨𝑯 𝑺𝒀𝑵𝑫𝑰𝑪𝑨𝑻𝑬 ⛧",
      "| ━━━━━━━ 𖤐 ━━━━━━━ |",
    ].join("\n");

    await api.sendMessage(message, threadID);
  },
};

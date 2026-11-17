"use strict";

const fs = require("fs");
const path = require("path");

const IMAGE_PATH = path.join(__dirname, "..", "assets", "owner.jpeg");
const BIRTH_DATE = new Date(2007, 8, 23);

function calculateAge(birthDate, today = new Date()) {
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  return age;
}

function buildOwnerText() {
  return `╭─ 👑 Oᴡɴᴇʀ Iɴғᴏ 👑 ─╮
│ 👤 Nᴀᴍᴇ       : Fᴀʀᴀʜ
│ ☠️ Nɪᴄᴋ       : Kᴀɪᴅᴏ
│ 🎂 Aɢᴇ        : ${calculateAge(BIRTH_DATE)}
│ 💘 Rᴇʟᴀᴛɪᴏɴ    : ᴛᴀᴋᴇɴ
│ 🎓 Pʀᴏғᴇssɪᴏɴ : Sᴛᴜᴅᴇɴᴛ
│ 🪯 Gᴀɴɢ       : Nᴀxᴜs
│
├─ 🔗 Cᴏɴᴛᴀᴄᴛ ─╮
│ 📘 Facebook  : https://www.facebook.com/profile.php?id=61593425125990#
╰────────────────╯`;
}

module.exports = {
  name: "Owner",

  async execute(api, event) {
    const threadID = String(event.threadID || "");
    if (!threadID) return;

    try {
      if (!fs.existsSync(IMAGE_PATH)) {
        await api.sendMessage(
          `${buildOwnerText()}\n\n⚠️ صورة المالك غير مضافة إلى البوت بعد.`,
          threadID,
        );
        return;
      }

      await api.sendMessage(
        {
          body: buildOwnerText(),
          attachment: fs.createReadStream(IMAGE_PATH),
        },
        threadID,
      );
    } catch (error) {
      console.error("[Owner] تعذر إرسال معلومات المالك:", error.message || error);
    }
  },
};

module.exports.buildOwnerText = buildOwnerText;
module.exports.calculateAge = calculateAge;

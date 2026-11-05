# Play Store — aapko kya karna hai (Roman Urdu)

Ye sirf wo kaam hain jo **aapke Google account, paise ya ID** ke baghair nahi ho sakte.
Baaki sab (app, AAB, screenshots, policy, assetlinks) tayyar hai.

---

## 1. Developer account (ek dafa $25)

1. Kholain: `play.google.com/console`
2. Google account se sign in (jo hamesha rakhna hai).
3. **Developer account** banayein → **$25** one-time fee (card).
4. Type: **Personal** (business nahi).
5. Naam: `Nabeel Ameen`, email: apna.
6. **Identity verification**: ID card/passport + address. 1–3 din lagte hain.

⚠️ Naam/address wahi daalein jo ID par hai — warna verification atak jati hai.

---

## 2. Contact email (public)

Play listing par ek email dikhta hai. Personal Gmail theek hai.

---

## 3. App banayein

Play Console → **Create app**:

| Field | Value |
| --- | --- |
| App name | `NEW AI` |
| Default language | English (United States) |
| App or game | App |
| Free or paid | Free |
| Declarations | dono boxes tick karein |

---

## 4. AAB upload (Internal testing)

1. Left menu → **Testing → Internal testing** → **Create new release**
2. **Upload** → `NEW-AI/mobile/app-release-bundle.aab`
3. Release name: `1.0.0`
4. **Next → Save → Review release → Start rollout**
5. **Testers** tab → apna Gmail add karein → link copy karein
6. Phone par link kholein → Play Store se install → check karein ke app chalti hai

### Play signing fingerprint (zaroori)

AAB upload ke baad Play app ko dobara sign karta hai. Uska fingerprint yahan milega:

**Test and release → App integrity → App signing key certificate → SHA-256**

Wo copy karke mujhe dein — main `assetlinks.json` update kar dunga. Warna app ke upar
chhota sa URL bar dikhega (kaam karega, magar adhoora look).

---

## 5. Store listing bharein

**Grow → Store presence → Main store listing**

| Cheez | File / text |
| --- | --- |
| App name | `NEW AI` |
| Short description | `store/listing.md` se copy |
| Full description | `store/listing.md` se copy |
| App icon | `store/icon-512.png` |
| Feature graphic | `store/feature-graphic.png` |
| Phone screenshots | `store/screenshot-1-chat.png`, `-2-voice.png`, `-3-memory.png` |

---

## 6. Declarations (sach likhein)

- **Ads:** `No` (abhi koi ad nahi)
- **Data safety:** "Yes, messages AI provider ko jate hain" — details `store/listing.md` mein
- **Content rating:** questionnaire bharein (AI chat → Teen/Everyone)
- **Target audience:** 13+
- **Privacy policy URL:**
  `https://aminbaloch984-design.github.io/nabeel-ameen/new-ai/privacy.html`

---

## 7. Closed testing (naye account ki shart)

- **Testing → Closed testing** → 12 testers add karein (dost/family ke Gmail)
- Har tester ko 14 din tak app install rakhi hogi aur kam az kam ek baar kholni hogi
- 14 din baad **Apply for production**

⚠️ Ye rule Google ka hai, koi shortcut nahi. 12 testers na hue to production nahi milega.

---

## 8. Production

Production → naya release → wahi AAB → review ke liye bhejein.
Review aam tor par **1–7 din**.

---

## 9. Ads (baad mein)

Jab app live ho aur kuch users hon:

1. `admob.google.com` → app add karein (`com.nabeelameen.newai`)
2. Banner + rewarded ad units banayein
3. Mujhe App ID + unit IDs dein — main code mein laga dunga
4. Play Console mein **Ads: Yes** kar dein

Sach: pehle 500–1000 daily users chahiye, tab hi ads se kuch banta hai.

---

## 10. Reject na hone ke liye

- Backend **zinda** hona chahiye (tunnel band = app kharab = reject)
- Listing mein jhoot na likhein (jo app karta hai wahi likhein)
- Privacy policy link **khulna** chahiye
- Screenshots asli app ke hon (ye hain)
- Kisi aur ka trademark/naam use na karein

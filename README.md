# 🥾 Vándor Bakancs Projektmunka

## 👥 Csapattagok
- Magyari Dávid Krisztián
- Kassai Péter

Ez a projekt egy **Next.js** (frontend) és **Node.js + Express** (backend) alapú webalkalmazás.

Mivel a nehéz külső csomagokat (`node_modules`) és a titkos jelszavakat tartalmazó `.env` fájlokat (biztonsági okokból) nem töltöttük fel a GitHub-ra, az alábbi lépéseket kell megtenned a futtatáshoz.

---

## 🚀 Hogyan indítsd el a saját gépeden? (Lépésről lépésre)

Nyiss meg a VS Code-ban **két külön terminált**, és futtasd le a parancsokat sorban!

### 🟢 1. Terminál: FRONTEND (Next.js és dizájn csomagok)
Futtasd le ezeket a parancsokat a frontend elindításához:

```bash
cd frontend
npm install
npm run dev
```

### 🟡 2. Terminál: BACKEND (Node.js és környezeti változók)
Futtasd le ezeket a parancsokat a backend csomagok letöltéséhez:
```bash
cd backend
npm install
```

### 🔑 Környezeti változók (.env) beállítása:

Mivel a .env fájlt nem húzza le a GitHub (hogy ne lássa mindenki a jelszavadat), neked kell létrehoznod egyet kézzel.

- Hozz létre a backend mappában egy új fájlt .env néven.
- Másold bele ezt a mintát, és írd át a saját SQL Server jelszavadra:

```env
DB_USER=sa
DB_PASSWORD=a_te_saját_jelszavad
DB_SERVER=localhost
DB_DATABASE=VandorBakancsDb
DB_PORT=1433
PORT=5000
```

## 🛠️ Mit csinálj, ha Git hibát kapsz a VS Code-ban?

Ha a VS Code kiakadna, hogy túl sok fájl változott (*"Too many active changes"*), az azért van, mert a Git megpróbálja követni a letöltött node_modules mappákat vagy a .env fájlt.

**Megoldás:**
Futtasd le a projekt fő mappájában a terminálban:

```bash
git rm -r --cached frontend/node_modules backend/node_modules
git rm --cached backend/.env
```
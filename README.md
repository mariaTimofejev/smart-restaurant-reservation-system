# Smart Restaurant Reservation System

CGI internship assignment project.

See projekt on loodud CGI suvepraktika kandideerimisülesande lahendamiseks.  
Tegemist on veebirakendusega, mis võimaldab restoranikülastajal:

- vaadata restorani saaliplaani,
- filtreerida broneeringuid kuupäeva, kellaaja ja seltskonna suuruse järgi,
- näha hõivatud ja vabu laudu,
- saada soovitusi sobivaima laua kohta,
- teha broneeringuid.

Rakendus on üles ehitatud modulaarse arhitektuuriga ning toetab soovituste loogika laiendamist (nt eelistused: privaatsus, aknakoht, ligipääsetavus).

---

# Funktsionaalsus

# Saaliplaan
- Lauad kuvatakse visuaalsel plaanil.
- Värvikoodid:
  - **Punane** – hõivatud laud
  - **Roheline** – vaba laud
  - **Sinine** – soovitatud laud
- Kasutaja saab valida laua broneerimiseks.

# Filtreerimine
Kasutaja saab valida:
- kuupäeva,
- kellaaja,
- inimeste arvu.

Need filtrid mõjutavad nii soovitusi kui ka saadaval olevaid laudu.

# Laua soovitamine
Rakendus soovitab kasutajale sobivaima laua, arvestades:
- seltskonna suurust,
- laudade saadavust,
- efektiivset paigutust (väike seltskond ei lähe suurde lauda).

Soovitatud laud kuvatakse:
- eraldi kaardina (RecommendationCard),
- esile tõstetuna saaliplaanil.

# Broneerimine
Kasutaja saab:
- valida laua,
- sisestada nime,
- määrata inimeste arvu,
- kinnitada broneeringu.

---

# Soovitussüsteemi loogika

Soovitussüsteem töötab lihtsa, kuid laiendatava algoritmi alusel:

1. Filtreeritakse välja kõik vabad lauad.
2. Arvestatakse seltskonna suurust:
   - liiga väikesed lauad eemaldatakse,
   - liiga suured lauad saavad madalama prioriteedi.
3. Valitakse parim sobiv laud.

Arhitektuur võimaldab lisada:
- privaatsuse eelistusi,
- tsooni eelistusi (terrass, peasaal, privaatruum),
- aknaaluseid kohti,
- ligipääsetavuse nõudeid.

---

# Tehnoloogiad

# Frontend
- **React** (Vite)
- JavaScript (ES6+)
- Komponentidel põhinev arhitektuur

# Backend
- **Spring Boot**
- Java LTS (17 või 21)
- REST API

# Muud
- Git versioonihaldus
- JSON andmevahetus

---

# Projekti struktuur (frontend)

---

# 📝 Dokumentatsioon

Selle projekti eesmärk oli luua nutikas restoranide reserveerimissüsteem, mis võimaldab kasutajal valida kuupäeva, kellaaja, inimeste arvu ning saada soovitusi sobivaima laua kohta. Allpool on kirjeldatud tööprotsessi, tehtud otsuseid, keerukusi ja eeldusi.

---

## ⏱ Tööks kulunud aeg

Kokku ligikaudu 12–15 tundi, jaotatuna järgmiselt:

- Saaliplaani ja UI loomine: ~4h  
- Soovitussüsteemi loogika: ~3h  
- Komponentide ühendamine ja UX: ~3h  
- Vigade parandamine ja testimine: ~2h  
- Dokumentatsioon ja README: ~1–2h  

---

# Keerukused ja lahendused

# 1. Soovitussüsteemi loogika
Keeruline oli leida tasakaal lihtsuse ja paindlikkuse vahel.  
Lahendus:  
- Lõin skooripõhise süsteemi, mis arvestab seltskonna suurust ja laudade saadavust.  
- Jätsin arhitektuuri avatuks, et hiljem saaks lisada eelistusi (privaatsus, aknaalune, tsoonid).

# 2. Komponentide omavaheline suhtlus
Reactis tuli hoolikalt planeerida, milline komponent hoiab millist state’i.  
Lahendus:  
- Kõik filtrid ja soovitused hoitakse HomePage tasemel.  
- Alamkomponendid saavad ainult vajalikud propsid.

# 3. Soovitatud laua esiletõstmine
Vaja oli tagada, et soovitatud laud oleks nähtav nii kaardina kui saaliplaanil.  
Lahendus:  
- TableMap ja RestaurantFloorMap said `recommended` prop’i.  
- Sinine värv lisati ühtselt mõlemasse komponenti.

# PartySize haldus
Alguses jäi `partySize` setter kasutamata ja tekitas vea.  
Lahendus:  
- Lisatud sisestusväljad ja setter RecommendationFormi.

---

# Kasutatud allikad ja abi

- React dokumentatsioon (react.dev)  
- StackOverflow (väiksemad React state’i ja propside küsimused)  
- AI tööriistad (Copilot) kasutati:
  - UI struktuuri ideede saamiseks  
  - vigade diagnoosimiseks  
  - koodi refaktoreerimiseks  
Kõik lõplikud lahendused on minu enda poolt kohandatud ja integreeritud.

---

# Lahendamata probleemid ja ideed tulevikuks

Kuigi põhifunktsionaalsus töötab, on mõned ideed, mida võiks edasi arendada:

- Eelistuste süsteem (privaatsus, aknaalune, tsoonid)
- Täpsem skoori arvutus (nt kaugus teistest laudadest)
- Admin-vaade broneeringute haldamiseks
- Andmebaasi integreerimine (PostgreSQL)
- Autentimine ja kasutajakontod
- Animatsioon “hüppa soovitatud laua juurde”

Kui oleks rohkem aega, lisaksin need funktsioonid järgmistes iteratsioonides.

---

# Eeldused, mida lahendamisel tegin

- Restorani plaan võib olla lihtne ruudustik (ülesanne lubab seda).
- Eelistused on valikulised (nõue ütleb “kui soovid”).
- Soovitussüsteem ei pea olema täiuslik, vaid loogiline ja laiendatav.
- Broneeringuid ei pea päriselt salvestama andmebaasi (kui backend pole täielikult valmis).

---

# Kuidas hindaja saab projekti käivitada

# Frontend

cd frontend
npm install
npm run dev

# Backend

cd backend
mvn spring-boot:run

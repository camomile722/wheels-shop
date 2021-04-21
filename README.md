# Praktische Projektarbeit: MERN(MongoDB, Express, React, Nodejs) stack Redux & Bootstrap

# FELGENSHOP eCommerce- und Blog- Platform

## Funktionen

- Registrierung/Anmeldung
- Produkte in den Warenkorb hinzufügen, bestellen und bezahlen: Lieferung, PayPal Zahlungsart ...)
- Produkte bewerten
- Beiträge kommentieren
- Beiträge liken
- Top-Produkte slider-carousel
- Top-gelikte Posts - Sidebar
- Produkt-Pagination
- Post-Pagination
- Produkt-Suche
- Post-Suche
- User-Profile mit Bestellungen
- Admin-Produktmanagement
- Admin-Usermanagement
- Admin-Postmanagement
- Admin-Bestellungsmanagement
- Admin-Bestellungsdetailseite
- Admin-Bestellung als "geliefert" markieren

- Database seeder

## Anwendung

### Mongodb

- Erstellen Sie eine Datenbank User mit dem folgenden Namen und Passwort:
  user-fel-sh
  wj1vkbIwIB1c9sSc

- Fügen Sie folgende MONGO_URI in MongoDB Compass ein:

mongodb+srv://user-fel-sh:wj1vkbIwIB1c9sSc@database.kq5rb.mongodb.net/felgen-shop?authSource=admin&replicaSet=atlas-mob95r-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true

### Run

```
# Frontend (:3000) & Backend (:5000) im felgen-shop Ordner ausführen
npm run dev

# Nur Backend ausführen
npm run server
```

### Seed Database

Network Access erneuern - active home ip

Befehle, um Datenbank mit Benutzern, Beiträgen und Produkten zu importieren oder alle Daten zu zerstören

Importiren Sie Bitte die Datenbank

```
# Import data
npm run data:import

Zusätzlich, wenn man die Datenbank löschen soll:

# Destroy data
npm run data:destroy
```

```

### Zugangsdaten:

admin@example.com (Admin)
123456

john@example.com (User)
123456

jane@example.com (User)
123456
```

### PAYPAL-ZAHLUNG

Fake-Konto für Paypal

Email: sb-ciwej5369942@personal.example.com
Passwort: 1Akn/rH|

## Zukünftige Funktionen

- Zahlung mit Kreditkarte
- Posts-Kategorien
- Produkt-Kategorien
- Museum Seite

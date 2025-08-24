# BOA
<img alt="GitHub License" src="https://img.shields.io/github/license/migueweb/boa">


This repository contains **BOA**, a reservation system project split into two main parts: **backend** and **frontend**.  
Each part has its own `README.md` file with more detailed documentation.

---

## Project Structure

```
.
├── backend               # Express.js backend application
├── commitlint.config.js  # Commit linting rules
├── CONTRIBUTING.md       # Guidelines for contributors
├── db
│   ├── base_seeder.sql   # SQL script to populate base/initial data
│   └── schema.sql        # SQL script defining database schema
├── docs                  # Documentation and diagrams
│   └── boa.erm.drawio    # Entity-Relationship Model diagram (draw.io format)
├── frontend              # Vite + Vanilla JS frontend application
├── LICENSE               # Open-source license for the project
├── package.json          # Root-level dependencies and scripts      
├── pnpm-lock.yaml 
└── README.md             # You are here 
```

---

## Getting Started

1. Clone the repo
```bash
git clone https://github.com/migueweb/boa/
```
---

2. Install dependencies:
```bash
npm install --recursive
```

3. Create database schema:
```bash
mysql -u root -p < db/schema.sql
```

4. Seed database:
```bash
mysql -u root -p  < db/base_seeder.sql
```

---

## Contributing
Read [CONTRIBUTING.MD](.github/CONTRIBUTING.md) for more details.

---

## License
**GNU Affero General Public License v3.0 (AGPL-3.0-or-later)**

---

## Authors
- Miguel Amador [@migueweb](https://github.com/migueweb)
- Keyner Barrios [@keyner23](https://github.com/keyner23)
- Isaac Quintero [@iquintero24](https://github.com/iquintero24)

---

## Contributors

<a href="https://github.com/migueweb/boa/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=migueweb/boa" alt="Contributors" />
</a>
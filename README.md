# Readme

> **Guide** is an open-source boilerplate for generating user-friendly documentation pages from OpenAPI JSON files. Customize themes, integrate specs, and quickly start your documentation.

## 🌟 Features

- **Quick Setup:** Just add your JSON files to the correct directory or point to public links.

- **Fully Customizable:** Easily modify themes and pages with TailwindCSS and Shadecn.

- **Light/Dark Theme Support:** Dynamically adjust logos and styles for the best user experience.

- **Open Source Focus:** Easy to clone, configure, and contribute.


## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/guide.git
cd guide
```

### 2. Install Dependencies

Make sure you have Node.js installed. Run:

```bash
npm install
```

### 3. Add Your API Specifications

Add your OpenAPI JSON files to the `public/specs` folder, or use public URLs in the configuration file.

Example:

```typescript
export default {
  specs: {
    "warp": "/specs/warp.json",
    "swagger petstore": "https://petstore3.swagger.io/api/v3/openapi.json"
  }
} as GlobalState;
```

### 4. Run the Development Server

Start the local server to view your project:

```bash
npm run dev
```

The project will be available at [http://localhost:3000](http://localhost:3000).

---

## 📂 Project Structure

```plaintext
├── public/
│   ├── specs/          # OpenAPI JSON specifications
│   ├── logo.svg        # Default logo
├── src/
│   ├── pages/          # HTML and JSX pages
│   ├── styles/         # TailwindCSS-based styles
│   ├── components/     # Reusable components
├── config.ts           # Project configuration file
├── README.md           # Project documentation
```

---

## 🎨 Customizing the Theme

### Logo and Theme Configuration

In the `config.ts` file, you can adjust logos and styles for light and dark themes:

```javascript
branding: {
  logo: '/logo.svg',
  theme: {
    dark: {
      logo: '/guide-logo-white.png',
      logoSize: 'h-8'
    },
    light: {
      logo: '/guide-logo-black.png',
      logoSize: 'h-8'
    }
  }
}
```

### Styling with TailwindCSS

Edit the styles in the `src/styles/tailwind.css` file to further customize the appearance of the project.

---

## 📜 Configuring Pages

Define the available pages in the `config.ts` file:

```javascript
pages: ['/', '/search', '/pages/readme', '/pages/changelog']
```

Create or edit page content in the `src/pages/` directory.

---

## 🌐 Adding OpenAPI Specifications

1. Place JSON files in the `public/specs` folder.

2. Or, use public URLs in the `specs` object in the `config.ts` file:

```javascript
specs: {
  "swagger petstore": "https://petstore3.swagger.io/api/v3/openapi.json"
}
```

The specifications will automatically load and display in the interface.

## 📋 Available Scripts

- **`npm run dev`**: Starts the development server.

- **`npm run build`**: Builds the project for production.

- **`npm run start`**: Starts the production server.

---

## 🤝 Contribution

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.

2. Create a branch for your feature/bugfix: `git checkout -b feature/your-feature-name`.

3. Make your changes and commit: `git commit -m "Description of the change"`.

4. Push your changes: `git push origin feature/your-feature-name`.

5. Open a Pull Request in the original repository.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🌟 Acknowledgments

Thank you for using **Guide**! For feedback or questions, feel free to reach out or open an issue in the official repository.

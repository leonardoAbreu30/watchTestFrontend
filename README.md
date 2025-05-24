# Watch Test Frontend

A modern todo web application built with Nuxt.js 3, Vue 3, and TailwindCSS. This application provides a user interface for the Watch Test system.

## Features

- 🚀 Built with Nuxt.js 3 and Vue 3
- 🎨 Styled with TailwindCSS for modern, responsive design
- 🔐 Authentication system with Pinia state management
- 📱 Fully responsive layout
- 🛠 TypeScript support for better development experience
- ☁️ Serverless architecture with AWS Lambda and S3
- 🔄 Automated deployments via GitHub Actions
- 🏗️ Infrastructure as Code using Terraform

## Instructions for Use

To use the Watch Test application:

1. **Registration**: Create a new account by visiting the registration page and providing your email and password.
2. **Login**: Once registered, log in to your account using your credentials.
3. **Managing Todos**: After logging in, you can:
   - Create new todos that will be associated with your account
   - View all your existing todos
   - Update the status of your todos
   - Delete todos you no longer need

Note: All todos are tied to your personal account, ensuring your data remains private and organized. You must be logged in to create, view, or manage your todos.

## Tech Stack

- **Framework**: [Nuxt.js 3](https://nuxt.com/)
- **UI Library**: [Vue.js 3](https://vuejs.org/)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Type Safety**: TypeScript
- **Routing**: Vue Router (integrated with Nuxt)
- **Cloud Infrastructure**: 
  - AWS Lambda for serverless functions
  - Amazon S3 for storage
  - Terraform for infrastructure management
- **CI/CD**: GitHub Actions

## Project Structure

```
watchTestFrontend/
├── assets/           # Static assets (images, styles, etc.)
├── components/       # Vue components
├── composables/      # Composable functions
├── layouts/          # Page layouts
├── middleware/       # Route middleware
├── pages/           # Application pages
├── plugins/         # Vue plugins
├── public/          # Public static files
├── server/          # Server-side code
├── stores/          # Pinia stores
└── types/           # TypeScript type definitions
```

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm, yarn, or pnpm package manager

## Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd watchTestFrontend
```

2. Install dependencies:

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

## Development

Start the development server on `http://localhost:3000`:

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev
```

## Building for Production

1. Build the application:

```bash
# Using npm
npm run build

# Using yarn
yarn build

# Using pnpm
pnpm build
```

2. Preview the production build:

```bash
# Using npm
npm run preview

# Using yarn
yarn preview

# Using pnpm
pnpm preview
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:
```env
API_BASE_URL=
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Documentation

For more detailed information about the technologies used:

- [Nuxt.js Documentation](https://nuxt.com/docs)
- [Vue.js Documentation](https://vuejs.org/guide/introduction.html)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Pinia Documentation](https://pinia.vuejs.org/)

## Infrastructure & Deployment

This application uses a modern cloud-native architecture:

- **Backend Services**: AWS Lambda functions handle the application's serverless backend
- **Storage**: Amazon S3 buckets are used for data storage
- **Infrastructure as Code**: All cloud resources are managed using Terraform, ensuring consistent and version-controlled infrastructure
- **Continuous Deployment**: GitHub Actions automate the deployment process, providing:
  - Automated testing
  - Infrastructure provisioning
  - Application deployment
  - Environment management

The infrastructure code and deployment configurations are maintained in the repository, following infrastructure as code best practices.

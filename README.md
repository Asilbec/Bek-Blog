# Next.js Tailwind CSS Sanity Blog

This is a blog application built using Next.js, Tailwind CSS, and Sanity.io. The application provides a simple, easy-to-use interface for creating and managing blog posts. 

## Installation

To use this application, you will need to have Node.js installed on your machine. Once Node.js is installed, follow these steps:

1. Clone the repository to your local machine.
2. Run `npm install` to install the necessary dependencies.
3. Create a new `.env.local` file at the root of the project and add your Sanity.io project ID and dataset name as follows:

```
SANITY_PROJECT_ID=<your-project-id>
SANITY_DATASET=<your-dataset-name>
```

4. Start the development server by running `npm run dev`.

## Usage

Once the development server is running, you can access the application at `http://localhost:3000`. From there, you can create new blog posts, edit existing posts, and delete posts. 

The application uses Sanity.io as the content management system. To modify the content, you will need to create an account on [sanity.io](https://www.sanity.io/) and create a new project. You can then update the `schema.js` file in this repository to match your content model.

## Contributing

Contributions are welcome! If you find a bug or have an idea for a new feature, please submit an issue or create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

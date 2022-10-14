# The Agency is a Qwik App ⚡️

The Agency is a small app that shows how to build a Qwik/QwikCity app
with Web API to handle CRUD operations. 
For more information about Qwik -

- [Qwik Docs](https://qwik.builder.io/)
- [Discord](https://qwik.builder.io/chat)
- [Qwik Github](https://github.com/BuilderIO/qwik)
- [@QwikDev](https://twitter.com/QwikDev)
- [Vite](https://vitejs.dev/)
- [Partytown](https://partytown.builder.io/)
- [Mitosis](https://github.com/BuilderIO/mitosis)
- [Builder.io](https://www.builder.io/)

---

## Project Structure

Inside of you project, you'll see the following directories and files:

```
├── public/
│   └── images
│   └── ...
└── src/
    ├── components/
    │   └── ...
    └── models/
        └── ...
    └── routes/
        └── ...
    └── services/
        └── ...
    └── types/
        └── ...
    └── utils/
        └── ...
```

- `src/routes`: Provides the directory based routing, which can include a hierarchy of `layout.tsx` layout files, and `index.tsx` files as the page. Additionally, `index.ts` files are endpoints. Please see the [routing docs](https://qwik.builder.io/qwikcity/routing/overview/) for more info.

- `src/components`: Recommended directory for components. The components folder is divided into pages and shared folders. The pages folder includes all the different app page implementation. The shared folder includes shared components that can be reused by all the pages components.

- `src/models`: The different models that are used in the app: Agent and Task.

- `src/services`: Provides services that are used in the app. The implementation includes an agents repository and a task repository to handle all the work of CRUD operations against a data source (which is a simple in memory data source).

- `src/types`: Types that are used in the app which aren't related to the models.

- `src/utils`: Utility functions.

- `public`: Any static assets, like images, can be placed in the public directory. Please see the [Vite public directory](https://vitejs.dev/guide/assets.html#the-public-directory) for more info.

## Add Integrations

Use the `npm run qwik add` command to add other integrations. Some examples of integrations include as a Cloudflare, Netlify or Vercel server, and the Static Site Generator (SSG).

```
npm run qwik add
```

## Development

Development mode uses [Vite's development server](https://vitejs.dev/). For Qwik during development, the `dev` command will also server-side render (SSR) the output. The client-side development modules loaded by the browser.

```
npm run dev
```

> Note: during dev mode, Vite will request many JS files, which does not represent a Qwik production build.

## Preview

The preview command will create a production build of the client modules, production build of `src/entry.preview.tsx`, and create a local server. The preview server is only for convenience to locally preview a production build, but it should not be used as a production server.

```
npm run preview
```

## Production

The production build should generate the client and server modules by running both client and server build commands. Additionally, the build command will use Typescript run a type check on the source.

```
npm run build
```

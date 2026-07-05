# ImageDrop Studio

ImageDrop Studio is a React upload workspace for testing single-image and
multi-image upload flows. It gives users drag-and-drop selection, local image
previews, upload progress states, success toasts, and links to hosted image
URLs returned by the upload API.

## Features

- Single image upload flow for avatar, profile, or cover-image style uploads.
- Multi-image upload flow for gallery or product-image batches.
- Drag-and-drop and file-picker input support.
- Local previews before upload.
- Uploaded image preview and direct hosted URL links after success.
- Configurable API base URL through Vite environment variables.

## Tech Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

## Getting Started

```sh
npm install
npm run dev
```

The app expects an upload API with these routes:

- `POST /api/image` for a single file in the `file` form field. The response
  should include `{ "filePath": "/path-or-url" }`.
- `POST /api/aws-uploads` for multiple files in the `files` form field. The
  response should be an array of hosted image URLs.

## Configuration

Create a local `.env` file if you need to point the app at another API:

```sh
VITE_UPLOAD_API_URL=https://api.example.com
```

If the variable is not set, the app falls back to the existing hosted demo API.

## Scripts

```sh
npm run dev
npm run build
npm run lint
npm run preview
```

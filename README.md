# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
npx sv@0.15.1 create --template minimal --types ts --add prettier eslint tailwindcss="plugins:typography" --install npm blog-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

### Full-viewport layout inside a scrollable parent

I wanted the post edit page to fill the viewport with only the editor
content scrolling — fixed title at the top, fixed toolbar, scrollable
body in the middle, fixed save bar at the bottom. A classic flex-column
layout with one `flex-1 overflow-y-auto` child.

The catch: flex containment requires an **unbroken chain** of
`overflow-hidden` from the viewport down to the scrollable element. If
any ancestor lets content overflow, every descendant's containment
becomes meaningless and you get a page-level scroll instead.

The dashboard `(dashboard)/+layout.svelte` uses `min-h-screen` with
natural flow, which is correct for every other dashboard page — post
list, new post — that expects the page to grow and scroll normally.
Forcing the whole layout to `h-screen overflow-hidden` would break all
of those.

**The fix was to take `EditMode` out of flow entirely:**

```svelte
<section class="fixed inset-x-0 top-14 bottom-0 flex flex-col overflow-hidden bg-background">
	<form class="mx-auto flex w-full max-w-4xl flex-1 flex-col overflow-hidden px-6 py-6">
		<!-- title, toolbar, editor, bottom bar -->
	</form>
</section>
```

`fixed inset-x-0 bottom-0 top-14` positions the section flush to the
viewport, starting 56px below the top to clear the header. Because it's
fixed, it escapes every parent's layout constraints and gets a real
fixed height from the viewport itself — which is what flex column
layout needs to distribute space properly.

Inside, `mx-auto max-w-4xl px-6` on the form keeps the same centered
width as the rest of the dashboard, so the page looks visually
continuous even though it's technically a layout escape hatch.

**Takeaway:** when you need one page to behave like a full-viewport app
while sibling pages use normal document flow, don't fight the parent
layout — step outside it with `fixed` positioning. Trying to retrofit
`overflow-hidden` up the tree breaks everything above.

## Handy copy

<script lang="ts">
</script>

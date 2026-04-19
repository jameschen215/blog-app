<script lang="ts">
	import type { PageProps } from './$types';
	import Article from './Article.svelte';
	import ArticleControls from './ArticleControls.svelte';
	import CommentsSection from './CommentsSection.svelte';

	let { data, form }: PageProps = $props();

	let post = $derived(data.post);
	let user = $derived(data.user);

	let commentSection: CommentsSection;

	function handleCommentClick() {
		commentSection?.scrollIntoView();
		commentSection?.focus();
	}
</script>

<svelte:head>
	<title>{post.title} - The Blog</title>
	<meta name="description" content={post.content.replace(/<[^>]*>/g, '').slice(0, 160)} />
</svelte:head>

<div class="w-full px-6 pb-20">
	<Article {post} />
	<ArticleControls {post} {user} {handleCommentClick} />
	<CommentsSection {user} {post} {form} bind:this={commentSection} />
</div>

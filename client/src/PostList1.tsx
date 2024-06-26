import { getPosts } from "./api/posts"
import { useQuery } from "@tanstack/react-query"

export default function PostList1() {
	const postsQuery = useQuery({
		queryKey: ["posts"],
		queryFn: getPosts
	})

	if (postsQuery.isLoading) return <h1>Loading...</h1>

	if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>

	return (
		<div>
			<h1>Post List 1</h1>
			<ol>
				{postsQuery.data.map((post) => (
					<li key={post.id}>{post.title}</li>
				))}
			</ol>
		</div>
	)
}

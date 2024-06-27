import { getPost } from "./api/posts"
import { getUser } from "./api/users"
import { useQuery } from "@tanstack/react-query"

export default function Post({ id }: { id: any }) {
	const postQuery = useQuery({
		queryKey: ["post", id],
		queryFn: () => getPost(id)
	})

	const userQuery = useQuery({
		queryKey: ["users", postQuery?.data?.userId],
		enabled: postQuery?.data?.userId != null,
		queryFn: () => getUser(postQuery.data.userId)
	})

	if (postQuery.isLoading) {
		return <h1>Loading...</h1>
	}

	if (postQuery.isError) {
		return <h1>{JSON.stringify(postQuery.error)}</h1>
	}

	return (
		<>
			<h1>
				{postQuery.data.title} <br />
				<small>
					{postQuery.data.userId}
					{userQuery.isLoading
						? "Loading User..."
						: userQuery.isError
						? "Error"
						: userQuery.data.name}
				</small>
			</h1>
			<p>{postQuery.data.body}</p>
		</>
	)
}

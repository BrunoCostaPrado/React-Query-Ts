import { useMutation, useQueryClient } from "@tanstack/react-query"

import Post from "./Post"
import { createPost } from "./api/posts"
import { useRef } from "react"

export function CreatePost({ setCurrentPage }: { setCurrentPage: any }) {
	const titleRef: any = useRef()
	const bodyRef: any = useRef()
	const queryClient = useQueryClient()

	const createPostMutation = useMutation({
		mutationFn: createPost,
		onSuccess: (data) => {
			queryClient.setQueriesData({ queryKey: ["posts", data.id] }, data)
			queryClient.invalidateQueries({ queryKey: ["posts"], exact: true })
			setCurrentPage(<Post id={data.id} />)

			console.log(data)
		}
	})

	function handleSubmit(e: { preventDefault: () => void }) {
		e.preventDefault()
		createPostMutation.mutate({
			title: titleRef.current.value,
			body: bodyRef.current.value
		})
	}

	return (
		<div>
			{createPostMutation.isError && JSON.stringify(createPostMutation.error)}
			<h1>Create Post</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="title">Title</label>
					<input id="title" ref={titleRef} />
				</div>
				<div>
					<label htmlFor="body">Body</label>
					<input id="body" ref={bodyRef} />
				</div>
				<button disabled={createPostMutation.isPending}>
					{createPostMutation.isPending ? "Loading..." : "Create"}
				</button>
			</form>
		</div>
	)
}

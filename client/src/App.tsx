import Post from "./Post"
import PostList1 from "./PostList1"
import PostList2 from "./PostList2"
import { useState } from "react"

function App() {
	const [currentPage, setCurrentPage] = useState(<PostList1 />)

	return (
		<div>
			<button onClick={() => setCurrentPage(<PostList1 />)}>PostList1</button>
			<button onClick={() => setCurrentPage(<PostList2 />)}>PostList2</button>
			<button onClick={() => setCurrentPage(<Post id={1} />)}>First Post</button>

			<br />
			{currentPage}
		</div>
	)
}

export default App

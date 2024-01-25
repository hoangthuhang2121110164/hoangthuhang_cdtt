import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostServices from "../../../services/PostServices";
import PostItem from "./PostItem";

function Post() {
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(4);
  useEffect(
    function () {
      (async function () {
        try {
          const result = await PostServices.getPostAll("post", limit);
          setPosts(result.posts);
        } catch (error) {
          console.error(error);
        }
      })();
    },
    [limit, slug]
  );
  return (
    <section className="maincontent">
      <h3 className="text-center m-4">BAI VIET</h3>
      <div className="container my-3">
        <div className="row">
          {posts.map(function (post, index) {
          return <PostItem key={index} post={post}/>
          })}
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center my-4">
          <button
            onClick={() => setLimit(limit + 8)}
            className="btn btn-success"
          >
            Xem them
          </button>
        </div>
      </div>
    </section>
  );
}
export default Post;

import Post from "../Post/Post";
import { useSelector } from "react-redux";
import { Row, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";

const Posts = () => {
  const { posts } = useSelector((state) => state.postsReducer);
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );

  return (
    <>
      {!posts?.length ? (
        <div className="w-100 text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row className="d-flex flex-wrap">
          {posts?.map((post) => {
            // console.log(post);
            if (post) {
              return <Post key={post._id} post={post} profile={profile} />;
            }
          })}
        </Row>
      )}
    </>
  );
};

export default Posts;

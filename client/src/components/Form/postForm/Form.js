import { useState } from "react";
import { useDispatch } from "react-redux";
import Col from "react-bootstrap/Col";
import { createPost } from "../../../actions/posts";
import PostForm from "./PostForm";
import FormStyled from "./FormStyled.styled";

const Form = () => {
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const [newPost, setNewPost] = useState({
    creator: `${profile?.firstName} ${profile?.lastName}`,
    title: "",
    tags: [],
    message: "",
    selectedFile: "",
  });

  const dispatch = useDispatch();

  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(newPost));
  };

  const clearForm = () => {};

  return (
    <>
      <FormStyled className="col-6">
        {!profile ? (
          <NotProfile />
        ) : (
          <PostForm
            handlerSubmit={handlerSubmit}
            newPost={newPost}
            setNewPost={setNewPost}
            clearForm={clearForm}
          />
        )}
      </FormStyled>
    </>
  );
};

export default Form;

const NotProfile = () => {
  return (
    <>
      <Col className="col-12 bg-light text-center py-4 text-secondary">
        you should have an account to create posts.
      </Col>
    </>
  );
};

import { useDispatch, useSelector } from "react-redux";
import { Container, Col, Row, Spinner } from "react-bootstrap";
import Posts from "../Posts/Posts";
import Form from "../Form/postForm/Form";
import SearchForm from "../Form/searchForm/Form";
import LayoutStyled from "./LayoutStyled.styled";
import { Pagination } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { getPosts } from "../../actions/posts";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const Layout = () => {
  const query = useQuery();
  const [page, setPage] = useState(query.get("page") || 1);
  const [isLoading, setIsLoading] = useState(false);
  const { posts, count } = useSelector((state) => state.postsReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event, value) => {
    setIsLoading(true);
    setPage(value);
  };

  useEffect(() => {
    dispatch(getPosts(page));
    // navigate(`/posts?page=${page}`);
  }, [dispatch, page]);

  useEffect(() => {
    setIsLoading(false);
  }, [posts, count]);

  return (
    <>
      <LayoutStyled>
        <div className="container-flued px-3 mt-5">
          <Row className="content">
            <Col className="col-12 col-md-12 col-lg-9">
              {isLoading ? (
                <div className="text-center">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : (
                <Posts />
              )}
            </Col>
            <Col className="form col-12 col-lg-3 d-flex d-lg-block flex-wrap">
              <Col>
                <SearchForm page={page} />
              </Col>
              <Col>
                <Form />
              </Col>
              <Col className="pagination my-3 py-3 d-flex justify-content-center col-12">
                <Pagination
                  count={
                    count &&
                    (count % 10 !== 0 ? parseInt(count / 10) + 1 : count / 10)
                  }
                  color="primary"
                  onChange={handleChange}
                />
              </Col>
            </Col>
          </Row>
        </div>
      </LayoutStyled>
    </>
  );
};
export default Layout;

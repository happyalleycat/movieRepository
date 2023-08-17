import { useEffect, useRef } from "react";
import Services from "../../api/axiosConfig";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { ReviewForm } from "../reviewForm/ReviewForm";
import React from "react";
import { Actions } from "../../actions/Action";

const Reviews = ({ movie, setMovie, reviews, setReviews }) => {
  const revText = useRef();
  let params = useParams();
  const movieId = params.movieId;
  useEffect(() => {
    Actions.getMovieData(movieId, setMovie, setReviews);
  }, []);

  const addReview = async (e) => {
    try {
      e.preventDefault();
      const rev = revText.current;
      const response = await Services.movieService.post("/api/v1/reviews", {
        reviewBody: rev.value,
        imdbId: movieId,
      });
      const updatedReviews =
        reviews != null
          ? [...reviews, { body: rev.value }]
          : [{ body: rev.value }];

      rev.value = "";
      setReviews(updatedReviews);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3>Reviews</h3>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <img src={movie?.poster} alt="" />
        </Col>
        <Col>
          {
            <>
              <Row>
                <Col>
                  <ReviewForm
                    handleSubmit={addReview}
                    revText={revText}
                    labelText="Wanna write a review?"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>
            </>
          }
          {reviews?.map((r) => {
            return (
              <>
                <Row key={r.id}>
                  <Col>{r.body}</Col>
                </Row>
              </>
            );
          })}
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default Reviews;

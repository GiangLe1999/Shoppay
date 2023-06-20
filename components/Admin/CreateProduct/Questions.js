import React, { useState } from "react";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";

import styled from "./styles.module.scss";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default function Questions({ questions, product, setProduct }) {
  const changeQuestionHandler = (i, e) => {
    const values = [...questions];
    values[i][e.target.name] = e.target.value;
    setProduct({ ...product, questions: values });
  };

  const removeHandler = (i) => {
    const values = [...questions];
    values.splice(i, 1);
    setProduct({ ...product, questions: values });
  };

  return (
    <div className={styled.questions}>
      {questions.length === 0 && (
        <div className={styled.sizes__guide}>
          <span>
            Click{" "}
            <button
              type="button"
              onClick={() =>
                setProduct({
                  ...product,
                  questions: [...questions, { question: "", answer: "" }],
                })
              }
            >
              here
            </button>{" "}
            to add more question
          </span>
        </div>
      )}

      {questions
        ? questions.map((question, i) => (
            <div className={styled.sizes__row} key={i}>
              <div className={styled.sizes__row_actions}>
                <div
                  className={styled.sizes__row_action}
                  onClick={() =>
                    setProduct({
                      ...product,
                      questions: [...questions, { question: "", answer: "" }],
                    })
                  }
                >
                  <AiOutlinePlusSquare /> Add more question
                </div>
                <div
                  className={styled.sizes__row_action2}
                  onClick={() => removeHandler(i)}
                >
                  <AiOutlineMinusSquare />
                  Remove this question
                </div>
              </div>

              <div className={`${styled.clickToAdd} ${styled.clickToAdd3}`}>
                <input
                  type="text"
                  name="question"
                  placeholder="Question"
                  value={question.name}
                  onChange={(e) => changeQuestionHandler(i, e)}
                />
                <input
                  type="text"
                  name="answer"
                  placeholder="Answer"
                  min={1}
                  value={question.value}
                  onChange={(e) => changeQuestionHandler(i, e)}
                />
              </div>
            </div>
          ))
        : ""}
    </div>
  );
}

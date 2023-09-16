import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import { useEffect } from "react";

function DiaryItem({ id, date, selectedEmotion, content }) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(id, date, selectedEmotion, content);
  }, [id, date, selectedEmotion, content]);

  return (
    <div className="DiaryItem">
      <div
        className={[
          `emotion_img_wrapper emotion_img_wrapper_${selectedEmotion}`,
        ]}
        onClick={() => {
          navigate(`/emotion-diary/detail/${id}`);
        }}
      >
        <img
          src={`${
            import.meta.env.BASE_URL
          }assets/emotion${selectedEmotion}.png`}
          alt=""
        />
      </div>
      <div
        className="info_wrapper"
        onClick={() => {
          navigate(`/emotion-diary/detail/${id}`);
        }}
      >
        <div className="diary_date">{date}</div>
        <div className="diary_content_preview">{content}</div>
      </div>
      <div className="btn_wrapper">
        <MyButton
          text={"수정하기"}
          onClick={() => {
            navigate(`${import.meta.env.BASE_URL}edit/${id}`);
          }}
        />
      </div>
    </div>
  );
}

export default DiaryItem;

import HintContainer from "../../components/hintContainer/HintCotainer";
import styles from "./Quiz.module.scss";
import { useRecoilState, useSetRecoilState } from "recoil";
import { headerTitleState } from "../../state/headerTitleState";
import { useEffect } from "react";

const QuizNameContainer = () => {
  const setHeaderTitle = useSetRecoilState(headerTitleState);

  useEffect(() => {
    setHeaderTitle("문제");
  }, [setHeaderTitle]);

  return (
    <div className={styles.quizNameContainer}>
      <div className={styles.quizInfo}>
        <div className={styles.quizTitle}>문제제목</div>
        <div className={styles.quizPersonal}>
          <div className={styles.bookmark}>
            <svg
              width="26"
              height="32"
              viewBox="0 0 26 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.75 0.416656H22.9167C23.6681 0.416656 24.3888 0.715168 24.9201 1.24652C25.4515 1.77787 25.75 2.49854 25.75 3.24999V25.9167L22.9167 24.6842V3.24999H5.91667C5.91667 2.49854 6.21518 1.77787 6.74653 1.24652C7.27788 0.715168 7.99855 0.416656 8.75 0.416656ZM17.25 27.3333V8.91666H3.08333V27.3333L10.1667 24.245L17.25 27.3333ZM17.25 6.08332C18.8225 6.08332 20.0833 7.35832 20.0833 8.91666V31.5833L10.1667 27.3333L0.25 31.5833V8.91666C0.25 8.16521 0.548511 7.44454 1.07986 6.91319C1.61122 6.38183 2.33189 6.08332 3.08333 6.08332H17.25Z"
                fill="#C2BCCA"
              />
            </svg>
            <div>찜</div>
          </div>
          <div className={styles.solved}>
            <svg
              width="29"
              height="25"
              viewBox="0 0 29 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.2425 24.2401C9.84844 24.6537 9.18856 24.6537 8.7945 24.2401L0.657224 15.6995C0.28922 15.3132 0.28922 14.7061 0.657223 14.3198L3.61267 11.2179C4.00713 10.8039 4.66783 10.8044 5.06168 11.219L8.79419 15.1481C9.18818 15.5628 9.84916 15.5632 10.2435 15.1488L23.9383 0.760637C24.3323 0.346698 24.9924 0.346531 25.3866 0.760272L28.3428 3.86296C28.7108 4.24921 28.7108 4.85632 28.3428 5.24257L10.2425 24.2401Z"
                fill="#C2BCCA"
              />
            </svg>
            <div>품</div>
          </div>
        </div>
      </div>
      <div className={styles.timer}>
        <svg
          width="34"
          height="40"
          viewBox="0 0 34 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.65348 10.9047L22.2439 20.1447L6.65348 29.3847V10.9047ZM0.736816 0.894745V39.3947L33.2785 20.1447"
            fill="#6700E6"
          />
        </svg>
        <div>timer</div>
      </div>
    </div>
  );
};
const TimerContainer = () => {
  return <div>큰 타이머</div>;
};
export default function Quiz() {
  return (
    <div className={styles.quizContainer}>
      <QuizNameContainer />
      <TimerContainer />
      <HintContainer
        hintTitle={"힌트 1"}
        hintContent={"풀어줘요"}
        isOpen={true}
      />
      <HintContainer
        hintTitle={"힌트 2"}
        hintContent={"여기는무슨힌트가숨겨져이씅ㄹ까?"}
      />
      <HintContainer
        hintTitle={"힌트 3"}
        hintContent={"컴포넌트 테스트용"}
        isAdmin={true}
      />
    </div>
  );
}

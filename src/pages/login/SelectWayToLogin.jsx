import styles from "./SelectWayToLogin.module.scss";

import { useNavigate } from "react-router-dom";

export default function SelectWayToLogin() {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.container}>
        <div>* 로그인 방식 선택 페이지 *</div>
        <div>로고</div>
        <div
          onClick={() => {
            console.log("구글");
          }}
        >
          구글 계정으로 로그인
        </div>
        <div
          onClick={() => {
            console.log("네이버");
          }}
        >
          네이버 계정으로 로그인
        </div>
        <div
          onClick={() => {
            console.log("카카오");
          }}
        >
          카카오 계정으로 로그인
        </div>

        <div
          onClick={() => {
            navigate("/login/by-email");
          }}
        >
          이메일로 로그인
        </div>
      </div>
    </>
  );
}

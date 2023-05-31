import styles from "./Password.module.scss";

const PassWord = () => {
  return (
    <div className={styles.pwdContainer}>
      <p className={styles.pwdTitle}>비밀번호 변경</p>
      <div className={styles.inputsContainer}>
        <div className={styles.inputBox} id={styles.presentPwd}>
          <input placeholder="현재 비밀번호" />
        </div>
        <div className={styles.inputBox}>
          <input placeholder="비밀번호" />
          <p>영문 대소문자 포함 8~12자리</p>
        </div>
        <div className={styles.inputBox}>
          <input placeholder="비밀번호 확인" />
          <p>비밀번호가 일치하지 않습니다</p>
        </div>
        <button>변경하기</button>
      </div>
    </div>
  );
};

export default PassWord;

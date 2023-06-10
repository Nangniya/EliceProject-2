import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { LuSprout } from "react-icons/lu";
import { FaGraduationCap } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { headerTitleState } from "../../state/headerTitleState";
import { useEffect } from "react";
import { Modal } from "../../components/modal";
import chart from "../../image/chart-bar.png";
import book from "../../image/book-account-outline.png";
import axios from "axios";

const User = () => {

  let navigate = useNavigate();
  return (
    <div className={styles.userInfo}>
      <div className={styles.profileImg}>
        <img src="" alt="프사" />
      </div>
      <div style={{ display: "flex" }}>
        <h3>코드의 신,</h3>
        <h3>낭니</h3>
      </div>
      <button>
        <MdOutlineKeyboardArrowRight
          onClick={() => navigate("/mypage/modify")}
        />
      </button>
    </div>
  );
};

const Grade = ({ openModal }) => {
  return (
    <div className={styles.gradeInfo}>
      <div className={styles.gradeImg}>
        <img src="" alt="등급 아이콘" />
      </div>
      <h3>등급별 혜택보기</h3>
      <button onClick={openModal}>
        <MdOutlineKeyboardArrowRight />
      </button>
    </div>
  );
};

const Menu = () => {
  let navigate = useNavigate();
  return (
    <div className={styles.menuContainer}>
      <div
        className={styles.menuContent}
        onClick={() => navigate("/mypage/bookmark")}
      >
        <svg
          width="43"
          height="52"
          viewBox="0 0 43 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.375 0.333313H38.125C39.3848 0.333313 40.593 0.824978 41.4838 1.70015C42.3746 2.57532 42.875 3.7623 42.875 4.99998V42.3333L38.125 40.3033V4.99998H9.625C9.625 3.7623 10.1254 2.57532 11.0162 1.70015C11.907 0.824978 13.1152 0.333313 14.375 0.333313ZM28.625 44.6666V14.3333H4.875V44.6666L16.75 39.58L28.625 44.6666ZM28.625 9.66665C31.2612 9.66665 33.375 11.7666 33.375 14.3333V51.6666L16.75 44.6666L0.125 51.6666V14.3333C0.125 13.0956 0.625445 11.9087 1.51624 11.0335C2.40704 10.1583 3.61522 9.66665 4.875 9.66665H28.625Z"
            fill="#3E3E3E"
          />
        </svg>

        <p>내가 찜한 문제</p>
      </div>
      <div
        className={styles.menuContent}
        onClick={() => navigate("/mypage/complete")}
      >
        <svg
          width="57"
          height="49"
          viewBox="0 0 57 49"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.4318 48.2433C19.0379 48.6555 18.3796 48.6555 17.9857 48.2433L0.660044 30.1097C0.290749 29.7232 0.290748 29.1146 0.660044 28.7281L7.8018 21.2534C8.19608 20.8407 8.85521 20.8412 9.24888 21.2544L17.9854 30.4254C18.3792 30.8388 19.0386 30.8391 19.4329 30.4261L47.7511 0.757486C48.1449 0.344901 48.8035 0.344737 49.1975 0.757123L56.34 8.2326C56.7093 8.61912 56.7093 9.22773 56.34 9.61424L19.4318 48.2433Z"
            fill="#3E3E3E"
          />
        </svg>

        <p>내가 푼 문제</p>
      </div>
      <div
        className={styles.menuContent}
        onClick={() => navigate("/mypage/chart")}
      >
        <img src={chart} alt="통계" />

        <p>통계</p>
      </div>
      <div
        className={styles.menuContent}
        onClick={() => navigate("/mypage/mypost")}
      >
        <img src={book} alt="내가 작성한 글" />

        <p>내가 작성한 글</p>
      </div>
    </div>
  );
};

const LogOut = () => {
  return <p className={styles.logout}>로그아웃</p>;
};

const MyPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <User />
      <Grade openModal={openModal} />
      <Menu />
      <LogOut />
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <GiCancel className={styles.closeBtn} onClick={closeModal} />
        <div className={styles.gradeContainer}>
          <div className={styles.gradeBox}>
            <div className={styles.gradeProfile}>
              <FaGraduationCap className={styles.gradeIcon} />
              <p>코드 멘토</p>
            </div>
            <div className={styles.description}>힌트 등록, 수정 가능</div>
          </div>
          <div className={styles.gradeBox}>
            <div className={styles.gradeProfile}>
              <LuSprout className={styles.gradeIcon} />
              <p>코드 멘티</p>
            </div>
            <div className={styles.description}>힌트 열람만 가능</div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MyPage;

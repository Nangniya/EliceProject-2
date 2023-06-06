import styles from "./FindPassword.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import PATH from "../../constants/path.js";
import {
  isPassValidation,
  alertValidationMessage,
  makeEmailValidationMessage,
  axiosInterceptors,
} from "../../hooks/useLogin.js";

export default function FindPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const emailInput = useRef();
  const focusRef = { email: emailInput };
  const [formInputValue, setFormInputValue] = useState({ email: "" });
  const { email } = formInputValue;
  const [validationMessage, setValidationMessage] = useState({ email: "" });

  axiosInterceptors();

  const handleOnChangeEmailInput = (e) => {
    setFormInputValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOnClickSubmitButton = (e) => {
    e.preventDefault();

    if (!isPassValidation(formInputValue)) {
      alertValidationMessage(validationMessage, focusRef);

      return;
    }

    // 비밀번호 찾기 통과 -> 인증 페이지로 이메일을 넘김(navigate)

    const url = "https://eonaf45qzbokh52.m.pipedream.net";
    const data = { email };

    // * 아이디 등록 여부 확인 & 인증 코드 발송 요청.
    // - 각각을 처리하는 api가 나뉜다면 요청을 두 번 날려야 할까?
    // - ㄴㄴ. api를 정해주면 어떤 요청인지 서버가 인지할 것. 아마도.
    axios
      .post(url, data)
      .then((response) => {
        // 아이디 등록 여부 확인.
        // - 없음 -> alert -> return;
        // - 있음 -> 서버에서 사용자 메일 인증 과정 실행.
        if (response.data.result === "이메일이 db에 등록되어 있지 않음.") {
          alert("등록되지 않은 이메일입니다. 이메일을 다시 확인해주세요.");

          return;
        }

        // if (response.data.result === "인증 메일 발송") {
        // - 개발용 true 임시 설정
        if (true) {
          navigate(PATH.LOGIN + "/verify-email", {
            state: {
              // 다음 페이지에 넘길 정보
              // - email
              //  - 이메일 인증 페이지에서 사용자 id 출력.
              //  - 이메일 인증 페이지에서 인증 중인 사용자 식별.
              // - previousPageUr
              //  - 이메일 인증 완료 후 이전 페이지를 기반으로 다음 페이지 결정.
              email,
              previousPageUrl: location.pathname,
            },
          });

          return;
        }
      })
      .catch((error) => {
        console.log(error);

        alert("서버와의 통신에 실패했습니다. 다시 시도해주세요.");
      });
  };

  useEffect(() => {
    emailInput.current.focus();
  }, []);

  useEffect(() => {
    const newMessage = makeEmailValidationMessage(email);

    setValidationMessage((prev) => ({
      ...prev,
      email: newMessage,
    }));
  }, [email]);

  return (
    <>
      <div>* 비밀번호 찾기 페이지 *</div>
      <div>비밀번호 찾기</div>
      <form>
        <label htmlFor="emailInput">이메일</label>
        <input
          type="text"
          name="email"
          id="emailInput"
          placeholder="가입 시 사용한 이메일을 입력해주세요"
          ref={emailInput}
          onChange={handleOnChangeEmailInput}
        />
        <div>{validationMessage.email}</div>
        <input
          type="submit"
          value="확인"
          onClick={handleOnClickSubmitButton}
        ></input>
      </form>
    </>
  );
}

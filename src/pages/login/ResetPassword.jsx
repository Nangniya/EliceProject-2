import styles from "./ResetPassword.module.scss";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import PATH from "../../constants/path";
import {
  isPassValidation,
  alertValidationMessage,
  makePasswordValidationMessage,
  makePasswordConfirmValidationMessage,
} from "../../hooks/useLogin.js";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const location = useLocation();
  const passwordInput = useRef();
  const passwordConfirmInput = useRef();
  const focusRef = {
    password: passwordInput,
    passwordConfirm: passwordConfirmInput,
  };
  const [formInputValue, setFormInputValue] = useState({
    password: "",
    passwordConfirm: "",
  });
  const { password, passwordConfirm } = formInputValue;
  const [validationMessage, setValidationMessage] = useState({
    password: "",
    passwordConfirm: "",
  });
  const navigate = useNavigate();

  const handleOnChangePasswordInput = (e) => {
    setFormInputValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOnChangePasswordConfirmInput = (e) => {
    setFormInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnClickSubmitButton = (e) => {
    e.preventDefault();

    if (!isPassValidation(formInputValue)) {
      alertValidationMessage(validationMessage, focusRef);

      return;
    }

    const data = {
      // 사용자가 인증 링크를 클릭하고 비밀번호 재설정 페이지로 리다이렉트 된다면 사용자 email은 어떻게 가져와야 할까..?
      // - 몰라..
      password: password,
    };

    const url = "https://eonaf45qzbokh52.m.pipedream.net";

    axios
      .post(url, data)
      .then((response) => {
        // if (response.data.result === "비밀번호 재설정 완료") {
        // 개발용 true 임시 설정
        if (true) {
          alert(
            "비밀번호 재설정이 완료되었습니다. 로그인 페이지로 이동합니다."
          );
          navigate(PATH.LOGIN);

          return;
        }

        alert("비밀번호 재설정에 실패했습니다. 비밀번호를 다시 확인해주세요.");
      })
      .catch((error) => {
        console.log(error);
        alert("서버 문제로 비밀번호 재설정에 실패했습니다. 다시 시도해주세요.");
      });
  };

  useEffect(() => {
    if (location.state === null) {
      alert("잘못된 접근입니다.");
      navigate(PATH.MAIN);

      return;
    }

    setEmail(location.state.email);
    return;
  }, []);

  useEffect(() => {
    passwordInput.current.focus();
  }, []);

  useEffect(() => {
    const newMessage = makePasswordValidationMessage(password);

    setValidationMessage((oldMessage) => ({
      ...oldMessage,
      password: newMessage,
    }));
  }, [password]);

  useEffect(() => {
    const newMessage = makePasswordConfirmValidationMessage(
      password,
      passwordConfirm
    );

    setValidationMessage((oldMessage) => ({
      ...oldMessage,
      passwordConfirm: newMessage,
    }));
  }, [passwordConfirm]);

  return (
    <>
      <div>* 비밀번호 재설정 페이지 *</div>
      <div>비밀번호 재설정</div>
      <form>
        <label htmlFor="password">새로운 비밀번호</label>
        <input
          type="password"
          name="password"
          id="password"
          ref={passwordInput}
          placeholder="새로운 비밀번호를 입력해주세요."
          onChange={handleOnChangePasswordInput}
        />
        <div>{validationMessage.password}</div>
        <label htmlFor="passwordConfirm">비밀번호 확인</label>
        <input
          type="password"
          name="passwordConfirm"
          id="passwordConfirm"
          ref={passwordConfirmInput}
          placeholder="비밀번호를 확인해주세요."
          onChange={handleOnChangePasswordConfirmInput}
        />
        <div>{validationMessage.passwordConfirm}</div>
        <input type="submit" value="확인" onClick={handleOnClickSubmitButton} />
      </form>
    </>
  );
}

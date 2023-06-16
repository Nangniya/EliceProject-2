import styles from './adminUpdate.module.scss';
import HintContainer from "../../components/hintContainer/HintCotainer";
import { useEffect, useRef, useState, useCallback } from 'react';
import { SmallVioletButton } from '../../components/buttons/SmallVioletButton';
import { useLocation } from 'react-router-dom';
import AdminHintContainer from '../admin/adminHintContainer';
import { UserInput } from '../../components/inputs/UserInput';
import axios from 'axios';

export default function ProblemUpdatePage() {
  const buttonRef = useRef();
  
  const location = useLocation();
  // URL 매개변수에서 퀴즈 정보 추출
  const queryParams = new URLSearchParams(location.search);
  const quizId = queryParams.get('quizId');
  
  
  // problem reserved schema
  // const dummyTest =  [
  //   {
  //     "id": 1,
  //     "category": 0,
  //     "title": "3085 사탕 게임 - 1",
  //     "problemUrl": "https://www.acmicpc.net/problem/3085",
  //     "difficulty": 3,
  //     "timer": 20,
  //     "hintContent": "1단계 힌트",
  //     "hintLevel": 1
  //   },
  // ];
  const [quizInfo, setQuizInfo] = useState({});
  console.log("🚀 ~ file: index.jsx:31 ~ ProblemUpdatePage ~ quizInfo:", quizInfo)
  // 변경할 문제 상태는 객체로 들어올 것임
  const getQuizInfo = useCallback(async () => {
    try {
      const response = await axios.get(`/problems/${quizId}`);
      setQuizInfo(response.data);
    } catch (err) {
      console.error('문제조회 실패', err);
    }
  },[]);
  
  useEffect(() => {
    getQuizInfo();
  }, [getQuizInfo]);

  // 변경할 힌트들은 배열로 들어올 것임 
  const [hints, setHints] = useState([]);
  console.log("🚀 ~ file: index.jsx:50 ~ ProblemUpdatePage ~ hints:", hints)
  const getHintsInfo = useCallback(async () => {
    try {
      const response = await axios.get(`/hints/${quizId}`);
      setHints(response.data);
    } catch (err) {
      console.error('힌트조회 실패', err);
    }
  }, [])
  console.log("🚀 ~ file: index.jsx:50 ~ ProblemUpdatePage ~ hints:", hints)

  useEffect(() => {
    getHintsInfo();
  }, [getHintsInfo]);


  const handleProblemUpdate = () => {
    // // 위 입력된 데이터들을 데이터베이스의 problem에 추가시켜야 함

  //   axios
  //     .put(apiUrl, quizInfo)
  //     .then(response => {
  //       console.log('업데이트 성공', response.data);
  //     })
  //     .catch(err => {
  //       console.log('업데이트 실패', err);
  //     });
  };

  // 문제 기본정보 수정 이벤트 핸들러(problemSchema)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 힌트 추가 수정 이벤트 핸들러(hintSchema)
  const handleHintUpdate = () => {};


  return (
    <div className={styles.container}>
      <div>
        <div className={styles.QuizInfo}>
        <h3>문제 정보</h3>
          <UserInput
            type="text"
            name="title"
            placeholder="문제이름"
            value={quizInfo.title}
            onChange={e => handleInputChange(e)}
            style={{borderRadius: "0.5rem", height: "50px", marginBottom: "10px"}}
          />
          <UserInput
            type="text"
            name="problemUrl"
            placeholder="문제 url"
            value={quizInfo.problemUrl}
            onChange={e => handleInputChange(e)}
            style={{borderRadius: "0.5rem", height: "50px", marginBottom: "10px"}}
          />
          <div className={styles.category}>
            {/* quizInfo.category === value 이면 버튼이 :focus 되게 설정하고싶음 */}
            <button name="category" type="button" value={0} onClick={handleInputChange}>백준</button> 
            <button name="category" type="button" value={1} onClick={handleInputChange}>프로그래머스</button> 
          </div>
        </div>
      </div>
      <div className={styles.hintContainer}>
      <h3>힌트 정보</h3>
        <AdminHintContainer
          showImage={false}
          hintLevel={1}
          hintContent={quizInfo.hintContent}
          onChange={(e)=>{setQuizInfo({...quizInfo, hintContent: e.target.value})}}
        />
        <div className={styles.submitBtn}>
          <SmallVioletButton 
            ref={buttonRef} 
            onClick={handleProblemUpdate}
            children="기본 수정"
          />
        </div>
        <AdminHintContainer
          hintLevel={2}
          hintContent={quizInfo.hintContent}
          onChange={(e)=>{setQuizInfo({...quizInfo, hintContent: e.target.value})}}
        />
        <AdminHintContainer
          hintLevel={3}
          hintContent={quizInfo.hintContent}
          onChange={(e)=>{setQuizInfo({...quizInfo, hintContent: e.target.value})}}
        />
        <AdminHintContainer
          hintLevel={4}
          hintContent={quizInfo.hintContent}
          onChange={(e)=>{setQuizInfo({...quizInfo, hintContent: e.target.value})}}
        />
      </div>
    </div>
  );
}
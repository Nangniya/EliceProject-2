import axios from "axios";

// * 베이스 URL 설정
// 근데 원래 setupProxy.js 설정으로 '/api'가 들어간 요청을 서버로 넘기려고 했었는데
// 그걸 실패하고 지금은 그냥 package.json에 proxy 설정을 해준 거니까..
// '/api'가 있든 없든 모든 요청이 백 서버로 가는 거 아닌가?
// 그럼 굳이 axios 설정으로 '/api'를 기본으로 붙여줄 필요가 있나..? 코치님도 '/'만 했었고.
// 아니 또 근데 그렇게 치면 '/'도 안 붙이고 그냥 써야 되는 거 아닌가?? 애매하네..
// -> 오피스 아워 떄 물어보고 수정하기.

// VM IP주소(34.64.81.88)로 변경
axios.defaults.baseURL = "http://34.64.81.88/api";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const api = axios.create();
// export const api = axios.create({ baseURL: "http://localhost:8080/api/" });

// const getCookie = () => {
//   return;
// };

// api.interceptors.request.use(
//   (req) => {
//     // 쿠키에서 세션 아이디 확인
//     const sessionId = getCookie("sessionId");

//     if (!sessionId) {
//       // 세션 아이디가 없으면 로그인 페이지로 이동
//       alert("로그인이 필요한 작업입니다.");

//       navigate(PATH.LOGIN);

//       return Promise.reject(new Error("세션 아이디 없음."));
//     }
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response.status === 401) {
//       // 세션 아이디가 만료되었거나 유효하지 않은 경우
//       // 로그인 페이지로 이동하거나 다른 처리를 수행할 수 있음
//       navigate(PATH.LOGIN);
//     }
//     return Promise.reject(error);
//   }
// );

// function App() {
//   const navigate = useNavigate();

//   // 쿠키에서 세션 아이디 값을 가져오는 함수
//   const getCookie = (name) => {
//     const value = "; " + document.cookie;
//     const parts = value.split("; " + name + "=");
//     if (parts.length === 2) return parts.pop().split(";").shift();
//   };

//   return <Routes>{/* 라우트 설정 */}</Routes>;
// }

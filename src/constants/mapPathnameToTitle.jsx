const mapPathnameToTitle = {
  // location.path로 작동시키기 위해 앞에 /를 붙임
  "/": "문제리스트",
  "/quiz": "문제",
  "/quizlist": "문제리스트",
  "/mypage": "마이페이지",
  "/mypage/modify": "정보 수정",
  "/mypage/password": "비밀번호 변경",
  "/mypage/bookmark": "내가 찜한 문제",
  "/mypage/complete": "내가 푼 문제",
  "/mypage/chart": "통계",
  "/mypage/mypost": "내가 작성한 글",
  "/admin": "문제 관리",
  "/admin/create": "문제 등록",
  "/admin/update": "문제 수정",
  "/home": "홈",
};

export default mapPathnameToTitle;

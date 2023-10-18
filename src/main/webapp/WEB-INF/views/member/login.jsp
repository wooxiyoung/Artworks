<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Insert title here</title>
</head>
<body>
<form action="/member/login" method="post">
  <fieldset>
    <legend>사용자 정보 입력</legend>
    <label for="userId">아이디:</label>
    <input type="text" id="userId" name="userId"><br><br>
    <label for="passWd">비밀번호:</label>
    <input type="password" id="passWd" name="passWd"><br><br>
    
  </fieldset>
  <br>
  <input type="submit" value="로그인">
  <a href="/main">메인페이지 이동</a>
</form>
</body>
</html>
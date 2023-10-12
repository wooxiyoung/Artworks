<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원가입</title>
</head>
<body>
<form action="/member/register" method="post">
  <fieldset>
    <legend>사용자 정보 입력</legend>
    <label for="userNm">이름:</label>
    <input type="text" id="userNm" name="userNm"><br><br>
    <label for="userId">아이디:</label>
    <input type="text" id="userId" name="userId"><br><br>
    <label for="passWd">비밀번호:</label>
    <input type="password" id="passWd" name="passWd"><br><br>
    <label for="nick">닉네임:</label>
    <input type="text" id="nick" name="nick"><br><br>
    <label for="phone">전화번호:</label>
    <input type="text" id="phone" name="phone"><br><br>
    <label for="email">이메일:</label>
    <input type="text" id="email" name="email"><br><br>
  </fieldset>
  <br>
  <input type="submit" value="제출">
</form>

</body>
</html>
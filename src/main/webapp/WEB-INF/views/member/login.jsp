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
    <legend>����� ���� �Է�</legend>
    <label for="userId">���̵�:</label>
    <input type="text" id="userId" name="userId"><br><br>
    <label for="passWd">��й�ȣ:</label>
    <input type="password" id="passWd" name="passWd"><br><br>
    
  </fieldset>
  <br>
  <input type="submit" value="�α���">
  <a href="/main">���������� �̵�</a>
</form>
</body>
</html>
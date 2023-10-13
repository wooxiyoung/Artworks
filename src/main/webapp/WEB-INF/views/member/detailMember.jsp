<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>

<html>
<head>
<meta charset="UTF-8">
<title>상세페이지</title>
</head>
<body>
	<br>
	<br>
	<div align="center">
		<font size=5> 회원정보 수정하기 </font>
	</div>
	<br>
	<div align="center">
		<br>
		<br>
		<form action="/member/updateMember" method="post">
			<table border=1 width=600>
			<tr>
					<td align=center>아이디</td>
					<input type="hidden" name="userId" value="${member.userId}" /> 
					<td>${member.userId}</td>
				</tr>
				<tr>
					<td align=center>이름</td>
					<td><input type="text" name="userNm" value="${member.userNm}" size="10"></td>
				</tr>
				
				<tr>
					<td align=center>비밀번호</td>
					<td><input type="password" name="passWd" value="${member.passWd}" size="40"></td>
				</tr>
				<tr>
					<td align=center>닉네임</td>
					<td><input type="text" name="nick" value="${member.nick}" size="40"></td>
				</tr>
				<tr>
					<td align=center>전화번호</td>
					<td><input type="text" name="phone" value="${member.phone}" size="40"></td>
				</tr>
				<tr>
					<td align=center>이메일</td>
					<td><input type="email" name="email" value="${member.email}" size="40"></td>
				</tr>
				<tr>
					<td colspan=2 align=center>
					<input type=submit value="수정"></td><a href="/main">메인페이지 이동</a>
				</tr>
			</table>
		</form>
	</div>
</body>
</html>
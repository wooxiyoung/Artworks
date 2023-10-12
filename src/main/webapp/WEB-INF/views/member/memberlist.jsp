<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>

<html>
<head>
<meta charset="UTF-8">
<title>회원가입</title>
</head>
    <table border="1">
        <tr>
            <th>이름</th>
            <th>아이디</th>
            <th>비밀번호</th>
            <th>닉네임</th>
            <th>전화번호</th>
            <th>이메일</th>
            <th>회원삭제</th>
        </tr>
        <c:forEach items="${memberList}" var="member">
            <tr>
                <td>${member.userNm}</td>
                <td>${member.userId}</td>
             	<td>${member.passWd}</td>
                <td>${member.nick}</td>
                <td>${member.phone}</td>
                <td>${member.email}</td>
                <td><a href="/member/deleteMember?userId=${member.userId}">회원 삭제</a></td>
            </tr>
        </c:forEach>
         
    </table>
<!-- [ ] 글 수정으로 이동. 글번호를 넘겨야함. -->
<a href="/member/updateMember">회원정보 수정</a>
</body>
</html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>

<html>
<head>
<meta charset="UTF-8">
<title>회원가입</title>
</head>
    <form action="/member/deleteMember" method="post">
    <table border="1" width="600">
        <tr>
            <th>선택</th>
            <th>아이디</th>
            <th>이름</th>
            <th>비밀번호</th>
            <th>닉네임</th>
            <th>전화번호</th>
            <th>이메일</th>
            <th>등급</th>
        </tr>
        <c:forEach items="${memberList}" var="member">
            <tr>
                <td><input type="checkbox" name="delete_user_ids" value="${member.userId}"/></td>
                <td><a href="/member/detailMember?userId=${member.userId}">${member.userId}</a></td>
                <td>${member.userNm}</td>
                <td>${member.passWd}</td>
                <td>${member.nick}</td>
                <td>${member.phone}</td>
                <td>${member.email}</td>
                <td>${member.grade}</td>
                
                <!-- 다른 필드들... -->
            </tr>
        </c:forEach>
    </table>
    <input type="submit" value="선택한 회원 삭제">
</form>
<a href="/main">메인페이지 이동</a>
</body>
</html>
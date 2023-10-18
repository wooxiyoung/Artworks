<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>

<html>
<head>
    <title>게시물 상세 정보</title>
</head>
<body>
    <div class="container mt-4">
        <h1>게시물 상세 정보</h1>
        <table class="table table-striped">
            <tr>
                <th>제목</th>
                <td>${board.title}</td>
            </tr>
            <tr>
                <th>작성자</th>
                <td>${board.userId}</td>
            </tr>
            <tr>
                <th>내용</th>
                <td>${board.content}</td>
            </tr>
            
            
            
            <tr>
                <th>작성 시간</th>
                <td>${board.insertTime}</td>
            </tr>
            <!-- 추가하려는 다른 게시물 정보 항목을 여기에 추가 -->
        </table>

        <!-- 게시물 상세 정보 페이지에서 뒤로 가기 링크 추가 -->
        <p><a href="/board/list">뒤로 가기</a></p>
        <p><a href="/board/${idx}/edit">글수정</a></p>
        <form action="/board/${board.idx}/delete" method="post">
    <button type="submit">글삭제</button>
</form>
    </div>
</body>
</html>
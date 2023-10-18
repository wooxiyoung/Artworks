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
        
        <!-- 게시물 정보 표시 -->
        <div class="form-group">
            <label for="title">제목:</label>
            <span>${board.title}</span>
        </div>
        <div class="form-group">
            <label for="content">내용:</label>
            <span>${board.content}</span>
        </div>
        
        <!-- 조회수 표시 -->
        <div class="form-group">
            <label for="viewCnt">조회수:</label>
            <span>${board.viewCnt}</span>
        </div>
        
        <!-- 수정 페이지로 이동하는 버튼 -->
        <p><a href="/board/${board.idx}/edit">수정</a></p>
        
        <!-- 게시물 수정 취소 링크 -->
        <p><a href="/board/${board.idx}">수정 취소</a></p>
    </div>
</body>
</html>
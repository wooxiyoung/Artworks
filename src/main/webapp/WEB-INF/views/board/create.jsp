<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>

<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<h1>게시물 작성</h1>
    <form method="post" action="/board/create">
        <label for="title">제목:</label>
        <input type="text" name="title" id="title"><br>
        <label for="content">내용:</label>
        <textarea name="content" id="content" rows="5" cols="40"></textarea><br>
        <label for="userId">작성자:</label>
        <input type="text" name="userId" id="userId"><br>
        <input type="submit" value="작성">
    </form>
</body>
</html>
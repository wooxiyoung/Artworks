<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>

<html>
<head>
    <title>atworks</title>
</head>
<section>
 <div class="container mt-4">
        <h1>게시물 목록</h1>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성 시간</th>
                    <th>조회수</th> <!-- 조회수 열 추가 -->
                </tr>
            </thead>
            <tbody>
                <!-- 게시물 목록을 반복하여 표시 -->
                <c:forEach items="${boardList}" var="board">
                    <tr>
                        <td><a href="/board/${board.idx}">${board.title}</a></td>
                        <td>${board.userId}</td>
                        <td>${board.insertTime}</td>
                        <td>${board.viewCnt}</td> <!-- 조회수 표시 -->
                    </tr>
                </c:forEach>
            </tbody>
        </table>
        <li class="before_sign"><a href="/board/create">글쓰기</a></li>
        <!-- 페이지 블록 구성 -->
        <nav>
            <ul class="pagination">
                <c:forEach begin="1" end="${totalPages}" varStatus="page">
                    <li class="page-item ${page.index == currentPage ? 'active' : ''}">
                        <a class="page-link" href="?page=${page.index}">${page.index}</a>
                    </li>
                </c:forEach>
            </ul>
        </nav>
    </div>
</section>
<%@page import="com.demo.ant.sample.vo.SampleVO"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core" %>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="script.js"></script>
<script>

</script>

<section>
	<header class="header">
		<div class="logo">
			<h1>Atworks</h1>
		</div>
		<nav>
			<ul>
			
    <br>
				<li class="before_sign"><a href="/member/memberlist">유저리스트</a></li>
				<li class="before_sign"><a href="/board/list">게시판</a></li>
				
			</ul>
			
		</nav>
		<div class="util_menu">
			<ul>
				<%-- 첫 번째 조건: 사용자가 로그인하지 않은 경우 --%>
				<c:if test="${sessionScope.loginMember != null}">
    <li class="before_sign"><a href="/member/logout">로그아웃</a></li>
</c:if>
<c:if test="${sessionScope.loginMember == null}">
    <li class="before_sign"><a href="/member/login">로그인</a></li>
    <li class="before_sign"><a href="/member/register">회원가입</a></li>
</c:if>

<c:if test="${sessionScope.loginMember != null}">
    <p>${sessionScope.loginMember.userId}님 안녕하세요.</p>
</c:if>
			</ul>
		</div>
	</header>
</section>
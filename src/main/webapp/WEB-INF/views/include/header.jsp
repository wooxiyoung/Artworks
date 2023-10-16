<%@page import="com.demo.ant.sample.vo.SampleVO"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core" %>

<script>

</script>

<section>
	<header class="header">
		<div class="logo">
			<h1>Atworks</h1>
		</div>
		<nav>
			<ul>
				<%
				String grade ="" ; // 이 함수는 실제로 사용자의 "grade"를 가져오는 로직을 수행해야 합니다.
				SampleVO member = (SampleVO)request.getSession().getAttribute("SampleVO");
				// 여기에서 현재 사용자의 "grade"를 가져오는 서버 측 코드를 작성해야 합니다.

				if (grade.equals("관리자")) {
					// "관리자" 권한을 가진 사용자에게만 페이지 접근을 허용
				%>
				<li class="before_sign"><a href="/member/memberlist">유저리스트</a></li>
				<li class="before_sign"><a href="/board/list">게시판</a></li>
				<%
				} else {
				%>
				<li class="before_sign"><a href="/board/list">게시판</a></li>
			</ul>
			<%
			}
			%>
		</nav>
		<div class="util_menu">
			<ul>
				<%-- 첫 번째 조건: 사용자가 로그인하지 않은 경우 --%>
				<%
				if (request.getSession().getAttribute("userId") == null) {
				%>
				<li class="before_sign"><a href="/member/login">로그인</a></li>
				<li class="before_sign"><a href="/member/register">회원가입</a></li>
				<%
				} else {
				%>
				<%-- 두 번째 조건: 사용자가 로그인한 경우 --%>
				<c:if test="${not empty loginUser}">
       			 <p>${loginUser.userId}님 환영합니다!</p>
    			</c:if>
				<% } %>
			</ul>
		</div>
	</header>
</section>
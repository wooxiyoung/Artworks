<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>게시물 상세 조회</title>
</head>
<body>
<body>
      <h1>게시물 삭제</h1>
    <form method="post" action="/board/${board.idx}/delete">
        <p>게시물을 삭제하시겠습니까?</p>
        <input type="submit" value="삭제">
    </form>
</body>
</body>
</html>
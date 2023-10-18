package com.demo.ant.sample.vo;

import java.util.Date;

public class SampleBoardVO {
    private int idx;
    private String title;
    private String content;
    private String userId;
    private int viewCnt;
    private Date insertTime;
    private Date updateTime;

    // 생성자, getter 및 setter 메서드는 필요에 따라 추가하실 수 있습니다.

    public int getIdx() {
        return idx;
    }

    public void setIdx(int idx) {
        this.idx = idx;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int getViewCnt() {
        return viewCnt;
    }

    public void setViewCnt(int viewCnt) {
        this.viewCnt = viewCnt;
    }

    public Date getInsertTime() {
        return insertTime;
    }

    public void setInsertTime(Date insertTime) {
        this.insertTime = insertTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    @Override
    public String toString() {
        return "SampleBoardVO [idx=" + idx + ", title=" + title + ", content=" + content + ", userId=" + userId
                + ", viewCnt=" + viewCnt + ", insertTime=" + insertTime + ", updateTime=" + updateTime + "]";
    }
}
package com.demo.ant.sample.vo;

public class SampleVO {

	private 	String	userId;
	private		String	userNm;
	private		String	passWd;
	private		String	nick;
	private		String	email;
	private		String	phone;
	
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUserNm() {
		return userNm;
	}
	public void setUserNm(String userNm) {
		this.userNm = userNm;
	}
	public String getPassWd() {
		return passWd;
	}
	public void setPassWd(String passWd) {
		this.passWd = passWd;
	}
	public String getNick() {
		return nick;
	}
	public void setNick(String nick) {
		this.nick = nick;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	@Override
	public String toString() {
		return "SampleVO [userId=" + userId + ", userNm=" + userNm + ", passWd=" + passWd + ", nick=" + nick
				+ ", email=" + email + ", phone=" + phone + ", getUserId()=" + getUserId() + ", getUserNm()="
				+ getUserNm() + ", getPassWd()=" + getPassWd() + ", getNick()=" + getNick() + ", getEmail()="
				+ getEmail() + ", getPhone()=" + getPhone() + ", getClass()=" + getClass() + ", hashCode()="
				+ hashCode() + ", toString()=" + super.toString() + "]";
	}	
	
}

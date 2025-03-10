package com.example.ehulock.model;

import java.sql.Timestamp;

public class User {
    private int idUser;
    private String username;
    private String email;
    private String password;
    private Timestamp create_time;
    private String role;

    public User() {
    }

    public User(int idUser, String username, String email, String password, Timestamp create_time, String role) {
        this.idUser = idUser;
        this.username = username;
        this.email = email;
        this.password = password;
        this.create_time = create_time;
        this.role = role;
    }

    public int getIdUser() {
        return idUser;
    }

    public void setIdUser(int idUser) {
        this.idUser = idUser;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Timestamp getCreate_time() {
        return create_time;
    }

    public void setCreate_time(Timestamp create_time) {
        this.create_time = create_time;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}

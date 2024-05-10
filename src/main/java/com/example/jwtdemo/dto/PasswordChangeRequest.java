package com.example.jwtdemo.dto;

public record PasswordChangeRequest(String oldPassword, String newPassword) {
}

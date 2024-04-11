package com.example.jwtdemo.utils;

import com.example.jwtdemo.exception.InvalidIdException;

public class ConversionUtil {
    public static long convertToLong(String id) {
        System.out.println("Received id inside convertToLong: " + id);
        long threadIdLong;
        try {
            threadIdLong = Long.parseLong(id);
        } catch (NumberFormatException numberFormatException) {
            throw new InvalidIdException("Id : " + id + " is not a valid id. Expected a number");
        }
        return threadIdLong;
    }
}

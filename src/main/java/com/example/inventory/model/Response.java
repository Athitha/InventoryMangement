package com.example.inventory.model;

/**
 * Created by Athitha Anantharamu on 6/4/17.
 */
public class Response {
    private String status;
    private String message;

    public Response(String status, String message) {
        this.status = status;
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }
}

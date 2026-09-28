package com.lokesh.issuetracker.dto;

import com.lokesh.issuetracker.entity.Status;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IssueRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    private Status status;

    private Long assignedToId;
}
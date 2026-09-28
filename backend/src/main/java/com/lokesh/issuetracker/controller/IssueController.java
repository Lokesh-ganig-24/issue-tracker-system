package com.lokesh.issuetracker.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lokesh.issuetracker.dto.IssueRequest;
import com.lokesh.issuetracker.entity.Issue;
import com.lokesh.issuetracker.entity.Status;
import com.lokesh.issuetracker.entity.User;
import com.lokesh.issuetracker.repository.UserRepository;
import com.lokesh.issuetracker.service.IssueService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/issues")
public class IssueController {

    private final IssueService issueService;
    private final UserRepository userRepository;

    public IssueController(
            IssueService issueService,
            UserRepository userRepository) {
        this.issueService = issueService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<Issue>> getAllIssues() {
        return ResponseEntity.ok(issueService.getAllIssues());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Issue> getIssueById(@PathVariable Long id) {

        return issueService.getIssueById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Issue>> getIssuesByStatus(
            @PathVariable Status status) {

        return ResponseEntity.ok(
                issueService.getIssuesByStatus(status)
        );
    }

    @PostMapping
    public ResponseEntity<Issue> createIssue(
            @Valid @RequestBody IssueRequest request,
            Authentication authentication) {

        User currentUser = userRepository
                .findByEmail(authentication.getName())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Issue issue = new Issue();

        issue.setTitle(request.getTitle());
        issue.setDescription(request.getDescription());
        issue.setStatus(
                request.getStatus() != null
                        ? request.getStatus()
                        : Status.OPEN
        );
        issue.setCreatedBy(currentUser);

        if (request.getAssignedToId() != null) {

            User assignedUser = userRepository
                    .findById(request.getAssignedToId())
                    .orElseThrow(() ->
                            new RuntimeException("Assigned user not found"));

            issue.setAssignedTo(assignedUser);
        }

        return ResponseEntity.ok(
                issueService.saveIssue(issue)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Issue> updateIssue(
            @PathVariable Long id,
            @Valid @RequestBody IssueRequest request) {

        return issueService.getIssueById(id)
                .map(existingIssue -> {

                    existingIssue.setTitle(request.getTitle());
                    existingIssue.setDescription(request.getDescription());

                    if (request.getStatus() != null) {
                        existingIssue.setStatus(request.getStatus());
                    }

                    if (request.getAssignedToId() != null) {

                        User assignedUser = userRepository
                                .findById(request.getAssignedToId())
                                .orElseThrow(() ->
                                        new RuntimeException(
                                                "Assigned user not found"));

                        existingIssue.setAssignedTo(assignedUser);
                    } else {
                        existingIssue.setAssignedTo(null);
                    }

                    return ResponseEntity.ok(
                            issueService.saveIssue(existingIssue)
                    );
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIssue(
            @PathVariable Long id) {

        if (issueService.getIssueById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        issueService.deleteIssue(id);

        return ResponseEntity.noContent().build();
    }
}
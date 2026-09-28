package com.lokesh.issuetracker.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lokesh.issuetracker.dto.CommentRequest;
import com.lokesh.issuetracker.entity.Comment;
import com.lokesh.issuetracker.entity.Issue;
import com.lokesh.issuetracker.entity.User;
import com.lokesh.issuetracker.repository.UserRepository;
import com.lokesh.issuetracker.service.CommentService;
import com.lokesh.issuetracker.service.IssueService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/issues/{issueId}/comments")
public class CommentController {

    private final CommentService commentService;
    private final IssueService issueService;
    private final UserRepository userRepository;

    public CommentController(
            CommentService commentService,
            IssueService issueService,
            UserRepository userRepository) {

        this.commentService = commentService;
        this.issueService = issueService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<Comment>> getComments(
            @PathVariable Long issueId) {

        if (issueService.getIssueById(issueId).isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(
                commentService.getCommentsByIssue(issueId)
        );
    }

    @PostMapping
    public ResponseEntity<Comment> addComment(
            @PathVariable Long issueId,
            @Valid @RequestBody CommentRequest request,
            Authentication authentication) {

        Issue issue = issueService.getIssueById(issueId)
                .orElseThrow(() ->
                        new RuntimeException("Issue not found"));

        User user = userRepository
                .findByEmail(authentication.getName())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Comment comment = new Comment();

        comment.setContent(request.getContent());
        comment.setIssue(issue);
        comment.setUser(user);

        return ResponseEntity.ok(
                commentService.saveComment(comment)
        );
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(
            @PathVariable Long issueId,
            @PathVariable Long commentId,
            Authentication authentication) {

        if (issueService.getIssueById(issueId).isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User currentUser = userRepository
                .findByEmail(authentication.getName())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return commentService
                .getCommentByIdAndUser(
                        commentId,
                        currentUser.getId()
                )
                .map(comment -> {
                    if (!comment.getIssue().getId().equals(issueId)) {
                        return ResponseEntity.notFound().<Void>build();
                    }

                    commentService.deleteComment(commentId);

                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}

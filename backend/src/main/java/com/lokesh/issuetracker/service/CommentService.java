package com.lokesh.issuetracker.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.lokesh.issuetracker.entity.Comment;
import com.lokesh.issuetracker.repository.CommentRepository;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public List<Comment> getCommentsByIssue(Long issueId) {
        return commentRepository.findByIssueIdOrderByCreatedAtAsc(issueId);
    }

    public Comment saveComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public Optional<Comment> getCommentByIdAndUser(
            Long commentId,
            Long userId) {

        return commentRepository.findByIdAndUserId(
                commentId,
                userId
        );
    }

    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }
}

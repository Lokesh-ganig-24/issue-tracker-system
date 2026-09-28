package com.lokesh.issuetracker.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.lokesh.issuetracker.entity.Issue;
import com.lokesh.issuetracker.entity.Status;
import com.lokesh.issuetracker.repository.IssueRepository;

@Service
public class IssueService {

    private final IssueRepository issueRepository;

    public IssueService(IssueRepository issueRepository) {
        this.issueRepository = issueRepository;
    }

    public List<Issue> getAllIssues() {
        return issueRepository.findAll();
    }

    public Optional<Issue> getIssueById(Long id) {
        return issueRepository.findById(id);
    }

    public List<Issue> getIssuesByStatus(Status status) {
        return issueRepository.findByStatus(status);
    }

    public List<Issue> getIssuesCreatedByUser(Long userId) {
        return issueRepository.findByCreatedById(userId);
    }

    public List<Issue> getIssuesAssignedToUser(Long userId) {
        return issueRepository.findByAssignedToId(userId);
    }

    public Issue saveIssue(Issue issue) {
        return issueRepository.save(issue);
    }

    public void deleteIssue(Long id) {
        issueRepository.deleteById(id);
    }
}
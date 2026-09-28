package com.lokesh.issuetracker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lokesh.issuetracker.entity.Issue;
import com.lokesh.issuetracker.entity.Status;

public interface IssueRepository extends JpaRepository<Issue, Long> {

    List<Issue> findByStatus(Status status);

    List<Issue> findByCreatedById(Long userId);

    List<Issue> findByAssignedToId(Long userId);
}
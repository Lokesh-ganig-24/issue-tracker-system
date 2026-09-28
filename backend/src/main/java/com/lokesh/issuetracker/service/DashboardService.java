package com.lokesh.issuetracker.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.lokesh.issuetracker.entity.Status;
import com.lokesh.issuetracker.repository.IssueRepository;

@Service
public class DashboardService {

    private final IssueRepository issueRepository;

    public DashboardService(IssueRepository issueRepository) {
        this.issueRepository = issueRepository;
    }

    public Map<String, Long> getIssueCounts() {

        long total = issueRepository.count();
        long open = issueRepository.findByStatus(Status.OPEN).size();
        long inProgress = issueRepository.findByStatus(Status.IN_PROGRESS).size();
        long closed = issueRepository.findByStatus(Status.CLOSED).size();

        Map<String, Long> counts = new HashMap<>();

        counts.put("total", total);
        counts.put("open", open);
        counts.put("inProgress", inProgress);
        counts.put("closed", closed);

        return counts;
    }
}
package com.tourtravel.controller;

import com.tourtravel.dto.review.ReviewDto;
import com.tourtravel.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("/api/reviews")
    public ResponseEntity<ReviewDto.Response> createReview(@Valid @RequestBody ReviewDto.Request request) {
        return new ResponseEntity<>(reviewService.createReview(request), HttpStatus.CREATED);
    }

    @GetMapping("/api/reviews")
    public ResponseEntity<List<ReviewDto.Response>> getAllReviews() {
        return ResponseEntity.ok(reviewService.getAllReviews());
    }

    @GetMapping("/api/reviews/{id}")
    public ResponseEntity<ReviewDto.Response> getReviewById(@PathVariable Long id) {
        return ResponseEntity.ok(reviewService.getReviewById(id));
    }

    @GetMapping("/api/packages/{packageId}/reviews")
    public ResponseEntity<List<ReviewDto.Response>> getReviewsByPackageId(@PathVariable Long packageId) {
        return ResponseEntity.ok(reviewService.getReviewsByPackageId(packageId));
    }

    @PutMapping("/api/reviews/{id}")
    public ResponseEntity<ReviewDto.Response> updateReview(@PathVariable Long id, @Valid @RequestBody ReviewDto.Request request) {
        return ResponseEntity.ok(reviewService.updateReview(id, request));
    }

    @DeleteMapping("/api/reviews/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return ResponseEntity.noContent().build();
    }
}

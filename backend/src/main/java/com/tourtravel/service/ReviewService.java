package com.tourtravel.service;

import com.tourtravel.dto.review.ReviewDto;
import java.util.List;

public interface ReviewService {
    ReviewDto.Response createReview(ReviewDto.Request request);
    ReviewDto.Response getReviewById(Long id);
    List<ReviewDto.Response> getReviewsByPackageId(Long packageId);
    ReviewDto.Response updateReview(Long id, ReviewDto.Request request);
    void deleteReview(Long id);
    List<ReviewDto.Response> getAllReviews();
}

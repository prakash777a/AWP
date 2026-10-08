package com.tourtravel.service.impl;

import com.tourtravel.dto.review.ReviewDto;
import com.tourtravel.entity.Review;
import com.tourtravel.entity.TourPackage;
import com.tourtravel.entity.User;
import com.tourtravel.exception.ResourceNotFoundException;
import com.tourtravel.repository.ReviewRepository;
import com.tourtravel.repository.TourPackageRepository;
import com.tourtravel.repository.UserRepository;
import com.tourtravel.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final TourPackageRepository tourPackageRepository;

    @Override
    public ReviewDto.Response createReview(ReviewDto.Request request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        TourPackage tourPackage = tourPackageRepository.findById(request.getTourPackageId())
                .orElseThrow(() -> new ResourceNotFoundException("Package not found"));

        Review review = new Review();
        review.setUser(user);
        review.setTourPackage(tourPackage);
        review.setRating(request.getRating());
        review.setComment(request.getComment());

        Review saved = reviewRepository.save(review);
        return mapToResponse(saved);
    }

    @Override
    public ReviewDto.Response getReviewById(Long id) {
        Review review = reviewRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Review not found"));
        return mapToResponse(review);
    }

    @Override
    public List<ReviewDto.Response> getReviewsByPackageId(Long packageId) {
        TourPackage tourPackage = tourPackageRepository.findById(packageId).orElseThrow(() -> new ResourceNotFoundException("Package not found"));
        return tourPackage.getReviews().stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public ReviewDto.Response updateReview(Long id, ReviewDto.Request request) {
        Review review = reviewRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Review not found"));
        review.setRating(request.getRating());
        review.setComment(request.getComment());

        Review updated = reviewRepository.save(review);
        return mapToResponse(updated);
    }

    @Override
    public void deleteReview(Long id) {
        Review review = reviewRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Review not found"));
        reviewRepository.delete(review);
    }

    @Override
    public List<ReviewDto.Response> getAllReviews() {
        return reviewRepository.findAll().stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    private ReviewDto.Response mapToResponse(Review review) {
        ReviewDto.Response response = new ReviewDto.Response();
        response.setId(review.getId());
        response.setUserId(review.getUser().getId());
        response.setTourPackageId(review.getTourPackage().getId());
        response.setRating(review.getRating());
        response.setComment(review.getComment());
        response.setCreatedAt(review.getCreatedAt());
        response.setUpdatedAt(review.getUpdatedAt());
        return response;
    }
}

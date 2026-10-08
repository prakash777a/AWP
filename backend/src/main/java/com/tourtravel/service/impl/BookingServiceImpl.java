package com.tourtravel.service.impl;

import com.tourtravel.dto.booking.BookingDto;
import com.tourtravel.entity.Booking;
import com.tourtravel.entity.TourPackage;
import com.tourtravel.entity.User;
import com.tourtravel.entity.enums.BookingStatus;
import com.tourtravel.exception.BadRequestException;
import com.tourtravel.exception.ForbiddenException;
import com.tourtravel.exception.ResourceNotFoundException;
import com.tourtravel.repository.BookingRepository;
import com.tourtravel.repository.TourPackageRepository;
import com.tourtravel.repository.UserRepository;
import com.tourtravel.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final TourPackageRepository tourPackageRepository;

    // ─── CUSTOMER OPERATIONS ─────────────────────────────────────────────────

    @Override
    public BookingDto.Response createBooking(BookingDto.Request request, String currentUserEmail) {
        User user = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found"));

        TourPackage tourPackage = tourPackageRepository.findById(request.getPackageId())
                .orElseThrow(() -> new ResourceNotFoundException("Tour package not found with id: " + request.getPackageId()));

        if (!tourPackage.getAvailable()) {
            throw new BadRequestException("This tour package is currently unavailable for booking");
        }

        // Backend validates travel date is in the future
        if (!request.getTravelDate().isAfter(LocalDate.now())) {
            throw new BadRequestException("Travel date must be in the future");
        }

        // Backend calculates total — never trusts frontend price
        BigDecimal totalAmount = tourPackage.getPrice()
                .multiply(BigDecimal.valueOf(request.getNumberOfTravelers()));

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setTourPackage(tourPackage);
        booking.setTravelDate(request.getTravelDate());
        booking.setNumberOfPeople(request.getNumberOfTravelers());
        booking.setTotalAmount(totalAmount);
        booking.setStatus(BookingStatus.PENDING);

        return mapToResponse(bookingRepository.save(booking));
    }

    @Override
    public List<BookingDto.Response> getMyBookings(String currentUserEmail) {
        return bookingRepository.findByUser_Email(currentUserEmail)
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public BookingDto.Response getMyBookingById(Long id, String currentUserEmail) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
        if (!booking.getUser().getEmail().equals(currentUserEmail)) {
            throw new ForbiddenException("You are not authorized to view this booking");
        }
        return mapToResponse(booking);
    }

    @Override
    public BookingDto.Response cancelMyBooking(Long id, String currentUserEmail) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));

        if (!booking.getUser().getEmail().equals(currentUserEmail)) {
            throw new ForbiddenException("You are not authorized to cancel this booking");
        }

        if (booking.getStatus() == BookingStatus.COMPLETED) {
            throw new BadRequestException("Completed bookings cannot be cancelled");
        }
        if (booking.getStatus() == BookingStatus.CANCELLED) {
            throw new BadRequestException("Booking is already cancelled");
        }

        booking.setStatus(BookingStatus.CANCELLED);
        return mapToResponse(bookingRepository.save(booking));
    }

    // ─── ADMIN OPERATIONS ────────────────────────────────────────────────────

    @Override
    public List<BookingDto.Response> getAllBookings() {
        return bookingRepository.findAll().stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public BookingDto.Response getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
        return mapToResponse(booking);
    }

    @Override
    public BookingDto.Response updateBookingStatus(Long id, BookingStatus status) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));

        // Prevent invalid transitions
        BookingStatus current = booking.getStatus();
        if (current == BookingStatus.CANCELLED) {
            throw new BadRequestException("Cannot change status of a cancelled booking");
        }
        if (current == BookingStatus.COMPLETED && status != BookingStatus.COMPLETED) {
            throw new BadRequestException("Cannot change status of a completed booking");
        }

        booking.setStatus(status);
        return mapToResponse(bookingRepository.save(booking));
    }

    @Override
    public void deleteBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
        bookingRepository.delete(booking);
    }

    // ─── MAPPING ─────────────────────────────────────────────────────────────

    private BookingDto.Response mapToResponse(Booking booking) {
        BookingDto.Response response = new BookingDto.Response();
        response.setId(booking.getId());

        BookingDto.UserSummary userSummary = new BookingDto.UserSummary();
        userSummary.setId(booking.getUser().getId());
        userSummary.setFullName(booking.getUser().getFullName());
        userSummary.setEmail(booking.getUser().getEmail());
        userSummary.setPhone(booking.getUser().getPhone());
        response.setCustomer(userSummary);

        BookingDto.PackageSummary pkgSummary = new BookingDto.PackageSummary();
        pkgSummary.setId(booking.getTourPackage().getId());
        pkgSummary.setTitle(booking.getTourPackage().getTitle());
        pkgSummary.setPrice(booking.getTourPackage().getPrice());
        pkgSummary.setDurationDays(booking.getTourPackage().getDurationDays());
        pkgSummary.setImageUrl(booking.getTourPackage().getImageUrl());
        if (booking.getTourPackage().getDestination() != null) {
            pkgSummary.setDestinationName(booking.getTourPackage().getDestination().getName());
        }
        response.setTourPackage(pkgSummary);

        response.setTravelDate(booking.getTravelDate());
        response.setNumberOfTravelers(booking.getNumberOfPeople());
        response.setTotalAmount(booking.getTotalAmount());
        response.setStatus(booking.getStatus());
        response.setBookingDate(booking.getBookingDate());
        response.setCreatedAt(booking.getCreatedAt());
        response.setUpdatedAt(booking.getUpdatedAt());

        // Include payment info if present
        if (booking.getPayment() != null) {
            BookingDto.PaymentInfo paymentInfo = new BookingDto.PaymentInfo();
            paymentInfo.setId(booking.getPayment().getId());
            paymentInfo.setPaymentMethod(booking.getPayment().getPaymentMethod() != null
                    ? booking.getPayment().getPaymentMethod().name() : null);
            paymentInfo.setPaymentStatus(booking.getPayment().getPaymentStatus() != null
                    ? booking.getPayment().getPaymentStatus().name() : null);
            paymentInfo.setTransactionReference(booking.getPayment().getTransactionReference());
            paymentInfo.setPaymentDate(booking.getPayment().getPaymentDate());
            response.setPayment(paymentInfo);
        }

        return response;
    }
}

package com.tourtravel.service;

import com.tourtravel.dto.booking.BookingDto;
import com.tourtravel.entity.enums.BookingStatus;

import java.util.List;

public interface BookingService {

    // Customer operations
    BookingDto.Response createBooking(BookingDto.Request request, String currentUserEmail);

    List<BookingDto.Response> getMyBookings(String currentUserEmail);

    BookingDto.Response getMyBookingById(Long id, String currentUserEmail);

    BookingDto.Response cancelMyBooking(Long id, String currentUserEmail);

    // Admin operations
    List<BookingDto.Response> getAllBookings();

    BookingDto.Response getBookingById(Long id);

    BookingDto.Response updateBookingStatus(Long id, BookingStatus status);

    void deleteBooking(Long id);
}

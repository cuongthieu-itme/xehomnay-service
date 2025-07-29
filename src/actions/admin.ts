'use server'

import prisma from '@/prisma'

// get logged in admin details from database
export const getAdminDetails = async (id: string) => {
  try {
    const admin = await prisma.user.findFirst({
      where: { id: id },
      select: {
        id: true,
        name: true,
        status: true,
        emailVerified: true,
        email: true,
        image: true,
        role: true,
      },
    })
    return admin
  } catch (error) {
    return { error: 'Failed to get admin details' }
  }
}

// get all provider list from database
export const getAllProvider = async () => {
  try {
    const providers = await prisma.provider.findMany({
      select: {
        id: true,
        companyName: true,
        contactName: true,
        contactPhone: true,
        email: true,
        businessReg: true,
        active: true,
        userId: true,
        city: true,
        street: true,
        createdAt: true,
        updatedAt: true,
        country: {
          select: {
            name: true,
          },
        },
        region: {
          select: {
            name: true,
          },
        },
        User: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            status: true,
          },
        },
        _count: {
          select: {
            Car: true,
            Booking: true,
            Review: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
    return providers
  } catch (error) {
    return { error: 'Something went wrong' }
  }
}

// status update of provider status colum user table in database
export const updateStatus = async (
  id: string,
  active: string,
  userId: string,
  status: string
) => {
  try {
    // Check if the provider has any pending bookings
    const checkCar = await prisma.car.findFirst({
      where: { providerId: id, status: { in: ['pending', 'booked'] } },
    })
    if (checkCar) {
      return { error: 'Provider has pending or bookings', statusCode: 400 }
    }

    // Update user, provider, and cars in a transaction
    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { status: status },
      }),
      prisma.provider.update({
        where: { id: id },
        data: { active: active === 'true' },
      }),
      prisma.car.updateMany({
        where: { providerId: id },
        data: { status: active === 'true' ? 'available' : 'not available' },
      }),
    ])

    return {
      status: true,
      message: 'Status updated successfully',
      statusCode: 200,
    }
  } catch (error) {
    console.error('Error updating status:', error)
    return { error: 'Failed to update status', statusCode: 500 }
  }
}

// get provider by id
export const getProviderById = async (id: string) => {
  try {
    const provider = await prisma.provider.findUnique({
      where: { id: id },
      select: {
        id: true,
        companyName: true,
        contactName: true,
        contactPhone: true,
        email: true,
        businessReg: true,
        active: true,
        city: true,
        street: true,
        longitude: true,
        latitude: true,
        createdAt: true,
        updatedAt: true,
        country: {
          select: {
            id: true,
            name: true,
          },
        },
        region: {
          select: {
            id: true,
            name: true,
          },
        },
        User: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            status: true,
          },
        },
        _count: {
          select: {
            Car: true,
            Booking: true,
            Review: true,
          },
        },
      },
    })
    return provider
  } catch (error) {
    console.error('Error in getProviderById:', error)
    return { error: 'Failed to get provider details' }
  }
}

// delete provider from database by id and userId from provider and user table respectively
export const deleteProvider = async (id: string, userId: string) => {
  try {
    // Check if the provider has any pending bookings
    const checkCar = await prisma.car.findFirst({
      where: { providerId: id, status: { in: ['pending', 'booked'] } },
    })
    if (checkCar) {
      return { error: 'Provider has pending or bookings', statusCode: 400 }
    }
    await prisma.$transaction([
      prisma.provider.delete({ where: { id: id } }),
      prisma.user.delete({ where: { id: userId } }),
    ])
    return { status: true, message: 'Provider deleted successfully' }
  } catch (error) {
    return { error: 'Failed to delete provider' }
  }
}

// get all country list from database
export const getAllCountry = async () => {
  try {
    const countries = await prisma.country.findMany({
      select: {
        id: true,
        name: true,
        code: true,
        status: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    })
    return countries
  } catch (error) {
    return { error: 'Something went wrong' }
  }
}

// update status of country status column in database
export const updateCountryStatus = async (id: string, status: string) => {
  try {
    // Check if the countryid has any pending bookings
    const checkCar = await prisma.car.findFirst({
      where: { countryId: id, status: { in: ['pending', 'booked'] } },
    })
    if (checkCar) {
      return { error: 'Provider has pending or bookings', statusCode: 400 }
    }
    await prisma.$transaction([
      prisma.country.update({
        where: { id: id },
        data: { status: status },
      }),
      prisma.region.updateMany({
        where: { countryId: id },
        data: { status: status },
      }),
    ])
    return { status: true, message: 'Status updated successfully' }
  } catch (error) {
    return { error: 'Failed to update status country' }
  }
}

// get country by id
export const getCountryById = async (id: string) => {
  try {
    const country = await prisma.country.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        code: true,
        status: true,
        longitude: true,
        latitude: true,
        createdAt: true,
        updatedAt: true,
      },
    })
    return country
  } catch (error) {
    return { error: 'Failed to get country details' }
  }
}

// add new country
export const addCountry = async (data: {
  name: string
  code?: string
  longitude?: number
  latitude?: number
}) => {
  try {
    if (!data.name) {
      return { error: 'Country name is required' }
    }

    const existingCountry = await prisma.country.findFirst({
      where: { name: data.name },
    })

    if (existingCountry) {
      return { error: 'Country with this name already exists' }
    }

    const country = await prisma.country.create({
      data: {
        name: data.name,
        code: data.code || data.name.slice(0, 2).toUpperCase(),
        longitude: data.longitude,
        latitude: data.latitude,
        status: 'active',
      },
    })

    return { message: 'Country added successfully', country }
  } catch (error) {
    return { error: 'Failed to add country' }
  }
}

// update country
export const updateCountry = async (
  id: string,
  data: {
    name?: string
    code?: string
    longitude?: number
    latitude?: number
  }
) => {
  try {
    if (!id) {
      return { error: 'Country ID is required' }
    }

    const existingCountry = await prisma.country.findUnique({
      where: { id: id },
    })

    if (!existingCountry) {
      return { error: 'Country not found' }
    }

    // Check if name is being updated and if it already exists
    if (data.name && data.name !== existingCountry.name) {
      const nameExists = await prisma.country.findFirst({
        where: { name: data.name, id: { not: id } },
      })

      if (nameExists) {
        return { error: 'Country with this name already exists' }
      }
    }

    const updatedCountry = await prisma.country.update({
      where: { id: id },
      data: {
        name: data.name,
        code: data.code,
        longitude: data.longitude,
        latitude: data.latitude,
      },
    })

    return { message: 'Country updated successfully', country: updatedCountry }
  } catch (error) {
    return { error: 'Failed to update country' }
  }
}

// delete country from database by id
export const deleteCountry = async (id: string) => {
  try {
    // Check if the countryid has any pending bookings
    const checkCar = await prisma.car.findFirst({
      where: { countryId: id, status: { in: ['pending', 'booked'] } },
    })
    if (checkCar) {
      return { error: 'Provider has pending or bookings', statusCode: 400 }
    }

    // Check if country has any regions
    const regionsCount = await prisma.region.count({
      where: { countryId: id },
    })

    if (regionsCount > 0) {
      return {
        error: 'Cannot delete country with existing regions',
        statusCode: 400,
      }
    }

    await prisma.country.delete({ where: { id: id } })
    return { status: true, message: 'Country deleted successfully' }
  } catch (error) {
    return { error: 'Failed to delete country' }
  }
}

// get all region list from database by countryId
export const getAllRegion = async (countryId: string) => {
  try {
    const regions = await prisma.region.findMany({
      where: { countryId: countryId },
      select: {
        id: true,
        name: true,
        status: true,
        createdAt: true,
        country: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
    return regions
  } catch (error) {
    return { error: 'Something went wrong' }
  }
}

// update status of region status column in database
export const updateRegionStatus = async (id: string, status: string) => {
  try {
    // Check if the countryid has any pending bookings
    const checkCar = await prisma.car.findFirst({
      where: { regionId: id, status: { in: ['pending', 'booked'] } },
    })
    if (checkCar) {
      return { error: 'Provider has pending or bookings', statusCode: 400 }
    }
    await prisma.region.update({
      where: { id: id },
      data: { status: status },
    })
    return { status: true, message: 'Status updated successfully' }
  } catch (error) {
    return { error: 'Failed to update status region' }
  }
}

// get region by id
export const getRegionById = async (id: string) => {
  try {
    const region = await prisma.region.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        status: true,
        longitude: true,
        latitude: true,
        countryId: true,
        country: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    })
    return region
  } catch (error) {
    return { error: 'Failed to get region details' }
  }
}

// add new region
export const addRegion = async (data: {
  name: string
  countryId: string
  longitude?: number
  latitude?: number
}) => {
  try {
    if (!data.name || !data.countryId) {
      return { error: 'Region name and country are required' }
    }

    // Check if country exists
    const countryExists = await prisma.country.findUnique({
      where: { id: data.countryId },
    })

    if (!countryExists) {
      return { error: 'Selected country does not exist' }
    }

    // Check if region name already exists in this country
    const existingRegion = await prisma.region.findFirst({
      where: {
        name: data.name,
        countryId: data.countryId,
      },
    })

    if (existingRegion) {
      return { error: 'Region with this name already exists in this country' }
    }

    const region = await prisma.region.create({
      data: {
        name: data.name,
        countryId: data.countryId,
        longitude: data.longitude,
        latitude: data.latitude,
        status: 'active',
      },
    })

    return { message: 'Region added successfully', region }
  } catch (error) {
    return { error: 'Failed to add region' }
  }
}

// update region
export const updateRegion = async (
  id: string,
  data: {
    name?: string
    countryId?: string
    longitude?: number
    latitude?: number
  }
) => {
  try {
    if (!id) {
      return { error: 'Region ID is required' }
    }

    const existingRegion = await prisma.region.findUnique({
      where: { id: id },
    })

    if (!existingRegion) {
      return { error: 'Region not found' }
    }

    // Check if country exists if countryId is being updated
    if (data.countryId && data.countryId !== existingRegion.countryId) {
      const countryExists = await prisma.country.findUnique({
        where: { id: data.countryId },
      })

      if (!countryExists) {
        return { error: 'Selected country does not exist' }
      }
    }

    // Check if name is being updated and if it already exists in the same country
    if (data.name && data.name !== existingRegion.name) {
      const nameExists = await prisma.region.findFirst({
        where: {
          name: data.name,
          countryId: data.countryId || existingRegion.countryId,
          id: { not: id },
        },
      })

      if (nameExists) {
        return { error: 'Region with this name already exists in this country' }
      }
    }

    const updatedRegion = await prisma.region.update({
      where: { id: id },
      data: {
        name: data.name,
        countryId: data.countryId,
        longitude: data.longitude,
        latitude: data.latitude,
      },
    })

    return { message: 'Region updated successfully', region: updatedRegion }
  } catch (error) {
    return { error: 'Failed to update region' }
  }
}

// delete region from database by id
export const deleteRegion = async (id: string) => {
  try {
    // Check if the region has any pending bookings
    const checkCar = await prisma.car.findFirst({
      where: { regionId: id, status: { in: ['pending', 'booked'] } },
    })
    if (checkCar) {
      return { error: 'Region has pending or bookings', statusCode: 400 }
    }

    // Check if region has any providers
    const providersCount = await prisma.provider.count({
      where: { regionId: id },
    })

    if (providersCount > 0) {
      return {
        error: 'Cannot delete region with existing providers',
        statusCode: 400,
      }
    }

    await prisma.region.delete({ where: { id: id } })
    return { status: true, message: 'Region deleted successfully' }
  } catch (error) {
    return { error: 'Failed to delete region' }
  }
}

// get all users list from database
export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        emailVerified: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            Booking: true,
            Review: true,
            Provider: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
    return users
  } catch (error) {
    return { error: 'Something went wrong' }
  }
}

// get user by id
export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        emailVerified: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return user
  } catch (error) {
    console.error('Error in getUserById:', error)
    return { error: 'Failed to get user details' }
  }
}

// get user details for admin dashboard
export const getUserDetailsById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        emailVerified: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        userProfile: {
          select: {
            id: true,
            phone: true,
            firstName: true,
            lastName: true,
            city: true,
            state: true,
            gender: true,
            dob: true,
          },
        },
        Booking: {
          select: {
            id: true,
            status: true,
            createdAt: true,
          },
        },
        Review: {
          select: {
            id: true,
            rate: true,
            comment: true,
            createdAt: true,
          },
        },
        Provider: {
          select: {
            id: true,
            companyName: true,
            contactPhone: true,
            email: true,
            businessReg: true,
            active: true,
          },
        },
      },
    })

    return user
  } catch (error) {
    console.error('Error in getUserDetailsById:', error)
    return { error: 'Failed to get user details' }
  }
}

// update user status
export const updateUserStatus = async (id: string, status: string) => {
  try {
    // Check if the user has any pending bookings
    const checkBooking = await prisma.booking.findFirst({
      where: { userId: id, status: { in: ['pending', 'confirmed'] } },
    })
    if (checkBooking) {
      return {
        error: 'User has pending or confirmed bookings',
        statusCode: 400,
      }
    }

    await prisma.user.update({
      where: { id: id },
      data: { status: status },
    })
    return { status: true, message: 'User status updated successfully' }
  } catch (error) {
    return { error: 'Failed to update user status' }
  }
}

// update user role
export const updateUserRole = async (id: string, role: string) => {
  try {
    // Prevent changing admin role
    const currentUser = await prisma.user.findUnique({
      where: { id: id },
      select: { role: true },
    })

    if (currentUser?.role === 'admin') {
      return { error: 'Cannot change admin role', statusCode: 400 }
    }

    await prisma.user.update({
      where: { id: id },
      data: { role: role },
    })
    return { status: true, message: 'User role updated successfully' }
  } catch (error) {
    return { error: 'Failed to update user role' }
  }
}

// delete user from database by id
export const deleteUser = async (id: string) => {
  try {
    // Check if the user has any pending bookings
    const checkBooking = await prisma.booking.findFirst({
      where: { userId: id, status: { in: ['pending', 'confirmed'] } },
    })
    if (checkBooking) {
      return {
        error: 'User has pending or confirmed bookings',
        statusCode: 400,
      }
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: id },
      select: { role: true },
    })

    if (user?.role === 'admin') {
      return { error: 'Cannot delete admin user', statusCode: 400 }
    }

    await prisma.user.delete({ where: { id: id } })
    return { status: true, message: 'User deleted successfully' }
  } catch (error) {
    return { error: 'Failed to delete user' }
  }
}

// get all bookings for admin dashboard
export const getAllBookings = async () => {
  try {
    const bookings = await prisma.booking.findMany({
      select: {
        id: true,
        pickUpDate: true,
        returnDate: true,
        totalPrice: true,
        rentalTime: true,
        hOrday: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        car: {
          select: {
            id: true,
            make: true,
            model: true,
            year: true,
            images: true,
          },
        },
        provider: {
          select: {
            id: true,
            companyName: true,
            contactName: true,
            contactPhone: true,
          },
        },
        Payment: {
          select: {
            id: true,
            paymentType: true,
            amount: true,
            status: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
    return bookings
  } catch (error) {
    return { error: 'Something went wrong' }
  }
}

// get booking details by id
export const getBookingDetailsById = async (id: string) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: id },
      select: {
        id: true,
        pickUpDate: true,
        returnDate: true,
        totalPrice: true,
        rentalTime: true,
        hOrday: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            userProfile: {
              select: {
                phone: true,
                firstName: true,
                lastName: true,
                city: true,
                state: true,
              },
            },
          },
        },
        car: {
          select: {
            id: true,
            make: true,
            model: true,
            year: true,
            color: true,
            fuelType: true,
            transmission: true,
            images: true,
            pricePerHour: true,
            pricePerDay: true,
          },
        },
        provider: {
          select: {
            id: true,
            companyName: true,
            contactName: true,
            contactPhone: true,
            email: true,
            city: true,
            street: true,
          },
        },
        Payment: {
          select: {
            id: true,
            paymentId: true,
            paymentType: true,
            amount: true,
            status: true,
            createdAt: true,
          },
        },
      },
    })
    return booking
  } catch (error) {
    console.error('Error in getBookingDetailsById:', error)
    return { error: 'Failed to get booking details' }
  }
}

// update booking status
export const updateBookingStatus = async (id: string, status: string) => {
  try {
    // Validate status
    const validStatuses = ['pending', 'approved', 'rejected']
    if (!validStatuses.includes(status)) {
      return { error: 'Invalid booking status' }
    }

    const booking = await prisma.booking.update({
      where: { id: id },
      data: { status: status },
    })
    return { booking, message: 'Booking status updated successfully' }
  } catch (error) {
    console.error('Error updating booking status:', error)
    return { error: 'Failed to update booking status' }
  }
}

// delete booking
export const deleteBooking = async (id: string) => {
  try {
    await prisma.booking.delete({
      where: { id: id },
    })
    return { message: 'Booking deleted successfully' }
  } catch (error) {
    console.error('Error deleting booking:', error)
    return { error: 'Failed to delete booking' }
  }
}

// get all reviews for admin dashboard
export const getAllReviews = async () => {
  try {
    const reviews = await prisma.review.findMany({
      select: {
        id: true,
        rate: true,
        comment: true,
        likes: true,
        dislikes: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        car: {
          select: {
            id: true,
            make: true,
            model: true,
            year: true,
            images: true,
          },
        },
        provider: {
          select: {
            id: true,
            companyName: true,
            contactName: true,
            contactPhone: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
    return reviews
  } catch (error) {
    return { error: 'Something went wrong' }
  }
}

// get review details by id
export const getReviewDetailsById = async (id: string) => {
  try {
    const review = await prisma.review.findUnique({
      where: { id: id },
      select: {
        id: true,
        rate: true,
        comment: true,
        likes: true,
        dislikes: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            userProfile: {
              select: {
                phone: true,
                firstName: true,
                lastName: true,
                city: true,
                state: true,
              },
            },
          },
        },
        car: {
          select: {
            id: true,
            make: true,
            model: true,
            year: true,
            color: true,
            fuelType: true,
            transmission: true,
            images: true,
            pricePerHour: true,
            pricePerDay: true,
          },
        },
        provider: {
          select: {
            id: true,
            companyName: true,
            contactName: true,
            contactPhone: true,
            email: true,
            city: true,
            street: true,
          },
        },
      },
    })
    return review
  } catch (error) {
    console.error('Error in getReviewDetailsById:', error)
    return { error: 'Failed to get review details' }
  }
}

// update review
export const updateReview = async (id: string, data: {
  rate?: number;
  comment?: string;
}) => {
  try {
    // Validate rate
    if (data.rate && (data.rate < 1 || data.rate > 5)) {
      return { error: 'Rate must be between 1 and 5' }
    }

    const review = await prisma.review.update({
      where: { id: id },
      data: data,
    })
    return { review, message: 'Review updated successfully' }
  } catch (error) {
    console.error('Error updating review:', error)
    return { error: 'Failed to update review' }
  }
}

// delete review
export const deleteReview = async (id: string) => {
  try {
    await prisma.review.delete({
      where: { id: id },
    })
    return { message: 'Review deleted successfully' }
  } catch (error) {
    console.error('Error deleting review:', error)
    return { error: 'Failed to delete review' }
  }
}

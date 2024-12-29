import express from 'express';
import Ticket from '../models/schemas/Ticket.schema.js';
const router = express.Router();

const averageTickets = async (tickets) => {
    const ticketAverages = tickets.map(ticket => {
        // lấy giá của các đã đặt trong vé
        const roomPrices = ticket.rooms.map(roomBooking => roomBooking.roomId.pricePerNight);

        // Tính giá trung bình của các phòng trong vé
        const totalRoomPrice = roomPrices.reduce((acc, price) => acc + price, 0);
        const averageRoomPrice = roomPrices.length > 0 ? totalRoomPrice / roomPrices.length : 0;

        return {
            ticketId: ticket._id,
            averageRoomPrice: averageRoomPrice,
        };
    });
    const totalAveragePrice = ticketAverages.reduce((acc, ticket) => acc + ticket.averageRoomPrice, 0);
    return ticketAverages.length > 0 ? totalAveragePrice / ticketAverages.length : 0;
}

function getCitiesWithCount(tickets) {
    // Lọc ra tất cả các thành phố mà người dùng đã đặt
    const cities = tickets.map(ticket => ticket.accommodation?.city).filter(Boolean);

    // Đếm số lần xuất hiện của mỗi thành phố
    const cityCount = cities.reduce((acc, city) => {
        acc[city] = (acc[city] || 0) + 1;
        return acc;
    }, {});

    // Chuyển đối tượng cityCount thành mảng các đối tượng { city, count }
    const citiesWithCount = Object.keys(cityCount).map(city => ({
        city,
        count: cityCount[city]
    }));

    // Sắp xếp các thành phố theo số lần xuất hiện giảm dần
    citiesWithCount.sort((a, b) => b.count - a.count);

    return citiesWithCount;
}

// Hàm lấy tất cả các amenities xuất hiện trong các Accommodation của các vé
function getAllUniqueAmenities(tickets) {
    // Tập hợp tất cả các amenities từ từng accommodation trong các vé
    const allAmenities = tickets.flatMap(ticket => {
        console.log("🚀 ~ allAmenities ~ ticket.accommodation?.amenities:", ticket.accommodation?.amenities)
        ticket.accommodation?.amenities || []
    });
    console.log("🚀 ~ allAmenities ~ allAmenities:", allAmenities)

    // Loại bỏ các tiện nghi trùng lặp
    const uniqueAmenities = [...new Set(allAmenities)];
    console.log("🚀 ~ getAllUniqueAmenities ~ uniqueAmenities:", uniqueAmenities)

    return uniqueAmenities;
}

router.get('/', async (req, res) => {
    try {
        const { id } = req.query;

        // Lấy lịch sử vé đã đặt của người dùng
        const tickets = await Ticket.find({
            userId: id
        }).populate({
            path: 'accommodation',
            select: 'city amenities',
        }).populate({
            path: 'rooms.roomId',
            select: 'pricePerNight'
        });
        if (tickets.length === 0) {
            return res.json({ recommendations: [], message: 'Người dùng chưa có lượt đặt phòng nào.' });
        }

        //1 Lấy giá phòng trung bình
        const avgPrice = averageTickets(tickets)

        //2 Tập hợp các địa điểm city
        const citylist = getCitiesWithCount(tickets)

        // 3. Độ tương đồng về tiện ích: Lấy ra tiện ích xuất hiện nhiều nhất trong các lượt
        const allAmenities = getAllUniqueAmenities(tickets);
        console.log("🚀 ~ router.get ~ allAmenities:", allAmenities)
        res.json({ recommendations: tickets });





        // // 4. Tìm kiếm các chuyến xe phù hợp và tính toán độ tương đồng
        // const allTrips = await BusTrip.find(
        //     {
        //         departureTime: { $gt: new Date() },
        //     }
        // )
        //     .populate({ path: 'bus', populate: { path: 'owner', select: 'branchName' } })
        //     .populate('origin destination')
        //     .exec(); // Đảm bảo sử dụng await để có kết quả

        // const recommendations = allTrips
        //     .map(trip => {
        //         // Độ tương đồng về giá
        //         const priceSimilarity = 1 - Math.abs(trip.price - avgPrice) / avgPrice;

        //         // Độ tương đồng về tuyến đường (so sánh origin và destination)
        //         const routeSimilarity = locationIds.has(trip.origin._id.toString()) && locationIds.has(trip.destination._id.toString()) ? 1 : 0;

        //         // Độ tương đồng về tiện ích
        //         const amenitiesSimilarity = trip.amenity.filter(a => sortedAmenities.includes(a)).length / sortedAmenities.length;

        //         // Tổng hợp độ tương đồng
        //         const totalSimilarity = (priceSimilarity + routeSimilarity + amenitiesSimilarity) / 3;
        //         return { trip, similarity: totalSimilarity };
        //     })
        //     .filter(({ similarity }) => similarity > 0.5) // Lọc những chuyến có độ tương đồng thấp hơn 0.5
        //     .sort((a, b) => b.similarity - a.similarity) // Sắp xếp theo độ tương đồng
        //     .slice(0, 5); // Giới hạn 5 chuyến phù hợp nhất

        // res.json({ recommendations: recommendations.map(r => r.trip) });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Hệ thống lỗi', error: error.message });
    }
});
export default router;

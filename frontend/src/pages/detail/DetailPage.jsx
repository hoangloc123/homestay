import { Button, DateRangePicker, Input } from "@nextui-org/react"
import { cn } from "@utils/Utils"
import { useRef, useState } from "react"
import { parseZonedDateTime } from "@internationalized/date";
import { NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react";

const reviews = [
  {
    id: 1,
    name: "My",
    country: "Việt Nam",
    avatar: "https://placehold.co/50x50",
    stayDetails: "Căn Hộ 1 Phòng Ngủ Có Ban Công",
    stayDuration: "4 đêm · tháng 8/2024",
    stayType: "Cặp đôi",
    reviewDate: "Ngày đánh giá: ngày 27 tháng 8 năm 2024",
    title: "Rẻ bất ngờ",
    rating: 9.0,
    pros: "Giá rẻ bất ngờ nên mình phải hỏi đi hỏi lại, tiện ích đầy đủ nhưng hơi ngại vì mình phải đổi căn giữa chừng 1 tẹo. Đặt studio 1 phòng ngủ mà bên home toàn đưa căn 2 phòng ngủ nên bị dư ko làm gì luôn. Có karaoke miễn phí và bơi thoải mái, giải trí nữa nên cũng thích, gần trung tâm",
    cons: "Dụng cụ bếp mình thấy còn hơi chưa sạch sẽ và đầy đủ tiện nghi lắm thôi, còn lại quá okeee",
    response: "cảm ơn quý khách rất nhiều.hẹn gặp lại quý khách lần sau ạk",
    helpfulCount: 1
  },
  {
    id: 2,
    name: "Ngọc",
    country: "Việt Nam",
    avatar: "https://placehold.co/50x50",
    stayDetails: "Căn Hộ 3 Phòng Ngủ Nhìn Ra Biển",
    stayDuration: "1 đêm · tháng 10/2024",
    reviewDate: "Ngày đánh giá: ngày 9 tháng 10 năm 2024",
    title: "ok",
    rating: 10,
    pros: "ok",
    helpfulCount: 0
  }
];




export default function DetailPage() {
  const overview = useRef()
  const info = useRef()
  const conform = useRef()
  const note = useRef()
  const comments = useRef()
  const [activeSection, setActiveSection] = useState();

  function handlePressScroll(ref) {
    setActiveSection(ref)
    scrollToSection(ref)
  }
  function scrollToSection(ref) {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // function component UI 
  // section
  function SectionNavigator() {
    return <div className="w-full flex flex-row flex-grow border-b-1 border-grey-200">
      <Button variant="ghost" className={cn("flex-grow h-20 border-0 border-b-3 border-b-cyan-dark rounded-none", '')} onClick={() => handlePressScroll(overview)}>
        Tổng quan
      </Button>
      <Button variant="ghost" className={cn("flex-grow h-20 border-none rounded-none", activeSection === info)} onClick={() => handlePressScroll(info)}>
        Phòng và giá vé
      </Button>
      <Button variant="ghost" className={cn("flex-grow h-20 border-none rounded-none", activeSection === conform)} onClick={() => handlePressScroll(conform)}>
        Tiện nghi
      </Button>
      <Button variant="ghost" className={cn("flex-grow h-20 border-none rounded-none", activeSection === note)} onClick={() => handlePressScroll(note)}>
        Ghi chú
      </Button>
      <Button variant="ghost" className={cn("flex-grow h-20 border-none rounded-none", activeSection === comments)} onClick={() => handlePressScroll(comments)}>
        Bình luận
      </Button>
    </div>
  }
  // overview
  function Overview() {
    return (<div ref={overview} className="p-4">
      <div className="flex justify-between items-start">
        <div className="w-3/4">
          <h1 className="text-2xl font-bold mb-2">Temple Da Nang Resort</h1>
          {/* <div className="flex items-center text-blue-600 mb-4">
            <i className="fas fa-map-marker-alt"></i>
            <span className="ml-2">11 Võ Nguyên Giáp, Phước Mỹ, Sơn Trà, Đà Nẵng, Việt Nam – <span className="font-medium">Vị trí tuyệt vời</span> – <span className="underline">Hiển thị bản đồ</span></span>
          </div> */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <img src="https://placehold.co/200x150" alt="Resort view 1" className="w-full h-auto" />
            <img src="https://placehold.co/200x150" alt="Resort view 2" className="w-full h-auto" />
            <img src="https://placehold.co/200x150" alt="Resort view 3" className="w-full h-auto" />
            <img src="https://placehold.co/200x150" alt="Resort view 4" className="w-full h-auto" />
            <img src="https://placehold.co/200x150" alt="Resort view 5" className="w-full h-auto" />
            <div className="relative">
              <img src="https://placehold.co/200x150" alt="Resort view 6" className="w-full h-auto" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-lg font-bold">+36 ảnh</div>
            </div>
          </div>
          <p className="mb-4">Bạn có thể đủ điều kiện hưởng giảm giá Genius tại Temple Da Nang Resort. Để biết giảm giá Genius có áp dụng cho ngày bạn chọn hay không, hãy <span className="text-blue-600 underline">đăng nhập</span>.</p>
          <p className="mb-4">Giảm giá Genius tại chỗ nghỉ này chỉ thuộc vào ngày đặt phòng, ngày lưu trú và các ưu đãi có sẵn khác.</p>
          <p className="mb-4">Nằm trên Bãi biển Mỹ Khê, Temple Da Nang Resort cung cấp chỗ nghỉ với Wi-Fi miễn phí và tầm nhìn ra biển. Tại đây cũng có hồ bơi ngoài trời và nhà hàng.</p>
          <p className="mb-4">Temple Da Nang Resort cách trung tâm thành phố Đà Nẵng 2 km, sân bay quốc tế Đà Nẵng 10 phút lái xe và Núi Ngũ Hành Sơn 8 km.</p>
          <p className="mb-4">Các phòng nghỉ tại đây đều được hoàn thiện với đồ kết an toàn trong phòng, truyền hình cáp màn hình phẳng, tủ lạnh mini và máy điều hòa nhiệt độ. Một số phòng nghỉ có bồn tắm và vòi sen hoặc phòng tắm riêng biệt. Tất cả các phòng đều có dép, máy sấy tóc và đồ vệ sinh cá nhân miễn phí. Các phòng nghỉ tại đây đều có ban công riêng.</p>
          <p className="mb-4">Tại Temple Da Nang Resort, du khách có thể thư giãn tại khu vực bãi biển riêng, phòng tắm nắng hoặc vườn. Các hoạt động như lặn biển, lướt ván buồm, chèo thuyền kayak và lặn với ống thở cũng có thể được sắp xếp tại đây. Du khách có thể tham gia các hoạt động như múa bụng, múa lửa và nhạc sống. Tại đây cũng có dịch vụ đưa đón có tính phí và dịch vụ giữ hành lý.</p>
          <p className="mb-4">Các cặp đôi đặc biệt thích địa điểm này — họ cho điểm 8,8 khi đi du lịch hai người.</p>
          <h2 className="text-xl font-bold mb-2">Các tiện nghi được ưa chuộng nhất</h2>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center">
              <i className="fas fa-swimming-pool text-green-600"></i>
              <span className="ml-2">Hồ bơi ngoài trời</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-smoking-ban text-green-600"></i>
              <span className="ml-2">Phòng không hút thuốc</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-concierge-bell text-green-600"></i>
              <span className="ml-2">Dịch vụ phòng</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-parking text-green-600"></i>
              <span className="ml-2">Chỗ đỗ xe miễn phí</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-wifi text-green-600"></i>
              <span className="ml-2">WiFi miễn phí</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-wheelchair text-green-600"></i>
              <span className="ml-2">Tiện nghi cho khách khuyết tật</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-utensils text-green-600"></i>
              <span className="ml-2">Nhà hàng</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-cocktail text-green-600"></i>
              <span className="ml-2">Quầy bar</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-spa text-green-600"></i>
              <span className="ml-2">Khu vực bãi tắm riêng</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-sun text-green-600"></i>
              <span className="ml-2">Bữa sáng</span>
            </div>
          </div>
        </div>
        <div className="w-1/4 bg-gray-100 p-4 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-bold">Đánh giá</span>
            <div className="flex items-center mb-2">
              <i className="fas fa-star text-yellow-500"></i>
              <i className="fas fa-star text-yellow-500"></i>
              <i className="fas fa-star text-yellow-500"></i>
            </div>
          </div>
          <img src="https://placehold.co/200x150" alt="Map" className="w-full h-auto mb-4" />
          <h2 className="text-lg font-bold mb-2">Điểm nổi bật của chỗ nghỉ</h2>
          <ul className="list-disc list-inside mb-4">
            <li>Hoàn hảo cho kỳ nghỉ 1 đêm!</li>
            <li>Địa điểm hàng đầu: Được khách gần đây đánh giá cao (8,8 điểm)</li>
            <li>Thông tin về bữa sáng: Tự chọn</li>
          </ul>
          <h2 className="text-lg font-bold mb-2">Các lựa chọn của bạn</h2>
          <ul className="list-disc list-inside mb-4">
            <li>Nhìn ra vườn</li>
            <li>Nhìn ra biển</li>
            <li>Phòng tắm riêng</li>
            <li>Khu vực tiếp khách riêng biệt trong khuôn viên</li>
          </ul>
          <h2 className="text-lg font-bold mb-2">Hoạt động</h2>
          <ul className="list-disc list-inside mb-4">
            <li>Lướt ván buồm</li>
            <li>Khu vực bãi tắm riêng</li>
            <li>Khu vực dành cho thả dù dưới nước (trong khuôn viên)</li>
          </ul>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg">Đặt ngay</button>
        </div>
      </div>
    </div>)
  }

  function InfoPrice() {
    return (
      <div ref={info} className="p-4">
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Phòng trống</h1>
          <div className="flex items-center space-x-2">
            <DateRangePicker
              radius='sm'
              hideTimeZone
              variant='flat'
              visibleMonths={2}
              className="border-none flex-5"
              defaultValue={{
                start: parseZonedDateTime("2024-04-01T00:45[America/Los_Angeles]"),
                end: parseZonedDateTime("2024-04-08T11:15[America/Los_Angeles]"),
              }}
            />
            <Button onClick={() => { }} variant='solid' radius='sm' className="w-full min-w-[200px] xl:w-fit  bg-blue-600 px-4 py-2 text-white">Thay đổi tìm kiếm</Button>
          </div>
        </header>
        <div className="flex justify-end mb-4">
          <a href="#" className="text-grey-500 font-bold">Chúng Tôi Luôn Khớp Giá!</a>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-100">
              <th className="border p-2">Loại chỗ nghỉ</th>
              <th className="border p-2">Số lượng khách</th>
              <th className="border p-2">Giá hôm nay</th>
              <th className="border p-2">Các lựa chọn</th>
              <th className="border p-2">Chọn số lượng</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                type: "Phòng Superior Có Giường Cỡ King",
                guests: "2 người lớn",
                price: "VND 940.680",
                originalPrice: "VND 2.400.000",
                discount: "Tiết kiệm 61%",
                options: [
                  "Bao bữa sáng tự chọn",
                  "Không cần thẻ tín dụng",
                  "Miễn phí huỷ trước kỳ nghỉ",
                  "Không cần thanh toán trước - thanh toán tại chỗ nghỉ",
                  "Genius - Có thể có giảm giá",
                  "Chỉ còn 5 phòng trống tại trang của chúng tôi"
                ],
                select: true
              },
              {
                type: "Phòng Superior 2 Giường Đơn",
                guests: "2 giường đơn",
                price: "VND 940.680",
                originalPrice: "VND 2.400.000",
                discount: "Tiết kiệm 61%",
                options: [
                  "Bao bữa sáng tự chọn",
                  "Không cần thẻ tín dụng",
                  "Miễn phí huỷ trước kỳ nghỉ",
                  "Không cần thanh toán trước - thanh toán tại chỗ nghỉ",
                  "Genius - Có thể có giảm giá",
                  "Chỉ còn 5 phòng trống tại trang của chúng tôi"
                ],
                select: true
              },
              {
                type: "Phòng Deluxe có Giường cỡ King Nhìn ra Khu vườn",
                guests: "2 người lớn",
                price: "VND 1.063.530",
                originalPrice: "VND 2.700.000",
                discount: "Tiết kiệm 61%",
                options: [
                  "Bao bữa sáng tự chọn",
                  "Không cần thẻ tín dụng",
                  "Miễn phí huỷ trước kỳ nghỉ",
                  "Không cần thanh toán trước - thanh toán tại chỗ nghỉ",
                  "Genius - Có thể có giảm giá",
                  "Chỉ còn 4 phòng trống tại trang của chúng tôi"
                ],
                select: true
              },
              {
                type: "Phòng Deluxe 2 Giường Đơn Nhìn Ra Vườn",
                guests: "2 giường đơn",
                price: "VND 1.063.530",
                originalPrice: "VND 2.700.000",
                discount: "Tiết kiệm 61%",
                options: [
                  "Bao bữa sáng tự chọn",
                  "Không cần thẻ tín dụng",
                  "Miễn phí huỷ trước kỳ nghỉ",
                  "Không cần thanh toán trước - thanh toán tại chỗ nghỉ",
                  "Genius - Có thể có giảm giá",
                  "Chỉ còn 4 phòng trống tại trang của chúng tôi"
                ],
                select: true
              },
              {
                type: "Phòng Deluxe Giường Đôi/2 Giường Đơn Nhìn Ra Đại Dương",
                guests: "2 người lớn",
                price: "VND 4.050.000",
                originalPrice: "",
                discount: "",
                options: [
                  "Bao bữa sáng VND 150.000 (không bắt buộc)",
                  "Không cần thẻ tín dụng",
                  "Miễn phí huỷ trước kỳ nghỉ",
                  "Không cần thanh toán trước - thanh toán tại chỗ nghỉ",
                  "Genius - Có thể có giảm giá"
                ],
                select: true
              },
              {
                type: "Phòng Deluxe Giường Đôi/2 Giường Đơn Nhìn Ra Đại Dương",
                guests: "2 người lớn",
                price: "VND 4.500.000",
                originalPrice: "",
                discount: "",
                options: [
                  "Bao bữa sáng tự chọn",
                  "Không cần thẻ tín dụng",
                  "Miễn phí huỷ trước kỳ nghỉ",
                  "Không cần thanh toán trước - thanh toán tại chỗ nghỉ",
                  "Genius - Có thể có giảm giá"
                ],
                select: true
              },
              {
                type: "Phòng Deluxe Giường Đôi/2 Giường Đơn Nhìn Ra Đại Dương",
                guests: "2 người lớn",
                price: "VND 4.500.000",
                originalPrice: "",
                discount: "",
                options: [
                  "Bao bữa sáng VND 150.000 (không bắt buộc)",
                  "Không cần thẻ tín dụng",
                  "Miễn phí huỷ trước kỳ nghỉ",
                  "Không cần thanh toán trước - thanh toán tại chỗ nghỉ",
                  "Genius - Có thể có giảm giá"
                ],
                select: true
              }
            ].map((room, index) => (
              <tr key={index} className="border-t">
                <td className="border p-2">
                  <div className="font-bold">{room.type}</div>
                  <div className="text-sm">
                    <ul>
                      <li>1 giường đôi cực lớn</li>
                      <li>28 m² Ban công</li>
                      <li>Nhìn ra vườn</li>
                      <li>Nhìn ra địa danh nổi tiếng</li>
                      <li>Phòng tắm riêng</li>
                      <li>TV màn hình phẳng</li>
                      <li>Điều hòa không khí</li>
                      <li>WiFi miễn phí</li>
                    </ul>
                  </div>
                </td>
                <td className="border p-2 text-center">
                  <div className="flex justify-center items-center space-x-1">
                    <i className="fas fa-user"></i>
                    <i className="fas fa-user"></i>
                  </div>
                </td>
                <td className="border p-2 text-center">
                  <div className="text-red-600 line-through">{room.originalPrice}</div>
                  <div className="font-bold">{room.price}</div>
                  <div className="text-green-600">{room.discount}</div>
                </td>
                <td className="border p-2">
                  <ul className="text-sm">
                    {room.options.map((option, i) => (
                      <li key={i} className={option.includes("Chỉ còn") ? "text-red-600" : ""}>
                        {option}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="border p-2 text-center">
                  {room.select && (
                    <div className="flex justify-center items-center gap-5">
                      <NumberInput className="flex-1 max-w-[140px]" defaultValue={15} max={30} clampValueOnBlur={false}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <Button variant="shadow" color="success" className="p-2 min-w-[150px] rounded text-white">Tôi sẽ đặt</Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  function Review({ review }) {
    return (
      <div className="w-full bg-white p-4 rounded-lg shadow mb-4 flex flex-row">
        <div className="w-1/4 flex items-start">
          <img src={review.avatar} alt="User avatar" className="w-12 h-12 rounded-full mr-4" />
          <div>
            <div className="flex items-center mb-1">
              <h3 className="font-bold mr-2">{review.name}</h3>
              <span className="text-sm text-gray-500">{review.country}</span>
            </div>
            <div className="text-sm text-gray-500 mb-1">{review.stayDetails}</div>
            <div className="text-sm text-gray-500 mb-1">{review.stayDuration}</div>
            <div className="text-sm text-gray-500">{review.stayType}</div>
          </div>
        </div>
        <div className="mt- flex-1">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">{review.reviewDate}</div>
            <div className="bg-blue-600 text-white text-sm font-bold px-2 py-1 rounded">{review.rating}</div>
          </div>
          <h4 className="font-bold mt-2">{review.title}</h4>
          <div className="mt-2 flex flex-col">
            <p className="flex items-center text-green-600"><i className="fas fa-smile mr-2"></i>{review.pros}</p>
            {review.cons && <p className="flex items-center text-red-600 mt-2"><i className="fas fa-frown mr-2"></i>{review.cons}</p>}
          </div>
          {/* {review.response && (
            <div className="bg-gray-100 p-2 rounded mt-4">
              <p className="flex items-center text-gray-700"><i className="fas fa-comment-dots mr-2"></i>Phản hồi của chỗ nghỉ:</p>
              <p className="text-gray-700 mt-1">{review.response}</p>
            </div>
          )} */}
          {/* <div className="flex items-center mt-4 text-sm text-gray-500">
            <span>{review.helpfulCount} người thấy đánh giá này có ích.</span>
            <button className="ml-4 text-blue-600 flex items-center"><i className="fas fa-thumbs-up mr-1"></i>Hữu ích</button>
            <button className="ml-4 text-blue-600 flex items-center"><i className="fas fa-thumbs-down mr-1"></i>Không hữu ích</button>
          </div> */}
        </div>
      </div>
    );
  }

  function CommentList() {
    return (
      <div className="mx-auto w-full mt-20">
        <h1 className="text-2xl font-bold mb-4">Đánh giá của khách</h1>
        <div className="w-full flex justify-end mb-4">
          <select className="border border-gray-300 rounded p-2">
            <option>Phù hợp nhất</option>
          </select>
        </div>
        {reviews.map(review => (
          <Review key={review.id} review={review} />
        ))}
      </div>
    )
  }
  return (
    <div className='mx-auto max-w-[80%] pt-10 pb-24'>
      {/* navigator */}
      <SectionNavigator />
      <Overview />
      <InfoPrice />
      <CommentList/>
    </div>
  )
}




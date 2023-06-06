## useCallback

useCallback là một React Hook cho phép bạn cache 1 định nghĩa hàm giữa các lần render lại.

```jsx
const cachedFn = useCallback(fn, dependencies);
```

Cách sử dụng

    Bỏ qua render lại các component

    Cập nhật state từ một memorized callback

    Ngăn không cho Effect kích hoạt quá thường xuyên

    Tối ưu hóa Hook tùy chỉnh

Xử lý sự cố

    Mỗi khi component của tôi render, useCallback trả về một chức năng khác

    Tôi cần gọi useCallback cho từng mục danh sách trong một vòng lặp, nhưng không được phép

# Reference

Gọi useCallback ở component cha già nhât ( tức chứa nhiều thằng component khác ấy) để cache 1 định nghĩa hàm giữa các lần render
( Giải thích nghĩa của cache: lưu trữ tạm thời ( còn lưu ở chỗ nào thì chưa thấy nói))

```jsx
import { useCallback } from 'react';

export default function ProductPage({ productId, referrer, theme }) {
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]);
  // có thể thấy rõ cái nào là fn, cái nào là dependencies đúng k?
```

# Các tham số:

fn: Giá trị hàm mà bạn muốn cache. Nó có thể lấy bất kỳ đối số nào và trả về bất kỳ giá trị nào. React sẽ trả lại (không gọi!) function cho bạn trong suôt quá trình render() ban đầu. Trong lần render() tiếp theo, React sẽ cung cấp lại cho bạn function tương tự nếu các dependencies không thay đổi kể từ lần render() cuối cùng. Nếu không ( tức dependencies có thay đổi ấy), nó sẽ cung cấp cho bạn function mà bạn đã truyền trong quá trình render() hiện tại và lưu trữ nó trong trường hợp có thể sử dụng lại sau này. Phản ứng sẽ không gọi function. Function được trả lại để bạn có thể quyết định khi nào và có nên gọi nó hay không.

Dependencies: Danh sách tất cả các giá trị phản ứng được tham chiếu bên trong mã fn. Các giá trị phản ứng bao gồm các props, state và tất cả các biến và hàm được khai báo trực tiếp bên trong phần thân component của bạn. Nếu linter (kẻ nói dối) của bạn được định cấu hình cho React, nó sẽ xác minh rằng mọi giá trị phản ứng đều được chỉ định chính xác dưới dạng dependencies. Danh sách các dependencies phải có số lượng không đổi và được viết trực tiếp ( tức không truyền qua cái gì khác) dưới dạng [dep1, dep2, dep3]. React sẽ so sánh từng dependency với giá trị trước đó của nó bằng thuật toán so sánh Object.is.

# Return

Trong lần render() đầu thì React sẽ trả lại hàm mà bạn truyền vào
Trong các lần render() tiếp theo, nó sẽ trả về một hàm fn đã được lưu trữ từ lần render() cuối cùng (nếu các dependency không thay đổi) hoặc trả về hàm fn mà bạn đã truyền trong lần render() này.

# Hãy cẩn thận

( chả cần đọc đâu, ko có ích lắm)

useCallback là một Hook, vì vậy bạn chỉ có thể gọi nó ở cấp cao nhất của component hoặc Hook của riêng bạn. Bạn không thể gọi nó bên trong vòng lặp hoặc điều kiện. Nếu bạn cần điều đó, hãy trích xuất một component mới và truyền state vào đó.

React sẽ không loại bỏ function đã lưu trong bộ nhớ cache trừ khi có lý do cụ thể để làm điều đó. Ví dụ: trong quá trình phát triển, React sẽ loại bỏ bộ đệm khi bạn chỉnh sửa file của component. Cả trong quá trình phát triển và sản xuất, React sẽ loại bỏ bộ đệm nếu component của bạn tạm dừng trong quá trình khởi động ban đầu. Trong tương lai, React có thể bổ sung thêm nhiều tính năng tận dụng lợi thế của việc loại bỏ bộ đệm. Ví dụ: nếu React bổ sung hỗ trợ tích hợp sẵn cho các danh sách ảo hóa trong tương lai, sẽ rất hợp lý nếu bạn loại bỏ bộ đệm cho các mục cuộn ra khỏi chế độ xem bảng được ảo hóa. Điều này sẽ phù hợp với mong đợi của bạn nếu bạn dựa vào useCallback để tối ưu hóa hiệu suất. Nếu không, một biến trạng thái hoặc một tham chiếu có thể phù hợp hơn

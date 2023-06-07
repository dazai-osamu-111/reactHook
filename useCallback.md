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

## Cách sử dụng

# Bỏ qua re-render() component

Khi bạn tối ưu hóa hiệu suất render(), đôi khi bạn sẽ cần lưu vào bộ nhớ đệm các function mà bạn chuyển cho các component con. Trước tiên, hãy xem cú pháp để biết cách thực hiện điều này, sau đó xem nó hữu ích trong trường hợp nào.

Để lưu trữ một function giữa các lần render() lại thành phần của bạn, hãy đưa định nghĩa của nó vào useCallback Hook:

```jsx
import { useCallback } from 'react';

function ProductPage({ productId, referrer, theme }) {
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]);
  // ...
```

Bạn cần truyền hai thứ cho useCallback:

Định nghĩa hàm mà bạn muốn lưu vào bộ nhớ đệm giữa các lần render() lại.

Danh sách các dependencies bao gồm mọi giá trị trong component của bạn được sử dụng bên trong function của bạn.

Trong lần kết xuất đầu tiên, hàm được trả về mà bạn sẽ nhận được từ useCallback sẽ là hàm bạn đã truyền.

Trong các lần kết xuất sau, React sẽ so sánh các dependency với các dependency mà bạn đã truyền trong lần kết xuất trước đó. Nếu không có dependency nào thay đổi (so với Object.is), thì useCallback sẽ trả về function giống như trước dó. Nếu không, useCallback sẽ trả về function mà bạn đã chuyển vào render() này.

Nói cách khác, useCallback lưu trữ một function giữa các lần render() lại cho đến khi các dependency của nó thay đổi.

Hãy xem qua một ví dụ để xem khi nào điều này hữu ích.

Giả sử bạn đang chuyển một hàm handleSubmit từ ProductPage xuống thành phần ShippingForm:

```jsx
function ProductPage({ productId, referrer, theme }) {
  // ...
  return (
    <div className={theme}>
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
```

Bạn đã nhận thấy rằng việc bật/tắt theme prop sẽ làm ứng dụng bị đóng băng trong giây lát, nhưng nếu bạn xóa <ShippingForm /> khỏi JSX của mình, bạn sẽ cảm thấy rất nhanh. Điều này cho bạn biết rằng bạn nên thử tối ưu hóa thành phần ShippingForm.

Theo mặc định, khi một thành phần render() lại, React sẽ kết xuất lại tất cả các thành phần con của nó theo cách đệ quy. Đây là lý do tại sao khi ProductPage render() lại với một theme khác, ShippingForm component cũng render() lại. Điều này tốt cho các component không cần tính toán nhiều để render lại. Nhưng nếu bạn đã xác minh một render lại chậm, bạn có thể yêu cầu ShippingForm bỏ qua render lại khi các prop của nó giống như lần render cuối cùng bằng cách gói nó trong memo:

```jsx
import { memo } from "react";

const ShippingForm = memo(function ShippingForm({ onSubmit }) {
  // ...
});
```

Với thay đổi này, ShippingForm sẽ bỏ qua quá trình render lại nếu tất cả các thuộc tính của nó giống như trong lần render cuối cùng. Đây là lúc caching a function trở nên quan trọng! Giả sử bạn đã xác định handleSubmit mà không có useCallback:

```jsx
function ProductPage({ productId, referrer, theme }) {
  // Every time the theme changes, this will be a different function...
  function handleSubmit(orderDetails) {
    post("/product/" + productId + "/buy", {
      referrer,
      orderDetails,
    });
  }

  return (
    <div className={theme}>
      {/* ... so ShippingForm's props will never be the same, and it will re-render every time */}
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}
```

Trong JavaScript, một function () {} hoặc () => {} luôn tạo một function khác, tương tự như cách ký tự đối tượng {} luôn tạo một đối tượng mới. Thông thường, đây không phải là vấn đề, nhưng điều đó có nghĩa là các ShippingForm props sẽ không bao giờ giống nhau và việc tối ưu hóa memo của bạn sẽ không hoạt động. Đây là nơi useCallback có ích:

```jsx
function ProductPage({ productId, referrer, theme }) {
  // Tell React to cache your function between re-renders...
  const handleSubmit = useCallback(
    (orderDetails) => {
      post("/product/" + productId + "/buy", {
        referrer,
        orderDetails,
      });
    },
    [productId, referrer]
  ); // ...so as long as these dependencies don't change...

  return (
    <div className={theme}>
      {/* ...ShippingForm will receive the same props and can skip re-rendering */ shippingForm sẽ nhận props như cũ nên sẽ ko bị render lại}
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}
```

Bằng cách gói handleSubmit trong useCallback, bạn đảm bảo rằng function đó giống nhau giữa các lần kết xuất lại (cho đến khi các yếu tố phụ thuộc thay đổi). Bạn không cần phải ngắt một hàm trong useCallback trừ khi bạn làm điều đó vì một số lý do cụ thể. Trong ví dụ này, lý do là bạn truyền nó tới một được bọc trong memo và điều này cho phép nó bỏ qua việc render lại. Có những lý do khác mà bạn có thể cần sử dụngCallback được mô tả thêm trên trang này.

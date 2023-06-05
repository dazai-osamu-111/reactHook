Hook là một bổ sung mới trong React 16.8. Chúng cho phép bạn sử dụng state và các tính năng khác của React mà không cần viết class.
ví dụ:

```jsx
import React, { useState } from "react";

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

Chức năng mới này useState là “Hook” đầu tiên mà chúng ta sẽ tìm hiểu.

Bạn có thể bắt đầu học Móc ở trang tiếp theo. Trên trang này, chúng tôi sẽ tiếp tục bằng cách giải thích lý do tại sao chúng tôi thêm Hook vào React và cách chúng có thể giúp bạn viết các ứng dụng tuyệt vời.\

Tóm lại là nó tiện hơn nhiều, dùng sướng hơn và dễ hơn.
Hook luôn được sử dụng cùng với function component

# State Hooks

State cho phép component lưu giữ thông tin giống như user input. Ví dụ: form component có thể sử dụng state để lưu trữ giá trị đầu vào, trong khi image gallery component có thể sử dụng state để lưu trữ chỉ mục hình ảnh đã chọn.
Để thêm 1 state vào component sử dụng 1 trong các hook sau:

useState: Khai báo 1 biến state mà bạn có thể cập nhật trực tiếp
useReducer: useReducer khai báo một biến state với logic cập nhật bên trong reducer function.

```jsx
function ImageGallery() {
  const [index, setIndex] = useState(0);
  // ...
```

# Context Hooks

Context cho phép một component nhận thông tin từ cha mẹ ở xa mà không chuyển nó dưới dạng props ( truyền dạng props thì đã nói rất nhiều ở serries trước rồi).
Ví dụ: component cấp cao nhất của ứng dụng của bạn có thể chuyển chủ đề giao diện người dùng hiện tại cho tất cả các component bên dưới, bất kể độ sâu như thế nào.

useContext đọc và đăng ký một ngữ cảnh.

```jsx
function Button() {
  const theme = useContext(ThemeContext);
  // ...
```

# Ref Hooks

Các Ref cho phép một component chứa một số thông tin không được sử dụng để render, chẳng hạn như nút DOM hoặc ID hết thời gian chờ. Không giống như với state, việc cập nhật một ref không render lại componet của bạn. Các ref là một (escape hatch) “cửa thoát hiểm” từ mô hình React. Chúng hữu ích khi bạn cần làm việc với các hệ thống không phải React, chẳng hạn như API trình duyệt tích hợp.

useRef khai báo một ref. Bạn có thể giữ bất kỳ giá trị nào trong đó, nhưng thông thường nó được dùng để giữ một nút DOM.

useImperativeHandle cho phép bạn tùy chỉnh ref được hiển thị bởi thành phần của bạn. Điều này hiếm khi được sử dụng.

```jsx
function Form() {
  const inputRef = useRef(null);
  // ...
```

# Effect Hooks

Các Effect cho phép một thành phần kết nối và đồng bộ hóa với các hệ thống bên ngoài. Điều này bao gồm xử lý mạng, trình duyệt DOM, hoạt ảnh, tiện ích được viết bằng thư viện giao diện người dùng khác và mã không phản ứng khác.

useEffect kết nối một thành phần với một hệ thống bên ngoài.

```jsx
function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);
  // ...
```

Các Effect là một “cửa thoát hiểm” từ mô hình React. Không sử dụng Hiệu ứng để sắp xếp luồng dữ liệu của ứng dụng của bạn. Nếu bạn không tương tác với hệ thống bên ngoài, bạn có thể không cần Hiệu ứng.

Có hai biến thể hiếm khi được sử dụng của useEffect với sự khác biệt về thời gian:

useLayoutEffect kích hoạt trước khi trình duyệt sơn lại màn hình. Bạn có thể đo bố cục ở đây.

useInsertionEffect kích hoạt trước khi React thực hiện các thay đổi đối với DOM. Các thư viện có thể chèn CSS động tại đây.

# Performance Hooks

Một cách phổ biến để tối ưu hóa hiệu suất kết xuất lại là bỏ qua những công việc không cần thiết. Ví dụ: bạn có thể yêu cầu React sử dụng lại phép tính đã lưu trong bộ nhớ cache hoặc bỏ qua kết xuất lại nếu dữ liệu không thay đổi kể từ lần render trước đó.

Để bỏ qua các phép tính và render lại không cần thiết, hãy sử dụng một trong các hook sau:

useMemo: cho phép bạn lưu trữ kết quả của một phép tính tốn kém.

useCallback: cho phép bạn lưu định nghĩa hàm vào bộ đệm ẩn trước khi chuyển nó xuống một thành phần được tối ưu hóa.

```jsx
function TodoList({ todos, tab, theme }) {
  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
  // ...
}
``;
```

Đôi khi, bạn không thể bỏ qua việc render lại vì màn hình thực sự cần cập nhật. Trong trường hợp đó, bạn có thể cải thiện hiệu suất bằng cách tách các bản cập nhật chặn phải đồng bộ (như nhập vào đầu vào) khỏi các bản cập nhật không chặn không cần chặn giao diện người dùng (như cập nhật biểu đồ).

Để ưu tiên render, hãy sử dụng một trong các hook sau:

useTransition:cho phép bạn đánh dấu quá trình chuyển đổi trạng thái là không chặn và cho phép các bản cập nhật khác làm gián đoạn quá trình đó.

useDeferredValue: cho phép bạn hoãn cập nhật một phần không quan trọng của giao diện người dùng và để các phần khác cập nhật trước.

# Các hook khác

Những hook này chủ yếu hữu ích cho các tác giả thư viện và thường không được sử dụng trong mã ứng dụng.

useDebugValue: cho phép bạn tùy chỉnh nhãn React DevTools hiển thị cho Hook tùy chỉnh của bạn.

useId: cho phép một thành phần liên kết một ID duy nhất với chính nó. Thường được sử dụng với các API trợ năng.

useSyncExternalStore: cho phép một thành phần đăng ký với một cửa hàng bên ngoài.

# ngoài ra có thể tự định nghĩa hook của riêng mình.

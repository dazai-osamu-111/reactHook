useContext là một React Hook cho phép bạn đọc và đăng ký ngữ cảnh (context) từ component của mình.

```jsx
const value = useContext(SomeContext);
```

## Reference

useContext(SomeContext)

Gọi useContext ở cấp cao nhất của component của bạn để đọc và đăng ký ngữ cảnh.

```jsx
import { useContext } from 'react';

function MyComponent() {
  const theme = useContext(ThemeContext);
  // ...
```

# Tham số

SomeContext: Bối cảnh mà bạn đã tạo trước đó với createContext. Bản thân bối cảnh không chứa thông tin, nó chỉ đại diện cho loại thông tin bạn có thể cung cấp hoặc đọc từ các component.

# return

useContext trả về giá trị ngữ cảnh cho thành phần gọi. Nó được xác định là giá trị được chuyển đến SomeContext.Provider gần nhất phía trên thành phần gọi trong cây. Nếu không có nhà cung cấp nào như vậy, thì giá trị được trả về sẽ là default value mà bạn đã truyền sang createContext cho ngữ cảnh đó. Giá trị trả về luôn được cập nhật. React tự động render lại các component mà đọc một số ngữ cảnh nếu nó thay đổi.

# Chú ý

useContext() call trong một component không bị ảnh hưởng bởi các trình cung cấp mà được trả về từ cùng một thành phần. <Context.Provider> tương ứng cần phải ở phía trên thành phần thực hiện lệnh gọi useContext().

React tự động render() lại tất cả các phần tử con sử dụng một ngữ cảnh cụ thể bắt đầu từ nhà cung cấp nhận được một giá trị khác. Các giá trị trước và sau được so sánh với đối tượng Object.is. Bỏ qua render() lại với memo không ngăn các component con nhận các giá trị ngữ cảnh mới.

Nếu hệ thống xây dựng của bạn tạo ra các mô-đun trùng lặp ở đầu ra (điều này có thể xảy ra với các symlink), thì điều này có thể phá vỡ ngữ cảnh. Truyền nội dung nào đó qua ngữ cảnh chỉ hoạt động nếu SomeContext mà bạn sử dụng để cung cấp ngữ cảnh và SomeContext mà bạn sử dụng để đọc chính xác là cùng một đối tượng, như được xác định bằng phép so sánh ===.

# Cách sử dụng

Truyền dữ liệu vào cây

Gọi useContext ở cấp cao nhất của component của bạn để đọc và đăng ký ngữ cảnh.

```jsx
import { useContext } from 'react';

function Button() {
const theme = useContext(ThemeContext);
// ...

```

useContext trả về context value cho ngữ cảnh bạn đã truyền. Để xác định context value, React tìm kiếm cây thành phần và tìm nhà cung cấp ngữ cảnh gần nhất ở trên cho ngữ cảnh cụ thể đó.

Để truyền ngữ cảnh cho một Nút, hãy bọc nó hoặc một trong các thành phần chính của nó vào trình cung cấp ngữ cảnh tương ứng:

```jsx
function MyPage() {
  return (
    // Đây chính là bọc trong component này
    <ThemeContext.Provider value="dark">
      <Form />
    </ThemeContext.Provider>
  );
}

function Form() {
  // ... renders buttons inside ...
}
```

Không quan trọng có bao nhiêu lớp thành phần giữa nhà cung cấp( provider) và nút(Button). Khi một Nút ở bất kỳ đâu bên trong Biểu mẫu gọi useContext(ThemeContext), nó sẽ nhận giá trị "dark".

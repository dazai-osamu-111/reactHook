import { createContext, useContext } from "react";

const ThemeContext = createContext(null);

export default function MyApp() {
  return (
    // ở đây đã cung cấp cho themContext bằng Provider
    <ThemeContext.Provider value="dark" duc="uxg">
      <Form />
    </ThemeContext.Provider>
  );
}

function Form() {
  return (
    <Panel title="Welcome">
      <Button>Sign up</Button>
      <Button>Log in</Button>
    </Panel>
  );
}

function Panel({ title, children }) {
  const theme = useContext(ThemeContext);
  console.log(theme);
  const className = "panel-" + theme;
  // khi này thì them = dark đấy, Thì thằng panel khi được gọi sẽ có class bằng panerl-dark đã được css từ index.css nên sẽ có màu đen
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  );
}

function Button({ children }) {
  const theme = useContext(ThemeContext);
  const className = "button-" + theme;
  // Tương tự
  return <button className={className}>{children}</button>;
}

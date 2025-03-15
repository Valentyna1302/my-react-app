// export function User({ name, age }) {
//   return (
//     <div>
//       <p>{`User name is ${name}`}</p>
//       <p>{`User age is ${age}`}</p>
//     </div>
//   );
// }

// type Props = {
//   name: string;
//   age: number;
// };

// export function User({ name, age }: Props) {
//   return (
//     <div>
//       <p>{`User name is ${name}`}</p>
//       <p>{`User age is ${age}`}</p>
//     </div>
//   );
// }

//* типізація children

// import React from "react";

// type Props = {
//   name: string;
//   age: number;
//   children: React.ReactNode; // Типзация для children
// };

// export function User({ name, age, children }: Props) {
//   return (
//     <div>
//       <p>{`User name is ${name}`}</p>
//       <p>{`User age is ${age}`}</p>
//       {children} {/* Рендерим children */}
//     </div>
//   );
// }

//* React.ReactElement
//якщо ви використовуєте ReactElement у типах для children, ви зможете приймати тільки елементи React.

// import React from "react";

// type Props = {
//   children: React.ReactElement;
// };

// export function Panel({ children }: Props) {
//   return <div>{children}</div>;
// }

// Це працює:

/* <Panel>
  <div>Hello, world!</div>
</Panel>; */

// Це не працює, тому що
// "Hello, world!" - це рядок, а не елемент

/* <Panel>Hello, world!</Panel> */

//* типізація функцій та об'єктів у пропсах:
// Тут user — це об'єкт з певною структурою, а onUserUpdate — це функція, що приймає об'єкт такої ж структури.

// type User = {
//   name: string;
//   email: string;
// };

// type Props = {
//   user: User;
//   onUserUpdate: (user: User) => void;
// };

// export function UserProfile({ user, onUserUpdate }: Props) {
//   // компонент UserProfile
//   return null;
// }

// ***** Типізація хуків ******** /

import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState<number>(0);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
// Оскільки тип простий, ми можемо не вказувати <number>, бо ми передали 0 як початкове значення. TypeScript, спираючись на тип переданого значення, сам би присвоїв number.
// Типізацію можна використовувати не тільки для простих типів, як number або string, але і для складніших структур даних, таких як масиви або об'єкти:

// type User = {
//   name: string;
//   email: string;
// };

// export function UserComponent() {
//   const [user, setUser] = useState<User>({
//     name: "John Doe",
//     email: "john@example.com",
//   }); //...
// }

// * Union Types

// type Status = "loading" | "idle" | "error";

// export function LoadingComponent() {
//   const [status, setStatus] = useState<Status>("idle");

//   const loadData = async () => {
//     setStatus("loading");
//     try {
//       // Тут була б ваша логіка завантаження даних
//       // У випадку успіху:
//       setStatus("idle");
//     } catch (error) {
//       // У випадку помилки:
//       setStatus("error");
//     }
//   };

//   return (
//     <div>
//       <p>Status: {status}</p>
//       <button onClick={loadData}>Завантажити дані</button>
//     </div>
//   );
// }

// * Давайте розглянемо приклад, коли ми маємо якесь початкове значення і ми хочемо його модифікувати в useState, а зберігати вже після зміни, розглянемо на прикладі TextInput:

type Props = {
  initialValue: string;
  onSave: (value: string) => void; // Пропс "onSave" функція, яка отримує рядок і нічого не повертає
};

export function TextInput({ initialValue, onSave }: Props) {
  const [value, setValue] = useState(initialValue); // Локальний стан для збереження значення поля

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSave = () => {
    onSave(value);
  };

  return (
    <div>
      <input type="text" value={value} onChange={handleChange} />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

//* useRef

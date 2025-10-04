// function Button(props) {
//   const buttonStyle = {
//     color: props.color,
//     fontSize: props.fontSize + 'px'
//   };

//   return (
//     <button style={buttonStyle}>{props.text}</button>
//   );
// }

// export default function Buttons() {
//   return (
//     <>
//       <Button text="Click me!" color="blue" fontSize={12} />
//       <Button text="Don't click me!" color="red" fontSize={12} />
//       <Button text="Click me!" color="blue" fontSize={20} />
//     </>
//   );
// }

function Button({ text, color, fontSize }) {
  const buttonStyle = {
    color: color,
    fontSize: fontSize + "px"
  };

  return <button style={buttonStyle}>{text}</button>;
}

Button.defaultProps = {
  text: "Click Me!",
  color: "white",
  fontSize: 12
};

export default function Buttons() {
  return (
    <div>
      <Button />
      <Button text="Don't Click Me!" color="red" />
      <Button fontSize={20} />
    </div>
  );
}


interface Props {
  message: string
}

export default (props: Props) => {
  console.log("Server is listening", props.message);
}
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Button = ({ btnText, className, iconOrText, onClick }) => {
  return iconOrText === "productbtn" ? (
    <button className={`${className}`} onClick={onClick}>
      {btnText}
    </button>
  ) : (
    <button onClick={onClick}>
      <FontAwesomeIcon
        icon={faTrash}
        className="cursor-pointer text-red-500 shrink-0"
      />
    </button>
  );
};

export default Button;

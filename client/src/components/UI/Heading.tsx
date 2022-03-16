import styles from "./Heading.module.css";

type HeadingProps = {
  text: string;
  subText: string;
};

const Heading = ({ text, subText }: HeadingProps) => {
  return (
    <div className={styles.heading}>
      {text}
      <div>
        {" "}
        <span className={styles.subheading}> {subText}</span>
      </div>
    </div>
  );
};

export default Heading;

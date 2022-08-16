import styles from "./Pokeball.module.css";

let classArray = [
  styles.pokeball_rotate,
  styles.pokeball_shake,
  styles.jello_horizontal,
  styles.pulsate_fwd,
  styles.vibrate_1,
  styles.pokeball_rotate_reverse,
];

let randomClass = () => {
  return Math.floor(Math.random() * classArray.length);
};

export default function Pokeball() {
  return (
    <div className={styles.loadingContainer}>
      <div
        className={`${styles.pokeball} ${classArray[randomClass()]}`}
      ></div>
    </div>
  );
}

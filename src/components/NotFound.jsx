import Lottie from "lottie-react";
import notFoundLottie from "../../notFoundLottie.json";

export default function NotFound() {
  return (
    <div className='wrapper'>
      Nessuna città trovata
      <Lottie animationData={notFoundLottie} />
    </div>
  );
}

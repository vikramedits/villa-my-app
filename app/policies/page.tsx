
import { Metadata } from "next"
import Policies from '@/components/Policies';

export const metadata: Metadata = {
  title: "Terms & Conditions | The Pushpa Heritage",
  description:
    "Read the booking, cancellation, payment and house rules for staying at our resort.",
};


const Page  = () => {
  return (
    <div>
      <Policies/>
    </div>
  )
}

export default Page 

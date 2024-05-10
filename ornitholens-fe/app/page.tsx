import Image from "next/image";
import { secondaryTheme } from "@/_theme";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1
        className="text-4xl font-bold mb-4"
        style={{ color: secondaryTheme.palette.complementary }}
      >
        Welcome to OrnithoLens!
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Are you passionate about birds and birdwatching? Look no further!
        OrnithoLens is your ultimate destination for all things avian.
      </p>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="md:w-1/2 md:mr-4 mb-4 md:mb-0">
          <h2
            className="text-2xl font-semibold mb-2"
            style={{ color: secondaryTheme.palette.triadic.secondary }}
          >
            Create an Account, Login, and Start Exploring
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Whether you're a seasoned birder or just starting out, creating an
            account on OrnithoLens is your gateway to a world of birding
            adventures. Simply register, log in, and embark on your birdwatching
            journey.
          </p>
        </div>

        <div className="md:w-1/2 md:ml-4">
          <h2
            className="text-2xl font-semibold mb-2"
            style={{ color: secondaryTheme.palette.triadic.secondary }}
          >
            Participate in the Forum with Fellow Bird Enthusiasts
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Connect with like-minded birdwatchers from around the globe in our
            vibrant forum community. Share your bird sightings, exchange tips
            and tricks, and engage in lively discussions about all things avian.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="md:w-1/2 md:mr-4 mb-4 md:mb-0">
          <h2
            className="text-2xl font-semibold mb-2"
            style={{ color: secondaryTheme.palette.triadic.secondary }}
          >
            Play the Bird Guessing Minigame
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Put your bird identification skills to the test with our interactive
            bird guessing minigame. Can you identify the bird in the image?
            Challenge yourself and see how many birds you can correctly
            identify!
          </p>
        </div>

        <div className="md:w-1/2 md:ml-4">
          <h2
            className="text-2xl font-semibold mb-2"
            style={{ color: secondaryTheme.palette.triadic.secondary }}
          >
            Identify and Create Your Personal Album with the Help of AI
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Got a photo of a bird but you cannot name it? Worry not! Our AI
            model is at your service. The pictures you upload will also be added
            to your personal album so that you can come back and check them
            later.
          </p>
        </div>
      </div>
      <Image
        priority
        src={
          "http://localhost:8080/images/094.White_breasted_Nuthatch/White_Breasted_Nuthatch_0096_86140.jpg"
        }
        alt="An image of a bird"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "20%", height: "auto" }}
      />
    </div>
  );
}

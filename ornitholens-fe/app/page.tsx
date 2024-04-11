import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to OrnithoLens!</h1>
      <p className="text-lg text-gray-700 mb-8">
        Are you passionate about birds and birdwatching? Look no further!
        OrnithoLens is your ultimate destination for all things avian.
      </p>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="md:w-1/2 md:mr-4 mb-4 md:mb-0">
          <h2 className="text-2xl font-semibold mb-2">
            Create an Account, Login, and Start Exploring
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Whether you're a seasoned birder or just starting out, creating an
            account on OrnithoLens is your gateway to a world of birding
            adventures. Simply register, log in, and embark on your birdwatching
            journey.
          </p>

          <img
            src="birdwatching_image.jpg"
            alt="Birdwatching"
            className="w-full rounded-lg"
          />
        </div>

        <div className="md:w-1/2 md:ml-4">
          <h2 className="text-2xl font-semibold mb-2">
            Participate in the Forum with Fellow Bird Enthusiasts
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Connect with like-minded birdwatchers from around the globe in our
            vibrant forum community. Share your bird sightings, exchange tips
            and tricks, and engage in lively discussions about all things avian.
          </p>

          <img
            src="forum_image.jpg"
            alt="Forum"
            className="w-full rounded-lg"
          />
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">
          Play the Bird Guessing Minigame
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          Put your bird identification skills to the test with our interactive
          bird guessing minigame. Can you identify the bird in the image?
          Challenge yourself and see how many birds you can correctly identify!
        </p>

        <a
          href="#"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Start Birdwatching Now
        </a>
      </div>
      <Image
        src={
          "/images/001.Black_footed_Albatross/Black_Footed_Albatross_0001_796111.jpg"
        }
        alt="An image of a bird"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "20%", height: "auto" }}
      ></Image>
    </div>
  );
}

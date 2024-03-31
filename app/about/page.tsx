import Link from 'next/link';

const AboutPage = () => {
  return (
    <main>
      <div>
        {/* prose is a utility class from @tailwindcss/typography plugin to overide tailwindscss default behaviour of disabling HTML elements default typography styling */}
        <div className="prose p-5 sm:max-w-none">
          <div>
            <h1 className="text-center">About ATP</h1>
            <h2>Who We Are</h2>
            <p>
              Inspired by social movements of the past, ACCOUNTABILITY AND
              TRANSPARENCY PARTY began in 2019 when a few Nairobi youth led by
              Pigbin Odimwengu (Party Leader) decided to organize and make an
              impact. Pretty quickly, this singular moment evolved into a
              full-fledged movement. Our Political Movement challenges the
              status quo, holding our leaders accountable and fighting for
              solutions that will transform society.
            </p>
          </div>
          <div>
            <p>
              We are a Political Movement that is committed to making a
              difference in the lives of Kenyans. We believe that the people of
              Kenya deserve better and we are here to fight for it. We are a
              group of passionate individuals who are dedicated to creating a
              better future for our country. We believe in the power of the
              people and we are committed to working together to create positive
              change.
            </p>
          </div>
          <div>
            <p>The Accountability and Transparency Party had its origins in:</p>
            <div>
              <ol>
                <li>
                  The aspirations of the Kenyan young and poor people for a
                  decent, secure, dignified and constructive way of life for
                  all.
                </li>
                <li>
                  The recognition by the youth of the necessity for a political
                  voice to take forward the struggle of the low class against
                  the excesses, injustices and inequalities of capitalism.
                </li>
                <li>
                  The commitment by the Kenyan young people to the creation of
                  an independent, free and enlightened Kenya.
                </li>
              </ol>
            </div>
          </div>
          <div>
            <h2>Our Mission</h2>
            <p>
              Our mission is to create a more just and equitable society for all
              Kenyans. We believe that everyone deserves the opportunity to
              thrive and we are committed to fighting for a better future for
              all. We are dedicated to holding our leaders accountable and
              working to create positive change in our communities. We believe
              that together, we can create a better future for all Kenyans.
              <br></br>
              <span className="font-semibold italic text-green-500">
                #pamojatwaweza!
              </span>
            </p>
          </div>
          <div className="text-center">
            <Link href="/dashboard/members/register">
              <button className="sm: btn rounded-xl bg-sky-400 hover:bg-sky-600">
                Join Us
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;

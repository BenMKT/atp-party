// create an origins component for the about page
const Origins = () => {
  return (
    <main>
      <div className="gap-1">
        <h2 className="text-2xl font-bold">Origins</h2>
        <p>The Accountability and Transparency Party based its origins in:</p>
        <div className="prose text-black">
          <ol>
            <li>
              The aspirations of the Kenyan youth and poor people for a decent,
              secure, equitable, dignified and constructive way of life for all.
            </li>
            <li>
              The recognition by the youth of the necessity for a political
              voice to articulate their aspirations and to provide a platform
              for their participation in the political process and the
              nation&apos;s governance.
            </li>
            <li>
              The commitment by the Kenyan youth to completely overhaul the
              current system transforming it into a sustainable progressive
              system of governance that&apos;s truly for the people, by the
              people and of the people.
            </li>
          </ol>
        </div>
      </div>
    </main>
  );
};

export default Origins;

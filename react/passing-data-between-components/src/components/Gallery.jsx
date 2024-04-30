import { individuals } from '../data/data.gallery';
import getImageURL from '../utilities/getImageURL';

function Avatar({ alt, url, imageSize = 70 }) {
  const thumbnailSize = imageSize < 90 ? 's' : 'b';
  return (
    <img
      className="avatar"
      alt={alt}
      src={getImageURL(url, thumbnailSize)}
      width={imageSize}
      height={imageSize}
    />
  );
}

function Profile({ person }) {
  // function Profile({ name, avatar, specialization, awards, discovered }) {
  return (
    <section className="profile">
      <h3>{person.name}</h3>
      <Avatar alt={person.name} {...person.avatar} />
      <ul>
        <li>
          <b>Profession: </b>
          {person.specialization}
        </li>
        <li>
          <b>Awards: {person.awards.length}</b> ({person.awards.join(', ')})
        </li>
        <li>
          <b>Discovered: </b>
          {person.discovered}
        </li>
      </ul>
    </section>
  );
}

function People({ people }) {
  return (
    <>
      {people.map((person) => {
        // return <Profile key={person.id} {...person} />;
        return <Profile key={person.id} person={person} />;
      })}
    </>
  );
}

export default function Gallery() {
  return (
    <>
      {individuals.map((category) => {
        return (
          <div className="gallery" key={category.profession}>
            <h2>Notable {category.profession}</h2>
            <People people={category.people} />
          </div>
        );
      })}
    </>
  );
}

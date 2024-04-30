import getImageURL from '../utilities/getImageURL';

function Avatar({ name, imageID, size }) {
  const styles = {
    width: size,
    height: size,
  };
  return <img src={getImageURL(imageID)} alt={name} style={styles}></img>;
}

function Card({ children }) {
  return <div className="card">{children}</div>;
}

export default function Profile() {
  const personA = {
    name: 'Yo Momma',
    imageID: '1bX5QH6',
    size: 100,
  };

  const personB = {
    name: 'Aklilu Lemma',
    imageID: 'OKS67lh',
    size: 80,
  };

  return (
    <>
      <Card>
        <Avatar {...personA} />
      </Card>
      <Card>
        <Avatar {...personB} />
      </Card>
      <Card>Hello world!</Card>
    </>
  );
}

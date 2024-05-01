function Avatar({ img }) {
  return (
    <img
      className="avatar"
      src={img.src}
      alt={img.alt}
      width={img.width}
      height={img.height}
    />
  );
}

function Card({ children, heading }) {
  return (
    <div className="card">
      <div className="card-content">
        <h1>{heading}</h1>
        {children}
      </div>
    </div>
  );
}

export default function AProfile() {
  return (
    <div>
      <Card heading="Photo">
        <Avatar
          img={{
            src: "https://i.imgur.com/OKS67lhm.jpg",
            alt: "Aklilu Lemma",
            width: 70,
            height: 70,
          }}
        />
      </Card>
      <Card heading="About">
        <p>
          Aklilu Lemma was a distinguished Ethiopian scientist who discovered a
          natural treatment to schistosomiasis.
        </p>
      </Card>
    </div>
  );
}
